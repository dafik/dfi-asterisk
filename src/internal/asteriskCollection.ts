import AsteriskModel = require("./asteriskModel");
import DfiCollection = require("local-dfi-base/src/dfiCollection");
import {IDfiAstConfigCollection} from "../definitions/configs";

const ID_FIELD = "id";
const COLLECTION = "collection";

abstract class AsteriskCollection<M extends AsteriskModel> extends DfiCollection<M> {
    constructor(opts: IDfiAstConfigCollection) {
        opts.loggerName = "dfi:as:";
        opts.idField = opts.idField || ID_FIELD;

        super(opts);
    }

    public toJSON() {
        return {entries: super.toJSON(), size: this.size};
    }

    public destroy() {
        super.destroy();
    }

    public toMap(): Map<any, M> {
        let collection: Map<any, M> = this.getProp(COLLECTION);
        return new Map([...collection.entries()]);
    }
}
export = AsteriskCollection;
