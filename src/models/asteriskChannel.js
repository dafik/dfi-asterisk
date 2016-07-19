"use strict";
const
    _ = require('lodash'),

    AsteriskModel = require('../internal/asteriskModel'),
    dAmiLib = require("local-dfi-asterisk-ami"),
    actions = dAmiLib.Actions,
    responses = dAmiLib.Responses,


    DialedChannelHistoryEntry = require('./history/dialedChannelHistoryEntry'),
    ChannelStateHistoryEntry = require('./history/channelStateHistoryEntry'),
    LinkedChannelHistoryEntry = require('./history/linkedChannelHistoryEntry'),
    ExtensionHistoryEntry = require('./history/extensionHistoryEntry'),

    ChannelState = require('../enums/channelState'),
    ChannelStates = ChannelState.prototype.States,

    HangupCauses = require('../enums/defs/hangupCauses'),

    AsteriskCallerId = require('../models/asteriskCallerId'),
    AsteriskChannelVariables = require('../collections/channelVariables'),
    AsteriskChannelVariable = require('../models/asteriskChannelVariable'),


    BridgesCollection = require('../collections/bridges'),
    PeersCollection = require('../collections/peers'),

    PROPERTY_ID = "id",
    PROPERTY_NAME = "name",
    PROPERTY_CALLER_ID = "callerId",
    PROPERTY_STATE = "state",
    PROPERTY_ACCOUNT = "account",
    PROPERTY_CURRENT_EXTENSION = "currentExtension",
    PROPERTY_CALL_DETAIL_RECORD = "callDetailRecord",
    PROPERTY_DIALED_CHANNEL = "dialedChannel",
    PROPERTY_DIALING_CHANNEL = "dialingChannel",
    PROPERTY_LINKED_CHANNEL = "linkedChannel",
    PROPERTY_MEET_ME_USER = "meetMeUser",
    PROPERTY_QUEUE_ENTRY = "queueEntry",
    PROPERTY_PARKED_AT = "parkedAt",
    PROPERTY_DTMF_RECEIVED = "dtmfReceived",
    PROPERTY_DTMF_SENT = "dtmfSent",
    PROPERTY_VARIABLE = "variable",
    PROPERTY_BRIDGE = "bridge",

    VARIABLE_MONITOR_EXEC = "MONITOR_EXEC",
    VARIABLE_MONITOR_EXEC_ARGS = "MONITOR_EXEC_ARGS",
    CAUSE_VARIABLE_NAME = "PRI_CAUSE";


/**
 * Creates a new Channel.
 * @class
 * @extends AsteriskModel
 */
class AsteriskChannel extends AsteriskModel {

    initialize() {

        this.id = this.get('uniqueid');
        this.set('name', this.get('channel'));


        this.setProp('traceId', null);
        this.setProp('isDestroyed', false);
        this.setProp('getVarsCallbacks', {});
        this.setProp('inSerialization', false);

        if (this.get('calleridname') && this.get('calleridnum')) {
            this.set('callerId', new AsteriskCallerId(this.get('calleridname'), this.get('calleridnum')));
        }

        this.set('name', this.get('channel'));
        this.set('bridges', new BridgesCollection());
        this.set('peers', new PeersCollection());

        /**
         * @type {ExtensionHistoryEntry[]}
         */
        this.set('extensionHistory', []);
        /**
         * @type {ChannelStateHistoryEntry[]}
         */
        this.set('stateHistory', []);
        /**
         * @type {LinkedChannelHistoryEntry[]}
         */
        this.set('linkedChannelHistory', []);
        /**
         * @type {DialedChannelHistoryEntry[]}
         */
        this.set('dialedChannelHistory', []);
        /**
         * @type {Collection}
         */
        this.set('variables', new AsteriskChannelVariables());


        /**
         * @this AsteriskChannel
         */
        function addPeer() {
            if (this.getProp('isDestroyed') || !this.server.isMangerEnabled('peer')) {
                return;
            }
            var peer = this.server.getManager('peer').peers.get(peerName);
            if (peer) {
                peer.addChannel(this);
                this.get('peers').add(peer)
            } else {
                if (!peerName.match('DAHDI') && !peerName.match('Local')) {
                    this.logger.error('peer %s notFound', peerName);
                }
            }
        }

        if (this.get('channel')) {
            var peerName = this.get('channel').split('-')[0];
            addPeer.call(this);
        }
        var bridgeId = this.get('bridgeid');

        /**
         * @this AsteriskChannel
         */
        function addBridge() {
            if (this.getProp('isDestroyed') || !this.server.isMangerEnabled('bridge')) {
                return
            }
            var bridge = this.server.getManager('bridge').bridges.get(bridgeId);
            if (bridge) {
                bridge.get('channels').add(this);
                this.get('bridges').add(bridge);
            } else {
                this.logger.error('bridge %s notFound', bridgeId);
            }
        }

        if (bridgeId) {
            addBridge.call(this);
        }
    }

