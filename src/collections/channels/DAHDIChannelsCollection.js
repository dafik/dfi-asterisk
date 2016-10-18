"use strict";
const AsteriskCollection = require("../../internal/asteriskCollection");
const Dahdi = require("../../models/DahdiModel");
class DAHDIChannels extends AsteriskCollection {
    constructor() {
        super({
            model: Dahdi
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
module.exports = DAHDIChannels;
//# sourceMappingURL=DAHDIChannelsCollection.js.map