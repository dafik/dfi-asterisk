"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../internal/asteriskCollection");
const VariableModel_1 = require("../models/VariableModel");
class Variables extends asteriskCollection_1.default {
    constructor() {
        super({
            model: VariableModel_1.default
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
exports.default = Variables;
//# sourceMappingURL=VariablesCollection.js.map