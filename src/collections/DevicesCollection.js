"use strict";
const AsteriskCollection = require("../internal/asteriskCollection");
const Device = require("../models/DeviceModel");
class Devices extends AsteriskCollection {
    constructor() {
        super({
            model: Device
        });
    }
    get(id) {
        return super.get(id);
    }
    add(element) {
        return super.add(element);
    }
    clear() {
        return super.clear();
    }
}
module.exports = Devices;
//# sourceMappingURL=DevicesCollection.js.map