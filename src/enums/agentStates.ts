enum AgentStates {
    /**
     * Agent isn't logged in.
     */
    AGENT_LOGGEDOFF = <any> "agent_loggedoff",

        /**
         * Agent is logged in and waiting for call.
         */
    AGENT_IDLE = <any> "agent_idle",

        /**
         * Agent is logged in and on a call.
         */
    AGENT_ONCALL = <any> "agent_oncall",

        /**
         * Don't know anything about agent. Shouldn't ever get this.
         */
    AGENT_UNKNOWN = <any> "agent_unknown",

        /**
         * Agent is logged in and a call is waiting for connect.
         */
    AGENT_RINGING = <any> "agent_ringing"
}

export = AgentStates;
