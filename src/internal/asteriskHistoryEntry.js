"use strict";
class AsteriskHistoryEntry {
    constructor(date, entry) {
        if (!date || !entry) {
            var x = 1;
        }

        this.date = date;
        this.entry = entry;
    }

    destroy() {
        delete this.date;
        delete this.entry;
    }
}
module.exports = AsteriskHistoryEntry;
