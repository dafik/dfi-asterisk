"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../internal/asteriskCollection");
const BridgeModel_1 = require("../models/BridgeModel");
class Bridges extends asteriskCollection_1.default {
    constructor() {
        super({
            model: BridgeModel_1.default
        });
    }
    has(element) {
        return super.has(element);
    }
    get(id) {
        return super.get(id);
    }
    add(element) {
        return super.add(element);
    }
    remove(element) {
        return super.remove(element);
    }
    clear() {
        return super.clear();
    }
    forEach(fn, thisArg) {
        super.forEach(fn, thisArg);
    }
    toArray() {
        return super.toArray();
    }
}
exports.default = Bridges;
//# sourceMappingURL=BridgesCollection.js.map