    get getVarsCallbacks() {
        return this.getProp('getVarsCallbacks')
    }


    /**
     * @returns {AsteriskBridge[]}
     */
    getBridgesArray() {
        return this.get('bridges').toArray();
    }

    /**
     * Sets bridge of this channel.
     */
    setBridge(bridge) {
        //TODO check is same new and old
        this.logger.info('adding bridge: "' + bridge.id + '" to: "' + this.get('name') + '"');
        var old = this.getBridgesArray();
        this.get('bridges').add(bridge);
        this.set('bridges', this.get('bridges'));
        /**
         * setBridge event.
         * @event AsteriskChannel#PROPERTY_BRIDGE
         * @type {PropertyChangeEvent}
         */
        this.emit(AsteriskChannel.Events.PROPERTY_BRIDGE, {old: old, new: this.getBridgesArray()});
    }

    /**
     * Sets bridge of this channel.
     */
    removeBridge(bridge) {
        this.logger.info('removing bridge: "' + bridge.id + '" from: "' + this.get('name') + '"');
        if (!this.get('bridges').has(bridge.id)) {
            this.logger.error('NoSuchBridgeException("Bridge ' + bridge.get('name') + ' is not available');
            return
        }
        var old = this.getBridgesArray();
        this.get('bridges').remove(bridge.id);

        /**
         * removeBridge event.
         * @event AsteriskChannel#PROPERTY_BRIDGE
         * @type {PropertyChangeEvent}
         */
        this.emit(AsteriskChannel.Events.PROPERTY_BRIDGE, {old: old, new: this.getBridgesArray()});
    }


    /**
     * @returns boolean
     * @param {ChannelState} state
     */
    wasInState(state) {
        /**
         ** @type {ChannelStateHistoryEntry}
         */
        var historyEntry;
        var key;
        for (key in this.stateHistory) {
            if (this.stateHistory.hasOwnProperty(key)) {
                historyEntry = this.stateHistory[key];
                if (historyEntry.getState() == state) {
                    return true;
                }
            }
        }


        return false;
    }

    /**
     * @returns boolean
     * */
    wasBusy() {

        return this.wasInState(ChannelStates.BUSY)
            || this.get('hangupCause') == HangupCauses.AST_CAUSE_BUSY
            || this.get('hangupCause') == HangupCauses.AST_CAUSE_USER_BUSY;
    }

    /**
     *
     * @param {Moment} date
     * @param {ChannelState} state
     */
    stateChanged(date, state) {
        if (!state instanceof ChannelState) {
            var x = 1;
        }
        /**
         * @type  ChannelStateHistoryEntry
         */
        var historyEntry;
        /**
         ** @type {ChannelState}
         */
        var oldState = this.get('state');
        if (oldState && oldState.status == state.status) {
            return;
        }


        historyEntry = new ChannelStateHistoryEntry(date, state);
        this.get('stateHistory').push(historyEntry);

        this.set('state', state);
        this.set('stateHistory', this.get('stateHistory'));

        this.emit(AsteriskChannel.Events.PROPERTY_STATE, {old: oldState, new: state});
    }

    callerIdChanged(name, num) {

        var callerId = new AsteriskCallerId(name, num);


        var oldCallerId = this.get('callerId');
        if (oldCallerId.name == callerId.name && oldCallerId.number == callerId.number) {
            return;
        }

        this.logger.info('callerId change: %s name: %j -> %j number: %j -> %j ', this.id, oldCallerId.get('name'), callerId.get('name'), oldCallerId.get('number'), callerId.get('number'))
        this.set('callerId', callerId);
        this.emit(AsteriskChannel.Events.PROPERTY_CALLER_ID, {old: oldCallerId, new: callerId});
    }


