import AsteriskHistoryEntry = require("../../internal/asteriskHistoryEntry");
import PeerState = require("../../states/peerState");
/**
 * An entry in the channel state history of an AsteriskChannel
 * Creates a new instance.
 */
class PeerStateHistoryEntry extends AsteriskHistoryEntry {

    get state(): PeerState {
        return this.entry;
    }

    get  stateDesc(): string {
        return this.entry.name;
    }

    public toString(): string {
        let sb;

        sb = "ChannelStateHistoryEntry[";
        sb += "date=" + this.date.toString() + ",";
        sb += "state=" + this.state.toString() + "]";
        return sb;
    }

    public toJSON() {
        return this.stateDesc;
    }

}

export = PeerStateHistoryEntry;
