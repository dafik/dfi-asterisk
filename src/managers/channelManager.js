"use strict";
const
    _ = require('lodash'),
    Moment = require('moment'),

    AsteriskManager = require('../internal/asteriskManager'),
    dAmiLib = require("local-dfi-asterisk-ami"),
    actions = dAmiLib.Actions,

    AsteriskChannel = require('../models/asteriskChannel'),

    ChannelsCollection = require('../collections/channels'),


    AsteriskExtension = require('../models/asteriskExtension'),
    AsteriskCallerId = require('../models/asteriskCallerId'),
    CallDetailRecord = require('../objects/callDetailRecord'),

    ChannelState = require('../enums/channelState'),
    ChannelStates = ChannelState.prototype.States,
    HangupCause = require('../enums/hangupCause'),

    astUtil = require('../objects/astUtil');


const REMOVAL_THRESHOLD = 5; // 15 minutes in seconds
const VARIABLE_TRACE_ID = "AJ_TRACE_ID";

//private static final long REMOVAL_THRESHOLD = 15 * 60 * 1000L; // 15 minutes

/**
 * Manages channel events on behalf of an AsteriskServer.
 * Creates a new instance.
 *
 */
class ChannelManager extends AsteriskManager {
    constructor(options, state) {
        super(options, state, new ChannelsCollection());

        this.set('technologyCount', {});
    }

    get technologyCount() {
        return this.get('technologyCount')
    }

    /**
     *
     * @returns {ChannelsCollection}
     */
    get channels() {
        return this.get('collection');
    }

    /**
     *
     * @param {list<String>} variables
     * @param {function(string)} [callback]
     * @param {*} [thisp] callback this
     */
    start(callback, thisp) {

        /**
         *
         * @param {Error} err
         * @param {CommandResponse} resoponse
         */
        function onTypes(err, resoponse) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            var found = [];
            var lines = resoponse.getResults();
            lines.splice(0, 2);
            lines.splice(lines.length - 2);
            lines.forEach(onEachLine);
            /**
             *
             * @param {String} line
             */
            function onEachLine(line) {
                found.push(line.replace(/(\w+).*/, "$1"));
            }

            found.forEach(function (technology) {
                this.technologyCount[technology] = 0;
            }, this);


            /**
             * @type {StatusAction}
             */
            var sa;
            /**
             * @type {StatusEvent}
             */
            var statusEvent;
            //sa = new actions.Status();
            sa = new actions.CoreShowChannels();


            this.server.sendEventGeneratingAction(sa, onResponse, this);

        }

        function finish() {
            if (typeof callback == "function") {
                this.server.loggers.logger.info('manager "ChannelManager" started');
                callback.call(thisp, null, 'channelManager');
            }
        }

