"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskModel_1 = require("../internal/asteriskModel");
const PROP_NAME = "name";
const PROP_CONTEXT = "context";
const PROP_CHANNEL = "channel";
class Dahdi extends asteriskModel_1.default {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_NAME;
        super(attributes, options);
    }
    get name() {
        return this.get(PROP_NAME);
    }
    get context() {
        return this.get(PROP_CONTEXT);
    }
    get channel() {
        return this.get(PROP_CHANNEL);
    }
    set channel(channel) {
        this.set(PROP_CHANNEL, channel);
    }
}
Dahdi.map = new Map([
    ["DAHDIChannel", PROP_NAME],
    /*  ["Signalling", "signalling"],
     ["SignallingCode", "signallingCode"],*/
    ["Context", PROP_CONTEXT],
    // ["DND", "dnd"],
    // ["Alarm", "alarm"],
    // ["Description", "description"],
    ["channel", PROP_CHANNEL]
]);
exports.default = Dahdi;
//# sourceMappingURL=DahdiModel.js.map