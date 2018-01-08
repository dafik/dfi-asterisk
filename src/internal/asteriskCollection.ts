import {DfiCollection} from "dfi-base";
import {IDfiAstConfigCollection} from "../definitions/configs";
import AsteriskModel from "./asteriskModel";

const ID_FIELD = "id";
const COLLECTION = "collection";

abstract class AsteriskCollection<M extends AsteriskModel> extends DfiCollection<string, M> {
    constructor(opts: IDfiAstConfigCollection<M>) {
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
        const collection: Map<any, M> = this.getProp(COLLECTION);
        return new Map([...collection.entries()]);
    }
}

export default AsteriskCollection;
