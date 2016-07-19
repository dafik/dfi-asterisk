"use strict";
const
    AsteriskModel = require('../internal/asteriskModel'),
    QueuesCollection = require('../collections/queues');


/**
 * Default implementation of the AsteriskAgent interface.
 */

class AsteriskAgent extends AsteriskModel {

    initialize() {

        this.set('queues', new QueuesCollection());
        this.id = this.get('id');
    }

    /**
     * @returns {QueuesCollection}
     */
    get queues() {
        return this.get('queues');
    }

    addQueue(queue) {
        this.queues.add(queue);
    }

    removeQueue(queue) {
        this.queues.remove(queue);
    }

    updateState(state) {
        var oldState = this.get('state');
        if (oldState.status != state.status) {
            this.set('state', state);
            this.emit('state', {old: oldState, new: this.get('state')});
        }
    }
}

module.exports = AsteriskAgent;