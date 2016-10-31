"use strict";
const AsteriskHistoryEntry = require("../../internal/asteriskHistoryEntry");
class DialedChannelHistoryEntry extends AsteriskHistoryEntry {
    /**
     * Returns the channel that has been dialed.
     */
    get channel() {
        return this.entry;
    }
    ;
    toString() {
        let sb;
        sb = "DialedChannelHistoryEntry[";
        sb += "date=" + this.date.toString() + ",";
        sb += "channel=" + this.channel + "]";
        return sb;
    }
    ;
    toJSON() {
        return this.channel.id;
    }
}
module.exports = DialedChannelHistoryEntry;
//# sourceMappingURL=DialedChannelHistoryEntry.js.map