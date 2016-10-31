import AsteriskHistoryEntry = require("../../internal/asteriskHistoryEntry");
import Extension = require("../ExtensionModel");

class ExtensionHistoryEntry extends AsteriskHistoryEntry {

    get extension(): Extension {
        return this.entry;
    }

    public toJSON() {
        return this.extension.toJSON();
    }
}
export = ExtensionHistoryEntry;
