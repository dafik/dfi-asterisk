"use strict";
const AsteriskModel = require('../../internal/asteriskModel'),
    _ = require('lodash'),
    ChannelsCollection = require('../../collections/channels'),
    PeerStateHistoryEntry = require('../history/peerStateHistoryEntry'),
    PeerState = require('../../enums/peerState'),
    PeerStates = require('../../enums/defs/peerStates');

/**
 * Default implementation of the AsteriskPeer.
 */
class AsteriskPeer extends AsteriskModel {

    initialize() {
        this.id = this.get('technology') + '/' + this.get('objectname');

        if (this.get('status')) {
            var stat, status = this.get('status');
            if (_.isString(status) && status.match(/OK \(.*\)/)) {
                stat = PeerState.byValue(2);
            } else {
                stat = PeerState.byName(status);
            }
        }
        this.set('stateHistory', []);
        this.stateChanged(this.get('dateReceived'), stat);

        var address = this.get('ipaddress') + ':' + this.get('ipport');
        this.set('addressHistory', []);
        this.addressChanged(this.get('dateReceived'), address);

        this.set('channels', new ChannelsCollection());
    }

    /**
     * Changes the state of this channel.
     * @param date
     * @param {PeerState} state
     */
    stateChanged(date, state) {
        /**
         * @type PeerStateHistoryEntry[]
         */
        let stateHistory = this.get('stateHistory');

        /**
         ** @type {PeerState}
         */
        let oldState = this.get('state');

        let historyEntry = new PeerStateHistoryEntry(date, state);
        /**
         * @type PeerStateHistoryEntry
         */
        let last = stateHistory.length > 0 ? stateHistory[stateHistory.length - 1] : undefined;
        if (last && last.state.status == state.status) {
            stateHistory.pop()
        } else if (stateHistory.length > 10) {
            stateHistory.shift();
        }

        stateHistory.push(historyEntry);


        this.set('state', state);
        this.set('stateHistory', this.get('stateHistory'));
        this.emit(AsteriskPeer.Events.PROPERTY_STATE, {old: oldState, new: state});
    }

    addressChanged(date, address) {
        /**
         * @type  ChannelStateHistoryEntry
         */
        var historyEntry;
        /**
         ** @type {ChannelState}
         */
        var oldAddress = this.get('address');
        if (oldAddress == address) {
            return;
        }

        // System.err.println(id + " state change: " + oldState + " => " + state
        // + " (" + name + ")");
        historyEntry = new PeerStateHistoryEntry(date, address);
        this.get('addressHistory').push(historyEntry);

        this.set('address', address);
        this.set('ipaddress', address.split(':')[0]);
        this.set('ipport', address.split(':')[1]);

        this.set('addressHistory', this.get('addressHistory'));
        this.emit(AsteriskPeer.Events.PROPERTY_ADDRESS, {old: oldAddress, new: address});
    }

    handleStatus(date, state, address) {
        var newState = PeerState.byNameOrValue(state);
        this.stateChanged(date, newState);
        if (address) {
            this.addressChanged(date, address);
        }
        //todo emit event
    }

    addChannel(channel) {
        this.get('channels').add(channel);
        this.set('channels', this.get('channels'));
    }

    removeChannel(channel) {
        this.get('channels').remove(channel.id);
    }

    _removeOldHistory() {
        let arr = this.get('stateHistory');
        /**
         * @type PeerStateHistoryEntry
         */
        let entry;
        for (let i = arr.length - 1; i >= 0; i -= 1) {
            entry = arr[i];
            if (entry.state.status == PeerStates.REGISTERED && arr.length - 1 != i) {
                arr.splice(i, 1);
            }
        }
    }
}

const PROPERTY_STATE = "state";
const PROPERTY_ADDRESS = "address";

AsteriskPeer.Events = {
    PROPERTY_STATE: 'peer' + PROPERTY_STATE,
    PROPERTY_ADDRESS: 'peer' + PROPERTY_ADDRESS
};


module.exports = AsteriskPeer;