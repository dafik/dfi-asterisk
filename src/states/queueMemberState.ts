import AsteriskState from "../internal/asteriskState";
import QueueMemberStates from "../enums/queueMemberStates";

class QueueMemberState extends AsteriskState {

    public static byValue(status): QueueMemberState {
        return AsteriskState.byValue(status, this);
    }

    public static byName(status): QueueMemberState {
        return AsteriskState.byName(status, this);
    }

    public static byNameOrValue(status): QueueMemberState {
        return AsteriskState.byNameOrValue(status, this);
    }

    protected static STATES = QueueMemberStates;
}

export default QueueMemberState;
