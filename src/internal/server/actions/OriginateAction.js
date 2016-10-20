"use strict";
///<reference path="../../../../node_modules/@types/node/index.d.ts"/>
const BaseServerAction = require("./BaseAction");
const actionNames_1 = require("../../asterisk/actionNames");
const Channel = require("../../../models/ChannelModel");
const AstUtil = require("../../astUtil");
const ChannelStates = require("../../../enums/channelStates");
const NoSuchChannel = require("../../../errors/NoSuchChannel");
const VARIABLE_TRACE_ID = "AJ_TRACE_ID";
const ACTION_ID_PREFIX_ORIGINATE = "AJ_ORIGINATE_";
class OriginateServerAction extends BaseServerAction {
    constructor(server) {
        super(server);
        this._originateCallbacks = new Map();
    }
    getOriginateCallbackDataByTraceId(traceId) {
        return this._originateCallbacks.get(traceId);
    }
    handleOriginateEvent(originateEvent) {
        let channel;
        let dialedChannel;
        let onRingingTimeout;
        let otherChannel;
        function onRingingWait(model, attribute, value, old) {
            if (attribute === "state" && value.status === ChannelStates.RINGING) {
                clearTimeout(onRingingTimeout);
                channel.off(Channel.events.UPDATE, onRingingWait);
                if (channel.wasBusy()) {
                    cb.onBusy(channel);
                    return;
                }
                if (otherChannel != null) {
                    if (otherChannel.wasBusy()) {
                        cb.onBusy(channel);
                        return;
                    }
                    if (dialedChannel != null && dialedChannel.wasBusy()) {
                        cb.onBusy(channel);
                        return;
                    }
                }
                if (channel.wasInState(ChannelStates.UP)) {
                    cb.onSuccess(channel);
                    return;
                }
                cb.onNoAnswer(channel);
            }
        }
        let traceId = originateEvent.ActionID;
        if (traceId == null) {
            return;
        }
        let callbackData = this._originateCallbacks.get(traceId);
        if (callbackData == null) {
            return;
        }
        this._originateCallbacks.delete(traceId);
        let cb = callbackData.callbackFn;
        if (originateEvent.Uniqueid) {
            channel = this._server.managers.channel.channels.get(originateEvent.Uniqueid);
        }
        else {
            channel = this._server.managers.channel.getChannelByName(callbackData.channel);
        }
        try {
            if (channel == null) {
                let cause = new NoSuchChannel("Channel '" + callbackData.action.Channel + "' is not available");
                cb.onFailure(cause);
                return;
            }
            if (channel.wasBusy()) {
                cb.onBusy(channel);
                return;
            }
            otherChannel = this._server.managers.channel.getOtherSideOfLocalChannel(channel);
            // special treatment of local channel side
            // the interesting things happen to the other side so we have a look at that
            if (otherChannel != null) {
                dialedChannel = otherChannel.linkedChannel;
                // on busy the other channel is in state busy when we receive the originate event
                if (otherChannel.wasBusy()) {
                    cb.onBusy(channel);
                    return;
                }
                // alternative:
                // on busy the dialed channel is hung up when we receive the
                // originate event having a look at the hangup cause reveals the
                // information we are interested in
                // instance alternative has the drawback that there might by
                // multiple channels that have been dialed by the local channel
                // but we only look at the last one.
                if (dialedChannel != null && dialedChannel.wasBusy()) {
                    cb.onBusy(channel);
                    return;
                }
            }
            if (channel.wasInState(ChannelStates.UP)) {
                cb.onSuccess(channel);
                return;
            }
            if (this._server.logger.isDebugEnabled()) {
                this._server.logger.debug("history: %j", {
                    chan: {
                        hist: channel.getStateHistory(),
                        name: channel.name
                    },
                    dialed: {
                        hist: channel.getStateHistory(),
                        name: channel.name
                    },
                    other: {
                        hist: channel.getStateHistory(),
                        name: channel.name
                    }
                });
            }
            // sometimes originate is first than up on channel.
            if (channel.state.status === ChannelStates.RINGING) {
                onRingingTimeout = setTimeout(onRingingWait, 1000);
                channel.on(Channel.events.UPDATE, onRingingWait);
            }
            else {
                cb.onNoAnswer(channel);
            }
        }
        catch (t) {
            // Throwable
            this._server.logger.warn("Exception dispatching originate progress", t);
            throw t;
        }
    }
    /**
     * Asynchronously generates an outgoing channel.
     * @param  originateAction  the action that contains parameters for the originate
     * @param  callbackFn callback to inform about the result
     * @param  [context] callback this
     */
    async(originateAction, callbackFn, context) {
        if (!this._server.managers.channel.enabled) {
            throw new Error("channel manager is not enabled but required for originate async");
        }
        this._server.start()
            .then(() => {
            // TODO check OCB cb
            let traceId = ACTION_ID_PREFIX_ORIGINATE + AstUtil.uniqueActionID();
            if (originateAction.Variable) {
                if (!Array.isArray(originateAction.Variable)) {
                    originateAction.Variable = [originateAction.Variable];
                }
            }
            else {
                originateAction.Variable = [];
            }
            originateAction.serialize = true;
            // prefix variable name by "__" to enable variable inheritance across channels
            originateAction.Variable.push("__" + VARIABLE_TRACE_ID + "=" + traceId);
            // async must be set to true to receive OriginateEvents.
            originateAction.Async = true.toString();
            originateAction.ActionID = traceId;
            if (callbackFn != null) {
                let callbackData = {
                    action: originateAction,
                    callbackFn,
                    channel: originateAction.Channel,
                    context,
                    date: Date.now()
                };
                this._originateCallbacks.set(traceId, callbackData);
            }
            this._server.sendEventGeneratingAction(originateAction, (err) => {
                if (err) {
                    this._server.logger.error(err);
                }
            });
        })
            .catch(error => error)
            .then((err) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn.onFailure, callbackFn, err);
            }
        });
    }
    /**
     * Generates an outgoing channel
     * @param  originateAction the action that contains parameters for the originate
     * @param callbackFn
     * @param context
     */
    originate(originateAction, callbackFn, context) {
        function onChannel(err, channel) {
            if (err || channel == null) {
                let error = new NoSuchChannel("Channel '" + originateAction.Channel + "' is not available");
                AstUtil.maybeCallback(callbackFn, context, error);
            }
            AstUtil.maybeCallback(callbackFn, context, null, channel);
        }
        this._server.start()
            .then(() => {
            // TODO check
            // must set async to true to receive OriginateEvents.
            // originateAction.Async = false.toString(); ?
            this._server.sendEventGeneratingAction(originateAction, (err, response) => {
                if (err) {
                    AstUtil.maybeCallback(callbackFn, context, err);
                    return;
                }
                let responseEvents;
                let responseEventIterator;
                let uniqueId;
                let channel = null;
                responseEvents = response;
                responseEventIterator = responseEvents.events;
                if (responseEventIterator.length > 0) {
                    let responseEvent;
                    responseEvent = responseEventIterator[0];
                    if (responseEvent instanceof originateresponse) {
                        let originateResponseEvent = responseEvent;
                        uniqueId = originateResponseEvent.getUniqueid();
                        this._server.logger.debug(originateResponseEvent.__proto__.constructor.name + " received with uniqueId " + uniqueId);
                        onChannel.call(null, this._server.managers.channel.getChannelById(uniqueId));
                    }
                }
                else {
                    onChannel(err, channel);
                }
            }, this);
        })
            .catch(error => error)
            .then((err) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            }
        });
    }
    /**
     * Generates an outgoing channel to an application.
     * @param channel channel name to call, for example "SIP/1310".
     * @param application application to connect to, for example "MeetMe"
     * @param data data to pass to the application, for example "1000|d", may be <code>null</code>.
     * @param timeout how long to wait for the channel to be answered before its considered to have failed (in ms)
     * @param callerId callerId to use for the outgoing channel, may be <code>null</code>.
     * @param variables channel variables to set, may be <code>null</code>.
     * @param callbackFn
     * @param context
     */
    toApplication(channel, application, data, timeout, callerId, variables, callbackFn, context) {
        callerId = callerId || null;
        variables = variables || null;
        let originateAction = {
            Action: actionNames_1.AST_ACTION.ORIGINATE,
            Application: application,
            Channel: channel,
            Data: data,
            Timeout: timeout,
            Variable: variables,
            serialize: true
        };
        if (callerId != null) {
            originateAction.CallerID = callerId.toString();
        }
        this.originate(originateAction, callbackFn, context);
    }
    /**
     * Asynchronously generates an outgoing channel to an application.
     * @param  channel channel name to call, for example "SIP/1310".
     * @param  application application to connect to, for example "MeetMe"
     * @param  data data to pass to the application, for example "1000|d", may be <code>null</code>.
     * @param  timeout how long to wait for the channel to be answered before its considered to have failed (in ms)
     * @param  callerId callerId to use for the outgoing channel, may be <code>null</code>.
     * @param  variables channel variables to set, may be <code>null</code>.
     * @param callbackFn
     * @param context
     */
    toApplicationAsync(channel, application, data, timeout, callerId, variables, callbackFn, context) {
        callerId = callerId || null;
        variables = variables || null;
        let originateAction = {
            Action: actionNames_1.AST_ACTION.ORIGINATE,
            Application: application,
            Channel: channel,
            Data: data,
            Timeout: timeout,
            Variable: variables,
            serialize: true
        };
        if (callerId != null) {
            originateAction.CallerID = callerId.toString();
        }
        this.async(originateAction, callbackFn, context);
    }
    /**
     * Generates an outgoing channel to a dialplan entry (extension, ctx, priority).
     * @param channel channel name to call, for example "SIP/1310".
     * @param ctx ctx to connect to
     * @param exten extension to connect to
     * @param priority priority to connect to
     * @param timeout ow long to wait for the channel to be answered before its considered to have failed (in ms)
     * @param callerId callerId to use for the outgoing channel, may be <code>null</code>.
     * @param variables channel variables to set, may be <code>null</code>.
     * @param callbackFn
     * @param context
     */
    toExtension(channel, ctx, exten, priority, timeout, callerId, variables, callbackFn, context) {
        callerId = callerId || null;
        variables = variables || null;
        let action = {
            Action: actionNames_1.AST_ACTION.ORIGINATE,
            Channel: channel,
            Context: ctx,
            Exten: exten,
            Priority: priority,
            Timeout: timeout,
            Variable: variables
        };
        if (callerId != null) {
            action.CallerID = callerId.toString();
        }
        this.originate(action, callbackFn, context);
    }
    /**
     * Asynchronously generates an outgoing channel to a dialplan entry (extension, ctx, priority).
     * @param  channel channel name to call, for example "SIP/1310".
     * @param  ctx ctx to connect to
     * @param  exten extension to connect to
     * @param  priority priority to connect to
     * @param  timeout ow long to wait for the channel to be answered before its considered to have failed (in ms)
     * @param  callerId callerId to use for the outgoing channel, may be <code>null</code>.
     * @param  variables channel variables to set, may be <code>null</code>.
     * @param callbackFn
     * @param context
     */
    toExtensionAsync(channel, ctx, exten, priority, timeout, callerId, variables, callbackFn, context) {
        callerId = callerId || null;
        variables = variables || null;
        let action = {
            Action: actionNames_1.AST_ACTION.ORIGINATE,
            Channel: channel,
            Context: ctx,
            Exten: exten,
            Priority: priority,
            Timeout: timeout,
            Variable: variables
        };
        if (callerId != null) {
            action.CallerID = callerId.toString();
        }
        this.async(action, callbackFn, context);
    }
}
module.exports = OriginateServerAction;
//# sourceMappingURL=OriginateAction.js.map