import AgentStates from "../enums/agentStates";
import AsteriskState from "../internal/asteriskState";

class AgentState extends AsteriskState {

    public static byValue(status): AgentState {
        return AsteriskState.byValue(status, this);
    }

    public static byName(status): AgentState {
        return AsteriskState.byName(status, this);
    }

    public static byNameOrValue(status): AgentState {
        return AsteriskState.byNameOrValue(status, this);
    }

    protected static STATES = AgentStates;

}
export default AgentState;
