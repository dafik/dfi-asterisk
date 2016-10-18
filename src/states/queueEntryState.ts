import AsteriskState = require("../internal/asteriskState");
import QueueEntryStates = require("../enums/queueEntryStates");

class QueueEntryState extends AsteriskState {
    protected static STATES = QueueEntryStates;

}
export = QueueEntryState;
