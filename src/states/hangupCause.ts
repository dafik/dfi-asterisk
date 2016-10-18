import AsteriskState = require("../internal/asteriskState");
import HangupCauses = require("../enums/hangupCauses");

class HangupCause extends AsteriskState {
    protected static STATES = HangupCauses;
}
export = HangupCause;
