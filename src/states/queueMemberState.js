"use strict";
const AsteriskState = require("../internal/asteriskState");
const QueueMemberStates = require("../enums/queueMemberStates");
class QueueMemberState extends AsteriskState {
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
QueueMemberState.STATES = QueueMemberStates;
module.exports = QueueMemberState;
//# sourceMappingURL=queueMemberState.js.map