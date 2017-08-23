import AsteriskState from "../internal/asteriskState";
import DeviceStates from "../enums/deviceStates";

class DeviceState extends AsteriskState {

    public static byValue(status): DeviceState {
        return AsteriskState.byValue(status, this);
    }

    public static byName(status): DeviceState {
        return AsteriskState.byName(status, this);
    }

    public static byNameOrValue(status): DeviceState {
        return AsteriskState.byNameOrValue(status, this);
    }

    protected static STATES = DeviceStates;
}
export default DeviceState;
