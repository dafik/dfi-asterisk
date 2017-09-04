"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BridgesCollection_1 = require("../collections/BridgesCollection");
const PeersCollection_1 = require("../collections/PeersCollection");
const VariablesCollection_1 = require("../collections/VariablesCollection");
const channelStates_1 = require("../enums/channelStates");
const hangupCauses_1 = require("../enums/hangupCauses");
const IllegalArgument_1 = require("../errors/IllegalArgument");
const ManagerError_1 = require("../errors/ManagerError");
const NoSuchChannel_1 = require("../errors/NoSuchChannel");
const actionNames_1 = require("../internal/asterisk/actionNames");
const asteriskModel_1 = require("../internal/asteriskModel");
const astUtil_1 = require("../internal/astUtil");
const channelState_1 = require("../states/channelState");
const CallerIdModel_1 = require("./CallerIdModel");
const ExtensionModel_1 = require("./ExtensionModel");
const ChannelStateHistoryEntry_1 = require("./histories/ChannelStateHistoryEntry");
const DialedChannelHistoryEntry_1 = require("./histories/DialedChannelHistoryEntry");
const ExtensionHistoryEntry_1 = require("./histories/ExtensionHistoryEntry");
const LinkedChannelHistoryEntry_1 = require("./histories/LinkedChannelHistoryEntry");
const VariableModel_1 = require("./VariableModel");
const CAUSE_VARIABLE_NAME = "PRI_CAUSE";
const ID = "id";
const PROP_ACCOUNT = "account";
const PROP_EXTEN = "exten";
/*
const PROP_APP = "app";
const PROP_APP_DATA = "appData";
const PROP_CONTEXT = "context";

const PROP_PRIORITY = "priority";
*/
const PROP_NAME = "name";
const PROP_CREATE_DATE = "createDate";
const PROP_CALLER_ID = "callerId";
const PROP_STATE = "state";
const PROP_CONNECTED_CALLER_ID = "connectedCallerId";
const P_PROP_BRIDGES = "bridges";
const P_PROP_CDR = "callDetailRecord";
const P_PROP_WAS_LINKED = "wasLinked";
const P_PROP_DIALED_CHANNEL = "dialedChannel";
const P_PROP_DIALING_CHANNEL = "dialingChannel";
const P_PROP_PARKED_AT = "parkedAt";
const P_PROP_LINKED_CHANNEL = "linkedChannel";
const P_PROP_HANGUP_CAUSE = "hangupCause";
const P_PROP_HANGUP_DATE = "hangupDate";
const P_PROP_TRACE_ID = "traceId";
const P_PROP_VARS_CALLBACKS = "varsCallbacks";
const P_PROP_MOH_CLASS = "mohClass";
const P_PROP_MOH_DATE = "mohDate";
const P_PROP_PEERS = "peers";
const P_PROP_DTMF_RECEIVED = "dtmfReceived";
const P_PROP_DTMF_SENT = "dtmfSent";
const P_PROP_DIALED_CHANNEL_HISTORY = "dialedChannelHistory";
const P_PROP_EXTENSION_HISTORY = "extensionHistory";
const P_PROP_LINKED_CHANNEL_HISTORY = "linkedChannelHistory";
const P_PROP_STATE_HISTORY = "stateHistory";
const P_PROP_QUEUE_ENTRY = "queueEntry";
const P_PROP_VARIABLES = "variables";
const P_PROP_HANGUP_REQUEST_DATE = "hangupRequestDate";
const P_PROP_HANGUP_REQUEST_METHOD = "hangupRequestMethod";
const P_PROP_ORIGINAL_ATTR = "origialAttributes";
const P_PROP_SERVER = "server";
/**
 * Creates a new Channel.
 * @class
 * @extends AsteriskModel
 */
