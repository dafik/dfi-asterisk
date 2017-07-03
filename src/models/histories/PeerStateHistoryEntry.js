"use strict";
const AsteriskHistoryEntry = require("../../internal/asteriskHistoryEntry");
/**
 * An entry in the channel state history of an AsteriskChannel
 * Creates a new instance.
 */
class PeerStateHistoryEntry extends AsteriskHistoryEntry {
    get state() {
        return this.entry;
    }
    get stateDesc() {
        return this.entry.name;
    }
    toString() {
        let sb;
        sb = "ChannelStateHistoryEntry[";
        sb += "date=" + this.date.toString() + ",";
        sb += "state=" + this.state.toString() + "]";
        return sb;
    }
    toJSON() {
        return this.stateDesc;
    }
}
module.exports = PeerStateHistoryEntry;
//# sourceMappingURL=PeerStateHistoryEntry.js.map