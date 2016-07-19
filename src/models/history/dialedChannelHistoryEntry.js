"use strict";
const AsteriskHistoryEntry = require('../../internal/asteriskHistoryEntry');

/**
 * An entry in the dialed channels history of an {@link AsteriskChannel}.
 * Creates a new instance.
 *
 * @memberOf object
 * @param {Moment} date    the date the channel was dialed.
 * @param {AsteriskChannel} channel the channel that has been dialed.
 */
class DialedChannelHistoryEntry extends AsteriskHistoryEntry {
    /**
     * Returns the date the channel was dialed.
     *
     * @returns {Moment}  the date the channel was dialed.
     */

    getDate  () {
        return this.date;
    };

    /**
     * Returns the channel that has been dialed.
     *
     * @returns {AsteriskChannel} the channel that has been dialed.
     */

    getChannel  () {
        return this.channel;
    };

    /**
     * @returns string
     */
    toString  () {
        var sb;

        sb = "DialedChannelHistoryEntry[";
        sb += "date=" + this.date.toString() + ",";
        sb += "channel=" + this.channel + "]";
        return sb;
    };
    toJSON() {
        return this.channel.id;
    }
}

module.exports.DialedChannelHistoryEntry = DialedChannelHistoryEntry;