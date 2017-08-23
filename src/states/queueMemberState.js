"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskState_1 = require("../internal/asteriskState");
const queueMemberStates_1 = require("../enums/queueMemberStates");
class QueueMemberState extends asteriskState_1.default {
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
QueueMemberState.STATES = queueMemberStates_1.default;
exports.default = QueueMemberState;
//# sourceMappingURL=queueMemberState.js.map