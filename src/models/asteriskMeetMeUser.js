"use strict";
const AsteriskModel = require('../internal/asteriskModel'),
    MeetMeUserState = require('./../enums/defs/meetMeUserStates'),
    dAmiLib = require("../../examples/dfi-asterisk-ami/src/dAmi"),
    actions = dAmiLib.Actions,

    COMMAND_PREFIX = "meetme",
    MUTE_COMMAND = "mute",
    UNMUTE_COMMAND = "unmute",
    KICK_COMMAND = "kick",

    PROPERTY_TALKING = "talking",
    PROPERTY_MUTED = "muted",
    PROPERTY_STATE = "state";


class MeetMeUser extends AsteriskModel {

    initialize(server, room, userNumber, channel, dateJoined) {

        this.room = room;
        this.userNumber = userNumber;
        this.channel = channel;
        this.dateJoined = dateJoined;
        this.state = MeetMeUserState.JOINED;
    }

    /**
     * @returns {MeetMeRoom}
     */
    getRoom() {
        return this.room;
    };

    /**
     *
     * @returns {number}
     */
    getUserNumber() {
        return this.userNumber;
    };

    /**
     *
     * @returns {AsteriskChannel}
     */
    getChannel() {
        return this.channel;
    };

    /**
     *
     * @returns {Moment}
     */
    getDateJoined() {
        return this.dateJoined;
    };

    /**
     *
     * @returns {Moment}
     */
    getDateLeft() {
        return this.dateLeft;
    };

    /**
     * Sets the status to {@link MeetMeUserState#LEFT} and dateLeft to the given date.
     *
     * @param {Moment} dateLeft the date this user left the room.
     */
    left(dateLeft) {

        /**
         * @type {MeetMeUserState}
         */
        var oldState;

        oldState = this.state;
        this.dateLeft = dateLeft;
        this.state = MeetMeUserState.LEFT;

        this.emit(PROPERTY_STATE, oldState, this.state);
    };

    /**
     *
     * @returns {MeetMeUserState}
     */
    getState() {
        return this.state;
    };

    /**
     *
     * @returns {boolean}
     */
    isTalking() {
        return this.talking;
    };

    /**
     * @param {boolean} talking
     */
    setTalking(talking) {

        /**
         *
         * @type {boolean}
         */
        var oldTalking = this.talking;
        this.talking = talking;
        this.emit(PROPERTY_TALKING, oldTalking, talking);
    };

    /**
     *
     * @returns {boolean}
     */
    isMuted() {
        return this.muted;
    };

    /**
     *
     * @param {boolean} muted
     */
    setMuted(muted) {
        var oldMuted = this.muted;
        this.muted = muted;

        this.emit(PROPERTY_MUTED, oldMuted, muted);
    };

// action methods
    /**
     * @throws  ManagerCommunicationException
     */
    kick() {
        this._sendMeetMeUserCommand(KICK_COMMAND);
    };

    /**
     * @throws  ManagerCommunicationException
     */
    mute() {
        this._sendMeetMeUserCommand(MUTE_COMMAND);
    };

    /**
     * @throws  ManagerCommunicationException
     */
    unmute() {
        this._sendMeetMeUserCommand(UNMUTE_COMMAND);
    };

    /**
     * @param {string} command
     * @throws  ManagerCommunicationException
     */
    _sendMeetMeUserCommand(command) {
        var sb = '';
        sb += COMMAND_PREFIX;
        sb += " ";
        sb += command;
        sb += " ";
        sb += this.room.getRoomNumber();
        sb += " ";
        sb += this.userNumber;

        this.server.sendAction(new actions.CommandAction(sb.toString()));
    };


}
module.exports = MeetMeUser;
