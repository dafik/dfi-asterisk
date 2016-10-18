import AsteriskState = require("../internal/asteriskState");
import PeerStates = require("../enums/peerStates");

class PeerState extends AsteriskState {
    protected static STATES = PeerStates;
}
export = PeerState;
