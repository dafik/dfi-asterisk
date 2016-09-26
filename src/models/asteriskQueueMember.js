"use strict";
const AsteriskModel = require('../internal/asteriskModel'),
    dAmiLib = require("local-dfi-asterisk-ami"),
    actions = dAmiLib.Actions,

    responses = dAmiLib.Responses,

    QueueMemberState = require('../enums/queueMemberState'),

    PROPERTY_STATE = "state",
    PROPERTY_PENALTY = "penalty",
    PROPERTY_PAUSED = "paused";


class AsteriskQueueMember extends AsteriskModel {


    initialize() {


        if (this.getProp('sourceEvent') == 'queuemember') {
            this.set('interface', this.get('location'));
            this.set('membername', this.get('name'));

            this.unset('location');
            this.unset('name');
        }

        this.id = this.get('interface');
        this.set('state', QueueMemberState.byValue(this.get('status')));
    }

    update(event) {
        let attrs = this._filterAttributes(event, ['file', 'line', 'func']);

        for (let attr in attrs) {
            if (attr == 'variables') {

            } else {
                var x1 = ['sequencenumber', 'ringinuse'];
                if (this.has(attr)) {
                    if (attrs[attr] != this.get(attr)) {
                        this.set(attr, attrs[attr])
                    }
                } else {
                    if (-1 == x1.indexOf(attr)) {
                        let cc = 1;
                    }
                    this.set(attr, attrs[attr])
                }
            }
        }
    }


    /**
     * @param {boolean} paused
     */
    setPaused(paused) {
        /**
         * @type {QueuePause}
         */
        var action = new actions.QueuePause(this.interface, this.queue.getName(), paused, null);
        this._sendPauseAction(action);
    }

    /**
     * @param {boolean} paused
     */
    setPausedAll(paused) {
        /**
         * @type {QueuePause}
         */
        var action = new actions.QueuePause(this.interface, null, paused, null);
        this._sendPauseAction(action);
    }

    /**
     * @param {QueuePause} action
     */
    _sendPauseAction(action) {
        this.server.sendAction(action, onResponse);

        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                //Message: Interface not found
                if (action.Queue != null) {
                    //Message: Interface not found
                    throw new Error('NoSuchInterfaceException("Unable to change paused state for \'"' + action.Interface + "' on '" + action.Queue + "': " + response.getMessage());
                }
                else {
                    throw new Error('NoSuchInterfaceException("Unable to change paused state for \'"' + action.Interface + "' on all queues: " + response.getMessage());
                }
            }
        }
    }


    /**
     * @returns boolean
     */
    isStatic() {
        return this.membership != null && "static".equals(this.membership);
    }

    /**
     * @returns boolean
     */
    isDynamic() {
        return this.membership != null && "dynamic".equals(this.membership);
    }


    /**
     * @param {int} penalty
     */
    setPenalty(penalty) {
        if (penalty < 0) {
            throw new Error('IllegalArgumentException("Penalty must not be negative")');
        }
        var self = this;
        /**
         * @type {QueuePenaltyAction}
         */
        var action = new actions.QueuePenalty(this.interface, penalty, this.queue.getName());
        this.server.sendAction(action, onResponse);

        function onResponse(err, response) {
            if (response instanceof responses.ManagerError) {
                throw new Error('InvalidPenaltyException("Unable to set penalty for \'"' + self.interface + '"\' on \'"' + self.queue.getName() + '"\': " + response.getMessage());');
            }
        }
    }

    /**
     * @param {QueueMemberState} state
     */
    stateChanged(state) {
        var oldState = this.get('state');
        if (oldState && state.status != oldState.status) {
            this.set('state', state);
            this.emit(Events.PROPERTY_STATE, this, {old: oldState, new: state});
        }
    }

    penaltyChanged(penalty) {
        var oldPenalty = this.get('penalty');
        if (oldPenalty != penalty) {
            this.set('penalty', penalty);
            this.emit(Events.PROPERTY_PENALTY, this, {old: oldPenalty, new: penalty});
        }
    }

    pausedChanged(paused) {
        var oldPaused = this.get('paused');
        this.set('paused', paused);
        this.emit(Events.PROPERTY_PAUSED, this, {old: oldPaused, new: paused});
    }

    isAvailable() {
        return ((this.state.getStatus() == QueueMemberState.DEVICE_NOT_INUSE) && (this.paused == 0));
    }
}

var Events = {
    PROPERTY_STATE: 'queueMember:' + PROPERTY_STATE,
    PROPERTY_PENALTY: 'queueMember:' + PROPERTY_PENALTY,
    PROPERTY_PAUSED: 'queueMember:' + PROPERTY_PAUSED
};


module.exports = AsteriskQueueMember;
module.exports.Events = Events;