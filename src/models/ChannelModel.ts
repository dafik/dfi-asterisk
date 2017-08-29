import Bridges from "../collections/BridgesCollection";
import Peers from "../collections/PeersCollection";
import Variables from "../collections/VariablesCollection";
import {IDfiAMIResponseError, IDfiAMIResponseGetvar, IDfiCallbackResult, IDfiVariableCallback} from "../definitions/interfaces";
import {IDfiAstModelAttribsChannel, IDfiAstModelAttribsExtension, IDfiAstModelOptions} from "../definitions/models";
import ChannelStates from "../enums/channelStates";
import HangupCauses from "../enums/hangupCauses";
import IllegalArgumentError from "../errors/IllegalArgument";
import ManagerError from "../errors/ManagerError";
import NoSuchChannelError from "../errors/NoSuchChannel";
import AST_ACTION from "../internal/asterisk/actionNames";
import {
    IAstActionAbsoluteTimeout,
    IAstActionChangeMonitor,
    IAstActionGetvar,
    IAstActionHangup,
    IAstActionMonitor,
    IAstActionPauseMonitor,
    IAstActionPlayDTMF,
    IAstActionRedirect,
    IAstActionSetvar,
    IAstActionStopMonitor,
    IAstActionUnpauseMonitor
} from "../internal/asterisk/actions";
import AsteriskModel from "../internal/asteriskModel";
import AstUtil from "../internal/astUtil";
import ChannelState from "../states/channelState";
import HangupCause from "../states/hangupCause";
import Bridge from "./BridgeModel";
import CallDetailRecord from "./CallDetailRecordModel";
import CallerId from "./CallerIdModel";
import Extension from "./ExtensionModel";
import ChannelStateHistoryEntry from "./histories/ChannelStateHistoryEntry";
import DialedChannelHistoryEntry from "./histories/DialedChannelHistoryEntry";
import ExtensionHistoryEntry from "./histories/ExtensionHistoryEntry";
import LinkedChannelHistoryEntry from "./histories/LinkedChannelHistoryEntry";
import Variable from "./VariableModel";

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

/**
 * Creates a new Channel.
 * @class
 * @extends AsteriskModel
 */
class Channel extends AsteriskModel {

    public static onServerResponse(err, response) {
        if (err) {
            throw err;
        }
        if (response instanceof ManagerError) {
            throw new NoSuchChannelError("Channel " + self.name + ' is not available: "' + response.response);
        }
    }

