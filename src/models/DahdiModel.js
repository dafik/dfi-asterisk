"use strict";
const AsteriskModel = require("../internal/asteriskModel");
const PROP_NAME = "name";
const PROP_CONTEXT = "context";
const PROP_CHANNEL = "channel";
class Dahdi extends AsteriskModel {
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
module.exports = Dahdi;
//# sourceMappingURL=DahdiModel.js.map