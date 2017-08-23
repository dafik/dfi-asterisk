import AsteriskState from "../internal/asteriskState";
import ChannelStates from "../enums/channelStates";

class ChannelState extends AsteriskState {

    public static byValue(status): ChannelState {
        return AsteriskState.byValue(status, this);
    }

    public static byName(status): ChannelState {
        return AsteriskState.byName(status, this);
    }

    public static byNameOrValue(status): ChannelState {
        return AsteriskState.byNameOrValue(status, this);
    }

    protected static STATES = ChannelStates;
}
export default ChannelState;
