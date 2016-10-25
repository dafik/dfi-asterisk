"use strict";
const AsteriskModel = require("../../internal/asteriskModel");
const PROP_NAME = "name";
const P_PROP_CONTEXT = "context";
const P_PROP_PRIORITIES = "priorities";
class DialplanExtension extends AsteriskModel {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_NAME;
        super(attributes, options);
        this.setProp(P_PROP_PRIORITIES, new Map());
    }
    get name() {
        return this.get(PROP_NAME);
    }
    get extension() {
        return this.get(PROP_NAME);
    }
    get context() {
        return this.get(P_PROP_CONTEXT);
    }
    get priorities() {
        return new Map([...this.getProp(P_PROP_PRIORITIES)]);
    }
    addPriority(priority) {
        return this.getProp(P_PROP_PRIORITIES).set(priority.id, priority);
    }
}
DialplanExtension.map = new Map([
    ["Extension", PROP_NAME]
]);
module.exports = DialplanExtension;
//# sourceMappingURL=DialplanExtensionModel.js.map