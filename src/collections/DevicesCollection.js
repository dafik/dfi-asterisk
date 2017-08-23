"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../internal/asteriskCollection");
const DeviceModel_1 = require("../models/DeviceModel");
class Devices extends asteriskCollection_1.default {
    constructor() {
        super({
            model: DeviceModel_1.default
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
exports.default = Devices;
//# sourceMappingURL=DevicesCollection.js.map