"use strict";
const Agent = require("../models/AgentModel");
const AsteriskCollection = require("../internal/asteriskCollection");
class Agents extends AsteriskCollection {
    constructor() {
        super({
            model: Agent
        });
    }
    keys() {
        return super.keys();
    }
    toArray() {
        return super.toArray();
    }
    clear() {
        return super.clear();
    }
    get(id) {
        return super.get(id);
    }
    add(element) {
        return super.add(element);
    }
}
module.exports = Agents;
//# sourceMappingURL=AgentsCollection.js.map