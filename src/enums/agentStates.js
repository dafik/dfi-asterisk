"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AgentStates;
(function (AgentStates) {
    /**
     * Agent isn't logged in.
     */
    AgentStates[AgentStates["AGENT_LOGGEDOFF"] = "agent_loggedoff"] = "AGENT_LOGGEDOFF";
    /**
     * Agent is logged in and waiting for call.
     */
    AgentStates[AgentStates["AGENT_IDLE"] = "agent_idle"] = "AGENT_IDLE";
    /**
     * Agent is logged in and on a call.
     */
    AgentStates[AgentStates["AGENT_ONCALL"] = "agent_oncall"] = "AGENT_ONCALL";
    /**
     * Don't know anything about agent. Shouldn't ever get this.
     */
    AgentStates[AgentStates["AGENT_UNKNOWN"] = "agent_unknown"] = "AGENT_UNKNOWN";
    /**
     * Agent is logged in and a call is waiting for connect.
     */
    AgentStates[AgentStates["AGENT_RINGING"] = "agent_ringing"] = "AGENT_RINGING";
})(AgentStates || (AgentStates = {}));
exports.default = AgentStates;
//# sourceMappingURL=agentStates.js.map