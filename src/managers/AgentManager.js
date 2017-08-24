"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AgentsCollection_1 = require("../collections/AgentsCollection");
const astUtil_1 = require("../internal/astUtil");
const Manager_1 = require("../internal/server/Manager");
const AgentModel_1 = require("../models/AgentModel");
const QueueManager_1 = require("./QueueManager");
const agentStates_1 = require("../enums/agentStates");
const actionNames_1 = require("../internal/asterisk/actionNames");
const eventNames_1 = require("../internal/asterisk/eventNames");
const agentState_1 = require("../states/agentState");
const RINGING_AGENTS = "ringingAgents";
class AgentManager extends Manager_1.default {
    constructor(options, state) {
        super(options, state, new AgentsCollection_1.default());
        this.setProp(RINGING_AGENTS, new Map());
        this.server.once(this.serverEvents.BEFORE_INIT, () => {
            if (this.server.managers.queue.enabled) {
                const queueManager = this.server.managers.queue;
                queueManager.on(QueueManager_1.default.events.MEMBER_ADD, this._handleQueueAddMember, this);
                queueManager.on(QueueManager_1.default.events.MEMBER_REMOVE, this._handleQueueRemoveMember, this);
            }
        }, this);
        if (!this.enabled) {
            return;
        }
        function onUnhandledEvent(event) {
            this.logger.error("unhandled event %s", event.Event);
        }
        const map = {};
        map[eventNames_1.default.AGENT_CALLED] = this._handleAgentCalledEvent;
        map[eventNames_1.default.AGENT_COMPLETE] = this._handleAgentCompleteEvent;
        map[eventNames_1.default.AGENT_CONNECT] = this._handleAgentConnectEvent;
        map[eventNames_1.default.AGENT_DUMP] = onUnhandledEvent.bind(this);
        map[eventNames_1.default.AGENT_LOGIN] = this._handleAgentLoginEvent;
        map[eventNames_1.default.AGENT_LOGOFF] = this._handleAgentLogoffEvent;
        map[eventNames_1.default.AGENT_RING_NO_ANSWER] = onUnhandledEvent.bind(this);
        this._mapEvents(map);
    }
    get agents() {
        return this._collection;
    }
    get ringingAgents() {
        return this.getProp(RINGING_AGENTS);
    }
    getAgentsKeys() {
        return this.agents.keys();
    }
    getAgentsArray() {
        return this.agents.toArray();
    }
    start(callbackFn, context) {
        function finish() {
            this.server.logger.info('manager "AgentManager" started');
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, "AgentManager");
        }
        this.server.logger.info('starting manager "AgentManager"');
        if (!this.enabled) {
            finish.call(this);
            return;
        }
        const action = { Action: actionNames_1.default.AGENTS };
        this.server.sendEventGeneratingAction(action, (err, re) => {
            if (err) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
                return;
            }
            if (typeof re !== "undefined") {
                re.events.forEach((event) => {
                    if (event.Event === eventNames_1.default.AGENTS) {
                        this._getOrCreateAgent(event);
                    }
                }, this);
            }
            finish.call(this);
        }, this);
    }
    disconnected() {
        this.agents.clear();
    }
    /**
     * Return or create (dynamic) the requested agent.
     */
    _getOrCreateAgent(event) {
        const name = (event.Agent) ? event.Agent : event.Interface;
        let agent = this.agents.get(name);
        if (!agent) {
            const options = {
                Device: this.server.managers.device.devices.get(name),
                Event: "agentManager:_getOrCreateAgent",
                Name: name,
                Peer: this.server.managers.peer.peers.get(name),
                State: agentState_1.default.byName(agentStates_1.default.AGENT_UNKNOWN)
            };
            agent = new AgentModel_1.default(options);
            this._addAgent(agent);
        }
        return agent;
    }
    /**
     * Update state if agent was called.
     */
    _handleAgentCalledEvent(event) {
        this.logger.debug("handle  AgentCalled agent %j", event.Interface);
        const agent = this._getOrCreateAgent(event);
        if (agent == null) {
            this.logger.error("Ignored AgentCalledEvent for unknown agent %j", event.Interface);
            return;
        }
        this._updateRingingAgents(event.Channel, agent);
        this._updateAgentState(agent, agentState_1.default.byValue(agentStates_1.default.AGENT_RINGING), event.Channel);
    }
    /**
     * Update state if agent was connected to channel.
     */
    _handleAgentConnectEvent(event) {
        this.logger.debug("handle  AgentConnect agent %j", event.Interface);
        const agent = this._getOrCreateAgent(event);
        if (agent == null) {
            this.logger.error("Ignored AgentConnectEvent for unknown agent %j", event.Interface, event.Channel);
            return;
        }
        this._updateAgentState(agent, agentState_1.default.byValue(agentStates_1.default.AGENT_ONCALL), event.Channel);
    }
    /**
     * Change state if agent logs in.
     */
    _handleAgentLoginEvent(event) {
        this.logger.debug("handle  AgentLogin agent %j", event.Agent);
        const agent = this._getOrCreateAgent(event);
        if (agent == null) {
            this.logger.error("Ignored AgentLoginEvent for unknown agent %s ", event.Agent);
            return;
        }
        this._updateAgentState(agent, agentState_1.default.byValue(agentStates_1.default.AGENT_IDLE), event.Channel);
    }
    /**
     * Change state if agent logs out.
     */
    _handleAgentLogoffEvent(event) {
        this.logger.debug("handle  AgentLogoff agent %j", event.Agent);
        const agent = this._getOrCreateAgent(event);
        if (agent == null) {
            this.logger.error("Ignored AgentLogoffEvent for unknown agent %s ", event.Agent);
            return;
        }
        this._updateAgentState(agent, agentState_1.default.byValue(agentStates_1.default.AGENT_LOGGEDOFF));
    }
    _handleAgentCompleteEvent(event) {
        this.logger.debug("handle  AgentComplete agent %j", event.Interface);
        const agent = this._getOrCreateAgent(event);
        if (agent == null) {
            this.logger.error("Ignored AgentCompleteEvent for unknown agent %j. Agents: %j", event.Interface);
            return;
        }
        // remove form ringings ?
        this._updateAgentState(agent, agentState_1.default.byValue(agentStates_1.default.AGENT_IDLE), event.Channel);
    }
    _handleQueueAddMember(member, queue) {
        this.logger.debug("handle  QueueAddMember agent %j", member.id);
        let agent = this.agents.get(member.id);
        if (!agent) {
            const options = {
                Device: this.server.managers.device.devices.get(member.id),
                Event: "agentManager:_handleQueueAddMember",
                Name: member.id,
                Peer: this.server.managers.peer.peers.get(member.id),
                State: agentState_1.default.byName("agent_unknown")
            };
            agent = new AgentModel_1.default(options);
            agent.addQueue(queue);
            member.agent = agent;
            this._addAgent(agent);
        }
    }
    _handleQueueRemoveMember(member, queue) {
        this.logger.debug("handle  QueueRemoveMember agent %j", member.id);
        const agent = this.agents.get(member.id);
        if (!agent) {
            return;
        }
        agent.removeQueue(queue);
    }
    _addAgent(agent) {
        this.logger.info("Adding new agent %j", agent.id);
        this.agents.add(agent);
    }
    /**
     *  Set state of agent.
     */
    _updateAgentState(agent, newState, channel) {
        if (channel && this.ringingAgents.size > 0 && newState.status !== agentStates_1.default.AGENT_RINGING) {
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
    _updateRingingAgents(channelCalling, agent) {
        if (this.ringingAgents.has(channelCalling)) {
            this._updateAgentState(this.ringingAgents.get(channelCalling), agentState_1.default.byValue(agentStates_1.default.AGENT_IDLE));
        }
        this.ringingAgents.set(channelCalling, agent);
    }
}
exports.default = AgentManager;
//# sourceMappingURL=AgentManager.js.map