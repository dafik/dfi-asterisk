"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hangupCauses_1 = require("../enums/hangupCauses");
const asteriskState_1 = require("../internal/asteriskState");
class HangupCause extends asteriskState_1.default {
    static byValue(status) {
        return asteriskState_1.default.byValue(status, this);
    }
    static byName(status) {
        return asteriskState_1.default.byName(status, this);
    }
    static byNameOrValue(status) {
        return asteriskState_1.default.byNameOrValue(status, this);
    }
}
HangupCause.STATES = hangupCauses_1.default;
exports.default = HangupCause;
//# sourceMappingURL=hangupCause.js.map