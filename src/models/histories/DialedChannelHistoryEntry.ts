import AsteriskHistoryEntry from "../../internal/asteriskHistoryEntry";
import Channel from "../ChannelModel";

class DialedChannelHistoryEntry extends AsteriskHistoryEntry {
    /**
     * Returns the channel that has been dialed.
     */
    get channel(): Channel {
        return this.entry;
    }

    public toString() {
        let sb;

        sb = "DialedChannelHistoryEntry[";
        sb += "date=" + this.date.toString() + ",";
        sb += "channel=" + this.channel + "]";
        return sb;
    }

    public toJSON() {
        return this.channel.id;
    }
}

export default DialedChannelHistoryEntry;
