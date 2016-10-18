"use strict";
const AsteriskHistoryEntry = require("../../internal/asteriskHistoryEntry");
/**
 * An entry in the linked channels history of an AsteriskChannel
 * Creates a new instance.
 */
class LinkedChannelHistoryEntry extends AsteriskHistoryEntry {
    constructor(date, entry) {
        super(date, entry);
        this.dateUnlinked = null;
    }
    /**
     * Returns the channel that has been linked.
     * @returns the channel that has been linked.
     */
    get channel() {
        return this.entry;
    }
    ;
    /**
     * Returns the date the channel was linked.
     *
     * @returns {Moment} the date the channel was linked.
     */
    getDateLinked() {
        return this.date;
    }
    ;
    /**
     * Returns the date the channel was unlinked.
     *
     * @returns {Moment} the date the channel was unlinked.
     */
    getDateUnlinked() {
        return this.dateUnlinked;
    }
    ;
    /**
     * Sets the date the channel was unlinked.
     *
     * @param {Moment} dateUnlinked the date the channel was unlinked.
     */
    setDateUnlinked(dateUnlinked) {
        this.dateUnlinked = dateUnlinked;
    }
    ;
    /**
     *
     * @returns {string}
     */
    toString() {
        let sb;
        sb = "LinkedChannelHistoryEntry[";
        sb += "dateLinked=" + this.date.toString() + ",";
        sb += "dateUnlinked=" + this.dateUnlinked.toString() + ",";
        sb += "channel=" + this.channel.toString() + "]";
        return sb;
    }
    ;
    toJSON() {
        return this.channel.id;
    }
}
module.exports = LinkedChannelHistoryEntry;
//# sourceMappingURL=linkedChannelHistoryEntry.js.map