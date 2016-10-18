"use strict";
const DfiCollection = require("local-dfi-base/src/dfiCollection");
const ID_FIELD = "id";
const COLLECTION = "collection";
class AsteriskCollection extends DfiCollection {
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
        let collection = this.getProp(COLLECTION);
        return new Map([...collection.entries()]);
    }
}
module.exports = AsteriskCollection;
//# sourceMappingURL=asteriskCollection.js.map