    nameChanged(date, name) {
        var oldName = this.get('name');

        if (oldName != null && oldName == name) {
            return;
        }

        this.set('name', name);
    }


    /**
     * @returns Extension
     */
    getCurrentExtension() {
        /**
         * @type {Extension}
         */
        var extension;
        var history = this.get('extensionHistory');
        if (history.length == 0) {
            extension = null;
        } else {
            extension = history[history.length - 1].extension;
        }
        return extension;
    }

    /**
     *  @returns Extension
     */
    getFirstExtension() {
        var extension;

        if (this.extensionHistory.isEmpty()) {
            extension = null;
        }
        else {
            extension = this.extensionHistory[0].getExtension();
        }

        return extension;
    }

    /**
     *  @returns ExtensionHistoryEntry[]
     */
    getExtensionHistory() {

        /**
         *
         * @type {ExtensionHistoryEntry[]}
         */
        var copy;
        copy = new Array(this.extensionHistory);
        //todo check


        return copy;
    }

    /**
     * Adds a visited dialplan entry to the history.
     */
    extensionVisited(date, extension) {
        if (!extension) {
            return
        }

        /**
         ** @type {Extension}
         */
        var oldCurrentExtension = this.getCurrentExtension();
        /**
         ** @type {ExtensionHistoryEntry}
         */
        var historyEntry = new ExtensionHistoryEntry(date, extension);


        var extensionHistory = this.get('extensionHistory');
        extensionHistory.push(historyEntry);
        this.set('extensionHistory', extensionHistory);


        /**
         * extensionVisited event.
         * @event AsteriskChannel#PROPERTY_CURRENT_EXTENSION
         * @type {PropertyChangeEvent}
         */
        this.emit(AsteriskChannel.Events.PROPERTY_CURRENT_EXTENSION, {old: oldCurrentExtension, new: extension});
    }


    /**
     * Sets dateOfRemoval, hangupCause and hangupCauseText and changes state to
     * {@link ChannelState#HANGUP}. Fires a PropertyChangeEvent for state.
     *
     * @param {Moment} dateOfRemoval   date the channel was hung up
     * @param {HangupCause} hangupCause     cause for hangup
     * @param {String} hangupCauseText textual representation of hangup cause
     */
    handleHangup(dateOfRemoval, hangupCause, hangupCauseText) {
        this.set('dateOfRemoval', dateOfRemoval);
        this.set('hangupCause', hangupCause);
        this.set('hangupCauseText', hangupCauseText);

        this.stateChanged(dateOfRemoval, ChannelState.byValue(ChannelStates.HANGUP));
    }


    /**
     * @returns void
     */
    callDetailRecordReceived(date, callDetailRecord) {
        var oldCallDetailRecord = this.callDetailRecord;

        this.set('callDetailRecord', callDetailRecord);
        //this._firePropertyChange(PROPERTY_CALL_DETAIL_RECORD, oldCallDetailRecord, callDetailRecord);

        /**
         * callDetailRecordReceived event.
         * @event AsteriskChannel#PROPERTY_CALL_DETAIL_RECORD
         * @type {PropertyChangeEvent}
         */
        this.emit(AsteriskChannel.Events.PROPERTY_CALL_DETAIL_RECORD, {old: oldCallDetailRecord, new: callDetailRecord});
    }


    /**
     * @returns DialedChannelHistoryEntry[]
     */
    getDialedChannelHistory() {
        /**
         ** @type {DialedChannelHistoryEntry[]}
         */
        var copy;
        copy = new Array(this.dialedChannelHistory);
        return copy;
    }

    /**
     * @param {Moment} date
     */
    channelDialed(date, dialedChannel) {
        var oldDialedChannel = this.get('dialedChannel');
        var historyEntry = new DialedChannelHistoryEntry.DialedChannelHistoryEntry(date, dialedChannel);
        this.get('dialedChannelHistory').push(historyEntry);
        this.set('dialedChannelHistory', this.get('dialedChannelHistory'));
        this.set('dialedChannel', dialedChannel);

        this.emit(AsteriskChannel.Events.PROPERTY_DIALED_CHANNEL, {old: oldDialedChannel, new: dialedChannel});
    }


