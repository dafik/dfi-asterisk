import AsteriskState = require("../internal/asteriskState");
import ChannelStates = require("../enums/channelStates");

class ChannelState extends AsteriskState {
    protected static STATES = ChannelStates;
}
export = ChannelState;
