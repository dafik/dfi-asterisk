"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queueEntryStates_1 = require("../enums/queueEntryStates");
const asteriskState_1 = require("../internal/asteriskState");
class QueueEntryState extends asteriskState_1.default {
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
QueueEntryState.STATES = queueEntryStates_1.default;
exports.default = QueueEntryState;
//# sourceMappingURL=queueEntryState.js.map