    /**
     * @param {Moment} date
     */
    channelDialing(date, dialingChannel) {
        var oldDialingChannel = this.dialingChannel;

        this.set('dialingChannel', dialingChannel);
        //this._firePropertyChange(PROPERTY_DIALING_CHANNEL, oldDialingChannel, dialingChannel);

        /**
         * channelDialing event.
         * @event AsteriskChannel#PROPERTY_DIALING_CHANNEL
         * @type {PropertyChangeEvent}
         */
        this.emit(AsteriskChannel.Events.PROPERTY_DIALING_CHANNEL, {old: oldDialingChannel, new: dialingChannel});

    }


    /**
     * Sets the channel this channel is bridged with.
     */
    channelLinked(date, linkedChannel) {
        var oldLinkedChannel = this.get('linkedChannel');
        var historyEntry;

        historyEntry = new LinkedChannelHistoryEntry(date, linkedChannel);

        this.get('linkedChannelHistory').push(historyEntry);
        this.set('linkedChannelHistory', this.get('linkedChannelHistory'));

        this.set('linkedChannel', linkedChannel);
        this.set('wasLinked', true);

        this.emit(AsteriskChannel.Events.PROPERTY_LINKED_CHANNEL, {old: oldLinkedChannel, new: linkedChannel});

    }

    channelUnlinked(date) {
        var oldLinkedChannel = this.linkedChannel;
        var historyEntry;

        if (this.get('linkedChannelHistory').isEmpty()) {
            historyEntry = null;
        }
        else {
            historyEntry = this.get('linkedChannelHistory')[this.get('linkedChannelHistory').length - 1];
        }

        if (historyEntry != null) {
            historyEntry.setDateUnlinked(date);
        }
        this.set('linkedChannel', null);
        //this._firePropertyChange(PROPERTY_LINKED_CHANNEL, oldLinkedChannel, null);

        /**
         * channelUnlinked event.
         * @event AsteriskChannel#PROPERTY_LINKED_CHANNEL
         * @type {PropertyChangeEvent}
         */
        this.emit(AsteriskChannel.Events.PROPERTY_LINKED_CHANNEL, {old: oldLinkedChannel, new: null});
    }


    setMeetMeUser(meetMeUser) {
        var oldMeetMeUser = this.meetMeUser;
        this.set('meetMeUser', meetMeUser);

        this.emit(AsteriskChannel.Events.PROPERTY_MEET_ME_USER, {old: oldMeetMeUser, new: meetMeUser});
    }

// action methods

