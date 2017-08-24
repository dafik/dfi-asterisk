"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deviceStates_1 = require("../enums/deviceStates");
const asteriskState_1 = require("../internal/asteriskState");
class DeviceState extends asteriskState_1.default {
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
DeviceState.STATES = deviceStates_1.default;
exports.default = DeviceState;
//# sourceMappingURL=deviceState.js.map