    protected static map = new Map([
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

    constructor(attributes: IDfiAstModelAttribsChannel, options?: IDfiAstModelOptions) {
        const originalAttributes = {...attributes};
        options = options || {};
        options.idAttribute = ID;
        attributes.callerId = new CallerId(attributes.CallerIDName, attributes.CallerIDNum);
        attributes.state = ChannelState.byValue(parseInt(attributes.ChannelState, 10));
        attributes.connectedCallerId = new CallerId(attributes.ConnectedLineName, attributes.ConnectedLineNum);

        super(attributes, options);

        this.setProp(P_PROP_ORIGINAL_ATTR, originalAttributes);
        this.setProp(P_PROP_TRACE_ID, null);
        this.setProp(P_PROP_VARS_CALLBACKS, new Map());

        this.setProp(P_PROP_BRIDGES, new Bridges());
        this.setProp(P_PROP_PEERS, new Peers());
        this.setProp(P_PROP_VARIABLES, new Variables());

        this.setProp(P_PROP_EXTENSION_HISTORY, []);

        this.extensionVisited(
            attributes.$time,
            new Extension({
                AppData: attributes.ApplicationData,
                Application: attributes.Application,
                Context: attributes.Context,
                Event: attributes.Event,
                Exten: attributes.Exten,
                Priority: attributes.Priority
            })
        );

        this.setProp(P_PROP_STATE_HISTORY, []);
        this.setProp(P_PROP_LINKED_CHANNEL_HISTORY, []);
        this.setProp(P_PROP_DIALED_CHANNEL_HISTORY, []);

        if (attributes.Linkedid && attributes.UniqueID !== attributes.Linkedid && AsteriskModel._server.managers.channel.hasChannel(attributes.Linkedid)) {
            this.channelLinked(attributes.$time, AsteriskModel._server.managers.channel.getChannelById(attributes.Linkedid));
        }

        if (attributes.BridgeId && AsteriskModel._server.managers.bridge.hasBridge(attributes.BridgeId)) {
            this._bridges.add(AsteriskModel._server.managers.bridge.getBridgeByBridgeId(attributes.BridgeId));
        } else if (attributes.BridgeID && AsteriskModel._server.managers.bridge.hasBridge(attributes.BridgeID)) {
            this._bridges.add(AsteriskModel._server.managers.bridge.getBridgeByBridgeId(attributes.BridgeID));
        }

        if (this.name) {
            if (this.destroyed || !AsteriskModel._server.managers.peer.enabled) {
                return;
            }

            const peerName = this.name.split("-")[0];
            const peer = AsteriskModel._server.managers.peer.peers.get(peerName);
            if (peer) {
                peer.addChannel(this);
                this._peers.add(peer);
            } else {
                if (!peerName.match(/DAHDI|Local|Message/)) {
                    this.logger.error("peer %s notFound", peerName);
                }
            }
        }

        if (this._bridges.size) {
            if (!AsteriskModel._server.managers.bridge.enabled) {
                return;
            }
            this._bridges.forEach((bridge) => {
                bridge.addChannel(this);
            });
        }
    }

    get name(): string {
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

    get callerId(): CallerId {
        return this.get(PROP_CALLER_ID);
    }

    get state(): ChannelState {
        return this.get(PROP_STATE);
    }

    get connectedCallerId(): CallerId {
        return this.get(PROP_CONNECTED_CALLER_ID);
    }

    // others

    get mohDate(): number {
        return this.getProp(P_PROP_MOH_DATE);
    }

    set mohDate(date: number) {
        this.setProp(P_PROP_MOH_DATE, date);
    }

    get mohClass(): string {
        return this.getProp(P_PROP_MOH_CLASS);
    }

    set mohClass(cls: string) {
        this.setProp(P_PROP_MOH_CLASS, cls);
    }

    get createDate(): number {
        return this.get(PROP_CREATE_DATE);
    }

    get traceId(): string {
        return this.getProp(P_PROP_TRACE_ID);
    }

    get hangupRequestDate(): number {
        return this.getProp(P_PROP_HANGUP_REQUEST_DATE);
    }

    get hangupRequestMethod(): string {
        return this.getProp(P_PROP_HANGUP_REQUEST_METHOD);
    }

    set hangupRequestDate(val: number) {
        this.setProp(P_PROP_HANGUP_REQUEST_DATE, val);
    }

    set hangupRequestMethod(val: string) {
        this.setProp(P_PROP_HANGUP_REQUEST_METHOD, val);
    }

    public getStateHistory(): ChannelStateHistoryEntry[] {
        return [...this.getProp(P_PROP_STATE_HISTORY)];
    }

    private get _varsCallbacks(): Map<string, Array<IDfiVariableCallback<NoSuchChannelError, string>>> {
        return this.getProp(P_PROP_VARS_CALLBACKS);
    }

    private get _bridges(): Bridges {
        return this.getProp(P_PROP_BRIDGES);
    }

    private get _peers(): Peers {
        return this.getProp(P_PROP_PEERS);
    }

    private get _variables(): Variables {
        return this.getProp(P_PROP_VARIABLES);
    }

    private get _extensionHistory(): ExtensionHistoryEntry[] {
        return this.getProp(P_PROP_EXTENSION_HISTORY);
    }

    private get _stateHistory(): ChannelStateHistoryEntry[] {
        return this.getProp(P_PROP_STATE_HISTORY);
    }

    private get _linkedChannelHistory(): LinkedChannelHistoryEntry[] {
        return this.getProp(P_PROP_LINKED_CHANNEL_HISTORY);
    }

    private get _dialedChannelHistory(): DialedChannelHistoryEntry[] {
        return this.getProp(P_PROP_DIALED_CHANNEL_HISTORY);
    }

    get hangupCause(): HangupCause {
        return this.getProp(P_PROP_HANGUP_CAUSE);
    }

    get hangupDate(): number {
        return this.getProp(P_PROP_HANGUP_DATE);
    }

    get callDetailRecord(): string {
        return this.getProp(P_PROP_CDR);
    }

    get linkedChannel(): Channel {
        return this.getProp(P_PROP_LINKED_CHANNEL);
    }

    set linkedChannel(channel: Channel) {
        this.setProp(P_PROP_LINKED_CHANNEL, channel);
    }

    get wasLinked(): boolean {
        return this.getProp(P_PROP_WAS_LINKED);
    }

    get dialedChannel(): Channel {
        return this.getProp(P_PROP_DIALED_CHANNEL);
    }

    public channelDialed(date: number, dialedChannel: Channel) {
        this._dialedChannelHistory.push(new DialedChannelHistoryEntry(date, dialedChannel));
        this.setProp(P_PROP_DIALED_CHANNEL, dialedChannel);
    }

    get channelDialing(): Channel {
        return this.getProp(P_PROP_DIALING_CHANNEL);
    }

    set channelDialing(dialingChannel: Channel) {
        this.setProp(P_PROP_DIALING_CHANNEL, dialingChannel);
    }

    get parkedAt(): Extension {
        // warning: the context of this extension will be null until we get the context property from
        // the parked call event!
        return this.getProp(P_PROP_PARKED_AT);
    }

    set parkedAt(parkedAt: Extension) {
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

    public getBridgesArray(): Bridge[] {
        return this._bridges.toArray();
    }

    public addBridge(bridge: Bridge) {
        // TODO check is same new and old
        // are channel can be in multiple bridges?

        this.logger.info('adding bridge: "' + bridge.id + '" to: "' + this.name + '"');
        this._bridges.add(bridge);

    }

    public removeBridge(bridge) {
        this.logger.info('removing bridge: "' + bridge.id + '" from: "' + this.name + '"');
        if (!this._bridges.has(bridge.id)) {
            this.logger.error('NoSuchBridgeException("Bridge ' + bridge.name + " is not available");
            return;
        }
        this._bridges.remove(bridge.id);
    }

    public wasInState(state: ChannelStates): boolean {
        for (const historyEntry of this._stateHistory) {
            if (historyEntry.state.status === state) {
                return true;
            }
        }
        return false;
    }

    public wasBusy(): boolean {

        return this.wasInState(ChannelStates.BUSY) ||
            ( this.hangupDate &&
                (this.hangupCause.status === HangupCauses.AST_CAUSE_BUSY || this.hangupCause.status === HangupCauses.AST_CAUSE_USER_BUSY)
            );
    }

    public stateChanged(date: number, state: ChannelState) {

        const oldState = this.state;
        if (oldState && oldState.status === state.status) {
            return;
        }

        this._stateHistory.push(new ChannelStateHistoryEntry(date, state));
        this.set(PROP_STATE, state);

    }

    public callerIdChanged(name, nbr) {
        if (this.callerId.name === name && this.callerId.number === nbr) {
            return;
        }
        this.logger.info("callerId change: %s name: %j -> %j number: %j -> %j ", this.id, this.callerId.name, name, this.callerId.number, nbr);
        this.set(PROP_CALLER_ID, new CallerId(name, nbr));
    }

    public nameChanged(name: string) {
        if (this.name != null && this.name === name) {
            return;
        }
        this.set(PROP_NAME, name);
    }

    public getCurrentExtension(): Extension {
        return this._extensionHistory[history.length - 1].extension;
    }

    public getFirstExtension(): Extension {
        return this._extensionHistory[0].extension;
    }

    public getExtensionHistory(): ExtensionHistoryEntry[] {

        return [...this._extensionHistory];
    }

    /**
     * Adds a visited dialplan entry to the history.
     */
    public extensionVisited(date: number, extension: Extension) {
        this._extensionHistory.push(new ExtensionHistoryEntry(date, extension));

        this.set(PROP_EXTEN, extension);
    }

    public handleHangup(date: number, hangupCause: HangupCause) {
        this.set(P_PROP_HANGUP_DATE, date);
        this.set(P_PROP_HANGUP_CAUSE, hangupCause);

        this.stateChanged(date, ChannelState.byValue(ChannelStates.HANGUP));
    }

    public callDetailRecordReceived(callDetailRecord: CallDetailRecord) {
        this.setProp(P_PROP_CDR, callDetailRecord);
    }

    public getDialedChannelHistory(): DialedChannelHistoryEntry[] {
        return [...this._dialedChannelHistory];

    }

    /**
     * Sets the channel this channel is bridged with.
     */
    public channelLinked(date: number, linkedChannel: Channel) {
        this._linkedChannelHistory.push(new LinkedChannelHistoryEntry(date, linkedChannel));

        this.setProp(P_PROP_LINKED_CHANNEL, linkedChannel);
        this.setProp(P_PROP_WAS_LINKED, true);
    }

    public channelUnlinked(date: number) {

        const historyEntry = this._linkedChannelHistory.length === 0 ? null : this._linkedChannelHistory[this._linkedChannelHistory.length - 1];
        if (historyEntry != null) {
            historyEntry.setDateUnlinked(date);
        }

        this.setProp(P_PROP_LINKED_CHANNEL, null);
    }

// action methods

    public hangup(cause: HangupCause) {
        const action: IAstActionHangup = {
            Action: AST_ACTION.HANGUP,
            Channel: this.name
        };
        if (cause != null) {
            this.setVariable(CAUSE_VARIABLE_NAME, cause.status);
            action.Cause = cause.status;
        }

        AsteriskModel._server.sendAction(action, Channel.onServerResponse, this);
    }

    public setAbsoluteTimeout(seconds: number) {
        const action: IAstActionAbsoluteTimeout = {
            Action: AST_ACTION.ABSOLUTE_TIMEOUT,
            Channel: this.name,
            Timeout: seconds.toString()
        };

        AsteriskModel._server.sendAction(action, Channel.onServerResponse, this);
    }

    public redirect(context: string, exten: string, priority: number) {
        const action: IAstActionRedirect = {
            Action: AST_ACTION.REDIRECT,
            Channel: this.name,
            Context: context,
            Exten: exten,
            Priority: priority.toString()
        };

        AsteriskModel._server.sendAction(action, Channel.onServerResponse, this);
    }

    public redirectBothLegs(context, exten, priority) {

        const action: IAstActionRedirect = {
            Action: AST_ACTION.REDIRECT,
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

        AsteriskModel._server.sendAction(action, Channel.onServerResponse, this);
    }

    public playDtmf(digit: string) {
        if (digit == null) {
            throw new IllegalArgumentError("DTMF digit to send must not be null");
        }

        const action: IAstActionPlayDTMF = {
            Action: AST_ACTION.PLAY_DTMF,
            Channel: this.name,
            Digit: digit
        };
        AsteriskModel._server.sendAction(action, Channel.onServerResponse, this);
    }

    public startMonitoring(filename: string, format: string, mix: boolean) {
        const action: IAstActionMonitor = {
            Action: AST_ACTION.MONITOR,
            Channel: this.name,
            File: filename,
            Format: format,
            Mix: mix.toString()

        };
        AsteriskModel._server.sendAction(action, Channel.onServerResponse, this);
    }

    public changeMonitoring(filename: string) {
        if (filename == null) {
            throw new IllegalArgumentError("New filename must not be null");
        }
        const action: IAstActionChangeMonitor = {
            Action: AST_ACTION.CHANGE_MONITOR,
            Channel: this.name,
            File: filename
        };
        AsteriskModel._server.sendAction(action, Channel.onServerResponse, this);
    }

    public stopMonitoring() {
        const action: IAstActionStopMonitor = {
            Action: AST_ACTION.STOP_MONITOR,
            Channel: this.name
        };
        AsteriskModel._server.sendAction(action, Channel.onServerResponse, this);
    }

    public pauseMonitoring() {
        const action: IAstActionPauseMonitor = {
            Action: AST_ACTION.PAUSE_MONITOR,
            Channel: this.name
        };
        AsteriskModel._server.sendAction(action, Channel.onServerResponse, this);
    }

    public unpauseMonitoring() {
        const action: IAstActionUnpauseMonitor = {
            Action: AST_ACTION.UNPAUSE_MONITOR,
            Channel: this.name
        };
        AsteriskModel._server.sendAction(action, Channel.onServerResponse, this);
    }

    public setVariable(name: string, value: string) {
        const action: IAstActionSetvar = {
            Action: AST_ACTION.SET_VAR,
            Channel: this.name,
            Value: value,
            Variable: name
        };
        AsteriskModel._server.sendAction(action, (err, response) => {
            if (response instanceof ManagerError) {
                throw new NoSuchChannelError("Channel " + self.name + " is not available: " + response.response, this);
            }
            this._variables.add(new Variable({Event: "channel:setVariable", name, value}));
        }, this);

    }

    public updateVariable(name: string, value: string, srcEvent?: string) {
        const variables = this._variables;
        if (variables.has(name)) {
            variables.get(name).value = value;
        } else {
            variables.add(new Variable({Event: (srcEvent ? srcEvent : "channel:updateVariable"), name, value}));
        }
    }

    public getVariable(name: string, callbackFn: IDfiCallbackResult<NoSuchChannelError, string>, context?): void {

        const variable = this._variables.get(name);
        if (variable !== undefined) {
            AstUtil.maybeCallbackOnce<NoSuchChannelError, string>(callbackFn, context, null, variable.value);
            return;
        }
        if (this._varsCallbacks.has(name)) {
            this._varsCallbacks.get(name).push({context, fn: callbackFn});
        } else {
            this._varsCallbacks.set(name, [{context, fn: callbackFn}]);

            const action: IAstActionGetvar = {
                Action: AST_ACTION.GET_VAR,
                Channel: this.name,
                Variable: name
            };
            AsteriskModel._server.sendAction(action, (err: IDfiAMIResponseError<IAstActionGetvar>, response: IDfiAMIResponseGetvar) => {
                // TODO check callback and getVarsCallbacks

                if (this.destroyed) {
                    return;
                }
                if (err) {
                    if (this.state.status !== ChannelStates.HANGUP) {
                        const error = new NoSuchChannelError("Channel " + this.name + " is not available");

                        const callbacks = this._varsCallbacks.get(name);
                        this._varsCallbacks.delete(name);
                        callbacks.forEach((varCallback) => {
                            AstUtil.maybeCallback(varCallback.fn, varCallback.context, error);
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
                } else {
                    this.updateVariable(name, response.Value, "ActionGetvar");
                }

                const callbacks = this._varsCallbacks.get(name);
                this._varsCallbacks.delete(name);
                callbacks.forEach((varCallback) => {
                    AstUtil.maybeCallback(varCallback.fn, varCallback.context, null, response.Value);
                });

            }, this);
        }
    }

    public destroy() {

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

export default Channel;