        /**
         * @param err
         * @param {ManagerResponse} re
         */
        function onResponse(err, re) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            re.getEvents().forEach(onForeach, this);
            finish.call(this);
        }

        /**
         * @param {AsteriskEvent} event
         */
        function onForeach(event) {
            if (event.event == 'status' || event.event == 'coreshowchannel') {
                handleStatusEvent.call(this, event);
            } else {
                var x = 1;
            }
        }

        /**
         *
         * @param {StatusEvent} event
         */
        function handleStatusEvent(event) {

            /**
             * @type {AsteriskChannel}
             */
            var channel;

            /**
             * @type {AsteriskExtension}
             */
            var extension;

            /**
             * @type  boolean
             */
            var isNew = false;

            /**
             * @type {{}}
             */
            var variables = event.variables;

            channel = this.getChannelById(event.uniqueid);
            if (channel == null) {

                /**
                 * @type {Moment}
                 */
                var now = new Moment();
                /**
                 * @type {Moment}
                 */
                var dateOfCreation;

                if (event.seconds != null) {
                    dateOfCreation = new Moment(now.subtract(event.seconds, 'seconds'));
                } else {
                    dateOfCreation = now;
                }
                var attrs = event;
                attrs['dateOfCreation'] = dateOfCreation;

                channel = new AsteriskChannel(attrs, {server: this.server});
                isNew = true;
                if (variables != null) {

                    /**
                     * @type {String}
                     */
                    var variable;
                    /**
                     * @type {String}
                     */
                    var key;
                    for (key in variables) {
                        if (variables.hasOwnProperty(key)) {
                            variable = variables[key];
                            channel.updateVariable(key, variable);
                        }
                    }
                }
            }

            if (event.context == null && event.exten == null && event.priority == null) {
                extension = null;
            } else {
                extension = new AsteriskExtension({
                    context: event.context,
                    exten: event.exten,
                    priority: event.priority,
                    application: event.application,
                    appData: event.applicationdata
                }, {server: this.server});
            }
            channel.set('account', event.accountcode);
            if (event.channelstate != null) {
                channel.stateChanged(event.dateReceived, ChannelState.byValue(event.channelstate));
            }
            channel.extensionVisited(event.dateReceived, extension);

            if (this.server.managers.bridge.enabled && event.bridgeid) {
                var bridge = this.server.managers.bridge.bridges.get(event.bridgeid);
                if (bridge) {
                    bridge.get('channels').add(channel);
                    channel.get('bridges').add(bridge);
                } else {
                    var x = 1;
                }
            }
            /**
             * @type {AsteriskChannel}
             */
            var linkedChannel = this.getChannelById(event.linkedid);
            if (linkedChannel != null) {
                // the date used here is not correct!
                channel.channelLinked(event.dateReceived, linkedChannel);
                linkedChannel.channelLinked(event.dateReceived, channel);
            }


            if (isNew) {
                //this.logger.info("Adding new channel " + Moment.unix(event.uniqueid).format() + ' ' + channel.get('id') + ' - ' + channel.get('name'));
                this.logger.info('Adding new channel %j (%j)', channel.get('channel'), channel.id);
                this._addChannel(channel);
            }
        }


        this.server.loggers.logger.info('starting manager "ChannelManager"');

        if (!this.enabled) {
            finish.call(this);
            return
        }

        var map = {
            //channelState
            'newchannel': this._handleNewChannelEvent,
            //TODO CHECK
            //channelState
            'newexten': this._handleNewExtenEvent,
            //channelState
            'newstate': this._handleNewStateEvent,
            //channelState
            //calleridname
            //calleridnum
            //TODO to chyba usunac
            //var x = 1;
            'newcallerid': this._handleNewCallerIdEvent,
            //channelState
            //destChannelState
            'dialbegin': this._handleDialEvent,
            //channelState
            //destChannelState
            'dialend': this._handleDialEvent,
            'rename': this._handleRenameEvent,
            //channelState
            'hangup': this._handleHangupEvent,
            'cdr': this._handleCdrEvent,
            //channelState
            'varset': this._handleVarSetEvent,
            //channelState
            'softhanguprequest': this._handleHangupRequest,
            //channelState
            'hanguprequest': this._handleHangupRequest,
            'newconnectedline': this._handleNewConnectedLine,
            "musiconholdstart": this._handleMusicOnHold,
            "musiconholdstop": this._handleMusicOnHold,
            //channelState
            'dtmfbegin': this._handleDtmfEvent,
            //channelState
            'dtmfend': this._handleDtmfEvent,
            //parkeeChannelState
            'parkedcall': this._handleParkedCallEvent,
            //parkeeChannelState
            //parkerChannelState
            'parkedcallgiveup': this._handleParkedCallGiveUpEvent,
            //parkeeChannelState
            //parkerChannelState
            'parkedcalltimeout': this._handleParkedCallTimeOutEvent,
            //parkeeChannelState
            //parkerChannelState
            //retrieverChannelState
            'unparkedcall': this._handleUnparkedCallEvent
        };

        this._mapEvents(map);


        var typesAction = new actions.Command('core show channeltypes');

        this.server.sendAction(typesAction, onTypes, this);

    }

    disconnected() {
        this.channels.clear();
    }

    /**
     *
     * @param {NewchannelEvent} event
     */
    _handleNewChannelEvent(event) {
        this.logger.debug("handle  NewChannelEvent %j (%s) (%s)", event.channel, event.uniqueid, event.channelstatedesc);

        /**
         * @type {AsteriskChannel}
         */
        var channel = this.getChannelById(event.uniqueid);

        if (channel == null) {
            if (event.channel == null) {
                this.logger.info("Ignored NewChannelEvent with empty channel name (uniqueId=" + event.uniqueid + ")");
            } else {
                this._addNewChannel(event);
            }
        } else {
            // channel had already been created probably by a NewCallerIdEvent

            channel.nameChanged(event.dateReceived, event.channel);
            channel.set('callerId', new AsteriskCallerId(event.calleridname, event.calleridnum));
            channel.stateChanged(event.dateReceived, ChannelState.byValue(event.channelstate));
        }
    }

    /**
     *
     * @param {NewExtenEvent} event
     */
    _handleNewExtenEvent(event) {
        this.logger.debug("handle  NewExtenEvent channel:%j, ctx:%j, exten:%j, prio:%j", event.channel, event.context, event.exten, event.priority);

        /**
         * @type {AsteriskChannel}
         */
        var channel;

        /**
         * @type  Extension
         */
        var extension;

        channel = this.getChannelById(event.uniqueid);
        if (channel == null) {
            this.logger.error("Ignored NewExtenEvent for unknown channel " + event.channel);
            return;
        }
        extension = new AsteriskExtension({
            context: event.context,
            exten: event.exten,
            priority: event.priority,
            application: event.application,
            appData: event.applicationdata
        }, {server: this.server});

        channel.extensionVisited(event.dateReceived, extension);

    }

    /**
     *
     * @param {NewstateEvent} event
     */
    _handleNewStateEvent(event) {
        this.logger.debug("handle  NewStateEvent %j (%s)", event.channel, event.channelstatedesc);

        /**
         * @type {AsteriskChannel}
         */
        var channel = this.getChannelById(event.uniqueid);

        if (channel == null) {
            // NewStateEvent can occur for an existing channel that now has a different unique id (originate with Local/)
            channel = this.getChannelByNameAndActive(event.channel);
            if (channel != null) {
                this.logger.info("Changing unique id for '" + channel.channel + "' from " + channel.get('id') + " to " + event.uniqueid);
                channel.idChanged(event.get('dateReceived'), event.uniqueid);
            }

            if (channel == null) {
                this.logger.info("Creating new channel due to NewStateEvent '" + event.channel + "' unique id " + event.uniqueid);
                // NewStateEvent can occur instead of a NewChannelEvent
                this._addNewChannel(event, onChannel, this);
            } else {
                onChannel.call(this, channel)
            }
        } else {
            onChannel.call(this, channel)
        }
        /**
         *
         * @param {this:ChannelManager,AsteriskChannel} channel
         */
        function onChannel(channel) {
            // NewStateEvent can provide a new CallerIdNum or CallerIdName not previously received through a
            // NewCallerIdEvent. This happens at least on outgoing legs from the queue application to agents.
            if (event.calleridnum != null || event.calleridname != null) {
                channel.callerIdChanged(event.calleridname, event.calleridnum);

                // Also, NewStateEvent can return a new channel name for the same channel uniqueid, indicating the channel has been
                // renamed but no related RenameEvent has been received.
                // This happens with mISDN channels (see AJ-153)
                if (event.channel != null && event.channel != channel.get('name')) {
                    this.logger.info("Renaming channel (following NewStateEvent) '" + channel.get('name') + "' to '" + event.channel + "'");
                    channel.nameChanged(event.dateReceived, event.channel);
                }
            }

            if (event.channelstate != null) {

                channel.stateChanged(event.dateReceived, ChannelState.byValue(event.channelstate));

            }
        }
    }

    /**
     *
     * @param {NewCalleridEvent} event
     */
    _handleNewCallerIdEvent(event) {
        this.logger.debug("handle  NewCallerIdEvent %j (%s) %s:%s", event.channel, event.channelstatedesc, event.calleridname, event.calleridnum);

        /**
         * @type {AsteriskChannel}
         */
        var channel = this.getChannelById(event.uniqueid);

        if (channel == null) {
            // NewCallerIdEvent can occur for an existing channel that now has a different unique id (originate with Local/)
            channel = this.getChannelByNameAndActive(event.channel);
            if (channel != null) {
                this.logger.info("Changing unique id for '" + channel.get('name') + "' from " + channel.getId() + " to " + event.uniqueid);
                channel.idChanged(event.dateReceived, event.uniqueid);
            }

            if (channel == null) {
                this.logger.warn("Channel not found %s, %s" + event.channel, event.uniqueid);
                return;

                channel = this._addNewChannel(event);
            }
        }

        channel.callerIdChanged(event.calleridname, event.calleridnum);


    }


    _handleHangupRequest(event) {
        this.logger.debug("handle  HangupRequest %j", event.channel, (event.event.match('soft') ? 'soft' : 'hard'));
        var channel = this.channels.get(event.uniqueid);
        if (channel) {
            channel.set('hangupRequest', event.datereceivied)
            channel.set('hangupRequestMethod', event.event == 'hanguprequest' ? 'hard' : 'soft');
        } else {
            this.logger.warn('Ignored hangupRequest for unknown channel %j', event);
        }


    }

    /**
     *
     * @param {HangupEvent} event
     */
    _handleHangupEvent(event) {
        this.logger.debug('handle HangupEvent: %j (%s)', event.channel, event.channelstatedesc, event.cause_txt);

        /**
         * @type  HangupCause
         */
        var cause = null;

        /**
         *
         * @type {AsteriskChannel}
         */
        var channel = this.getChannelById(event.uniqueid);

        if (channel == null) {
            channel = this.getChannelByName(event.channel);
            if (channel == null) {
                this.logger.error("Ignored HangupEvent for unknown channel " + event.uniqueid + '@' + Moment.unix(event.uniqueid).format() + ' - ' + event.channel);
                return;
            } else {
                var x = 1;
            }
        }

        if (event.cause != null) {
            cause = HangupCause.byValue(event.cause);
        } else {
            cause = HangupCause.byValue(-1);
        }
        channel.handleHangup(event.dateReceived, cause, event.cause_txt);
        this.logger.info('Removing channel "' + channel.get('name') + '" due to hangup (' + cause.name + ')"');

        var technology = channel.getTechnology();
        if (this.technologyCount.hasOwnProperty(technology)) {
            if (this.technologyCount[technology] > 0) {
                this.technologyCount[technology]--;
            } else {
                var tmp = 1;
            }
        } else {
            var tmp = 1;
        }


    }

    /**
     *
     * @param {DialBeginEvent|DialEndEvent} event
     */
    _handleDialEvent(event) {
        this.logger.debug('handle DialEvent: %j, %j (%s)', event.event, event.channel, event.channelstatedesc);

        /**
         * @type {AsteriskChannel}
         */
        var sourceChannel = this.getChannelById(event.uniqueid);

        /**
         * @type {AsteriskChannel}
         */
        var destinationChannel = this.getChannelById(event.destuniqueid);

        if (sourceChannel == null) {
            if (event.destchannel && event.destchannel.substring(0, 5) == 'Local') {
                this.logger.info("Ignored " + event.event + " for unknown source channel dest:" + event.destchannel + " with unique id " + event.destuniqueid);
            } else {
                this.logger.warn("Ignored DialEvent for unknown source " + JSON.stringify(event));
            }
            return;
        }
        if (destinationChannel == null) {
            delete event.lines;
            delete event.EOL;
            delete event.privilege;
            delete event.variables;
            delete event.event;
            this.logger.warn("Ignored DialEvent for unknown destination %j ", event);
            return;
        }
        this.logger.info('"' + sourceChannel.get('name') + '"  dialed "' + destinationChannel.get('name') + '" event: "' + event.event + '"');

        /*this._getTraceId(sourceChannel, function () {
         this._getTraceId(destinationChannel, function () {
         sourceChannel.channelDialed(event.dateReceived, destinationChannel);
         destinationChannel.channelDialing(event.dateReceived, sourceChannel);
         }, this);
         }, this);*/

    }

    /**
     *
     * @param {RenameEvent} event
     */
    _handleRenameEvent(event) {
        this.logger.debug("handle  RenameEvent %j", event);

        /**
         * @type {AsteriskChannel}
         */
        var channel = this.getChannelById(event.uniqueid);

        if (channel == null) {
            this.logger.error("Ignored RenameEvent for unknown channel with uniqueId " + event.uniqueid);
            return;
        }
        this.logger.info("Renaming channel '" + channel.get('name') + "' to '" + event.newname + "', uniqueId is " + event.uniqueid);

        channel.nameChanged(event.dateReceived, event.newname);

    }

    /**
     *
     * @param {CdrEvent} event
     */
    _handleCdrEvent(event) {
        this.logger.debug("handle  CdrEvent %j", event);

        /**
         * @type {AsteriskChannel}
         */
        var channel = this.getChannelById(event.uniqueid);

        /**
         * @type {AsteriskChannel}
         */
        var destinationChannel = this.getChannelByName(event.destinationchannel);

        /**
         * @type {CallDetailRecord}
         */
        var cdr;

        if (channel == null) {
            this.logger.info("Ignored CdrEvent for unknown channel with uniqueId " + event.uniqueid);
            return;
        }

        cdr = new CallDetailRecord(channel, destinationChannel, event);


        channel.callDetailRecordReceived(event.dateReceived, cdr);

    }

    /**
     *
     * @param {ParkedCallEvent} event
     */
    _handleParkedCallEvent(event) {
        this.logger.debug("handle  ParkedCallEvent %j", event);
        // Only bristuffed versions: AsteriskChannel channel = this.getChannelById(event. getUniqueid());

        /**
         * @type {AsteriskChannel}
         */
        var channel = this.getChannelByNameAndActive(event.parkeechannel);

        if (channel == null) {
            this.logger.info("Ignored ParkedCallEvent for unknown channel " + event.parkeechannel);
            return;
        }


        // todo The context should be "parkedcalls" or whatever has been configured in features.conf
        // unfortunately we don't get the context in the ParkedCallEvent so for now we'll set it to null.

        /**
         * @type {Extension}
         */
        var ext = new Extension(null, event.parkeeexten, 1, null, null);
        channel.setParkedAt(ext);
        this.logger.info("Channel " + channel.get('name') + " is parked at " + channel.get('parkedat').getExtension());

    }

    /**
     *
     * @param {ParkedCallGiveUpEvent} event
     */
    _handleParkedCallGiveUpEvent(event) {
        this.logger.debug("handle  ParkedCallGiveUpEvent %j", event);
        // Only bristuffed versions: AsteriskChannel channel = this.getChannelById(event. get('uniqueid'));

        /**
         * @type {AsteriskChannel}
         */
        var channel = this.getChannelByNameAndActive(event.parkeechannel);

        if (channel == null) {
            this.logger.info("Ignored ParkedCallGiveUpEvent for unknown channel " + event.parkeechannel);
            return;
        }


        /**
         * @type {Extension}
         */
        var wasParkedAt = channel.get('parkedat');

        if (wasParkedAt == null) {
            this.logger.info("Ignored ParkedCallGiveUpEvent as the channel was not parked");
            return;
        }


        channel.setParkedAt(null);
        this.logger.info("Channel " + channel.get('name') + " is unparked (GiveUp) from " + wasParkedAt.getExtension());
    }

    /**
     *
     * @param {ParkedCallTimeOutEvent} event
     */
    _handleParkedCallTimeOutEvent(event) {
        this.logger.debug("handle  ParkedCallTimeOutEvent %j", event);
        // Only bristuffed versions: AsteriskChannel channel = this.getChannelById(event. get('uniqueid'));

        /**
         * @type  AsteriskChannel
         */
        var channel = this.getChannelByNameAndActive(event.parkeechannel);

        if (channel == null) {
            this.logger.info("Ignored ParkedCallTimeOutEvent for unknown channel " + event.parkeechannel);
            return;
        }


        /**
         * @type  Extension
         */
        var wasParkedAt = channel.get('parkedat');

        if (wasParkedAt == null) {
            this.logger.info("Ignored ParkedCallTimeOutEvent as the channel was not parked");
            return;
        }


        channel.setParkedAt(null);
        this.logger.info("Channel " + channel.get('name') + " is unparked (Timeout) from " + wasParkedAt.getExtension());
    }

    /**
     *
     * @param {UnParkedCallEvent} event
     */
    _handleUnparkedCallEvent(event) {
        this.logger.debug("handle  UnparkedCallEvent %j", event);
        // Only bristuffed versions: AsteriskChannel channel = this.getChannelById(event. get('uniqueid'));

        /**
         * @type {AsteriskChannel}
         */
        var channel = this.getChannelByNameAndActive(event.parkeechannel);

        if (channel == null) {
            this.logger.info("Ignored UnparkedCallEvent for unknown channel " + event.parkeechannel);
            return;
        }


        /**
         * @type  Extension
         */
        var wasParkedAt = channel.get('parkedat');

        if (wasParkedAt == null) {
            this.logger.info("Ignored UnparkedCallEvent as the channel was not parked");
            return;
        }


        channel.setParkedAt(null);
        this.logger.info("Channel " + channel.get('name') + " is unparked (moved away) from " + wasParkedAt.getExtension());
    }

    /**
     *
     * @param {VarSetEvent} event
     */
    _handleVarSetEvent(event) {
        this.logger.trace("handle  VarSetEvent on %j -> %j : %j", event.channel, event.variable, event.value);
        if (event.uniqueid == null) {
            return;
        }
        /**
         * @type  AsteriskChannel
         */
        var channel = this.getChannelById(event.uniqueid);
        if (channel == null) {
            //this.logger.info("Ignored VarSetEvent for unknown channel with uniqueId " + event.uniqueid);
            return;
        }


        channel.updateVariable(event.variable, event.value);

    }

    /**
     *
     * @param {DtmfBeginEvent|DtmfEndEvent} event
     */
    _handleDtmfEvent(event) {
        this.logger.debug("handle  DtmfEvent %j", event);


        // we are only interested in END events
        if (event.event == 'DTMFBegin') {
            return;
        }

        if (event.uniqueid == null) {
            return;
        }


        /**
         * @type  AsteriskChannel
         */
        var channel = this.getChannelById(event.uniqueid);
        if (channel == null) {
            this.logger.info("Ignored DtmfEvent for unknown channel with uniqueId " + event.uniqueid);
            return;
        }


        /**
         * @type  string
         */
        var dtmfDigit;
        if (event.digit == null || event.digit.length < 1) {
            dtmfDigit = null;
        }
        else {
            dtmfDigit = event.digit.charAt(0);
        }


        if (event.direction == 'Received') {

            channel.dtmfReceived(dtmfDigit);
        }
        if (event.direction == 'Sent') {
            channel.dtmfSent(dtmfDigit);
        }

    }


    _handleNewConnectedLine(event) {
        this.logger.debug("handle  NewConnectedLine %j", event.channel);
        /**
         * @type AsteriskChannel
         */
        var channel = this.channels.get(event.uniqueid);
        var linkedChannel = this.channels.get(event.linkedid);
        if (channel && linkedChannel) {
            if (channel.get('linkedid') != event.linkedid) {
                var x = 1;
            } else {
                var x = 2;
            }
            channel.channelLinked(event.dateReceived, linkedChannel)

        } else {
            this.logger.warn('Ignored NewConnectedLine for unknown channel %j', event);
        }
    }

    _handleMusicOnHold(event) {
        this.logger.debug("handle MusicOnHold %j", event.event, event.channel);
        var channel = this.channels.get(event.uniqueid);
        if (channel) {
            if (event.event == 'musiconholdstart') {
                channel.set('moh', event.dateReceived);
                channel.set('mohClass', event.class);
            } else {
                channel.unset('moh', event.dateReceived);
                channel.unset('mohClass', event.class);
            }
        } else {
            this.logger.warn('Ignored MusicOnHold for unknown channel %j', event);
        }
    }


    /**
     * Returns a collection of all active AsteriskChannels.
     * @returns {AsteriskChannel[]}  a collection of all active AsteriskChannels.
     */
    getChannels() {
        /**
         * @type {AsteriskChannel[]}
         */
        var copy = [];

        this.channels.forEach(onForeach);
        /**
         * @param {AsteriskChannel} channel
         */
        function onForeach(channel) {
            if (channel.getState() != ChannelState.HANGUP) {
                copy.push(channel);
            }
        }

        return copy;
    }

    getChannelsByDateStart() {

        var sorted = new SortedMap();
        this.channels.forEach(function (channel) {
            sorted.set(channel.get('id'), channel);
        }, this);

        return sorted.toArray();

    }

    /**
     * Returns a channel from the ChannelManager's cache with the given name
     * If multiple channels are found, returns the most recently CREATED one.
     * If two channels with the very same date exist, avoid HANGUP ones.
     *
     * @param {String} name the name of the requested channel.
     * @returns {AsteriskChannel|null}  the (most recent) channel if found, in any state, or null if none found.
     */
    getChannelByName(name) {

        /**
         * @type {Moment}
         */
        var dateOfCreation = null;

        /**
         * @type {AsteriskChannel}
         */
        var channel = null;

        if (name == null) {
            return null;
        }

        /**
         * @param {AsteriskChannel} tmp
         * @returns {AsteriskChannel}
         */
        function onForeach(tmp) {
            if (tmp.get('name') != null && tmp.get('name') == name) {
                // return the most recent channel or when dates are similar, the active one

                if (dateOfCreation != null) {
                    var x = 1;
                }
                if (dateOfCreation == null || tmp.get('dateOfCreation').after(dateOfCreation) || (tmp.get('dateOfCreation').equals(dateOfCreation) && tmp.getState() != ChannelState.HANGUP)) {
                    channel = tmp;
                    dateOfCreation = channel.get('dateOfCreation');
                }
            }
        }

        this.channels.forEach(onForeach);
        return channel;

    }

    /**
     * Returns a NON-HANGUP channel from the ChannelManager's cache with the given name.
     *
     * @param {String} name the name of the requested channel.
     * @return {AsteriskChannel} the NON-HANGUP channel if found, or null if none is found.
     */
    getChannelByNameAndActive(name) {
        // In non bristuffed AST 1.2, we don't have uniqueid header to match the channel
        // So we must use the channel name
        // Channel name is unique at any give moment in the  * server
        // But asterisk-java keeps Hangup channels for a while.
        // We don't want to retrieve hangup channels.
        /**
         * @type  AsteriskChannel
         */
        var channel = null;
        if (name == null) {
            return null;
        }
        this.channels.forEach(onForeach);
        /**
         *
         * @param {AsteriskChannel} tmp
         * @returns {AsteriskChannel}
         */
        function onForeach(tmp) {
            if (tmp.get('name') != null && tmp.get('name') == name && tmp.getState() != ChannelState.HANGUP) {
                channel = tmp;
                return channel;
            }
        }


    }

    /**
     * @param {String} id
     * @returns {AsteriskChannel}
     */
    getChannelById(id) {
        if (id == null) {
            return null;
        }
        if (this.channels.has(id)) {
            return this.channels.get(id)
        }

        return null;
    }

    /**
     * Returns the other side of a local channel.
     * <p/>
     * Local channels consist of two sides, like
     * "Local/1234@from-local-60b5,1" and "Local/1234@from-local-60b5,2" (for Asterisk 1.4) or
     * "Local/1234@from-local-60b5;1" and "Local/1234@from-local-60b5;2" (for Asterisk 1.6)
     * this method returns the other side.
     *
     * @param {AsteriskChannel} localChannel one side
     * @return {AsteriskChannel| null} the other side, or <code>null</code> if not available or if the given channel is not a local channel.
     */
    getOtherSideOfLocalChannel(localChannel) {

        /**
         * @type {string}
         */
        var name;

        /**
         * @type {string}
         */
        var num;

        if (localChannel == null) {
            return null;
        }

        name = localChannel.get('name');


        var reS = /^Local\//;
        var reE = /,.$|;.$/;

        //if (name == null || !reS.test(name.startsWith("Local/") || (name.charAt(name.length() - 2) != ',' && name.charAt(name.length() - 2) != ';')) {
        if (name == null || !reS.test(name) || !reE.test(name)) {
            return null;
        }

        num = name.substring(name.length - 1);

        if (num == '1') {
            return this.getChannelByName(name.substring(0, name.length - 1) + "2");
        }
        else if (num == '2') {
            return this.getChannelByName(name.substring(0, name.length - 1) + "1");
        }
        else {
            return null;
        }
    }


    /**
     *
     * @param {AsteriskChannel} channel
     * @private
     * @param {function({String})} callback
     * @param {This:thisp} [thisp]
     */
    _getTraceId(channel, callback, thisp) {
        channel.getVariable(VARIABLE_TRACE_ID, onResponse, this);

        function onResponse(traceId) {
            this.logger.trace("TraceId for channel " + channel.get('channel') + " is " + traceId);

            if (typeof callback == "function") {
                callback.call(thisp, traceId);
            }
        }
    }

    /**
     *
     * @param {AsteriskChannel} channel
     * @private
     */
    _addChannel(channel) {
        if (!this.channels.has(channel.id)) {
            var technology = channel.getTechnology();
            if (!this.technologyCount.hasOwnProperty(technology)) {
                this.technologyCount[technology] = 1;
            } else {
                this.technologyCount[technology]++;
            }
            this.channels.add(channel);
            this.logger.trace('count: " %j "', this.technologyCount);
        } else {
            this.channels.replace(channel.get('id'), channel);
        }
    }

    /**
     * Removes channels that have been hung more than {@link REMOVAL_THRESHOLD} milliseconds.
     */
    _removeOldChannels() {
        var now = new Moment();
        var dateOfRemoval;

        var channels = this.channels.toArray();
        channels.forEach(onEachChannel, this);

        function onEachChannel(channel) {
            if (_.isUndefined(channel) || _.isUndefined(channel.get)) {

                var x = 1;
            }
            dateOfRemoval = channel.get('dateOfRemoval');
            if (channel.get('state').status == ChannelStates.HANGUP && dateOfRemoval != null) {
                if (channel.get('isDestroyed')) {
                    return;
                }
                /**
                 * @type {number}
                 */
                var diff = now.diff(dateOfRemoval, 'second');
                if (diff >= REMOVAL_THRESHOLD) {
                    this.logger.info('Destroing channel %j(%s) due remove treshold', channel.get('name'), channel.get('id'));

                    this.channels.remove(channel);
                    channel.destroy();
                }
            }
        }
    }

    /**
     *
     * @param {string} uniqueId
     * @param {string} name
     * @param {Moment} dateOfCreation
     * @param {string} callerIdNumber
     * @param {string} callerIdName
     * @param {ChannelState} state
     * @param {string} account
     * @returns {AsteriskChannel}
     * @private
     * @param {function(AsteriskChannel)} callback
     * @param {*} [thisp]
     */
    _addNewChannel(event) {

        /**
         * type AsteriskChannel
         */
        var channel = new AsteriskChannel(event, {server: this.server});
        channel.stateChanged(event.dateReceived, ChannelState.byValue(event.channelstate));

        this.logger.info('Adding new channel %j-%j(%s)', channel.get('name'), channel.id, channel.get('state').name);
        this._addChannel(channel);


        this._getTraceId(channel, onTraceId, this);

        this.emit('add', channel);

        return channel;


        /**
         *
         * @param {this:ChannelManager,String}traceId
         */
        function onTraceId(traceId) {
            if (!traceId) {
                return
            }

            var name = channel.get('name');
            if (traceId) {
                channel.setProp('traceId', traceId);
            }
            var reS = /^local\//;
            var reE = /,1$|;1$/;
            if (traceId && (!reS.test(name.toLowerCase()) || reE.test(name) )) {

                /**
                 * @type {OriginateCallbackData}
                 */
                var callbackData;
                callbackData = this.server.actions.originate.getOriginateCallbackDataByTraceId(traceId);
                if (callbackData && callbackData.getChannel() == null) {
                    callbackData.setChannel(channel);
                    try {
                        callbackData.getCallback().onDialing(channel);
                    }
                    catch (t) {
                        //Throwable
                        this.logger.warn("Exception dispatching originate progress.", t);
                    }
                }
            }


        }
    }

    toJSON() {
        var obj = super.toJSON();
        obj.collection = this.channels.toJSON();

        return obj;

    }

    gc() {
        this._removeOldChannels();
    }
}


module.exports = ChannelManager;







