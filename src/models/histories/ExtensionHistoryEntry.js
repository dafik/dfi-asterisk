"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskHistoryEntry_1 = require("../../internal/asteriskHistoryEntry");
class ExtensionHistoryEntry extends asteriskHistoryEntry_1.default {
    get extension() {
        return this.entry;
    }
    toJSON() {
        return this.extension.toJSON();
    }
}
exports.default = ExtensionHistoryEntry;
//# sourceMappingURL=ExtensionHistoryEntry.js.map