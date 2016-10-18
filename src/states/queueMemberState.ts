import AsteriskState = require("../internal/asteriskState");
import QueueMemberStates = require("../enums/queueMemberStates");

class QueueMemberState extends AsteriskState {
    protected static STATES = QueueMemberStates;
}

export = QueueMemberState;
