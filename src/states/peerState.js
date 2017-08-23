"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskState_1 = require("../internal/asteriskState");
const peerStates_1 = require("../enums/peerStates");
class PeerState extends asteriskState_1.default {
    static byValue(status) {
        return asteriskState_1.default.byValue(status, this);
    }
    static byName(status) {
        return asteriskState_1.default.byName(status, this);
    }
    static byNameOrValue(status) {
        return asteriskState_1.default.byNameOrValue(status, this);
    }
}
PeerState.STATES = peerStates_1.default;
exports.default = PeerState;
//# sourceMappingURL=peerState.js.map