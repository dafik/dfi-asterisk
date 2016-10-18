"use strict";
const AsteriskModel = require("../internal/asteriskModel");
const Queues = require("../collections/QueuesCollection");
const PROP_NAME = "name";
const PROP_DEVICE = "device";
const PROP_PEER = "peer";
const PROP_STATE = "state";
const P_PROP_QUEUES = "queues";
class Agent extends AsteriskModel {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_NAME;
        super(attributes, options);
        this.setProp(P_PROP_QUEUES, new Queues());
    }
    get name() {
        return this.get(PROP_NAME);
    }
    get device() {
        return this.get(PROP_DEVICE);
    }
    get peer() {
        return this.get(PROP_PEER);
    }
    get state() {
        return this.get(PROP_STATE);
    }
    set state(state) {
        this.set(PROP_STATE, state);
    }
    get queues() {
        return this.getProp(P_PROP_QUEUES);
    }
    addQueue(queue) {
        this.getProp(P_PROP_QUEUES).add(queue);
    }
    removeQueue(queue) {
        this.getProp(P_PROP_QUEUES).remove(queue);
    }
}
Agent.map = new Map([
    ["Name", PROP_NAME],
    ["Device", PROP_DEVICE],
    ["Peer", PROP_PEER],
    ["State", PROP_STATE]
]);
module.exports = Agent;
//# sourceMappingURL=AgentModel.js.map