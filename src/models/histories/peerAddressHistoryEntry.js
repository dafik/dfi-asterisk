"use strict";
const AsteriskHistoryEntry = require("../../internal/asteriskHistoryEntry");
class PeerAddressHistoryEntry extends AsteriskHistoryEntry {
    get ip() {
        return this.entry;
    }
    ;
    toString() {
        let sb;
        sb = "PeerStateHistoryEntry[";
        sb += "date=" + this.date.toString() + ",";
        sb += "state=" + this.ip.toString() + "]";
        return sb;
    }
    ;
    toJSON() {
        return this.ip;
    }
}
module.exports = PeerAddressHistoryEntry;
//# sourceMappingURL=peerAddressHistoryEntry.js.map