import AsteriskState = require("../internal/asteriskState");
import DeviceStates = require("../enums/deviceStates");

class DeviceState extends AsteriskState {
    protected static STATES = DeviceStates;
}
export = DeviceState;
