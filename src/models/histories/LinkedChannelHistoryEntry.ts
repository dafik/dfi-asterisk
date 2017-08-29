import AsteriskHistoryEntry from "../../internal/asteriskHistoryEntry";
import Channel from "../ChannelModel";

/**
 * An entry in the linked channels history of an AsteriskChannel
 * Creates a new instance.
 */
class LinkedChannelHistoryEntry extends AsteriskHistoryEntry {
    public dateUnlinked: number;

    /**
     * Returns the channel that has been linked.
     */
    get channel(): Channel {
        return this.entry;
    }

    constructor(date, entry: Channel) {
        super(date, entry);
        this.dateUnlinked = null;
    }

    /**
     * Returns the date the channel was linked.
     */
    public getDateLinked() {
        return this.date;
    }

    /**
     * Returns the date the channel was unlinked.
     */
    public getDateUnlinked() {
        return this.dateUnlinked;
    }

    /**
     * Sets the date the channel was unlinked.
     */
    public setDateUnlinked(dateUnlinked) {
        this.dateUnlinked = dateUnlinked;
    }

    public toString() {

        let sb;

        sb = "LinkedChannelHistoryEntry[";
        sb += "dateLinked=" + this.date.toString() + ",";
        sb += "dateUnlinked=" + (this.dateUnlinked ? this.dateUnlinked.toString() : "") + ",";
        sb += "channel=" + this.channel.toString() + "]";
        return sb;
    }

    public toJSON() {
        return this.channel.id;
    }
}

export default LinkedChannelHistoryEntry;
