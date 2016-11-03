"use strict";
const AsteriskCollection = require("../internal/asteriskCollection");
const Bridge = require("../models/BridgeModel");
class Bridges extends AsteriskCollection {
    constructor() {
        super({
            model: Bridge
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
module.exports = Bridges;
//# sourceMappingURL=BridgesCollection.js.map