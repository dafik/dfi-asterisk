"use strict";
const AsteriskHistoryEntry = require('../../internal/asteriskHistoryEntry');

/**
 * An entry in the channel state history of an {@link AsteriskChannel}.
 * Creates a new instance.
 */

class ChannelStateHistoryEntry extends AsteriskHistoryEntry {

    /**
     * Returns the date the channel entered the state.
     *
     * @return {Moment} the date the channel entered the state.
     */
    getDate() {
        return this.date;
    };

    /**
     * The state the channel entered.
     *
     * @return {ChannelState}  the state the channel entered.
     */
    get state() {
        return this.entry;
    };

    get stateDesc() {
        return this.state.name;
    }

    /**
     * @returns  String
     */
    toString() {
        var sb;

        sb = "ChannelStateHistoryEntry[";
        sb += "date=" + this.date.toString() + ",";
        sb += "state=" + this.state.toString() + "]";
        return sb;
    };

    toJSON() {
        return this.stateDesc;
    }

}

module.exports = ChannelStateHistoryEntry;