import AsteriskState from "../internal/asteriskState";
import QueueEntryStates from "../enums/queueEntryStates";

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
export default QueueEntryState;
