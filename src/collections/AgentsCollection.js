"use strict";
const Agent = require("../models/AgentModel");
const AsteriskCollection = require("../internal/asteriskCollection");
class Agents extends AsteriskCollection {
    constructor() {
        super({
            model: Agent
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
module.exports = Agents;
//# sourceMappingURL=AgentsCollection.js.map