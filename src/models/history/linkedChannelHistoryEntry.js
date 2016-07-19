"use strict";
const AsteriskHistoryEntry = require('../../internal/asteriskHistoryEntry');

/**
 * An entry in the linked channels history of an {@link AsteriskChannel}.
 * Creates a new instance.
 */
class LinkedChannelHistoryEntry extends AsteriskHistoryEntry {

    /**
     * @param date
     * @param {AsteriskChannel} entry
     */
    constructor(date, entry) {
        super(date, entry);
        this.dateUnlinked = null;
    }

    /**
     * Returns the date the channel was linked.
     *
     * @returns {Moment} the date the channel was linked.
     */

    getDateLinked() {
        return this.date;
    };

    /**
     * Returns the date the channel was unlinked.
     *
     * @returns {Moment} the date the channel was unlinked.
     */

    getDateUnlinked() {
        return this.dateUnlinked;
    };

    /**
     * Sets the date the channel was unlinked.
     *
     * @param {Moment} dateUnlinked the date the channel was unlinked.
     */
    setDateUnlinked(dateUnlinked) {
        this.dateUnlinked = dateUnlinked;
    };

    /**
     * Returns the channel that has been linked.
     *
     * @returns {AsteriskChannel} the channel that has been linked.
     */

    get channel() {
        return this.entry;
    };


    /**
     *
     * @returns {string}
     */
    toString() {

        var sb;

        sb = "LinkedChannelHistoryEntry[";
        sb += "dateLinked=" + this.dateLinked.toString() + ",";
        sb += "dateUnlinked=" + this.dateUnlinked.toString() + ",";
        sb += "channel=" + this.channel.toString() + "]";
        return sb
    };

    toJSON() {
        return this.channel.id;
    }
}

module.exports = LinkedChannelHistoryEntry;
