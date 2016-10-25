"use strict";
const AsteriskState = require("../internal/asteriskState");
const ChannelStates = require("../enums/channelStates");
class ChannelState extends AsteriskState {
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
ChannelState.STATES = ChannelStates;
module.exports = ChannelState;
//# sourceMappingURL=channelState.js.map