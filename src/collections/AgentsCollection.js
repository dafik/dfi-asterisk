"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AgentModel_1 = require("../models/AgentModel");
const asteriskCollection_1 = require("../internal/asteriskCollection");
class Agents extends asteriskCollection_1.default {
    constructor() {
        super({
            model: AgentModel_1.default
        });
    }
    get(id) {
        return super.get(id);
    }
    add(element) {
        return super.add(element);
    }
    keys() {
        return super.keys();
    }
    clear() {
        return super.clear();
    }
    toArray() {
        return super.toArray();
    }
}
exports.default = Agents;
//# sourceMappingURL=AgentsCollection.js.map