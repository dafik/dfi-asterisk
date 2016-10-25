import {IDfiAstEventsChannelManager} from "../definitions/events";
import {IDfiAstOriginateCallbackData, IDfiCallbackResult} from "../definitions/interfaces";
import {AST_ACTION} from "../internal/asterisk/actionNames";
import {IAstActionCommand} from "../internal/asterisk/actions";
import {AST_EVENT} from "../internal/asterisk/eventNames";
import {
    IAstEventCdr,
    IAstEventCoreShowChannel,
    IAstEventDTMFBegin,
    IAstEventDTMFEnd,
    IAstEventDialBegin,
    IAstEventDialEnd,
    IAstEventHangup,
    IAstEventHangupRequest,
    IAstEventMusicOnHoldStart,
    IAstEventNewCallerid,
    IAstEventNewConnectedLine,
    IAstEventNewExten,
    IAstEventNewchannel,
    IAstEventNewstate,
    IAstEventParkedCall,
    IAstEventParkedCallGiveUp,
    IAstEventParkedCallTimeOut,
    IAstEventRename,
    IAstEventSoftHangupRequest,
    IAstEventStatus,
    IAstEventUnParkedCall,
    IAstEventVarSet
} from "../internal/asterisk/events";
import AsteriskManager = require("../internal/server/Manager");
import Channels = require("../collections/channels/ChannelsCollection");
import Channel = require("../models/ChannelModel");
import AstUtil = require("../internal/astUtil");
import Extension = require("../models/ExtensionModel");
import CallDetailRecord = require("../models/CallDetailRecord");
import ChannelState = require("../states/channelState");
import HangupCause = require("../states/hangupCause");
import ChannelStates = require("../enums/channelStates");

import moment = require("moment");
import Moment = moment.Moment;

const REMOVAL_THRESHOLD = 5; // 15 minutes in seconds
const VARIABLE_TRACE_ID = "AJ_TRACE_ID";

class ChannelManager extends AsteriskManager<Channel, Channels> {

    static get events(): IDfiAstEventsChannelManager {
        return EVENTS;
    }

    constructor(options, state) {
        super(options, state, new Channels());

        this.setProp("technologyCount", {});
    }

    get channels(): Channels {
        return this._collection;
    }

    get technologyCount(): number {
        return this.getProp("technologyCount");
    }

