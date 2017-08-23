"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskModel_1 = require("../internal/asteriskModel");
const deviceState_1 = require("../states/deviceState");
const PROP_DEVICE = "device";
const PROP_STATE = "state";
const PROP_LAST_UPDATE = "lastUpdate";
class Device extends asteriskModel_1.default {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_DEVICE;
        attributes.State = deviceState_1.default.byName(attributes.State);
        super(attributes, options);
    }
    get device() {
        return this.get(PROP_DEVICE);
    }
    get state() {
        return this.get(PROP_STATE);
    }
    set state(state) {
        this.set(PROP_STATE, state);
    }
    setLastUpdate($time) {
        this.setProp(PROP_LAST_UPDATE, $time);
    }
}
Device.map = new Map([
    ["Device", PROP_DEVICE],
    ["State", PROP_STATE]
]);
exports.default = Device;
//# sourceMappingURL=DeviceModel.js.map