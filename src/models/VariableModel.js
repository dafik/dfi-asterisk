"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskModel_1 = require("../internal/asteriskModel");
const PROP_NAME = "name";
const PROP_VALUE = "value";
class Variable extends asteriskModel_1.default {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_NAME;
        super(attributes, options);
    }
    get name() {
        return this.get(PROP_NAME);
    }
    get value() {
        return this.get(PROP_VALUE);
    }
    set value(value) {
        this.set(PROP_VALUE, value);
    }
}
Variable.map = new Map([
    [PROP_NAME, PROP_NAME],
    [PROP_VALUE, PROP_VALUE]
]);
exports.default = Variable;
//# sourceMappingURL=VariableModel.js.map