"use strict";
const AsteriskModel = require("../internal/asteriskModel");
const DeviceState = require("../states/deviceState");
const PROP_DEVICE = "device";
const PROP_STATE = "state";
class Device extends AsteriskModel {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_DEVICE;
        attributes.State = DeviceState.byName(attributes.State);
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
}
Device.map = new Map([
    ["Device", PROP_DEVICE],
    ["State", PROP_STATE]
]);
module.exports = Device;
//# sourceMappingURL=DeviceModel.js.map