"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskHistoryEntry_1 = require("../../internal/asteriskHistoryEntry");
class DialedChannelHistoryEntry extends asteriskHistoryEntry_1.default {
    /**
     * Returns the channel that has been dialed.
     */
    get channel() {
        return this.entry;
    }
    toString() {
        let sb;
        sb = "DialedChannelHistoryEntry[";
        sb += "date=" + this.date.toString() + ",";
        sb += "channel=" + this.channel + "]";
        return sb;
    }
    toJSON() {
        return this.channel.id;
    }
}
exports.default = DialedChannelHistoryEntry;
//# sourceMappingURL=DialedChannelHistoryEntry.js.map