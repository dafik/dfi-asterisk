"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agentStates_1 = require("../enums/agentStates");
const asteriskState_1 = require("../internal/asteriskState");
class AgentState extends asteriskState_1.default {
    static byValue(status) {
        return asteriskState_1.default.byValue(status, this);
    }
    static byName(status) {
        return asteriskState_1.default.byName(status, this);
    }
    static byNameOrValue(status) {
        return asteriskState_1.default.byNameOrValue(status, this);
    }
}
AgentState.STATES = agentStates_1.default;
exports.default = AgentState;
//# sourceMappingURL=agentState.js.map