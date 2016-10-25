"use strict";
const AgentStates = require("../enums/agentStates");
const AsteriskState = require("../internal/asteriskState");
class AgentState extends AsteriskState {
    static byValue(status) {
        return AsteriskState.byValue(status, this);
    }
    static byName(status) {
        return AsteriskState.byName(status, this);
    }
    static byNameOrValue(status) {
        return AsteriskState.byNameOrValue(status, this);
    }
}
AgentState.STATES = AgentStates;
module.exports = AgentState;
//# sourceMappingURL=agentState.js.map