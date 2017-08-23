"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskHistoryEntry_1 = require("../../internal/asteriskHistoryEntry");
/**
 * An entry in the channel state history of an AsteriskChannel.
 * Creates a new instance.
 */
class ChannelStateHistoryEntry extends asteriskHistoryEntry_1.default {
    /**
     * The state the channel entered.
     *
     * @return {ChannelState}  the state the channel entered.
     */
    get state() {
        return this.entry;
    }
    get stateDesc() {
        return this.state.name;
    }
    /**
     * @returns  String
     */
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
exports.default = ChannelStateHistoryEntry;
//# sourceMappingURL=ChannelStateHistoryEntry.js.map