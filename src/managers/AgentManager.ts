import AsteriskManager = require("../internal/server/Manager");
import Agents = require("../collections/AgentsCollection");
import Agent = require("../models/AgentModel");
import QueueManager = require("./QueueManager");
import AstUtil = require("../internal/astUtil");

import {IDfiCallbackResult, IEventHandlersMap} from "../definitions/interfaces";
import {IDfiAstModelAttribsAgent} from "../definitions/models";
import {TIAgent, TIInterface} from "../definitions/types";

import {IAstActionAgents} from "../internal/asterisk/actions";

import {IAstEvent, IAstEventAgentCalled, IAstEventAgentComplete, IAstEventAgentConnect, IAstEventAgentLogin, IAstEventAgentLogoff, IAstEventAgents} from "../internal/asterisk/events";

import AgentState = require("../states/agentState");
import AgentStates = require("../enums/agentStates");
import QueueMember = require("../models/queues/QueueMemberModel");
import Queue = require("../models/queues/QueueModel");
import AST_ACTION = require("../internal/asterisk/actionNames");
import AST_EVENT = require("../internal/asterisk/eventNames");

const RINGING_AGENTS = "ringingAgents";

class AgentManager extends AsteriskManager<Agent, Agents> {

    constructor(options, state) {
        super(options, state, new Agents());

        this.setProp(RINGING_AGENTS, new Map());

        this.server.once(this.serverEvents.BEFORE_INIT, () => {
            if (this.server.managers.queue.enabled) {
                let queueManager = this.server.managers.queue;

                queueManager.on(QueueManager.events.MEMBER_ADD, this._handleQueueAddMember, this);
                queueManager.on(QueueManager.events.MEMBER_REMOVE, this._handleQueueRemoveMember, this);
            }
        }, this);

        if (!this.enabled) {
            return;
        }

        function onUnhandledEvent(event: IAstEvent) {
            this.logger.error("unhandled event %s", event.Event);
        }

        let map: IEventHandlersMap = {};

        map[AST_EVENT.AGENT_CALLED] = this._handleAgentCalledEvent;
        map[AST_EVENT.AGENT_COMPLETE] = this._handleAgentCompleteEvent;
        map[AST_EVENT.AGENT_CONNECT] = this._handleAgentConnectEvent;
        map[AST_EVENT.AGENT_DUMP] = onUnhandledEvent.bind(this);
        map[AST_EVENT.AGENT_LOGIN] = this._handleAgentLoginEvent;
        map[AST_EVENT.AGENT_LOGOFF] = this._handleAgentLogoffEvent;
        map[AST_EVENT.AGENT_RING_NO_ANSWER] = onUnhandledEvent.bind(this);

        this._mapEvents(map);
    }

    private get agents(): Agents {
        return this._collection;
    }

    get ringingAgents(): Map<string, Agent> {
        return this.getProp(RINGING_AGENTS);
    }

    public getAgentsKeys() {
        return this.agents.keys();
    }

    public getAgentsArray(): Agent[] {
        return this.agents.toArray();
    }

