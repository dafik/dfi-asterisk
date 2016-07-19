"use strict";
const

    Moment = require('moment'),
    AsteriskManager = require('../internal/asteriskManager'),

    dAmiLib = require("../../examples/dfi-asterisk-ami/src/dAmi"),
    actions = dAmiLib.Actions,


    events = dAmiLib.Events,
    responses = dAmiLib.Responses,

    AsteriskServerEvents = require('../events/def/asteriskServerEvents'),

    MeetMeUser = require('../models/asteriskMeetMeUser'),
    MeetMeRoom = require('../models/asteriskMeetMeRoom');


const MEETME_LIST_COMMAND = "meetme list",
    MEETME_LIST_PATTERN = /^User #: ([0-9]+).*Channel: (\\S+).*$/;

class MeetMeManager extends AsteriskManager {


    constructor(options, state) {
        super(options, state);

        this.rooms = {};


        this.server.once(AsteriskServerEvents.BeforeInitialized, function () {
            this.channelManager = this.server.managers.channel
        }, this)
    }

    /**
     * @param {function(null,string)} [callback]
     * @param {*} [thisp] callback this
     */
    start(callback, thisp) {

        function finish() {
            if (typeof callback == "function") {
                this.server.loggers.logger.info('manager "MeetMeManager" started');
                callback.call(thisp, null, 'meetMeManager');
            }
        }

        this.server.loggers.logger.info('starting manager "MeetMeManager"');

        if (!this.enabled) {
            finish.call(this);
            return
        }


        var map = {
            'meetmejoin': this._handleMeetMeEvent,
            //channelState
            'meetmeleave': this._handleMeetMeEvent,
            //channelState
            'meetmemute': this._handleMeetMeEvent,
            //channelState
            //status
            'meetmetalking': this._handleMeetMeEvent,
            //channelState
            //status
            'meetmetalkrequest': this._handleMeetMeEvent,
            //channelState
            //status
            'meetmeend': this._handleMeetMeEvent
        };
        this._mapEvents(map);


        var key;
        /**
         * @type {MeetMeRoom}
         */
        var room;
        for (key in  this.rooms) {
            if (this.rooms.hasOwnProperty(key)) {
                room = this.rooms[key];
                this._populateRoom(room);
            }
        }


        finish.call(this);

    }

    disconnected() {
        /*     rooms.clear();     */
    }

    /**
     * @returns {MeetMeRoom[]}
     */
    getMeetMeRooms() {
        /**
         * @type {MeetMeRoom[]}
         */
        var result = [];
        /**
         * @type {MeetMeRoom}
         */
        var room;
        var key;
        for (key in  this.rooms) {
            if (this.rooms.hasOwnProperty(key)) {
                room = this.rooms[key];
                if (!room.isEmpty()) {
                    result.push(room);
                }
            }
        }

        return result;
    }

    /**
     *
     * @param {MeetmeEndEvent|MeetmeJoinEvent|MeetmeLeaveEvent|MeetmeMuteEvent|MeetmeTalkRequestEvent|MeetmeTalkingEvent} event
     *
     *  MeetmeEndEvent|MeetmeJoinEvent|MeetmeLeaveEvent|MeetmeMuteEvent|MeetmeTalkRequestEvent|MeetmeTalkingEvent
     */
    _handleMeetMeEvent(event) {
        /**
         * @type {String}
         */
        var roomNumber;
        /**
         * @type {number}
         */
        var userNumber;
        /**
         * @type {AsteriskChannel}
         */
        var channel;
        /**
         * @type {MeetMeRoom}
         */
        var room;
        /**
         * @type {MeetMeUser}
         */
        var user;

        roomNumber = event.get('meetme');
        if (roomNumber == null) {
            this.logger.warn("RoomNumber (meetMe property) is null. Ignoring " + event.__proto__.constructor.name);
            return;
        }

        userNumber = event.get('usernum');
        if (userNumber == null) {
            this.logger.warn("UserNumber (userNum property) is null. Ignoring " + event.__proto__.constructor.name);
            return;
        }

        user = this._getOrCreateUser(event);
        if (user == null) {
            return;
        }

        channel = user.getChannel();
        room = user.getRoom();
        /**
         * @type {Boolean}
         */
        var status;

        if (event instanceof events.MeetmeLeaveEvent) {
            this.logger.info("Removing channel " + channel.getName() + " from room " + roomNumber);
            if (room != user.getRoom()) {
                if (user.getRoom() != null) {
                    this.logger.error("Channel " + channel.getName() + " should be removed from room " + roomNumber + " but is user of room " + user.getRoom().getRoomNumber());
                    user.getRoom().removeUser(user);
                }
                else {
                    this.logger.error("Channel " + channel.getName() + " should be removed from room " + roomNumber + " but is user of no room");
                }
            }
            // should remove from the room before firing PropertyChangeEvents ?
            user.left(event.dateReceived);
            room.removeUser(user);
            channel.setMeetMeUser(null);
        }
        else if (event instanceof events.MeetmeTalkingEvent) {


            status = event.get('status');
            if (status != null) {
                user.setTalking(status);
            }
            else {
                user.setTalking(true);
            }
        } else if (event instanceof events.MeetmeMuteEvent) {


            status = event.get('status');
            if (status != null) {
                user.setMuted(status);
            }
        }
    }

