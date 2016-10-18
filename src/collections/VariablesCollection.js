"use strict";
const AsteriskCollection = require("../internal/asteriskCollection");
const Variable = require("../models/VariableModel");
class Variables extends AsteriskCollection {
    constructor() {
        super({
            model: Variable
        });
    }
    has(element) {
        return super.has(element);
    }
    get(id) {
        return super.get(id);
    }
    add(element) {
        return super.add(element);
    }
}
module.exports = Variables;
//# sourceMappingURL=VariablesCollection.js.map