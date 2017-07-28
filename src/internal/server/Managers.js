"use strict";
const dfiObject_1 = require("local-dfi-base/src/dfiObject");
const async = require("async");
const ChannelManager = require("../../managers/ChannelManager");
const PeerManager = require("../../managers/PeerManager");
const DeviceManager = require("../../managers/DeviceManager");
const BridgeManager = require("../../managers/BridgeManager");
const DahdiManager = require("../../managers/DahdiManager");
const QueueManager = require("../../managers/QueueManager");
const AgentManager = require("../../managers/AgentManager");
const AstUtil = require("../astUtil");
const PROP_MANAGERS = "managers";
const PROP_SERVER = "server";
const DEVICE = "device";
const PEER = "peer";
const BRIDGE = "bridge";
const CHANNEL = "channel";
const DAHDI = "dahdi";
const QUEUE = "queue";
const AGENT = "agent";
class ServerManagers extends dfiObject_1.default {
    constructor(server) {
        super();
        this.setProp(PROP_MANAGERS, new Map());
        this.setProp(PROP_SERVER, server);
        const managers = this.getProp(PROP_MANAGERS);
        const managerOptions = { managers: this, server };
        const state = server.managerConfig;
        managers.set(DEVICE, new DeviceManager(managerOptions, state.device));
        managers.set(PEER, new PeerManager(managerOptions, state.peer));
        managers.set(BRIDGE, new BridgeManager(managerOptions, state.bridge));
        managers.set(DAHDI, new DahdiManager(managerOptions, state.dahdi));
        managers.set(CHANNEL, new ChannelManager(managerOptions, state.channel));
        managers.set(QUEUE, new QueueManager(managerOptions, state.queue));
        managers.set(AGENT, new AgentManager(managerOptions, state.agent));
    }
    get channel() {
        return this.getProp(PROP_MANAGERS).get(CHANNEL);
    }
    get peer() {
        return this.getProp(PROP_MANAGERS).get(PEER);
    }
    get device() {
        return this.getProp(PROP_MANAGERS).get(DEVICE);
    }
    get bridge() {
        return this.getProp(PROP_MANAGERS).get(BRIDGE);
    }
    get dahdi() {
        return this.getProp(PROP_MANAGERS).get(DAHDI);
    }
    get queue() {
        return this.getProp(PROP_MANAGERS).get(QUEUE);
    }
    get agent() {
        return this.getProp(PROP_MANAGERS).get(AGENT);
    }
    restart(callbackFn, context) {
        const self = this;
        async.series([
            self.device.restart.bind(self.device),
            self.peer.restart.bind(self.peer),
            self.bridge.restart.bind(self.bridge),
            self.channel.restart.bind(self.channel),
            self.dahdi.restart.bind(self.dahdi),
            self.queue.restart.bind(self.queue),
            self.agent.restart.bind(self.agent)
        ], (err) => {
            AstUtil.maybeCallbackOnce(callbackFn, context, err);
        });
    }
    start(callbackFn, context) {
        const self = this;
        try {
            async.series([
                self.device.start.bind(self.device),
                self.peer.start.bind(self.peer),
                self.bridge.start.bind(self.bridge),
                self.channel.start.bind(self.channel),
                self.dahdi.start.bind(self.dahdi),
                self.queue.start.bind(self.queue),
                self.agent.start.bind(self.agent)
            ], (err) => {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            });
        }
        catch (err) {
            AstUtil.maybeCallbackOnce(callbackFn, context, err);
        }
    }
    managers() {
        return new Map([...this.getProp(PROP_MANAGERS).entries()]);
    }
}
module.exports = ServerManagers;
//# sourceMappingURL=Managers.js.map