    /**
     *
     * @param {MeetMeRoom} room
     * @private
     */
    _populateRoom(room) {
        /**
         * @type {CommandAction}
         */
        var meetMeListAction;

        //List < String > lines;
        //Collection < Integer >
        /**
         * @type {Array}
         */
        var userNumbers = []; // list of user numbers in the room
        var self = this;
        meetMeListAction = new actions.CommandAction(MEETME_LIST_COMMAND + " " + room.getRoomNumber());

        this.server.sendAction(meetMeListAction, onResponse);
        /**
         *
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                self.logger.error("Unable to send \"" + MEETME_LIST_COMMAND + "\" command: " + response.getMessage());
                return;
            }
            if (!(response instanceof responses.ManagerResponse)) {
                self.logger.error("Response to \"" + MEETME_LIST_COMMAND + "\" command is not a CommandResponse but " + response.__proto__.constructor.name);
                return;
            }
            var lines = response.getLines();
            lines.forEach(onForeachLines);
            /**
             *
             * @param {string} line
             */
            function onForeachLines(line) {
                var matcher;
                /**
                 * @type {number}
                 */
                var userNumber;
                /**
                 * @type {AsteriskChannel}
                 */
                var channel;
                /**
                 * @type {boolean}
                 */
                var muted = false;
                /**
                 * @type {boolean}
                 */
                var talking = false;
                /**
                 * @type {MeetMeUser}
                 */
                var channelUser;
                /**
                 * @type {MeetMeUser}
                 */
                var roomUser;
                /**
                 * @type {Moment}
                 */
                var now;
                now = Moment();

                matcher = MEETME_LIST_PATTERN.exec(line);
                if (matcher.length > 0) {
                    //userNumber = parseInt(matcher.group(1));
                    //TODO check
                    userNumber = parseInt(matcher[1]);
                    //channel = this.channelManager.getChannelByName(matcher.group(2));
                    channel = self.channelManager.getChannelByName(matcher[2]);

                    userNumbers.push(userNumber);

                    if (-1 !== line.indexOf("(Admin Muted)") || -1 !== line.indexOf("(Muted)")) {
                        muted = true;
                    }

                    if (-1 !== line.indexOf("(talking)")) {
                        talking = true;
                    }

                    channelUser = channel.getMeetMeUser();
                    if (channelUser != null && channelUser.getRoom() != room) {
                        channelUser.left(now);
                        channelUser = null;
                    }

                    roomUser = room.getUser(userNumber);
                    if (roomUser != null && roomUser.getChannel() != channel) {
                        room.removeUser(roomUser);
                        roomUser = null;
                    }

                    if (channelUser == null && roomUser == null) {
                        /**
                         * @type {MeetMeUser}
                         */
                        var user;
                        // using the current date as dateJoined is not correct but we
                        // don't have anything that is better
                        user = new MeetMeUser(self.server, room, userNumber, channel, new Moment().getDate());
                        user.setMuted(muted);
                        user.setTalking(talking);
                        room.addUser(user);
                        channel.setMeetMeUser(user);
                    }
                    else if (channelUser != null && roomUser == null) {
                        channelUser.setMuted(muted);
                        room.addUser(channelUser);
                    }
                    else if (channelUser == null) {
                        roomUser.setMuted(muted);
                        channel.setMeetMeUser(roomUser);
                    }
                    else {
                        if (channelUser != roomUser) {
                            self.logger.error("Inconsistent state: channelUser != roomUser, channelUser=" + channelUser + ", roomUser=" + roomUser);
                        }
                    }
                }
            }

            /**
             *
             * @type {MeetMeUser[]}
             */
            var users = room.getUsers();
            /**
             * @type {MeetMeUser[]}
             */
            var usersToRemove = [];

            users.forEach(function (user) {
                if (-1 == userNumbers.indexOf(user.getUserNumber())) {
                    // remove user as he is no longer in the room
                    usersToRemove.push(user);
                }
            });
            //  MeetMeUser
            usersToRemove.forEach(function (user) {
                user.left(new Moment());
                room.removeUser(user);
                user.getChannel().setMeetMeUser(null);
            });
        }
    }

    /**
     *
     * @param {MeetmeEndEvent|MeetmeJoinEvent|MeetmeLeaveEvent|MeetmeMuteEvent|MeetmeTalkRequestEvent|MeetmeTalkingEvent} event
     * @returns {*}
     * @private
     */
    _getOrCreateUser(event) {
        /**
         * @type {String}
         */
        var roomNumber;
        /**
         * @type {MeetMeRoom}
         */
        var room;
        /**
         * @type {String}
         */
        var uniqueId;
        /**
         * @type {AsteriskChannel}
         */
        var channel;
        /**
         * @type {MeetMeUser}
         */
        var user;

        roomNumber = event.get('meetme');
        room = this.getOrCreateRoom(roomNumber);
        user = room.getUser(event.get('usernum'));
        if (user != null) {
            return user;
        }

        // ok create a new one
        uniqueId = event.get('uniqueid');
        if (uniqueId == null) {
            this.logger.warn("UniqueId is null. Ignoring MeetMeEvent");
            return null;
        }

        channel = this.channelManager.getChannelById(uniqueId);
        if (channel == null) {
            this.logger.warn("No channel with unique id " + uniqueId + ". Ignoring MeetMeEvent");
            return null;
        }

        user = channel.getMeetMeUser();
        if (user != null) {
            this.logger.error("Got MeetMeEvent for channel " + channel.getName() + " that is already user of a room");
            user.left(event.dateReceived);
            if (user.getRoom() != null) {
                user.getRoom().removeUser(user);
            }
            channel.setMeetMeUser(null);
        }

        this.logger.info("Adding channel " + channel.getName() + " as user " + event.get('usernum') + " to room " + roomNumber);
        user = new MeetMeUser(this.server, room, event.get('usernum'), channel, event.dateReceived);
        room.addUser(user);
        channel.setMeetMeUser(user);
        //this.server.events.fireNewMeetMeUser(user);

        return user;
    }


    /**
     * Returns the room with the given number or creates a new one if none is
     * there yet.
     *
     * @param roomNumber number of the room to get or create.
     * @return the room with the given number.
     */
    /**
     *
     * @param {String} roomNumber
     * @returns {MeetMeRoom}
     */
    getOrCreateRoom(roomNumber) {
        /**
         * @type {MeetMeRoom}
         */
        var room;
        /**
         * @type {boolean}
         */
        var created = false;


        room = this.rooms.get(roomNumber);
        if (room == null) {
            room = new MeetMeRoom(this.server, roomNumber);
            this._populateRoom(room);
            this.rooms.put(roomNumber, room);
            created = true;
        }


        if (created) {
            this.logger.debug("Created MeetMeRoom " + roomNumber);
        }

        return room;
    }

    toJSON() {
        var obj = super.toJSON();
        obj.collection = this.rooms

        return obj;
    }

}

module.exports = MeetMeManager;
