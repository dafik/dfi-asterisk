"use strict";
const AsteriskHistoryEntry = require("../../internal/asteriskHistoryEntry");
class ExtensionHistoryEntry extends AsteriskHistoryEntry {
    get extension() {
        return this.entry;
    }
    toJSON() {
        return this.extension.toJSON();
    }
}
module.exports = ExtensionHistoryEntry;
//# sourceMappingURL=ExtensionHistoryEntry.js.map