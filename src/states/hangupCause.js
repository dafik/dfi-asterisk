"use strict";
const AsteriskState = require("../internal/asteriskState");
const HangupCauses = require("../enums/hangupCauses");
class HangupCause extends AsteriskState {
}
HangupCause.STATES = HangupCauses;
module.exports = HangupCause;
//# sourceMappingURL=hangupCause.js.map