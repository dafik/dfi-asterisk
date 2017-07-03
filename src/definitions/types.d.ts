import {IAstEventAgentCalled, IAstEventAgentComplete, IAstEventAgentConnect, IAstEventAgentLogin, IAstEventAgentLogoff, IAstEventAgents} from "../internal/asterisk/events";
declare type TIAgent = IAstEventAgents |IAstEventAgentLogin|IAstEventAgentLogoff;
declare type TIInterface = IAstEventAgentConnect | IAstEventAgentCalled |IAstEventAgentComplete;
