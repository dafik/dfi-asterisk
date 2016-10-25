"use strict";
const AsteriskState = require("../internal/asteriskState");
const DeviceStates = require("../enums/deviceStates");
class DeviceState extends AsteriskState {
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
DeviceState.STATES = DeviceStates;
module.exports = DeviceState;
//# sourceMappingURL=deviceState.js.map