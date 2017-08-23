"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskState_1 = require("../internal/asteriskState");
const channelStates_1 = require("../enums/channelStates");
class ChannelState extends asteriskState_1.default {
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
ChannelState.STATES = channelStates_1.default;
exports.default = ChannelState;
//# sourceMappingURL=channelState.js.map