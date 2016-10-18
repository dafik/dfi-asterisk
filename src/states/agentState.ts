import AgentStates = require("../enums/agentStates");
import AsteriskState = require("../internal/asteriskState");

class AgentState extends AsteriskState {

    protected static STATES = AgentStates;
}
export = AgentState;
