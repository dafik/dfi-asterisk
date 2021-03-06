import HangupCauses from "../enums/hangupCauses";
import AsteriskState from "../internal/asteriskState";

class HangupCause extends AsteriskState {

    public static byValue(status): HangupCause {
        return AsteriskState.byValue(status, this);
    }

    public static byName(status): HangupCause {
        return AsteriskState.byName(status, this);
    }

    public static byNameOrValue(status): HangupCause {
        return AsteriskState.byNameOrValue(status, this);
    }

    protected static STATES = HangupCauses;
}
export default HangupCause;