class Channel extends asteriskModel_1.default {
    constructor(attributes, server, options) {
        const originalAttributes = Object.assign({}, attributes);
        options = options || {};
        options.idAttribute = ID;
        attributes.callerId = new CallerIdModel_1.default(attributes.CallerIDName, attributes.CallerIDNum);
        attributes.state = channelState_1.default.byValue(parseInt(attributes.ChannelState, 10));
        attributes.connectedCallerId = new CallerIdModel_1.default(attributes.ConnectedLineName, attributes.ConnectedLineNum);
        super(attributes, options);
        this.setProp(P_PROP_SERVER, server);
        this.setProp(P_PROP_ORIGINAL_ATTR, originalAttributes);
        this.setProp(P_PROP_TRACE_ID, null);
        this.setProp(P_PROP_VARS_CALLBACKS, new Map());
        this.setProp(P_PROP_BRIDGES, new BridgesCollection_1.default());
        this.setProp(P_PROP_PEERS, new PeersCollection_1.default());
        this.setProp(P_PROP_VARIABLES, new VariablesCollection_1.default());
        this.setProp(P_PROP_EXTENSION_HISTORY, []);
        this.extensionVisited(attributes.$time, new ExtensionModel_1.default({
            AppData: attributes.ApplicationData,
            Application: attributes.Application,
            Context: attributes.Context,
            Event: attributes.Event,
            Exten: attributes.Exten,
            Priority: attributes.Priority
        }));
        this.setProp(P_PROP_STATE_HISTORY, []);
        this.setProp(P_PROP_LINKED_CHANNEL_HISTORY, []);
        this.setProp(P_PROP_DIALED_CHANNEL_HISTORY, []);
        this._server.managers.toPlain();
        if (attributes.Linkedid && attributes.UniqueID !== attributes.Linkedid && this._server.managers.channel.hasChannel(attributes.Linkedid)) {
            this.channelLinked(attributes.$time, this._server.managers.channel.getChannelById(attributes.Linkedid));
        }
        if (attributes.BridgeId && this._server.managers.bridge.hasBridge(attributes.BridgeId)) {
            this._bridges.add(this._server.managers.bridge.getBridgeByBridgeId(attributes.BridgeId));
        }
        else if (attributes.BridgeID && this._server.managers.bridge.hasBridge(attributes.BridgeID)) {
            this._bridges.add(this._server.managers.bridge.getBridgeByBridgeId(attributes.BridgeID));
        }
        if (this.name) {
            if (this.destroyed || !this._server.managers.peer.enabled) {
                return;
            }
            const peerName = this.name.split("-")[0];
            const peer = this._server.managers.peer.peers.get(peerName);
            if (peer) {
                peer.addChannel(this);
                this._peers.add(peer);
            }
            else {
                if (!peerName.match(/DAHDI|Local|Message/)) {
                    this.logger.error("peer %s notFound", peerName);
                }
            }
        }
        if (this._bridges.size) {
            if (!this._server.managers.bridge.enabled) {
                return;
            }
            this._bridges.forEach((bridge) => {
                bridge.addChannel(this);
            });
        }
    }
    static onServerResponse(err, response) {
        if (err) {
            throw err;
        }
        if (response instanceof ManagerError_1.default) {
            throw new NoSuchChannel_1.default("Channel " + self.name + ' is not available: "' + response.response);
        }
    }
    get _server() {
        return this.getProp(P_PROP_SERVER);
    }
    get name() {
        return this.get(PROP_NAME);
    }
    /*    get accountCode() {
            return this.get(PROP_ACCOUNT);
        }

        get context() {
            return this.get(PROP_CONTEXT);
        }

        get exten() {
            return this.get(PROP_EXTEN);
        }

        get priority() {
            return this.get(PROP_PRIORITY);
        }

        get app() {
            return this.get(PROP_APP);
        }

        get appData() {
            return this.get(PROP_APP_DATA);
        }*/
    // computed
    get callerId() {
        return this.get(PROP_CALLER_ID);
    }
    get state() {
        return this.get(PROP_STATE);
    }
    get connectedCallerId() {
        return this.get(PROP_CONNECTED_CALLER_ID);
    }
    // others
    get mohDate() {
        return this.getProp(P_PROP_MOH_DATE);
    }
    set mohDate(date) {
        this.setProp(P_PROP_MOH_DATE, date);
    }
    get mohClass() {
        return this.getProp(P_PROP_MOH_CLASS);
    }
    set mohClass(cls) {
        this.setProp(P_PROP_MOH_CLASS, cls);
    }
    get createDate() {
        return this.get(PROP_CREATE_DATE);
    }
    get traceId() {
        return this.getProp(P_PROP_TRACE_ID);
    }
    get hangupRequestDate() {
        return this.getProp(P_PROP_HANGUP_REQUEST_DATE);
    }
    get hangupRequestMethod() {
        return this.getProp(P_PROP_HANGUP_REQUEST_METHOD);
    }
    set hangupRequestDate(val) {
        this.setProp(P_PROP_HANGUP_REQUEST_DATE, val);
    }
    set hangupRequestMethod(val) {
        this.setProp(P_PROP_HANGUP_REQUEST_METHOD, val);
    }
    getStateHistory() {
        return [...this.getProp(P_PROP_STATE_HISTORY)];
    }
    get _varsCallbacks() {
        return this.getProp(P_PROP_VARS_CALLBACKS);
    }
    get _bridges() {
        return this.getProp(P_PROP_BRIDGES);
    }
    get _peers() {
        return this.getProp(P_PROP_PEERS);
    }
    get _variables() {
        return this.getProp(P_PROP_VARIABLES);
    }
    get _extensionHistory() {
        return this.getProp(P_PROP_EXTENSION_HISTORY);
    }
    get _stateHistory() {
        return this.getProp(P_PROP_STATE_HISTORY);
    }
    get _linkedChannelHistory() {
        return this.getProp(P_PROP_LINKED_CHANNEL_HISTORY);
    }
    get _dialedChannelHistory() {
        return this.getProp(P_PROP_DIALED_CHANNEL_HISTORY);
    }
    get hangupCause() {
        return this.getProp(P_PROP_HANGUP_CAUSE);
    }
    get hangupDate() {
        return this.getProp(P_PROP_HANGUP_DATE);
    }
    get callDetailRecord() {
        return this.getProp(P_PROP_CDR);
    }
    get linkedChannel() {
        return this.getProp(P_PROP_LINKED_CHANNEL);
    }
    set linkedChannel(channel) {
        this.setProp(P_PROP_LINKED_CHANNEL, channel);
    }
    get wasLinked() {
        return this.getProp(P_PROP_WAS_LINKED);
    }
    get dialedChannel() {
        return this.getProp(P_PROP_DIALED_CHANNEL);
    }
    channelDialed(date, dialedChannel) {
        this._dialedChannelHistory.push(new DialedChannelHistoryEntry_1.default(date, dialedChannel));
        this.setProp(P_PROP_DIALED_CHANNEL, dialedChannel);
    }
    get channelDialing() {
        return this.getProp(P_PROP_DIALING_CHANNEL);
    }
    set channelDialing(dialingChannel) {
        this.setProp(P_PROP_DIALING_CHANNEL, dialingChannel);
    }
    get parkedAt() {
        // warning: the context of this extension will be null until we get the context property from
        // the parked call event!
        return this.getProp(P_PROP_PARKED_AT);
    }
    set parkedAt(parkedAt) {
        this.setProp(P_PROP_PARKED_AT, parkedAt);
    }
    get dtmfReceived() {
        return this.getProp(P_PROP_DTMF_RECEIVED);
    }
    set dtmfReceived(digit) {
        this.setProp(P_PROP_DTMF_RECEIVED, digit);
    }
    get dtmfSent() {
        return this.get(P_PROP_DTMF_SENT);
    }
    set dtmfSent(digit) {
        this.set(P_PROP_DTMF_SENT, digit);
    }
    get queueEntry() {
        return this.getProp(P_PROP_QUEUE_ENTRY);
    }
    set queueEntry(queueEntry) {
        this.setProp(P_PROP_QUEUE_ENTRY, queueEntry);
    }
    get technology() {
        return this.name.split("/")[0];
    }
    getBridgesArray() {
        return this._bridges.toArray();
    }
    addBridge(bridge) {
        // TODO check is same new and old
        // are channel can be in multiple bridges?
        this.logger.info('adding bridge: "' + bridge.id + '" to: "' + this.name + '"');
        this._bridges.add(bridge);
    }
    removeBridge(bridge) {
        this.logger.info('removing bridge: "' + bridge.id + '" from: "' + this.name + '"');
        if (!this._bridges.has(bridge.id)) {
            this.logger.error('NoSuchBridgeException("Bridge ' + bridge.name + " is not available");
            return;
        }
        this._bridges.remove(bridge.id);
    }
    wasInState(state) {
        for (const historyEntry of this._stateHistory) {
            if (historyEntry.state.status === state) {
                return true;
            }
        }
        return false;
    }
    wasBusy() {
        return this.wasInState(channelStates_1.default.BUSY) ||
            (this.hangupDate &&
                (this.hangupCause.status === hangupCauses_1.default.AST_CAUSE_BUSY || this.hangupCause.status === hangupCauses_1.default.AST_CAUSE_USER_BUSY));
    }
    stateChanged(date, state) {
        const oldState = this.state;
        if (oldState && oldState.status === state.status) {
            return;
        }
        this._stateHistory.push(new ChannelStateHistoryEntry_1.default(date, state));
        this.set(PROP_STATE, state);
    }
    callerIdChanged(name, nbr) {
        if (this.callerId.name === name && this.callerId.number === nbr) {
            return;
        }
        this.logger.info("callerId change: %s name: %j -> %j number: %j -> %j ", this.id, this.callerId.name, name, this.callerId.number, nbr);
        this.set(PROP_CALLER_ID, new CallerIdModel_1.default(name, nbr));
    }
    nameChanged(name) {
        if (this.name != null && this.name === name) {
            return;
        }
        this.set(PROP_NAME, name);
    }
    getCurrentExtension() {
        return this._extensionHistory[history.length - 1].extension;
    }
    getFirstExtension() {
        return this._extensionHistory[0].extension;
    }
    getExtensionHistory() {
        return [...this._extensionHistory];
    }
    /**
     * Adds a visited dialplan entry to the history.
     */
    extensionVisited(date, extension) {
        this._extensionHistory.push(new ExtensionHistoryEntry_1.default(date, extension));
        this.set(PROP_EXTEN, extension);
    }
    handleHangup(date, hangupCause) {
        this.set(P_PROP_HANGUP_DATE, date);
        this.set(P_PROP_HANGUP_CAUSE, hangupCause);
        this.stateChanged(date, channelState_1.default.byValue(channelStates_1.default.HANGUP));
    }
    callDetailRecordReceived(callDetailRecord) {
        this.setProp(P_PROP_CDR, callDetailRecord);
    }
    getDialedChannelHistory() {
        return [...this._dialedChannelHistory];
    }
    /**
     * Sets the channel this channel is bridged with.
     */
    channelLinked(date, linkedChannel) {
        this._linkedChannelHistory.push(new LinkedChannelHistoryEntry_1.default(date, linkedChannel));
        this.setProp(P_PROP_LINKED_CHANNEL, linkedChannel);
        this.setProp(P_PROP_WAS_LINKED, true);
    }
    channelUnlinked(date) {
        const historyEntry = this._linkedChannelHistory.length === 0 ? null : this._linkedChannelHistory[this._linkedChannelHistory.length - 1];
        if (historyEntry != null) {
            historyEntry.setDateUnlinked(date);
        }
        this.setProp(P_PROP_LINKED_CHANNEL, null);
    }
    // action methods
    hangup(cause) {
        const action = {
            Action: actionNames_1.default.HANGUP,
            Channel: this.name
        };
        if (cause != null) {
            this.setVariable(CAUSE_VARIABLE_NAME, cause.status);
            action.Cause = cause.status;
        }
        this._server.sendAction(action, Channel.onServerResponse, this);
    }
    setAbsoluteTimeout(seconds) {
        const action = {
            Action: actionNames_1.default.ABSOLUTE_TIMEOUT,
            Channel: this.name,
            Timeout: seconds.toString()
        };
        this._server.sendAction(action, Channel.onServerResponse, this);
    }
    redirect(context, exten, priority) {
        const action = {
            Action: actionNames_1.default.REDIRECT,
            Channel: this.name,
            Context: context,
            Exten: exten,
            Priority: priority.toString()
        };
        this._server.sendAction(action, Channel.onServerResponse, this);
    }
    redirectBothLegs(context, exten, priority) {
        const action = {
            Action: actionNames_1.default.REDIRECT,
            Channel: this.name,
            Context: context,
            Exten: exten,
            Priority: priority.toString()
        };
        if (this.linkedChannel) {
            action.ExtraChannel = this.linkedChannel.name;
            action.ExtraContext = context;
            action.ExtraExten = exten;
            action.ExtraPriority = priority.toString();
        }
        this._server.sendAction(action, Channel.onServerResponse, this);
    }
    playDtmf(digit) {
        if (digit == null) {
            throw new IllegalArgument_1.default("DTMF digit to send must not be null");
        }
        const action = {
            Action: actionNames_1.default.PLAY_DTMF,
            Channel: this.name,
            Digit: digit
        };
        this._server.sendAction(action, Channel.onServerResponse, this);
    }
    startMonitoring(filename, format, mix) {
        const action = {
            Action: actionNames_1.default.MONITOR,
            Channel: this.name,
            File: filename,
            Format: format,
            Mix: mix.toString()
        };
        this._server.sendAction(action, Channel.onServerResponse, this);
    }
    changeMonitoring(filename) {
        if (filename == null) {
            throw new IllegalArgument_1.default("New filename must not be null");
        }
        const action = {
            Action: actionNames_1.default.CHANGE_MONITOR,
            Channel: this.name,
            File: filename
        };
        this._server.sendAction(action, Channel.onServerResponse, this);
    }
    stopMonitoring() {
        const action = {
            Action: actionNames_1.default.STOP_MONITOR,
            Channel: this.name
        };
        this._server.sendAction(action, Channel.onServerResponse, this);
    }
    pauseMonitoring() {
        const action = {
            Action: actionNames_1.default.PAUSE_MONITOR,
            Channel: this.name
        };
        this._server.sendAction(action, Channel.onServerResponse, this);
    }
    unpauseMonitoring() {
        const action = {
            Action: actionNames_1.default.UNPAUSE_MONITOR,
            Channel: this.name
        };
        this._server.sendAction(action, Channel.onServerResponse, this);
    }
    setVariable(name, value) {
        const action = {
            Action: actionNames_1.default.SET_VAR,
            Channel: this.name,
            Value: value,
            Variable: name
        };
        this._server.sendAction(action, (err, response) => {
            if (response instanceof ManagerError_1.default) {
                throw new NoSuchChannel_1.default("Channel " + self.name + " is not available: " + response.response, this);
            }
            this._variables.add(new VariableModel_1.default({ Event: "channel:setVariable", name, value }));
        }, this);
    }
    updateVariable(name, value, srcEvent) {
        const variables = this._variables;
        if (variables.has(name)) {
            variables.get(name).value = value;
        }
        else {
            variables.add(new VariableModel_1.default({ Event: (srcEvent ? srcEvent : "channel:updateVariable"), name, value }));
        }
    }
    getVariable(name, callbackFn, context) {
        const variable = this._variables.get(name);
        if (variable !== undefined) {
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, variable.value);
            return;
        }
        if (this._varsCallbacks.has(name)) {
            this._varsCallbacks.get(name).push({ context, fn: callbackFn });
        }
        else {
            this._varsCallbacks.set(name, [{ context, fn: callbackFn }]);
            const action = {
                Action: actionNames_1.default.GET_VAR,
                Channel: this.name,
                Variable: name
            };
            this._server.sendAction(action, (err, response) => {
                // TODO check callback and getVarsCallbacks
                if (this.destroyed) {
                    return;
                }
                if (err) {
                    if (this.state.status !== channelStates_1.default.HANGUP) {
                        const error = new NoSuchChannel_1.default("Channel " + this.name + " is not available");
                        const callbacks = this._varsCallbacks.get(name);
                        this._varsCallbacks.delete(name);
                        callbacks.forEach((varCallback) => {
                            astUtil_1.default.maybeCallback(varCallback.fn, varCallback.context, error);
                        });
                        return;
                    }
                    response = {
                        $time: Date.now(),
                        Response: err.message,
                        Value: null,
                        Variable: err.action.Variable
                    };
                    this.logger.debug("discarding varGet error because channel was hangup earlier with ", this.hangupCause);
                }
                else {
                    this.updateVariable(name, response.Value, "ActionGetvar");
                }
                const callbacks = this._varsCallbacks.get(name);
                this._varsCallbacks.delete(name);
                callbacks.forEach((varCallback) => {
                    astUtil_1.default.maybeCallback(varCallback.fn, varCallback.context, null, response.Value);
                });
            }, this);
        }
    }
    destroy() {
        this._peers.forEach((peer) => {
            peer.removeChannel(this);
        });
        this._peers.clear();
        this._bridges.forEach((bridge) => {
            bridge.removeChannel(this);
        });
        this._bridges.clear();
        const toClear = [
            this._extensionHistory,
            this._dialedChannelHistory,
            this._linkedChannelHistory,
            this._stateHistory
        ];
        toClear.forEach((history) => {
            let elem;
            while (history.length) {
                elem = history.pop();
            }
        }, this);
        super.destroy();
    }
}
Channel.map = new Map([
    ["Uniqueid", ID],
    ["UniqueID", ID],
    ["Channel", PROP_NAME],
    ["AccountCode", PROP_ACCOUNT],
    /*["Context", PROP_CONTEXT],
    ["Exten", PROP_EXTEN],
    ["Priority", PROP_PRIORITY],
    ["Application", PROP_APP],
    ["ApplicationData", PROP_APP_DATA],*/
    ["createDate", PROP_CREATE_DATE],
    ["callerId", PROP_CALLER_ID],
    ["state", PROP_STATE],
    ["connectedCallerId", PROP_CONNECTED_CALLER_ID]
]);
exports.default = Channel;
//# sourceMappingURL=ChannelModel.js.map