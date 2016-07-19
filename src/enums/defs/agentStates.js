"use strict";
/**
 * The lifecycle status of an {@link AsteriskAgent}.
 * @memberOf enums
 * @class
 */
var AgentStates = {
    /**
     * Agent isn't logged in.
     */
    AGENT_LOGGEDOFF: 'agent_loggedoff',

    /**
     * Agent is logged in and waiting for call.
     */
    AGENT_IDLE: 'agent_idle',

    /**
     * Agent is logged in and on a call.
     */
    AGENT_ONCALL: 'agent_oncall',

    /**
     * Don't know anything about agent. Shouldn't ever get this.
     */
    AGENT_UNKNOWN: 'agent_unknown',

    /**
     * Agent is logged in and a call is waiting for connect.
     */
    AGENT_RINGING: 'agent_ringing'
};
Object.freeze(AgentStates);
module.exports = AgentStates;