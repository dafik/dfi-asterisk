"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskHistoryEntry_1 = require("../../internal/asteriskHistoryEntry");
/**
 * An entry in the linked channels history of an AsteriskChannel
 * Creates a new instance.
 */
class LinkedChannelHistoryEntry extends asteriskHistoryEntry_1.default {
    /**
     * Returns the channel that has been linked.
     */
    get channel() {
        return this.entry;
    }
    constructor(date, entry) {
        super(date, entry);
        this.dateUnlinked = null;
    }
    /**
     * Returns the date the channel was linked.
     */
    getDateLinked() {
        return this.date;
    }
    /**
     * Returns the date the channel was unlinked.
     */
    getDateUnlinked() {
        return this.dateUnlinked;
    }
    /**
     * Sets the date the channel was unlinked.
     */
    setDateUnlinked(dateUnlinked) {
        this.dateUnlinked = dateUnlinked;
    }
    toString() {
        let sb;
        sb = "LinkedChannelHistoryEntry[";
        sb += "dateLinked=" + this.date.toString() + ",";
        sb += "dateUnlinked=" + (this.dateUnlinked ? this.dateUnlinked.toString() : "") + ",";
        sb += "channel=" + this.channel.toString() + "]";
        return sb;
    }
    toJSON() {
        return this.channel.id;
    }
}
exports.default = LinkedChannelHistoryEntry;
//# sourceMappingURL=LinkedChannelHistoryEntry.js.map