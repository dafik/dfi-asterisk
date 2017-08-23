import AsteriskHistoryEntry from "../../internal/asteriskHistoryEntry";
/**
 * An entry in the channel state history of an AsteriskChannel.
 * Creates a new instance.
 */

class ChannelStateHistoryEntry extends AsteriskHistoryEntry {

    /**
     * The state the channel entered.
     *
     * @return {ChannelState}  the state the channel entered.
     */
    get state() {
        return this.entry;
    }

    get stateDesc() {
        return this.state.name;
    }

    /**
     * @returns  String
     */
    public toString() {
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

export default ChannelStateHistoryEntry;
