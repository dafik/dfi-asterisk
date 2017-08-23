enum AgentStates {
    /**
     * Agent isn't logged in.
     */
    AGENT_LOGGEDOFF =  "agent_loggedoff" as any,

        /**
         * Agent is logged in and waiting for call.
         */
    AGENT_IDLE =  "agent_idle" as any,

        /**
         * Agent is logged in and on a call.
         */
    AGENT_ONCALL =  "agent_oncall" as any,

        /**
         * Don't know anything about agent. Shouldn't ever get this.
         */
    AGENT_UNKNOWN =  "agent_unknown" as any,

        /**
         * Agent is logged in and a call is waiting for connect.
         */
    AGENT_RINGING =  "agent_ringing" as any
}

export default AgentStates;