    /**
     * @returns void
     * @param {HangupCause} cause
     * @throws  ManagerCommunicationException, NoSuchChannelException
     */
    hangup(cause) {
        /**
         * @type {HangupAction}
         */
        var action;
        var self = this;
        if (cause != null) {
            this.setVariable(CAUSE_VARIABLE_NAME, cause.toString());
            action = new actions.Hangup(this.get('name'), cause);
        } else {
            action = new actions.Hangup(this.get('name'));
        }

        this.server.sendAction(action, onResponse);
        /**
         *
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            //TODO add response error
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + self.name + ' is not available: "' + response.getMessage());
            }
        }
    }

    /**
     * @returns void
     * @param {int} seconds
     * @throws  ManagerCommunicationException, NoSuchChannelException
     */
    setAbsoluteTimeout(seconds) {
        /**
         * @type {AbsoluteTimeoutAction}
         */
        var action = new actions.AbsoluteTimeout(this.get('name'), seconds);
        this.server.sendAction(action, onResponse, this);
        /**
         *
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + this.get('name') + ' is not available: ' + response.getMessage());
            }
        }
    }

    /**
     * @param {String} context
     * @param {String} exten
     * @param {number}  priority
     * @returns void
     * @throws  ManagerCommunicationException, NoSuchChannelException
     */
    redirect(context, exten, priority) {
        /**
         * @type {RedirectAction}
         */
        var action = new actions.Redirect(this.get('name'), context, exten, priority);
        this.server.sendAction(action, onResponse, this);
        /**
         *
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + this.get('name') + ' is not available: ' + response.getMessage());
            }
        }
    }

    /**
     * @param {String} context
     * @param {String} exten
     * @param {number} priority
     * @returns void
     * @throws  ManagerCommunicationException,NoSuchChannelException
     */
    redirectBothLegs(context, exten, priority) {
        /**
         * @type {RedirectAction}
         */
        var action;
        if (this.get('linkedChannel') == null) {
            action = new actions.Redirect(this.get('name'), context, exten, priority);
        } else {
            action = new actions.Redirect(this.get('name'), this.linkedChannel.getName(), context, exten, priority, context, exten, priority);
        }

        this.server.sendAction(action, onResponse);
        /**
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + this.get('name') + ' is not available: ' + response.getMessage());
            }
        }
    }


    /**
     * @returns void
     * @param {String} digit
     * @throws  ManagerCommunicationException, NoSuchChannelException, IllegalArgumentException
     */
    playDtmf(digit) {
        var self = this;
        if (digit == null) {
            throw new Error('IllegalArgumentException("DTMF digit to send must not be null")');
        }
        /**
         * @type {PlayDtmfAction}
         */
        var action = new actions.PlayDtmf(this.get('name'), digit);
        this.server.sendAction(action, onResponse);
        /**
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + self.name + ' is not available: ' + response.getMessage());
            }
        }
    }


    /**
     * @param {String} filename
     * @param {String} format
     * @param {boolean} mix
     * @returns void
     * @throws  ManagerCommunicationException,NoSuchChannelException
     */
    startMonitoring(filename, format, mix) {
        var self = this;
        var action;
        action = new actions.Monitor(this.get('name'), filename, format, mix);
        this.server.sendAction(action, onResponse);
        /**
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + self.name + ' is not available: ' + response.getMessage());
            }
        }
    }

    /**
     * @returns void
     * @param {String} filename
     * @throws  ManagerCommunicationException, NoSuchChannelException, IllegalArgumentException
     */
    changeMonitoring(filename) {
        var self = this;
        if (filename == null) {
            throw new Error('IllegalArgumentException("New filename must not be null")');

        }
        /**
         * @type {ChangeMonitorAction}
         */
        var action = new actions.ChangeMonitor(this.get('name'), filename);
        this.server.sendAction(action, onResponse);
        /**
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + self.name + ' is not available: ' + response.getMessage());
            }
        }
    }

    /**
     * @returns void
     * @throws  ManagerCommunicationException, NoSuchChannelException
     */
    stopMonitoring() {
        var self = this;
        /**
         * @type {StopMonitorAction}
         */
        var action = new actions.StopMonitor(this.get('name'));
        this.server.sendAction(action, onResponse);
        /**
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + self.name + ' is not available: ' + response.getMessage());
            }
        }
    }

    /**
     * @returns void
     * @throws  ManagerCommunicationException, NoSuchChannelException
     */
    pauseMonitoring() {
        var self = this;
        /**
         * @type {PauseMonitorAction}
         */
        var action = new actions.PauseMonitor(this.get('name'));
        this.server.sendAction(action, onResponse);
        /**
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + self.name + ' is not available: ' + response.getMessage());
            }
        }
    }

    /**
     * @returns void
     * @throws  ManagerCommunicationException, NoSuchChannelException
     */
    unpauseMonitoring() {
        var self = this;
        /**
         * @type {UnpauseMonitorAction}
         */
        var action = new actions.UnpauseMonitor(this.get('name'));
        this.server.sendAction(action, onResponse);
        /**
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + self.name + ' is not available: ' + response.getMessage());
            }
        }
    }


    /**
     @returns Extension
     */
    getParkedAt() {
        // warning: the context of this extension will be null until we get the context property from
        // the parked call event!
        return this.parkedAt;
    }

    setParkedAt(parkedAt) {
        var oldParkedAt = this.parkedAt;
        this.set('parkedAt', parkedAt);

        this.emit(AsteriskChannel.Events.PROPERTY_PARKED_AT, {old: oldParkedAt, new: parkedAt});
    }


    /**
     * @param {String} variable
     * @param {String} value
     * @throws  ManagerCommunicationException, NoSuchChannelException
     */
    setVariable(variable, value) {
        var self = this;
        /**
         * @type {SetvarAction}
         */
        var action = new actions.Setvar(this.get('name'), variable, value);
        this.server.sendAction(action, onResponse);
        /**
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('NoSuchChannelException("Channel ' + self.name + ' is not available: ' + response.getMessage());
            }
            self.variables.set(variable, value);
        }
    }

    updateVariable(name, value) {
        if (name == '__AJ_TRACE_ID') {
            var x = 1;
        }

        var variables = this.get('variables');
        var variable;
        var oldValue = variables.get(name);
        if (!oldValue) {
            oldValue = new AsteriskChannelVariable({name: name});
            variable = new AsteriskChannelVariable({name: name, value: value}, {server: this.server});
            variables.add(variable);
        } else {
            variable = oldValue;
            oldValue = oldValue.toPlain();
            variable.set('value', value);
        }
        // TODO add notification for updated channel variables
        this.set('variables', variables);

        this.emit(AsteriskChannel.Events.PROPERTY_VARIABLE + ':' + name, {old: oldValue.value, new: value});
        this.emit(AsteriskChannel.Events.PROPERTY_VARIABLE, {name: name, old: oldValue, new: value});
    }

    /**
     * @returns String
     * @param {String} variable
     * @param {function(string)} callback
     * @param {*} [_this]
     * @throws  ManagerCommunicationException, NoSuchChannelException
     */
    getVariable(variable, callback, _this) {

        /**
         ** @type {string}
         */
        var value;
        if (!this.get('variables')) {
            var x = 1;
        }
        value = this.get('variables').get(variable);
        if (value != null) {
            callback.call(_this, value);
        }
        if (_.has(this.getVarsCallbacks, variable)) {
            this.getVarsCallbacks[variable].push({callback: callback, thisp: _this})
        } else {
            this.getVarsCallbacks[variable] = [{callback: callback, thisp: _this}];


            /**
             * @type {GetvarAction}
             */
            var action = new actions.Getvar(this.get('channel'), variable);
            this.server.sendAction(action, onGetVarResponse, this);

        }
        /**
         * @param {ManagerResponse} response
         * @this AsteriskChannel
         */
        function onGetVarResponse(err, response) {
            //TODO check calback and getVarsCallbacks

            var callbacks;
            if (this.getProp('isDestroyed')) {
                return
            }
            if (err) {
                response = err;
                if (this.get('state').status != ChannelStates.HANGUP) {
                    this.logger.error('NoSuchChannelException("Channel ' + this.get('name') + ' is not available: ' + response.getMessage());
                } else {

                    this.logger.debug('discarding varGet error because channel was hangup earlier with ', this.get('hangupCause').name);
                    callbacks = this.getVarsCallbacks[variable];
                    delete  this.getVarsCallbacks[variable];
                    callbacks.forEach(function (callback) {
                        callback.callback.call(callback.thisp, value);
                    });


                    if (typeof callback == "function") {
                        if (typeof _this != "undefined") {
                            callback.call(_this, null);
                        } else {
                            callback(null);
                        }
                    }


                    return;

                }
            }
            value = response.getAttribute("value");
            if (value == null || value == '') {
                value = response.getAttribute(variable); // for Asterisk 1.0.x
            }
            if (_.isUndefined(this)) {
                var x = 1;
            }
            if (_.isUndefined(this.attributes)) {
                var x = 1;
            }

            this.updateVariable(variable, value);

            callbacks = this.getVarsCallbacks[variable];
            delete  this.getVarsCallbacks[variable];
            callbacks.forEach(function (callback) {
                callback.callback.call(callback.thisp, value);
            })
        }
    }

    dtmfReceived(digit) {
        var oldDtmfReceived = this._dtmfReceived;

        this.set('dtmfReceived', digit);
        //this._firePropertyChange(PROPERTY_DTMF_RECEIVED, oldDtmfReceived, digit);

        /**
         * dtmfReceived event.
         * @event AsteriskChannel#PROPERTY_DTMF_RECEIVED
         * @type {PropertyChangeEvent}
         */
        this.emit(AsteriskChannel.Events.PROPERTY_DTMF_RECEIVED, {old: oldDtmfReceived, new: digit});
    }

    dtmfSent(digit) {
        var oldDtmfSent = this._dtmfSent;

        this.set('dtmfSent', digit);

        this.emit(AsteriskChannel.Events.PROPERTY_DTMF_SENT, {old: oldDtmfSent, new: digit});
    }

    setQueueEntry(queueEntry) {
        var oldQueueEntry = this.get('queueentry');

        this.set('queueentry', queueEntry);
        //this._firePropertyChange(PROPERTY_QUEUE_ENTRY, oldQueueEntry, queueEntry);
        /**
         * setQueueEntry event.
         * @event AsteriskChannel#PROPERTY_QUEUE_ENTRY
         * @type {PropertyChangeEvent}
         */
        this.emit(AsteriskChannel.Events.PROPERTY_QUEUE_ENTRY, {old: oldQueueEntry, new: queueEntry});
    }

    getTechnology() {
        return this.get('name').split('/')[0];
    }

    destroy() {

        this.get('peers').forEach(function (peer) {
            peer.removeChannel(this);
        }, this);
        this.get('peers').clear();

        this.get('bridges').forEach(function (bridge) {
            bridge.removeChannel(this);
        }, this);
        this.get('bridges').clear();


        let toClear = [
            'extensionHistory',
            'dialedChannelHistory',
            'linkedChannelHistory',
            'stateHistory'
        ];

        toClear.forEach(function (historyElelem) {
            let history = this.get(historyElelem);
            let elem;
            while (history.length) {
                elem = history.pop().destroy()
            }
        }, this);

        super.destroy();

        for (var name in this) {
            if (name != '_priv' && _.has(this, name)) {
                delete this[name];
            }
        }
        this.setProp('isDestroyed', true);
    }

    toJSON() {
        if (this.getProp('inSerialization')) {
            return
        }
        this.setProp('inSerialization', true);
        var tmp = {};
        _.each(this.attributes, function (val, key) {
            var arr = {};
            if (key.match('History')) {
                val.forEach(
                    /**
                     * @param {AsteriskHistoryEntry} entry
                     */
                    function (entry) {
                        arr[entry.date] = entry.toJSON();
                    })

                tmp[key] = arr;

            } else if (key == 'linkedChannel') {
                tmp[key] = val.id;
            } else if (val && typeof val.toJSON == 'function') {
                tmp[key] = val.toJSON();
            } else {
                tmp[key] = val;
            }
        })
        this.setProp('inSerialization', false);
        return tmp;
    }

}

AsteriskChannel.Events = {
    PROPERTY_ID: 'channel' + PROPERTY_ID,
    PROPERTY_NAME: 'channel' + PROPERTY_NAME,
    PROPERTY_CALLER_ID: 'channel' + PROPERTY_CALLER_ID,
    PROPERTY_STATE: 'channel' + PROPERTY_STATE,
    PROPERTY_ACCOUNT: 'channel' + PROPERTY_ACCOUNT,
    PROPERTY_CURRENT_EXTENSION: 'channel' + PROPERTY_CURRENT_EXTENSION,
    PROPERTY_CALL_DETAIL_RECORD: 'channel' + PROPERTY_CALL_DETAIL_RECORD,
    PROPERTY_DIALED_CHANNEL: 'channel' + PROPERTY_DIALED_CHANNEL,
    PROPERTY_DIALING_CHANNEL: 'channel' + PROPERTY_DIALING_CHANNEL,
    PROPERTY_LINKED_CHANNEL: 'channel' + PROPERTY_LINKED_CHANNEL,
    PROPERTY_MEET_ME_USER: 'channel' + PROPERTY_MEET_ME_USER,
    PROPERTY_QUEUE_ENTRY: 'channel' + PROPERTY_QUEUE_ENTRY,
    PROPERTY_PARKED_AT: 'channel' + PROPERTY_PARKED_AT,
    PROPERTY_DTMF_RECEIVED: 'channel' + PROPERTY_DTMF_RECEIVED,
    PROPERTY_DTMF_SENT: 'channel' + PROPERTY_DTMF_SENT,
    PROPERTY_VARIABLE: 'channel' + PROPERTY_VARIABLE,
    PROPERTY_BRIDGE: 'channel' + PROPERTY_BRIDGE
};


module.exports = AsteriskChannel;