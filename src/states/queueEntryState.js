"use strict";
const AsteriskState = require("../internal/asteriskState");
const QueueEntryStates = require("../enums/queueEntryStates");
class QueueEntryState extends AsteriskState {
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
QueueEntryState.STATES = QueueEntryStates;
module.exports = QueueEntryState;
//# sourceMappingURL=queueEntryState.js.map