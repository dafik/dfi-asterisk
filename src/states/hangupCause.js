"use strict";
const AsteriskState = require("../internal/asteriskState");
const HangupCauses = require("../enums/hangupCauses");
class HangupCause extends AsteriskState {
    static byValue(status) {
        return AsteriskState.byValue(status, this);
    }
    static byName(status) {
        return AsteriskState.byName(status, this);
    }
    static byNameOrValue(status) {
        return AsteriskState.byNameOrValue(status, this);
    }
}
HangupCause.STATES = HangupCauses;
module.exports = HangupCause;
//# sourceMappingURL=hangupCause.js.map