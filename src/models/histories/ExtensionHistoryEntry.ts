import AsteriskHistoryEntry from "../../internal/asteriskHistoryEntry";
import Extension from "../ExtensionModel";

class ExtensionHistoryEntry extends AsteriskHistoryEntry {

    get extension(): Extension {
        return this.entry;
    }

    public toJSON() {
        return this.extension.toJSON();
    }
}
export default ExtensionHistoryEntry;
