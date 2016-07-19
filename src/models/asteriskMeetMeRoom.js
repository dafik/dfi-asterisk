"use strict";
const AsteriskModel = require('../internal/asteriskModel'),

    dAmiLib = require("../../examples/dfi-asterisk-ami/src/dAmi"),
    actions = dAmiLib.Actions,


    COMMAND_PREFIX = "meetme",
    LOCK_COMMAND = "lock",
    UNLOCK_COMMAND = "unlock";


class MeetMeRoom extends AsteriskModel {
    initialize(roomNumber) {
        this.roomNumber = roomNumber;
        /**
         *
         * @type {Collection<number,MeetMeUser>}
         */
        this.users = new Map();
    }

    /**
     *
     * @returns {string}
     */
    getRoomNumber() {
        return this.roomNumber;
    };

    /**
     *
     * @returns {MeetMeUser[]}
     */
    getUsers() {

        return this.users.toArray();

    };

    /**
     *
     * @returns {boolean}
     */
    isEmpty() {

        return this.users.isEmpty();

    };

    /**
     *
     * @param {MeetMeUser} user
     */
    addUser(user) {

        this.users.put(user.getUserNumber(), user);

    };

    /**
     *
     * @param {number} userNumber
     * @returns {MeetMeUser}
     */
    getUser(userNumber) {

        return this.users.get(userNumber);
    };

    /**
     *
     * @param {MeetMeUser} user
     */
    removeUser(user) {

        this.users.remove(user.getUserNumber());

    };

// action methods
    /**
     * @throws ManagerCommunicationException
     */
    lock() {
        this._sendMeetMeCommand(LOCK_COMMAND);
    };

    /**
     * @throws ManagerCommunicationException
     */
    unlock() {
        this._sendMeetMeCommand(UNLOCK_COMMAND);
    };

    /**
     *
     * @param command
     * @private
     * @throws ManagerCommunicationException
     */
    _sendMeetMeCommand(command) {
        var sb = '';
        sb += COMMAND_PREFIX;
        sb += " ";
        sb += command;
        sb += " ";
        sb += this.roomNumber;

        /**
         * @type {CommandAction}
         */
        var action;
        action = new actions.CommandAction(sb.toString());

        this.server.sendAction(action);
    };


}

module.exports = MeetMeRoom;
