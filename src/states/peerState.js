"use strict";
const AsteriskState = require("../internal/asteriskState");
const PeerStates = require("../enums/peerStates");
class PeerState extends AsteriskState {
    static byValue(status) {
        return AsteriskState.byValue(status, this);
    }
    static byName(status) {
        return AsteriskState.byName(status, this);
    }
    static byNameOrValue(status) {
        return AsteriskState.byNameOrValue(status, this);
    }
}
PeerState.STATES = PeerStates;
module.exports = PeerState;
//# sourceMappingURL=peerState.js.map