"use strict";
const PeerStates = require('./defs/peerStates'),
    State = require('./state');


class PeerState extends State {

    constructor(status, name) {
        super();

        this.status = status;
        this.name = name;
    }

}
PeerState.prototype.States = PeerStates;
module.exports = PeerState;