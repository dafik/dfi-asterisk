"use strict";
const local_dfi_base_1 = require("local-dfi-base");
const ID_FIELD = "id";
const COLLECTION = "collection";
class AsteriskCollection extends local_dfi_base_1.DfiCollection {
    constructor(opts) {
        opts.loggerName = "dfi:as:";
        opts.idField = opts.idField || ID_FIELD;
        super(opts);
    }
    toJSON() {
        return { entries: super.toJSON(), size: this.size };
    }
    destroy() {
        super.destroy();
    }
    toMap() {
        const collection = this.getProp(COLLECTION);
        return new Map([...collection.entries()]);
    }
}
module.exports = AsteriskCollection;
//# sourceMappingURL=asteriskCollection.js.map