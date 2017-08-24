"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChannelsCollection_1 = require("../collections/channels/ChannelsCollection");
const channelStates_1 = require("../enums/channelStates");
const astUtil_1 = require("../internal/astUtil");
const Manager_1 = require("../internal/server/Manager");
const CallDetailRecordModel_1 = require("../models/CallDetailRecordModel");
const ChannelModel_1 = require("../models/ChannelModel");
const ExtensionModel_1 = require("../models/ExtensionModel");
const channelState_1 = require("../states/channelState");
const hangupCause_1 = require("../states/hangupCause");
const moment = require("moment");
const actionNames_1 = require("../internal/asterisk/actionNames");
const eventNames_1 = require("../internal/asterisk/eventNames");
const REMOVAL_THRESHOLD = 5; // 15 minutes in seconds
let VARIABLE_TRACE_ID = "AJ_TRACE_ID";
class ChannelManager extends Manager_1.default {
    static get events() {
        return EVENTS;
    }
    constructor(options, state) {
        super(options, state, new ChannelsCollection_1.default());
        const prefix = this.server.originateConfig.prefix;
        VARIABLE_TRACE_ID = prefix + "_TRACE_ID";
        this.setProp("technologyCount", {});
        if (!this.enabled) {
            return;
        }
        const map = {};
        map[eventNames_1.default.NEW_CHANNEL] = this._handleNewChannelEvent;
        map[eventNames_1.default.NEW_EXTEN] = this._handleNewExtenEvent;
        map[eventNames_1.default.NEW_STATE] = this._handleNewStateEvent;
        map[eventNames_1.default.NEW_CALLERID] = this._handleNewCallerIdEvent;
        map[eventNames_1.default.DIAL_BEGIN] = this._handleDialEvent;
        map[eventNames_1.default.DIAL_END] = this._handleDialEvent;
        map[eventNames_1.default.RENAME] = this._handleRenameEvent;
        map[eventNames_1.default.HANGUP] = this._handleHangupEvent;
        map[eventNames_1.default.CDR] = this._handleCdrEvent;
        map[eventNames_1.default.VAR_SET] = this._handleVarSetEvent;
        map[eventNames_1.default.SOFT_HANGUP_REQUEST] = this._handleHangupRequest;
        map[eventNames_1.default.HANGUP_REQUEST] = this._handleHangupRequest;
        map[eventNames_1.default.NEW_CONNECTED_LINE] = this._handleNewConnectedLine;
        map[eventNames_1.default.MUSIC_ON_HOLD_START] = this._handleMusicOnHold;
        map[eventNames_1.default.MUSIC_ON_HOLD_STOP] = this._handleMusicOnHold;
        map[eventNames_1.default.DTMF_END] = this._handleDtmfEvent;
        map[eventNames_1.default.PARKED_CALL] = this._handleParkedCallEvent;
        map[eventNames_1.default.PARKED_CALL_GIVE_UP] = this._handleParkedCallGiveUpEvent;
        map[eventNames_1.default.PARKED_CALL_TIME_OUT] = this._handleParkedCallTimeOutEvent;
        map[eventNames_1.default.UN_PARKED_CALL] = this._handleUnparkedCallEvent;
        this._mapEvents(map);
    }
    get channels() {
        return this._collection;
    }
    get technologyCount() {
        return this.getProp("technologyCount");
    }
    start(callbackFn, context) {
        function finish() {
            this.server.logger.info('manager "ChannelManager" started');
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, "ChannelManager");
        }
        function onForeach(event) {
            if (event.Event === eventNames_1.default.STATUS || event.Event === eventNames_1.default.CORE_SHOW_CHANNEL) {
                let extension = null;
                let isNew = false;
                let channel = this.getChannelById(event.Uniqueid);
                if (channel == null) {
                    const now = moment();
                    let dateOfCreation;
                    dateOfCreation = (event.Duration != null) ?
                        moment(now.subtract(astUtil_1.default.duration2sec(event.Duration), "seconds")) :
                        now;
                    event.dateOfCreation = dateOfCreation;
                    channel = new ChannelModel_1.default(event);
                    isNew = true;
                }
                if (event.Context != null && event.Exten != null && event.Priority != null) {
                    extension = new ExtensionModel_1.default({
                        AppData: (event.Event === eventNames_1.default.STATUS ? event.Data : event.ApplicationData),
                        Application: event.Application,
                        Context: event.Context,
                        Event: event.Event,
                        Exten: event.Exten,
                        Priority: event.Priority
                    });
                }
                if (event.ChannelState != null) {
                    channel.stateChanged(event.$time, channelState_1.default.byValue(parseInt(event.ChannelState, 10)));
                }
                channel.extensionVisited(event.$time, extension);
                if (this.server.managers.bridge.enabled && event.BridgeId) {
                    const bridge = this.server.managers.bridge.bridges.get(event.BridgeId);
                    if (bridge) {
                        bridge.addChannel(channel);
                        channel._bridges.add(bridge);
                    }
                    else {
                        this.logger.error();
                    }
                }
                const linkedChannel = this.getChannelById(event.Linkedid);
                if (linkedChannel != null) {
                    // the date used here is not correct!
                    channel.channelLinked(event.$time, linkedChannel);
                    linkedChannel.channelLinked(event.$time, channel);
                }
                if (isNew) {
                    this.logger.info("Adding new channel %j (%j)", channel.name, channel.id);
                    this._addChannel(channel);
                }
            }
        }
        this.server.logger.info('starting manager "ChannelManager"');
        if (!this.enabled) {
            finish.call(this);
            return;
        }
        const action = { Action: actionNames_1.default.COMMAND, Command: "core show channeltypes" };
        this.server.sendAction(action, (err, response) => {
            if (err) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
                return;
            }
            const found = [];
            const lines = response.$content.split("\n");
            lines.splice(0, 2);
            lines.splice(lines.length - 2);
            lines.forEach((line) => {
                found.push(line.replace(/(\w+).*/, "$1"));
            });
            found.forEach((technology) => {
                this.technologyCount[technology] = 0;
            });
            this.server.sendEventGeneratingAction({ Action: actionNames_1.default.CORE_SHOW_CHANNELS }, (err1, re) => {
                if (err1) {
                    callbackFn.call(context, err1);
                    return;
                }
                re.events.forEach(onForeach, this);
                finish.call(this);
            }, this);
        }, this);
    }
    disconnected() {
        this.channels.clear();
    }
    /**
     * Returns a collection of all active AsteriskChannels.
     */
    getChannels() {
        const copy = [];
        this.channels.forEach((channel) => {
            if (channel.state.status !== channelStates_1.default.HANGUP) {
                copy.push(channel);
            }
        });
        return copy;
    }
    getChannelsByDateStart() {
        const sorted = [];
        const tmp = new Map();
        this.channels.forEach((channel) => {
            tmp.set(channel.createDate, channel);
        });
        [...(tmp.keys())].sort().forEach((key) => {
            sorted.push(tmp.get(key));
        });
        return sorted;
    }
    /**
     * Returns a channel from the ChannelManager's cache with the given name
     * If multiple channels are found, returns the most recently CREATED one.
     * If two channels with the very same date exist, avoid HANGUP ones.
     *
     * @param {String} name the name of the requested channel.
     * @returns {Channel|null}  the (most recent) channel if found, in any state, or null if none found.
     */
    getChannelByName(name) {
        if (name == null) {
            return null;
        }
        let dateOfCreation = null;
        let channel = null;
        this.channels.forEach((tmp) => {
            if (tmp.name != null && tmp.name === name) {
                // return the most recent channel or when dates are similar, the active one
                if (dateOfCreation != null) {
                    this.logger.error("error");
                }
                if (dateOfCreation == null || moment(tmp.createDate).isAfter(dateOfCreation) || (moment(tmp.createDate).isSame(dateOfCreation) && tmp.state.status !== channelStates_1.default.HANGUP)) {
                    channel = tmp;
                    dateOfCreation = moment(channel.createDate);
                }
            }
        });
        return channel;
    }
    /**
     * Returns a NON-HANGUP channel from the ChannelManager's cache with the given name.
     *
     * @param {String} name the name of the requested channel.
     * @return {Channel} the NON-HANGUP channel if found, or null if none is found.
     */
    getChannelByNameAndActive(name) {
        // In non bristuffed AST 1.2, we don't have uniqueid header to match the channel
        // So we must use the channel name
        // Channel name is unique at any give moment in the  * server
        // But asterisk-java keeps Hangup channels for a while.
        // We don't want to retrieve hangup channels.
        let channel = null;
        if (name == null) {
            return null;
        }
        this.channels.forEach(onForeach);
        /**
         *
         * @param {Channel} tmp
         * @returns {Channel}
         */
        function onForeach(tmp) {
            if (tmp.get("name") != null && tmp.get("name") === name && tmp.get("state") !== channelStates_1.default.HANGUP) {
                channel = tmp;
                return channel;
            }
        }
    }
    /**
     *
     * @param id uniqueid
     * @returns {any}
     */
    getChannelById(id) {
        if (id == null) {
            return null;
        }
        if (this.channels.has(id)) {
            return this.channels.get(id);
        }
        return null;
    }
    hasChannel(channel) {
        return this.channels.has(channel);
    }
    /**
     * Returns the other side of a local channel.
     * <p/>
     * Local channels consist of two sides, like
     * "Local/1234@from-local-60b5,1" and "Local/1234@from-local-60b5,2" (for Asterisk 1.4) or
     * "Local/1234@from-local-60b5;1" and "Local/1234@from-local-60b5;2" (for Asterisk 1.6)
     * this method returns the other side.
     */
    getOtherSideOfLocalChannel(localChannel) {
        if (localChannel == null) {
            return null;
        }
        const name = localChannel.name;
        const reS = /^Local\//;
        const reE = /,.$|;.$/;
        // if (name == null || !reS.test(name.startsWith("Local/") || (name.charAt(name.length() - 2) != ',' && name.charAt(name.length() - 2) != ';')) {
        if (name == null || !reS.test(name) || !reE.test(name)) {
            return null;
        }
        const num = name.substring(name.length - 1);
        if (num === "1") {
            return this.getChannelByName(name.substring(0, name.length - 1) + "2");
        }
        else if (num === "2") {
            return this.getChannelByName(name.substring(0, name.length - 1) + "1");
        }
        else {
            return null;
        }
    }
    toJSON() {
        const obj = super.toJSON();
        obj.collection = this.channels.toJSON();
        return obj;
    }
    gc() {
        this._removeOldChannels();
    }
    _handleNewChannelEvent(event) {
        this.logger.debug("handle  NewChannelEvent %j (%s) (%s)", event.Channel, event.Uniqueid, event.ChannelStateDesc);
        const channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            if (event.Channel == null) {
                this.logger.info("Ignored NewChannelEvent with empty channel name (uniqueId=" + event.Uniqueid + ")");
            }
            else {
                this._addNewChannel(event);
            }
        }
        else {
            // channel had already been created probably by a NewCallerIdEvent
            channel.nameChanged(event.Channel);
            channel.callerIdChanged(event.CallerIDName, event.CallerIDNum);
            channel.stateChanged(event.$time, channelState_1.default.byValue(parseInt(event.ChannelState, 10)));
        }
    }
    _handleNewExtenEvent(event) {
        this.logger.debug("handle  NewExtenEvent channel:%j, ctx:%j, exten:%j, priority:%j", event.Channel, event.Context, event.Exten, event.Priority);
        const channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            this.logger.error("Ignored NewExtenEvent for unknown channel " + event.Channel);
            return;
        }
        const extension = new ExtensionModel_1.default(event);
        channel.extensionVisited(event.$time, extension);
    }
    _handleNewStateEvent(event) {
        this.logger.debug("handle  NewStateEvent %j (%s)", event.Channel, event.ChannelStateDesc);
        let channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            // NewStateEvent can occur for an existing channel that now has a different unique id (originate with Local/)
            channel = this.getChannelByNameAndActive(event.Channel);
            if (channel != null) {
                this.logger.info("Changing unique id for '" + channel.name + "' from " + channel.id + " to " + event.Uniqueid);
                throw new Error("Changing unique id :" + channel.name);
                // channel.idChanged(event.$time, event.Uniqueid);
            }
            if (channel == null) {
                // should not happen
                this.logger.info("Creating new channel due to NewStateEvent '" + event.Channel + "' unique id " + event.Uniqueid);
                // NewStateEvent can occur instead of a NewChannelEvent
                channel = this._addNewChannel(event);
            }
        }
        // NewStateEvent can provide a new CallerIdNum or CallerIdName not previously received through a
        // NewCallerIdEvent. This happens at least on outgoing legs from the queue application to agents.
        if (event.CallerIDNum != null || event.CallerIDName != null) {
            channel.callerIdChanged(event.CallerIDName, event.CallerIDNum);
            // Also, NewStateEvent can return a new channel name for the same channel uniqueid, indicating the channel has been
            // renamed but no related RenameEvent has been received.
            // This happens with mISDN channels (see AJ-153)
            if (event.Channel != null && event.Channel !== channel.name) {
                this.logger.info("Renaming channel (following NewStateEvent) '" + channel.name + "' to '" + event.Channel + "'");
                channel.nameChanged(event.Channel);
            }
        }
        if (event.ChannelState != null) {
            channel.stateChanged(event.$time, channelState_1.default.byValue(parseInt(event.ChannelState, 10)));
        }
    }
    _handleNewCallerIdEvent(event) {
        this.logger.debug("handle  NewCallerIdEvent %j (%s) %s:%s", event.Channel, event.ChannelStateDesc, event.CallerIDName, event.CallerIDNum);
        let channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            // NewCallerIdEvent can occur for an existing channel that now has a different unique id (originate with Local/)
            channel = this.getChannelByNameAndActive(event.Channel);
            if (channel != null) {
                this.logger.info("Changing unique id for '" + channel.name + "' from " + channel.id + " to " + event.Uniqueid);
                throw new Error("Changing unique id :" + channel.name);
                // channel.idChanged(event.$time, event.Uniqueid);
            }
            if (channel == null) {
                this.logger.warn("Channel not found %s, %s" + event.Channel, event.Uniqueid);
                return;
                // channel = this._addNewChannel(event);
            }
        }
        channel.callerIdChanged(event.CallerIDName, event.CallerIDNum);
    }
    _handleHangupRequest(event) {
        this.logger.debug("handle  HangupRequest %j", event.Channel, (event.Event.match("soft") ? "soft" : "hard"));
        const channel = this.channels.get(event.Uniqueid);
        if (channel) {
            channel.hangupRequestDate = event.$time;
            channel.hangupRequestMethod = event.Event === "HangupRequest" ? "hard" : "soft";
        }
        else {
            this.logger.warn("Ignored hangupRequest for unknown channel %j", event);
        }
    }
    _handleHangupEvent(event) {
        this.logger.debug("handle HangupEvent: %j (%s)", event.Channel, event.ChannelStateDesc, event["Cause-txt"]);
        let channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            channel = this.getChannelByName(event.Channel);
            if (channel == null) {
                this.logger.error("Ignored HangupEvent for unknown channel %s(%s)", event.Channel, event.Uniqueid);
                return;
            }
            else {
                this.logger.error("error");
            }
        }
        const cause = event.Cause != null ? hangupCause_1.default.byValue(parseInt(event.Cause, 10)) : hangupCause_1.default.byValue(-1);
        channel.handleHangup(event.$time, cause);
        this.logger.info('Removing channel "' + channel.name + '" due to hangup (' + cause.name + ')"');
        const technology = channel.technology;
        if (this.technologyCount.hasOwnProperty(technology)) {
            if (this.technologyCount[technology] > 0) {
                this.technologyCount[technology]--;
            }
            else {
                this.logger.error("error");
            }
        }
        else {
            this.logger.error("error");
        }
    }
    _handleDialEvent(event) {
        this.logger.debug("handle DialEvent: %j, %j (%s)", event.Event, event.Channel, event.ChannelStateDesc);
        const sourceChannel = this.getChannelById(event.Uniqueid);
        const destinationChannel = this.getChannelById(event.DestUniqueid);
        if (sourceChannel == null) {
            if (event.DestChannel && event.DestChannel.substring(0, 5) === "Local") {
                this.logger.info("Ignored " + event.Event + " for unknown source channel dest:" + event.DestChannel + " with unique id " + event.DestUniqueid);
            }
            else {
                this.logger.warn("Ignored DialEvent for unknown source " + JSON.stringify(event));
            }
            return;
        }
        if (destinationChannel == null) {
            this.logger.warn("Ignored DialEvent for unknown destination %j ", event);
            return;
        }
        this.logger.info('"' + sourceChannel.name + '"  dialed "' + destinationChannel.name + '" event: "' + event.Event + '"');
        /*this._getTraceId(sourceChannel, function () {
         this._getTraceId(destinationChannel, function () {
         sourceChannel.channelDialed(event.$time, destinationChannel);
         destinationChannel.channelDialing(event.$time, sourceChannel);
         }, this);
         }, this);*/
    }
    _handleRenameEvent(event) {
        this.logger.debug("handle  RenameEvent %j", event);
        const channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            this.logger.error("Ignored RenameEvent for unknown channel with uniqueId " + event.Uniqueid);
            return;
        }
        this.logger.info("Renaming channel '" + channel.name + "' to '" + event.Newname + "', uniqueId is " + event.Uniqueid);
        channel.nameChanged(event.Newname);
    }
    _handleCdrEvent(event) {
        this.logger.debug("handle  CdrEvent %j", event);
        const channel = this.getChannelById(event.UniqueID);
        const destinationChannel = this.getChannelByName(event.DestinationChannel);
        let cdr;
        if (channel == null) {
            this.logger.info("Ignored CdrEvent for unknown channel with uniqueId " + event.UniqueID);
            return;
        }
        cdr = new CallDetailRecordModel_1.default(channel, destinationChannel, event);
        channel.callDetailRecordReceived(cdr);
    }
    _handleParkedCallEvent(event) {
        this.logger.debug("handle  ParkedCallEvent %j", event);
        // Only bristuffed versions: Channel channel = this.getChannelById(event. getUniqueid());
        const channel = this.getChannelByNameAndActive(event.ParkeeChannel);
        if (channel == null) {
            this.logger.info("Ignored ParkedCallEvent for unknown channel " + event.ParkeeChannel);
            return;
        }
        // todo The context should be "parkedcalls" or whatever has been configured in features.conf
        // unfortunately we don't get the context in the ParkedCallEvent so for now we'll set it to null.
        channel.parkedAt = new ExtensionModel_1.default({
            AppData: null,
            Application: null,
            Context: event.ParkeeContext,
            Event: event.Event,
            Exten: event.ParkeeExten,
            Priority: event.ParkeePriority
        });
        this.logger.info("Channel " + channel.name + " is parked at " + channel.parkedAt.exten);
    }
    _handleParkedCallGiveUpEvent(event) {
        this.logger.debug("handle  ParkedCallGiveUpEvent %j", event);
        // Only bristuffed versions: Channel channel = this.getChannelById(event. get("uniqueid"));
        const channel = this.getChannelByNameAndActive(event.ParkeeChannel);
        if (channel == null) {
            this.logger.info("Ignored ParkedCallGiveUpEvent for unknown channel " + event.ParkeeChannel);
            return;
        }
        const wasParkedAt = channel.parkedAt;
        if (wasParkedAt == null) {
            this.logger.info("Ignored ParkedCallGiveUpEvent as the channel was not parked");
            return;
        }
        channel.parkedAt = null;
        this.logger.info("Channel " + channel.name + " is unparked (GiveUp) from " + wasParkedAt.exten);
    }
    _handleParkedCallTimeOutEvent(event) {
        this.logger.debug("handle  ParkedCallTimeOutEvent %j", event);
        // Only bristuffed versions: Channel channel = this.getChannelById(event. get("uniqueid"));
        const channel = this.getChannelByNameAndActive(event.ParkeeChannel);
        if (channel == null) {
            this.logger.info("Ignored ParkedCallTimeOutEvent for unknown channel " + event.ParkeeChannel);
            return;
        }
        const wasParkedAt = channel.parkedAt;
        if (wasParkedAt == null) {
            this.logger.info("Ignored ParkedCallTimeOutEvent as the channel was not parked");
            return;
        }
        channel.parkedAt = null;
        this.logger.info("Channel " + channel.name + " is unparked (Timeout) from " + wasParkedAt.exten);
    }
    _handleUnparkedCallEvent(event) {
        this.logger.debug("handle  UnparkedCallEvent %j", event);
        // Only bristuffed versions: Channel channel = this.getChannelById(event. get("uniqueid"));
        const channel = this.getChannelByNameAndActive(event.ParkeeChannel);
        if (channel == null) {
            this.logger.info("Ignored UnparkedCallEvent for unknown channel " + event.ParkeeChannel);
            return;
        }
        const wasParkedAt = channel.parkedAt;
        if (wasParkedAt == null) {
            this.logger.info("Ignored UnparkedCallEvent as the channel was not parked");
            return;
        }
        channel.parkedAt = null;
        this.logger.info("Channel " + channel.name + " is unparked (moved away) from " + wasParkedAt.exten);
    }
    _handleVarSetEvent(event) {
        this.logger.trace("handle  VarSetEvent on %j -> %j : %j", event.Channel, event.Variable, event.Value);
        if (event.Uniqueid == null) {
            return;
        }
        const channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            // this.logger.info("Ignored VarSetEvent for unknown channel with uniqueId " + event.Uniqueid);
            return;
        }
        channel.updateVariable(event.Variable, event.Value, event.Event);
    }
    _handleDtmfEvent(event) {
        this.logger.debug("handle  DtmfEvent %j", event);
        if (event.Uniqueid == null) {
            return;
        }
        const channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            this.logger.info("Ignored DtmfEvent for unknown channel with uniqueId " + event.Uniqueid);
            return;
        }
        const dtmfDigit = (event.Digit == null || event.Digit.length < 1) ? null : event.Digit.charAt(0);
        if (event.Direction === "Received") {
            channel.dtmfReceived = dtmfDigit;
        }
        if (event.Direction === "Sent") {
            channel.dtmfSent = dtmfDigit;
        }
    }
    _handleNewConnectedLine(event) {
        this.logger.debug("handle  NewConnectedLine %j", event.Channel);
        const channel = this.channels.get(event.Uniqueid);
        const linkedChannel = this.channels.get(event.Linkedid);
        if (channel && linkedChannel) {
            if (channel.linkedChannel && channel.linkedChannel.id === event.Linkedid) {
                // throw new Error("error");
                // TODO check this
                // this.logger.warn("linkedChannel is setup %j", event);
            }
            channel.channelLinked(event.$time, linkedChannel);
        }
        else {
            this.logger.warn("Ignored NewConnectedLine for unknown channel %j", event);
        }
    }
    _handleMusicOnHold(event) {
        this.logger.debug("handle MusicOnHold %j", event.Event, event.Channel);
        const channel = this.channels.get(event.Uniqueid);
        if (channel) {
            if (event.Event === eventNames_1.default.MUSIC_ON_HOLD_START) {
                channel.mohDate = event.$time;
                channel.mohClass = event.Class;
            }
            else {
                channel.mohDate = null;
                channel.mohClass = null;
            }
        }
        else {
            this.logger.warn("Ignored MusicOnHold for unknown channel %j", event);
        }
    }
    _getTraceId(channel, callbackFn, context) {
        channel.getVariable(VARIABLE_TRACE_ID, onResponse, this);
        function onResponse(err, traceId) {
            this.logger.trace("TraceId for channel %s is %s", channel.name, traceId);
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, err, traceId);
        }
    }
    _addChannel(channel) {
        if (!this.channels.has(channel.id)) {
            const technology = channel.technology;
            if (!this.technologyCount.hasOwnProperty(technology)) {
                this.technologyCount[technology] = 1;
            }
            else {
                this.technologyCount[technology]++;
            }
            this.channels.add(channel);
            this.logger.trace('count: " %j "', this.technologyCount);
        }
        else {
            this.channels.add(channel);
        }
    }
    /**
     * Removes channels that have been hung more than {@link REMOVAL_THRESHOLD} milliseconds.
     */
    _removeOldChannels() {
        const now = moment();
        let dateOfRemoval;
        const channels = this.channels.toArray();
        channels.forEach(onEachChannel, this);
        function onEachChannel(channel) {
            if (!channel) {
                this.logger.error();
            }
            dateOfRemoval = channel.get("dateOfRemoval");
            if (channel.get("state").status === channelStates_1.default.HANGUP && dateOfRemoval != null) {
                if (channel.destroyed) {
                    return;
                }
                const diff = now.diff(dateOfRemoval, "second");
                if (diff >= REMOVAL_THRESHOLD) {
                    this.logger.info("Destroing channel %j(%s) due remove treshold", channel.name, channel.get("id"));
                    this._channels.remove(channel);
                    channel.destroy();
                }
            }
        }
    }
    _addNewChannel(event) {
        /**
         * type Channel
         */
        const channel = new ChannelModel_1.default(event);
        channel.stateChanged(event.$time, channelState_1.default.byValue(parseInt(event.ChannelState, 10)));
        this.logger.info("Adding new channel %j-%j(%s)", channel.name, channel.id, channel.state.name);
        this._addChannel(channel);
        this._getTraceId(channel, (err, traceId) => {
            if (!traceId) {
                return;
            }
            const name = channel.name;
            const reS = /^local\//;
            const reE = /,1$|;1$/;
            if (traceId && (!reS.test(name.toLowerCase()) || reE.test(name))) {
                const callbackData = this.server.actions.originate.getOriginateCallbackDataByTraceId(traceId);
                if (callbackData && callbackData.channel == null) {
                    try {
                        callbackData.callbackFn.onDialing(channel);
                    }
                    catch (t) {
                        // Throwable
                        this.logger.warn("Exception dispatching originate progress.", t);
                    }
                }
            }
        }, this);
        this.emit(ChannelManager.events.CHANNEL_ADD, channel);
        return channel;
    }
}
const EVENTS = Object.assign({}, Manager_1.default.events, { CHANNEL_ADD: Symbol("channelr:add") });
exports.default = ChannelManager;
//# sourceMappingURL=ChannelManager.js.map