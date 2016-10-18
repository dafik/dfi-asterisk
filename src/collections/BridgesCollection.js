"use strict";
const AsteriskCollection = require("../internal/asteriskCollection");
const Bridge = require("../models/BridgeModel");
class Bridges extends AsteriskCollection {
    constructor() {
        super({
            model: Bridge
        });
    }
    add(element) {
        return super.add(element);
    }
    has(element) {
        return super.has(element);
    }
    get(id) {
        return super.get(id);
    }
    toArray() {
        return super.toArray();
    }
    remove(element) {
        return super.remove(element);
    }
    clear() {
        return super.clear();
    }
    forEach(fn, context) {
        super.forEach(fn, context);
    }
}
module.exports = Bridges;
//# sourceMappingURL=BridgesCollection.js.map