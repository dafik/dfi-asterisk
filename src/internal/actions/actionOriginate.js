"use strict";
const
    Moment = require('moment'),
    dAmiLib = require("local-dfi-asterisk-ami"),
    Originate = dAmiLib.Actions.Originate,

    OriginateCallbackData = require('../../interface/originateCallbackData'),
    OriginateCallback = require('../../objects/originateCallback'),
    AsteriskChannel = require('../../models/asteriskChannel'),

    ChannelStates = require('../../enums/defs/channelStates'),

    VARIABLE_TRACE_ID = "AJ_TRACE_ID",
    ACTION_ID_PREFIX_ORIGINATE = "AJ_ORIGINATE_"
    ;

class AsteriskActionOriginate {
    constructor(server) {
        this.server = server;

        this.originateCallbacks = new Map();
    }


    /**
     * @param {String} traceId
     * @returns OriginateCallbackData
     */
    getOriginateCallbackDataByTraceId(traceId) {
        return this.originateCallbacks.get(traceId);
    }

    /**
     * @param {OriginateResponseEvent} originateEvent
     */
    _handleOriginateEvent(originateEvent) {
        /**
         * @type {String}
         */
        var traceId;
        /**
         * @type {OriginateCallbackData}
         */
        var callbackData;
        /**
         * @type {OriginateCallback}
         */
        var cb;
        /**
         * @type {AsteriskChannel}
         */
        var channel;
        /**
         * @type {AsteriskChannel}
         */
        var otherChannel; // the other side if local channel

        function onRingingWait() {
            clearTimeout(onRingingTimeout);
            channel.removeListener(AsteriskChannel.Events.PROPERTY_STATE, onRingingWait);

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

        traceId = originateEvent.actionid;
        if (traceId == null) {
            return;
        }


        callbackData = this.originateCallbacks.get(traceId);
        if (callbackData == null) {
            return;
        }
        this.originateCallbacks.delete(traceId);


        cb = callbackData.getCallback();
        if (originateEvent.uniqueid) {
            channel = this.server.getManager('channel').getChannelById(originateEvent.uniqueid);
        } else {
            channel = callbackData.getChannel();
        }

        try {
            if (channel == null) {
                /**
                 * @type {Error}
                 */
                var cause;

                cause = new Error('NoSuchChannelException("Channel \'"' + callbackData.getOriginateAction().getChannel() + '"\' is not available");');
                cb.onFailure(cause);
                return;
            }


            if (channel.wasBusy()) {
                cb.onBusy(channel);
                return;
            }

            otherChannel = this.server.getManager('channel').getOtherSideOfLocalChannel(channel);
            // special treatment of local channel side
            // the interesting things happen to the other side so we have a look at that
            if (otherChannel != null) {
                /**
                 * @type {AsteriskChannel}
                 */
                var dialedChannel;

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
            var x = {
                chan: {
                    name: channel.name,
                    hist: channel.stateHist
                },
                other: {
                    name: channel.name,
                    hist: channel.stateHist
                },
                dialed: {
                    name: channel.name,
                    hist: channel.stateHist
                }
            };
            this.loggers.logger.debug("history: %j", x);

            //sometimes originate is first than up on channel.
            if (channel.state == ChannelStates.RINGING) {


                var onRingingTimeout = setTimeout(onRingingWait, 1000);
                channel.on(AsteriskChannel.Events.PROPERTY_STATE, onRingingWait);


            } else {
                cb.onNoAnswer(channel);
            }
        } catch (t) {
            //Throwable
            this.loggers.logger.warn("Exception dispatching originate progress", t);
            throw t;
        }
    }


    /**
     * Generates an outgoing channel to a dialplan entry (extension, context, priority).
     * @param {String} channel channel name to call, for example "SIP/1310".
     * @param {String} context context to connect to
     * @param {String} exten extension to connect to
     * @param {number} priority priority to connect to
     * @param {number} timeout ow long to wait for the channel to be answered before its considered to have failed (in ms)
     * @param {AsteriskCallerId} callerId callerId to use for the outgoing channel, may be <code>null</code>.
     * @param {{}} variables channel variables to set, may be <code>null</code>.
     * @param {function((ManagerError|null),AsteriskChannel)} [callback] the generated channel
     * @param {*} [thisp] callback this
     */
    toExtension(channel, context, exten, priority, timeout, callerId, variables, callback, thisp) {
        callerId = callerId || null;
        variables = variables || null;

        /**
         * @type {Originate}
         */
        var originateAction;

        originateAction = new Originate();
        originateAction.setChannel(channel);
        originateAction.setContext(context);
        originateAction.setExten(exten);
        originateAction.setPriority(priority.toString());
        originateAction.setTimeout(timeout.toString());
        if (callerId != null) {
            originateAction.setCallerId(callerId.toString());
        }
        originateAction.setVariables(variables);

        this.originate(originateAction, callback, thisp);
    }

    /**
     * Generates an outgoing channel to an application.
     * @param {String} channel channel name to call, for example "SIP/1310".
     * @param {String} application application to connect to, for example "MeetMe"
     * @param {String} data data to pass to the application, for example "1000|d", may be <code>null</code>.
     * @param {number} timeout how long to wait for the channel to be answered before its considered to have failed (in ms)
     * @param {AsteriskCallerId} callerId callerId to use for the outgoing channel, may be <code>null</code>.
     * @param {Map<String, String>} variables channel variables to set, may be <code>null</code>.
     * @param {function((ManagerError|null),AsteriskChannel)} [callback] the generated channel
     * @param {*} [thisp] callback this
     */
    toApplication(channel, application, data, timeout, callerId, variables, callback, thisp) {
        callerId = callerId || null;
        variables = variables || null;

        /**
         * @type {Originate}
         */
        var originateAction;

        originateAction = new Originate();
        originateAction.setChannel(channel);
        originateAction.setApplication(application);
        originateAction.setData(data);
        originateAction.setTimeout(timeout.toString());
        if (callerId != null) {
            originateAction.setCallerId(callerId.toString());
        }
        originateAction.setVariables(variables);

        this.originate(originateAction, callback, thisp);
    }

    /**
     * Generates an outgoing channel
     * @param {Originate} originateAction the action that contains parameters for the originate
     * @param {function((ManagerError|null),AsteriskChannel)} [callback] the generated channel
     * @param {*} [thisp] callback this
     */
    originate(originateAction, callback, thisp) {
        //TODO check

        // must set async to true to receive OriginateEvents.
        //originateAction.setAsync(true.toString());

        this.server.start(onInitialized, this);
        function onInitialized() {
            // 2000 ms extra for the OriginateFailureEvent should be fine
            //responseEvents = this.sendEventGeneratingAction(originateAction, originateAction.getTimeout() + 2000);


            this.server.sendEventGeneratingAction(originateAction, onResponse, this);
        }

        function onResponse(err, response) {
            if (err) {
                callback.call(thisp, err);
                return;
            }
            /**
             * @type {Event}
             */
            var responseEvents;
            //Iterator < ResponseEvent >
            var responseEventIterator;
            /**
             * @type {String}
             */
            var uniqueId;
            /**
             * @type {AsteriskChannel}
             */
            var channel = null;


            responseEvents = response;

            responseEventIterator = responseEvents.events;
            if (responseEventIterator.length > 0) {
                /**
                 * @type {OriginateResponseEvent}
                 */
                var responseEvent;

                responseEvent = responseEventIterator[0];
                if (responseEvent instanceof originateresponse) {
                    /**
                     * @type {OriginateResponseEvent}
                     */
                    var originateResponseEvent = responseEvent;
                    uniqueId = originateResponseEvent.getUniqueid();
                    this.server.loggers.logger.debug(originateResponseEvent.__proto__.constructor.name + " received with uniqueId " + uniqueId);
                    this.server.getChannelById(uniqueId, onChannel);
                }
            } else {
                onChannel(err, channel)
            }
            function onChannel(err, channel) {
                if (err || channel == null) {
                    callback.call(thisp, new Error('NoSuchChannelException("Channel \'"' + originateAction.getChannel() + '"\' is not available"); '));
                }
                if (typeof callback == "function") {
                    callback.call(thisp, null, channel);
                }
            }
        }
    }

    /**
     * Asynchronously generates an outgoing channel to a dialplan entry (extension, context, priority).
     * @param {String} channel channel name to call, for example "SIP/1310".
     * @param {String} context context to connect to
     * @param {String} exten extension to connect to
     * @param {number} priority priority to connect to
     * @param {number} timeout ow long to wait for the channel to be answered before its considered to have failed (in ms)
     * @param {AsteriskCallerId} callerId callerId to use for the outgoing channel, may be <code>null</code>.
     * @param {{}} variables channel variables to set, may be <code>null</code>.
     * @param {function((ManagerError|null),AsteriskChannel)} [cb] the generated channel
     * @param {*} [thisp] callback this
     */
    toExtensionAsync(channel, context, exten, priority, timeout, callerId, variables, cb, thisp) {
        callerId = callerId || null;
        variables = variables || null;

        /**
         * @type {Originate}
         */
        var originateAction;

        originateAction = new Originate();
        originateAction.setChannel(channel);
        originateAction.setContext(context);
        originateAction.setExten(exten);
        originateAction.setPriority(priority.toString());
        originateAction.setTimeout(timeout.toString());
        if (callerId != null) {
            originateAction.setCallerId(callerId.toString());
        }
        originateAction.setVariables(variables);

        this.async(originateAction, cb, thisp);
    }

    /**
     * Asynchronously generates an outgoing channel to an application.
     * @param {String} channel channel name to call, for example "SIP/1310".
     * @param {String} application application to connect to, for example "MeetMe"
     * @param {String} data data to pass to the application, for example "1000|d", may be <code>null</code>.
     * @param {number} timeout how long to wait for the channel to be answered before its considered to have failed (in ms)
     * @param {AsteriskCallerId} callerId callerId to use for the outgoing channel, may be <code>null</code>.
     * @param {Map<String, String>} variables channel variables to set, may be <code>null</code>.
     * @param {function((ManagerError|null),AsteriskChannel)} [cb] the generated channel
     * @param {*} [thisp] callback this
     */
    toApplicationAsync(channel, application, data, timeout, callerId, variables, cb, thisp) {
        callerId = callerId || null;
        variables = variables || null;

        /**
         * @type {Originate}
         */
        var originateAction;

        originateAction = new Originate();
        originateAction.setChannel(channel);
        originateAction.setApplication(application);
        originateAction.setData(data);
        originateAction.setTimeout(timeout.toString());
        if (callerId != null) {
            originateAction.setCallerId(callerId.toString());
        }
        originateAction.setVariables(variables);

        this.async(originateAction, cb, thisp);
    }

    /**
     * Asynchronously generates an outgoing channel.
     * @param {Originate} originateAction  the action that contains parameters for the originate
     * @param {OriginateCallback} cb callback to inform about the result
     * @param {*} [thisp] callback this
     */
    async(originateAction, cb, thisp) {

        //TODO check OCB cb
        //Map < String, String >
        var variables;
        /**
         * @type {String}
         */
        var traceId;

        traceId = ACTION_ID_PREFIX_ORIGINATE + this.server.idCounter();
        if (originateAction.getVariables() == null) {
            variables = {};
        } else {
            variables = originateAction.getVariables();
        }

        // prefix variable name by "__" to enable variable inheritance across channels
        variables["__" + VARIABLE_TRACE_ID] = traceId;
        originateAction.setVariables(variables);

        // async must be set to true to receive OriginateEvents.
        originateAction.set('Async', true.toString());
        originateAction.set('ActionID', traceId);

        if (cb != null) {
            /**
             * @type {OriginateCallbackData}
             */
            var callbackData;

            callbackData = new OriginateCallbackData(originateAction, new Moment(), cb, thisp);
            // register callback

            this.originateCallbacks.set(traceId, callbackData);

        }

        this.server.start(onInitialized, this);
        function onInitialized() {
            //TODO check why not normal
            this.server.sendActionOnEventConnection(originateAction);
        }
    }


}
module.exports = AsteriskActionOriginate;