"use strict";
const AsteriskModel = require("../internal/asteriskModel");
const PROP_NAME = "name";
const PROP_VALUE = "value";
class Variable extends AsteriskModel {
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
module.exports = Variable;
//# sourceMappingURL=VariableModel.js.map