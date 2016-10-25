import AsteriskState = require("../internal/asteriskState");
import QueueEntryStates = require("../enums/queueEntryStates");

class QueueEntryState extends AsteriskState {

    public static byValue(status): QueueEntryState {
        return AsteriskState.byValue(status, this);
    }

    public static byName(status): QueueEntryState {
        return AsteriskState.byName(status, this);
    }

    public static byNameOrValue(status): QueueEntryState {
        return AsteriskState.byNameOrValue(status, this);
    }

    protected static STATES = QueueEntryStates;

}
export = QueueEntryState;