    public start(callbackFn: IDfiCallbackResult, context?) {

        function finish() {
            this.server.logger.info('manager "AgentManager" started');
            AstUtil.maybeCallbackOnce(callbackFn, context, null, "agentManager");
        }


        this.server.logger.info('starting manager "AgentManager"');

        if (!this.enabled) {
            finish.call(this);
            return;
        }


        let action: IAstActionAgents = {Action: AST_ACTION.AGENTS};
        this.server.sendEventGeneratingAction(action, (err, re) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
                return;
            }
            if (typeof re !== "undefined") {
                re.events.forEach((event: IAstEventAgents) => {
                    if (event.Event === AST_EVENT.AGENTS) {
                        this._getOrCreateAgent(event);
                    }
                }, this);
            }
            finish.call(this);
        }, this);
    }

    public disconnected() {
        this.agents.clear();
    }

    /**
     * Return or create (dynamic) the requested agent.
     */
    private _getOrCreateAgent(event: TIAgent|TIInterface): Agent {
        let name: string;
        if ((event as TIAgent).Agent) {
            name = (event as TIAgent).Agent;
        } else {
            name = (event as TIInterface).Interface;
        }

        let agent = this.agents.get(name);
        if (!agent) {
            let options: IDfiAstModelAttribsAgent = {
                Device: this.server.managers.device.devices.get(name),
                Event: "agentManager:_getOrCreateAgent",
                Name: name,
                Peer: this.server.managers.peer.peers.get(name),
                State: AgentState.byName(AgentStates.AGENT_UNKNOWN)
            };
            agent = new Agent(options);
            this._addAgent(agent);
        }

        return agent;
    }

    /**
     * Update state if agent was called.
     */
    private _handleAgentCalledEvent(event: IAstEventAgentCalled): void {
        this.logger.debug("handle  AgentCalled agent %j", event.Interface);
        let agent = this._getOrCreateAgent(event);
        if (agent == null) {
            this.logger.error("Ignored AgentCalledEvent for unknown agent %j", event.Interface);
            return;
        }
        this._updateRingingAgents(event.Channel, agent);
        this._updateAgentState(agent, AgentState.byValue(AgentStates.AGENT_RINGING), event.Channel);
    }

    /**
     * Update state if agent was connected to channel.
     */
    private _handleAgentConnectEvent(event: IAstEventAgentConnect): void {
        this.logger.debug("handle  AgentConnect agent %j", event.Interface);

        let agent = this._getOrCreateAgent(event);
        if (agent == null) {
            this.logger.error("Ignored AgentConnectEvent for unknown agent %j", event.Interface, event.Channel);
            return;
        }
        this._updateAgentState(agent, AgentState.byValue(AgentStates.AGENT_ONCALL), event.Channel);
    }

    /**
     * Change state if agent logs in.
     */
    private _handleAgentLoginEvent(event: IAstEventAgentLogin): void {
        this.logger.debug("handle  AgentLogin agent %j", event.Agent);

        let agent = this._getOrCreateAgent(event);
        if (agent == null) {
            this.logger.error("Ignored AgentLoginEvent for unknown agent %s ", event.Agent);
            return;
        }
        this._updateAgentState(agent, AgentState.byValue(AgentStates.AGENT_IDLE), event.Channel);
    }

    /**
     * Change state if agent logs out.
     */
    private _handleAgentLogoffEvent(event: IAstEventAgentLogoff): void {
        this.logger.debug("handle  AgentLogoff agent %j", event.Agent);

        let agent = this._getOrCreateAgent(event);
        if (agent == null) {
            this.logger.error("Ignored AgentLogoffEvent for unknown agent %s ", event.Agent);
            return;
        }
        this._updateAgentState(agent, AgentState.byValue(AgentStates.AGENT_LOGGEDOFF));
    }

    private _handleAgentCompleteEvent(event: IAstEventAgentComplete): void {
        this.logger.debug("handle  AgentComplete agent %j", event.Interface);

        let agent = this._getOrCreateAgent(event);
        if (agent == null) {
            this.logger.error("Ignored AgentCompleteEvent for unknown agent %j. Agents: %j", event.Interface);
            return;
        }
        // remove form ringings ?
        this._updateAgentState(agent, AgentState.byValue(AgentStates.AGENT_IDLE), event.Channel);
    }

    private _handleQueueAddMember(member: QueueMember, queue: Queue): void {
        this.logger.debug("handle  QueueAddMember agent %j", member.id);

        let agent = this.agents.get(member.id);
        if (!agent) {
            let options: IDfiAstModelAttribsAgent = {
                Device: this.server.managers.device.devices.get(member.id),
                Event: "agentManager:_handleQueueAddMember",
                Name: member.id,
                Peer: this.server.managers.peer.peers.get(member.id),
                State: AgentState.byName("agent_unknown")
            };
            agent = new Agent(options);
            agent.addQueue(queue);

            member.agent = agent;
            this._addAgent(agent);
        }

    }

    private _handleQueueRemoveMember(member: QueueMember, queue: Queue): void {
        this.logger.debug("handle  QueueRemoveMember agent %j", member.id);
        let agent = this.agents.get(member.id);
        if (!agent) {
            return;
        }
        agent.removeQueue(queue);
    }

    private _addAgent(agent: Agent) {
        this.logger.info("Adding new agent %j", agent.id);
        this.agents.add(agent);
    }

    /**
     *  Set state of agent.
     */
    private _updateAgentState(agent: Agent, newState: AgentState, channel?) {
        if (channel && this.ringingAgents.size > 0 && newState.status !== AgentStates.AGENT_RINGING) {
            if (this.ringingAgents.has(channel)) {
                this.ringingAgents.delete(channel);
            }

        }

        this.logger.info("Set state of agent " + agent.id + " to " + newState.name);

        agent.state = newState;
    }

    /**
     * Updates state of agent, if the call in a queue was redirect to the next
     * agent because the ringed agent doesn't answer the call. After reset
     * state, put the next agent in charge.
     */
    private _updateRingingAgents(channelCalling: string, agent: Agent) {
        if (this.ringingAgents.has(channelCalling)) {
            this._updateAgentState(this.ringingAgents.get(channelCalling), AgentState.byValue(AgentStates.AGENT_IDLE));
        }
        this.ringingAgents.set(channelCalling, agent);
    }
}
export = AgentManager;
