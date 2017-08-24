import AsteriskServer from "../../../asteriskServer";
import {IDfiAMIResponseOriginate, IDfiAsOriginateCallback, IDfiAstOriginateCallbackData, IDfiCallbackResult} from "../../../definitions/interfaces";
import ChannelStates from "../../../enums/channelStates";
import NoSuchChannel from "../../../errors/NoSuchChannel";
import NotAllowedAction from "../../../errors/NotAllowedAction";
import CallerId from "../../../models/CallerIdModel";
import Channel from "../../../models/ChannelModel";
import ChannelState from "../../../states/channelState";
import AST_ACTION from "../../asterisk/actionNames";
import {IAstActionOriginate} from "../../asterisk/actions";
import {IAstEventOriginateResponse} from "../../asterisk/events";
import AstUtil from "../../astUtil";
import BaseServerAction from "./BaseAction";

let VARIABLE_TRACE_ID = "AN_TRACE_ID";
let ACTION_ID_PREFIX_ORIGINATE = "AN_ORIGINATE_";

type IDfiOriginateResult = IDfiCallbackResult<NoSuchChannel | NotAllowedAction | Error, Channel>;

class OriginateServerAction extends BaseServerAction {
    private _originateCallbacks: Map<string, IDfiAstOriginateCallbackData>;

    constructor(server: AsteriskServer) {
        super(server);
        const prefix = server.originateConfig.prefix;
        VARIABLE_TRACE_ID = prefix + "_TRACE_ID";
        ACTION_ID_PREFIX_ORIGINATE = prefix + "_ORIGINATE_";

        this._originateCallbacks = new Map();
    }

    public getOriginateCallbackDataByTraceId(traceId: string): IDfiAstOriginateCallbackData {
        return this._originateCallbacks.get(traceId);
    }

    public handleOriginateEvent(originateEvent: IAstEventOriginateResponse) {
        let channel: Channel;
        let dialedChannel: Channel;
        let onRingingTimeout: NodeJS.Timer;
        let otherChannel: Channel;

        function onRingingWait(model: Channel, attribute: string, value: any, old: any) {
            if (attribute === "state" && (value as ChannelState).status === ChannelStates.RINGING) {
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

        const traceId = originateEvent.ActionID;
        if (traceId == null) {
            return;
        }

        const callbackData = this._originateCallbacks.get(traceId);
        if (callbackData == null) {
            return;
        }
        this._originateCallbacks.delete(traceId);

        const cb = callbackData.callbackFn;

        channel = originateEvent.Uniqueid ? this._server.managers.channel.channels.get(originateEvent.Uniqueid) : this._server.managers.channel.getChannelByName(callbackData.channel);

        try {
            if (channel == null) {
                const cause = new NoSuchChannel("Channel '" + callbackData.action.Channel + "' is not available");
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

            } else {
                cb.onNoAnswer(channel);
            }
        } catch (t) {
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
    public async(originateAction: IAstActionOriginate, callbackFn?: IDfiAsOriginateCallback, context?) {
        if (!this._server.managers.channel.enabled) {
            const error = new Error("channel manager is not enabled but required for originate async");
            AstUtil.maybeCallbackOnce(callbackFn.onFailure, callbackFn, error);
        }

        this._server.start()
            .then(() => {
                // TODO check OCB cb
                const traceId = ACTION_ID_PREFIX_ORIGINATE + AstUtil.uniqueActionID();
                if (originateAction.Variable) {
                    if (!Array.isArray(originateAction.Variable)) {
                        originateAction.Variable = [originateAction.Variable];
                    }
                } else {
                    originateAction.Variable = [];
                }
                // originateAction.serialize = true;

                // prefix variable name by "__" to enable variable inheritance across channels
                originateAction.Variable.push("__" + VARIABLE_TRACE_ID + "=" + traceId);
                // async must be set to true to receive OriginateEvents.
                originateAction.Async = true.toString();
                originateAction.ActionID = traceId;

                if (callbackFn != null) {
                    const callbackData: IDfiAstOriginateCallbackData = {
                        action: originateAction,
                        callbackFn,
                        date: Date.now()
                    };
                    this._originateCallbacks.set(traceId, callbackData);
                }
                this._server.sendEventGeneratingAction(originateAction, (err) => {
                    if (err) {
                        err.action = originateAction;
                        this._server.logger.error(err);
                        AstUtil.maybeCallbackOnce(callbackFn.onFailure, callbackFn, err);
                    }
                });
            })
            .catch((error) => {
                if (error) {
                    AstUtil.maybeCallbackOnce(callbackFn.onFailure, callbackFn, error);
                }
            });
    }

    /**
     * Generates an outgoing channel
     * @param  originateAction the action that contains parameters for the originate
     * @param callbackFn
     * @param context
     */
    public originate(originateAction: IAstActionOriginate, callbackFn?: IDfiOriginateResult, context?) {

        function onChannel(err?: {}, channel?: Channel) {
            if (err || channel == null) {
                const error = new NoSuchChannel("Channel '" + originateAction.Channel + "' is not available");
                AstUtil.maybeCallback(callbackFn, context, error);
            }
            AstUtil.maybeCallback(callbackFn, context, null, channel);
        }

        this._server.start()
            .then(() => {
                // TODO check
                // must set async to true to receive OriginateEvents.
                // originateAction.Async = false.toString(); ?
                this._server.sendAction<IDfiAMIResponseOriginate>(originateAction, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallback(callbackFn, context, err);
                        return;
                    }

                    if (response.Response === "Success") {

                        const uniqueId = response.Uniqueid;
                        this._server.logger.debug(response.Event + " received with uniqueId " + uniqueId);
                        onChannel.call(null, this._server.managers.channel.getChannelById(uniqueId));

                    } else {
                        onChannel.call(response);
                    }

                }, this);
            })
            .catch((error) => {
                if (error) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, error);
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
    public toApplication(channel: string, application: string, data: string, timeout: string, callerId: CallerId, variables: string[], callbackFn?: IDfiOriginateResult, context?) {
        callerId = callerId || null;
        variables = variables || null;

        const originateAction: IAstActionOriginate = {
            Action: AST_ACTION.ORIGINATE,
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
    public toApplicationAsync(channel, application, data, timeout, callerId, variables, callbackFn: IDfiAsOriginateCallback, context?) {
        callerId = callerId || null;
        variables = variables || null;

        const originateAction: IAstActionOriginate = {
            Action: AST_ACTION.ORIGINATE,
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
    public toExtension(channel: string, ctx: string, exten: string, priority: string, timeout: string, callerId: string, variables: string[], callbackFn?: IDfiOriginateResult, context?) {
        callerId = callerId || null;
        variables = variables || null;

        const action: IAstActionOriginate = {
            Action: AST_ACTION.ORIGINATE,
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
    public toExtensionAsync(channel, ctx, exten, priority, timeout, callerId, variables, callbackFn: IDfiAsOriginateCallback, context?) {
        callerId = callerId || null;
        variables = variables || null;

        const action: IAstActionOriginate = {
            Action: AST_ACTION.ORIGINATE,
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

export default OriginateServerAction;
