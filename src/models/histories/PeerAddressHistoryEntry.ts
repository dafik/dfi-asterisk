import AsteriskHistoryEntry = require("../../internal/asteriskHistoryEntry");
import Ip = require("../IpAddressModel");

class PeerAddressHistoryEntry extends AsteriskHistoryEntry {

    get ip(): Ip {
        return this.entry;
    };

    public toString(): string {
        let sb;

        sb = "PeerStateHistoryEntry[";
        sb += "date=" + this.date.toString() + ",";
        sb += "state=" + this.ip.toString() + "]";
        return sb;
    };

    public toJSON() {
        return this.ip;
    }
}

export = PeerAddressHistoryEntry;