    public start(callbackFn, context) {

        function finish() {
            this.server.logger.info('manager "ChannelManager" started');
            AstUtil.maybeCallbackOnce(callbackFn, context, null, "ChannelManager");
        }

        function onForeach(event: IAstEventStatus |IAstEventCoreShowChannel) {
            if (event.Event === AST_EVENT.STATUS || event.Event === AST_EVENT.CORE_SHOW_CHANNEL) {

                let extension: Extension = null;
                let isNew: boolean = false;
                let channel = this.getChannelById(event.Uniqueid);

                if (channel == null) {

                    let now = moment();

                    let dateOfCreation;

                    if ((event as IAstEventCoreShowChannel).Duration != null) {
                        dateOfCreation = moment(now.subtract(AstUtil.duration2sec((event as IAstEventCoreShowChannel).Duration), "seconds"));
                    } else {
                        dateOfCreation = now;
                    }
                    (event as IAstEventCoreShowChannel).dateOfCreation = dateOfCreation;

                    channel = new Channel(event);
                    isNew = true;
                }

                if (event.Context != null && event.Exten != null && event.Priority != null) {
                    extension = new Extension({
                        AppData: (event.Event === AST_EVENT.STATUS ? (event as IAstEventStatus).Data : (event as IAstEventCoreShowChannel).ApplicationData),
                        Application: event.Application,
                        Context: event.Context,
                        Event: event.Event,
                        Exten: event.Exten,
                        Priority: event.Priority

                    });
                }
                if (event.ChannelState != null) {
                    channel.stateChanged(event.$time, ChannelState.byValue(parseInt(event.ChannelState, 10)));
                }
                channel.extensionVisited(event.$time, extension);

                if (this.server.managers.bridge.enabled && (event as IAstEventCoreShowChannel).BridgeId) {
                    let bridge = this.server.managers.bridge.bridges.get((event as IAstEventCoreShowChannel).BridgeId);
                    if (bridge) {
                        bridge.addChannel(channel);
                        channel._bridges.add(bridge);
                    } else {
                        this.logger.error();
                    }
                }

                let linkedChannel = this.getChannelById(event.Linkedid);
                if (linkedChannel != null) {
                    // the date used here is not correct!
                    channel.channelLinked(event.$time, linkedChannel);
                    linkedChannel.channelLinked(event.$time, channel);
                }

                if (isNew) {
                    this.logger.info("Adding new channel %j (%j)", channel.get("channel"), channel.id);
                    this._addChannel(channel);
                }
            }
        }

        this.server.logger.info('starting manager "ChannelManager"');

        if (!this.enabled) {
            finish.call(this);
            return;
        }

        let map = {};
        map[AST_EVENT.NEW_CHANNEL] = this._handleNewChannelEvent;
        map[AST_EVENT.NEW_EXTEN] = this._handleNewExtenEvent;
        map[AST_EVENT.NEW_STATE] = this._handleNewStateEvent;
        map[AST_EVENT.NEW_CALLERID] = this._handleNewCallerIdEvent;
        map[AST_EVENT.DIAL_BEGIN] = this._handleDialEvent;
        map[AST_EVENT.DIAL_END] = this._handleDialEvent;
        map[AST_EVENT.RENAME] = this._handleRenameEvent;
        map[AST_EVENT.HANGUP] = this._handleHangupEvent;
        map[AST_EVENT.CDR] = this._handleCdrEvent;
        map[AST_EVENT.VAR_SET] = this._handleVarSetEvent;
        map[AST_EVENT.SOFT_HANGUP_REQUEST] = this._handleHangupRequest;
        map[AST_EVENT.HANGUP_REQUEST] = this._handleHangupRequest;
        map[AST_EVENT.NEW_CONNECTED_LINE] = this._handleNewConnectedLine;
        map[AST_EVENT.MUSIC_ON_HOLD_START] = this._handleMusicOnHold;
        map[AST_EVENT.MUSIC_ON_HOLD_STOP] = this._handleMusicOnHold;
        map[AST_EVENT.DTMF_END] = this._handleDtmfEvent;

        map[AST_EVENT.PARKED_CALL] = this._handleParkedCallEvent;
        map[AST_EVENT.PARKED_CALL_GIVE_UP] = this._handleParkedCallGiveUpEvent;
        map[AST_EVENT.PARKED_CALL_TIME_OUT] = this._handleParkedCallTimeOutEvent;
        map[AST_EVENT.UN_PARKED_CALL] = this._handleUnparkedCallEvent;

        this._mapEvents(map);

        let action: IAstActionCommand = {Action: AST_ACTION.COMMAND, Command: "core show channeltypes"};
        this.server.sendAction(action, (err, response) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
                return;
            }
            let found = [];
            let lines = response.$content.split("\n");
            lines.splice(0, 2);
            lines.splice(lines.length - 2);
            lines.forEach((line) => {
                found.push(line.replace(/(\w+).*/, "$1"));
            });

            found.forEach((technology) => {
                this.technologyCount[technology] = 0;
            });
            this.server.sendEventGeneratingAction({Action: AST_ACTION.CORE_SHOW_CHANNELS}, (err1, re) => {
                if (err1) {
                    callbackFn.call(context, err1);
                    return;
                }
                re.events.forEach(onForeach, this);
                finish.call(this);
            }, this);
        }, this);

    }

    public disconnected() {
        this.channels.clear();
    }

    /**
     * Returns a collection of all active AsteriskChannels.
     */
    public getChannels(): Channel[] {
        let copy: Channel[] = [];

        this.channels.forEach(channel => {
            if (channel.state.status !== ChannelStates.HANGUP) {
                copy.push(channel);
            }
        });

        return copy;
    }

    public getChannelsByDateStart(): Channel[] {

        let sorted = [];
        let tmp = new Map();

        this.channels.forEach(channel => {
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
    public getChannelByName(name): Channel {
        if (name == null) {
            return null;
        }
        let dateOfCreation: Moment = null;
        let channel = null;

        this.channels.forEach((tmp: Channel) => {
            if (tmp.name != null && tmp.name === name) {
                // return the most recent channel or when dates are similar, the active one

                if (dateOfCreation != null) {
                    this.logger.error("error");
                }
                if (dateOfCreation == null || moment(tmp.createDate).isAfter(dateOfCreation) || (moment(tmp.createDate).isSame(dateOfCreation) && tmp.state.status !== ChannelStates.HANGUP)) {
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
    public getChannelByNameAndActive(name): Channel {
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
            if (tmp.get("name") != null && tmp.get("name") === name && tmp.getState() !== ChannelStates.HANGUP) {
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
    public getChannelById(id): Channel|null {
        if (id == null) {
            return null;
        }
        if (this.channels.has(id)) {
            return this.channels.get(id);
        }

        return null;
    }

    public hasChannel(channel: string|Channel): boolean {
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
    public getOtherSideOfLocalChannel(localChannel: Channel): Channel {

        if (localChannel == null) {
            return null;
        }

        let name = localChannel.name;

        let reS = /^Local\//;
        let reE = /,.$|;.$/;

        // if (name == null || !reS.test(name.startsWith("Local/") || (name.charAt(name.length() - 2) != ',' && name.charAt(name.length() - 2) != ';')) {
        if (name == null || !reS.test(name) || !reE.test(name)) {
            return null;
        }

        let num = name.substring(name.length - 1);

        if (num === "1") {
            return this.getChannelByName(name.substring(0, name.length - 1) + "2");
        } else if (num === "2") {
            return this.getChannelByName(name.substring(0, name.length - 1) + "1");
        } else {
            return null;
        }
    }

    public toJSON() {
        let obj = super.toJSON();
        obj.collection = this.channels.toJSON();

        return obj;

    }

    public gc() {
        this._removeOldChannels();
    }

    private _handleNewChannelEvent(event: IAstEventNewchannel) {
        this.logger.debug("handle  NewChannelEvent %j (%s) (%s)", event.Channel, event.Uniqueid, event.ChannelStateDesc);

        let channel = this.getChannelById(event.Uniqueid);

        if (channel == null) {
            if (event.Channel == null) {
                this.logger.info("Ignored NewChannelEvent with empty channel name (uniqueId=" + event.Uniqueid + ")");
            } else {
                this._addNewChannel(event);
            }
        } else {
            // channel had already been created probably by a NewCallerIdEvent

            channel.nameChanged(event.Channel);
            channel.callerIdChanged(event.CallerIDName, event.CallerIDNum);
            channel.stateChanged(event.$time, ChannelState.byValue(parseInt(event.ChannelState, 10)));
        }
    }

    private _handleNewExtenEvent(event: IAstEventNewExten) {
        this.logger.debug("handle  NewExtenEvent channel:%j, ctx:%j, exten:%j, priority:%j", event.Channel, event.Context, event.Exten, event.Priority);

        let channel: Channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            this.logger.error("Ignored NewExtenEvent for unknown channel " + event.Channel);
            return;
        }
        let extension: Extension = new Extension(event);

        channel.extensionVisited(event.$time, extension);

    }

    private _handleNewStateEvent(event: IAstEventNewstate) {
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
            channel.stateChanged(event.$time, ChannelState.byValue(parseInt(event.ChannelState, 10)));
        }
    }

    private _handleNewCallerIdEvent(event: IAstEventNewCallerid) {
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

    private _handleHangupRequest(event: IAstEventHangupRequest|IAstEventSoftHangupRequest) {
        this.logger.debug("handle  HangupRequest %j", event.Channel, (event.Event.match("soft") ? "soft" : "hard"));
        let channel = this.channels.get(event.Uniqueid);
        if (channel) {
            channel.hangupRequestDate = event.$time;
            channel.hangupRequestMethod = event.Event === "HangupRequest" ? "hard" : "soft";
        } else {
            this.logger.warn("Ignored hangupRequest for unknown channel %j", event);
        }
    }

    private _handleHangupEvent(event: IAstEventHangup) {
        this.logger.debug("handle HangupEvent: %j (%s)", event.Channel, event.ChannelStateDesc, event["Cause-txt"]);

        let cause: HangupCause = null;
        let channel: Channel = this.getChannelById(event.Uniqueid);

        if (channel == null) {
            channel = this.getChannelByName(event.Channel);
            if (channel == null) {
                this.logger.error("Ignored HangupEvent for unknown channel " + event.Uniqueid + "@" + moment.unix(parseFloat(event.Uniqueid)).format() + " - " + event.Channel);
                return;
            } else {
                this.logger.error("error");
            }
        }

        if (event.Cause != null) {
            cause = HangupCause.byValue(parseInt(event.Cause, 10));
        } else {
            cause = HangupCause.byValue(-1);
        }
        channel.handleHangup(event.$time, cause);
        this.logger.info('Removing channel "' + channel.name + '" due to hangup (' + cause.name + ')"');

        let technology = channel.technology;
        if (this.technologyCount.hasOwnProperty(technology)) {
            if (this.technologyCount[technology] > 0) {
                this.technologyCount[technology]--;
            } else {
                this.logger.error("error");
            }
        } else {
            this.logger.error("error");
        }
    }

    private _handleDialEvent(event: IAstEventDialBegin|IAstEventDialEnd) {
        this.logger.debug("handle DialEvent: %j, %j (%s)", event.Event, event.Channel, event.ChannelStateDesc);

        let sourceChannel: Channel = this.getChannelById(event.Uniqueid);
        let destinationChannel: Channel = this.getChannelById(event.DestUniqueid);

        if (sourceChannel == null) {
            if (event.DestChannel && event.DestChannel.substring(0, 5) === "Local") {
                this.logger.info("Ignored " + event.Event + " for unknown source channel dest:" + event.DestChannel + " with unique id " + event.DestUniqueid);
            } else {
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

    private _handleRenameEvent(event: IAstEventRename) {
        this.logger.debug("handle  RenameEvent %j", event);

        let channel = this.getChannelById(event.Uniqueid);

        if (channel == null) {
            this.logger.error("Ignored RenameEvent for unknown channel with uniqueId " + event.Uniqueid);
            return;
        }
        this.logger.info("Renaming channel '" + channel.name + "' to '" + event.Newname + "', uniqueId is " + event.Uniqueid);

        channel.nameChanged(event.Newname);

    }

    private _handleCdrEvent(event: IAstEventCdr) {
        this.logger.debug("handle  CdrEvent %j", event);

        let channel = this.getChannelById(event.UniqueID);
        let destinationChannel = this.getChannelByName(event.DestinationChannel);
        let cdr;

        if (channel == null) {
            this.logger.info("Ignored CdrEvent for unknown channel with uniqueId " + event.UniqueID);
            return;
        }

        cdr = new CallDetailRecord(channel, destinationChannel, event);

        channel.callDetailRecordReceived(cdr);

    }

    private _handleParkedCallEvent(event: IAstEventParkedCall) {
        this.logger.debug("handle  ParkedCallEvent %j", event);
        // Only bristuffed versions: Channel channel = this.getChannelById(event. getUniqueid());

        let channel = this.getChannelByNameAndActive(event.ParkeeChannel);

        if (channel == null) {
            this.logger.info("Ignored ParkedCallEvent for unknown channel " + event.ParkeeChannel);
            return;
        }
        // todo The context should be "parkedcalls" or whatever has been configured in features.conf
        // unfortunately we don't get the context in the ParkedCallEvent so for now we'll set it to null.

        channel.parkedAt = new Extension({
            AppData: null,
            Application: null,
            Context: event.ParkeeContext,
            Event: event.Event,
            Exten: event.ParkeeExten,
            Priority: event.ParkeePriority
        });

        this.logger.info("Channel " + channel.name + " is parked at " + channel.parkedAt.exten);

    }

    private _handleParkedCallGiveUpEvent(event: IAstEventParkedCallGiveUp) {
        this.logger.debug("handle  ParkedCallGiveUpEvent %j", event);
        // Only bristuffed versions: Channel channel = this.getChannelById(event. get("uniqueid"));

        let channel = this.getChannelByNameAndActive(event.ParkeeChannel);

        if (channel == null) {
            this.logger.info("Ignored ParkedCallGiveUpEvent for unknown channel " + event.ParkeeChannel);
            return;
        }

        let wasParkedAt = channel.parkedAt;

        if (wasParkedAt == null) {
            this.logger.info("Ignored ParkedCallGiveUpEvent as the channel was not parked");
            return;
        }

        channel.parkedAt = null;
        this.logger.info("Channel " + channel.name + " is unparked (GiveUp) from " + wasParkedAt.exten);
    }

    private _handleParkedCallTimeOutEvent(event: IAstEventParkedCallTimeOut) {
        this.logger.debug("handle  ParkedCallTimeOutEvent %j", event);
        // Only bristuffed versions: Channel channel = this.getChannelById(event. get("uniqueid"));
        let channel = this.getChannelByNameAndActive(event.ParkeeChannel);

        if (channel == null) {
            this.logger.info("Ignored ParkedCallTimeOutEvent for unknown channel " + event.ParkeeChannel);
            return;
        }

        let wasParkedAt = channel.parkedAt;

        if (wasParkedAt == null) {
            this.logger.info("Ignored ParkedCallTimeOutEvent as the channel was not parked");
            return;
        }

        channel.parkedAt = null;
        this.logger.info("Channel " + channel.name + " is unparked (Timeout) from " + wasParkedAt.exten);
    }

    private _handleUnparkedCallEvent(event: IAstEventUnParkedCall) {
        this.logger.debug("handle  UnparkedCallEvent %j", event);
        // Only bristuffed versions: Channel channel = this.getChannelById(event. get("uniqueid"));

        let channel = this.getChannelByNameAndActive(event.ParkeeChannel);

        if (channel == null) {
            this.logger.info("Ignored UnparkedCallEvent for unknown channel " + event.ParkeeChannel);
            return;
        }

        let wasParkedAt: Extension = channel.parkedAt;

        if (wasParkedAt == null) {
            this.logger.info("Ignored UnparkedCallEvent as the channel was not parked");
            return;
        }

        channel.parkedAt = null;
        this.logger.info("Channel " + channel.name + " is unparked (moved away) from " + wasParkedAt.exten);
    }

    private _handleVarSetEvent(event: IAstEventVarSet) {
        this.logger.trace("handle  VarSetEvent on %j -> %j : %j", event.Channel, event.Variable, event.Value);
        if (event.Uniqueid == null) {
            return;
        }

        let channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            // this.logger.info("Ignored VarSetEvent for unknown channel with uniqueId " + event.Uniqueid);
            return;
        }

        channel.updateVariable(event.Variable, event.Value, event.Event);

    }

    private _handleDtmfEvent(event: IAstEventDTMFBegin|IAstEventDTMFEnd) {
        this.logger.debug("handle  DtmfEvent %j", event);

        if (event.Uniqueid == null) {
            return;
        }

        let channel = this.getChannelById(event.Uniqueid);
        if (channel == null) {
            this.logger.info("Ignored DtmfEvent for unknown channel with uniqueId " + event.Uniqueid);
            return;
        }

        let dtmfDigit;
        if (event.Digit == null || event.Digit.length < 1) {
            dtmfDigit = null;
        } else {
            dtmfDigit = event.Digit.charAt(0);
        }

        if (event.Direction === "Received") {

            channel.dtmfReceived = dtmfDigit;
        }
        if (event.Direction === "Sent") {
            channel.dtmfSent = dtmfDigit;
        }

    }

    private _handleNewConnectedLine(event: IAstEventNewConnectedLine) {
        this.logger.debug("handle  NewConnectedLine %j", event.Channel);

        let channel = this.channels.get(event.Uniqueid);
        let linkedChannel = this.channels.get(event.Linkedid);
        if (channel && linkedChannel) {
            if (channel.linkedChannel && channel.linkedChannel.id === event.Linkedid) {
                // throw new Error("error");
                // TODO check this
                // this.logger.warn("linkedChannel is setup %j", event);
            }
            channel.channelLinked(event.$time, linkedChannel);

        } else {
            this.logger.warn("Ignored NewConnectedLine for unknown channel %j", event);
        }
    }

    private _handleMusicOnHold(event: IAstEventMusicOnHoldStart) {
        this.logger.debug("handle MusicOnHold %j", event.Event, event.Channel);
        let channel = this.channels.get(event.Uniqueid);
        if (channel) {
            if (event.Event === AST_EVENT.MUSIC_ON_HOLD_START) {
                channel.mohDate = event.$time;
                channel.mohClass = event.Class;
            } else {
                channel.mohDate = null;
                channel.mohClass = null;
            }
        } else {
            this.logger.warn("Ignored MusicOnHold for unknown channel %j", event);
        }
    }

    private _getTraceId(channel: Channel, callbackFn: IDfiCallbackResult, context?) {
        channel.getVariable(VARIABLE_TRACE_ID, onResponse, this);

        function onResponse(traceId) {
            this.logger.trace("TraceId for channel %s is %s", channel.name, traceId);
            AstUtil.maybeCallbackOnce(callbackFn, context, null, traceId);

        }
    }

    /**
     *
     * @param {Channel} channel
     * @private
     */
    private _addChannel(channel) {
        if (!this.channels.has(channel.id)) {
            let technology = channel.technology;
            if (!this.technologyCount.hasOwnProperty(technology)) {
                this.technologyCount[technology] = 1;
            } else {
                this.technologyCount[technology]++;
            }
            this.channels.add(channel);
            this.logger.trace('count: " %j "', this.technologyCount);
        } else {
            this.channels.add(channel);
        }
    }

    /**
     * Removes channels that have been hung more than {@link REMOVAL_THRESHOLD} milliseconds.
     */
    private _removeOldChannels() {
        let now = moment();
        let dateOfRemoval;

        let channels = this.channels.toArray();
        channels.forEach(onEachChannel, this);

        function onEachChannel(channel) {
            if (!channel) {
                this.logger.error();
            }
            dateOfRemoval = channel.get("dateOfRemoval");
            if (channel.get("state").status === ChannelStates.HANGUP && dateOfRemoval != null) {
                if (channel.destroyed) {
                    return;
                }
                let diff = now.diff(dateOfRemoval, "second");
                if (diff >= REMOVAL_THRESHOLD) {
                    this.logger.info("Destroing channel %j(%s) due remove treshold", channel.name, channel.get("id"));

                    this._channels.remove(channel);
                    channel.destroy();
                }
            }
        }
    }

    private  _addNewChannel(event) {

        /**
         * type Channel
         */
        let channel = new Channel(event);
        channel.stateChanged(event.$time, ChannelState.byValue(parseInt(event.ChannelState, 10)));

        this.logger.info("Adding new channel %j-%j(%s)", channel.name, channel.id, channel.state.name);
        this._addChannel(channel);

        this._getTraceId(channel, (traceId) => {
            if (!traceId) {
                return;
            }
            let name = channel.name;

            let reS = /^local\//;
            let reE = /,1$|;1$/;
            if (traceId && (!reS.test(name.toLowerCase()) || reE.test(name) )) {

                let callbackData: IDfiAstOriginateCallbackData = this.server.actions.originate.getOriginateCallbackDataByTraceId(traceId);
                if (callbackData && callbackData.channel == null) {
                    try {
                        callbackData.callbackFn.onDialing(channel);
                    } catch (t) {
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

const EVENTS: IDfiAstEventsChannelManager = Object.assign(
    Object.assign({}, AsteriskManager.events),
    {
        CHANNEL_ADD: Symbol("channelr:add")
    }
);

export = ChannelManager;
