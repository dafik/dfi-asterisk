"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskHistoryEntry_1 = require("../../internal/asteriskHistoryEntry");
class PeerAddressHistoryEntry extends asteriskHistoryEntry_1.default {
    get ip() {
        return this.entry;
    }
    toString() {
        let sb;
        sb = "PeerStateHistoryEntry[";
        sb += "date=" + this.date.toString() + ",";
        sb += "state=" + this.ip.toString() + "]";
        return sb;
    }
    toJSON() {
        return this.ip;
    }
}
exports.default = PeerAddressHistoryEntry;
//# sourceMappingURL=PeerAddressHistoryEntry.js.map