import AsteriskState from "../internal/asteriskState";
import PeerStates from "../enums/peerStates";

class PeerState extends AsteriskState {

    public static byValue(status): PeerState {
        return AsteriskState.byValue(status, this);
    }

    public static byName(status): PeerState {
        return AsteriskState.byName(status, this);
    }

    public static byNameOrValue(status): PeerState {
        return AsteriskState.byNameOrValue(status, this);
    }

    protected static STATES = PeerStates;
}
export default PeerState;
