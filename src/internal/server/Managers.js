"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async = require("async");
const dfiObject_1 = require("local-dfi-base/src/dfiObject");
const AgentManager_1 = require("../../managers/AgentManager");
const BridgeManager_1 = require("../../managers/BridgeManager");
const ChannelManager_1 = require("../../managers/ChannelManager");
const DahdiManager_1 = require("../../managers/DahdiManager");
const DeviceManager_1 = require("../../managers/DeviceManager");
const PeerManager_1 = require("../../managers/PeerManager");
const QueueManager_1 = require("../../managers/QueueManager");
const astUtil_1 = require("../astUtil");
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
        managers.set(DEVICE, new DeviceManager_1.default(managerOptions, state.device));
        managers.set(PEER, new PeerManager_1.default(managerOptions, state.peer));
        managers.set(BRIDGE, new BridgeManager_1.default(managerOptions, state.bridge));
        managers.set(DAHDI, new DahdiManager_1.default(managerOptions, state.dahdi));
        managers.set(CHANNEL, new ChannelManager_1.default(managerOptions, state.channel));
        managers.set(QUEUE, new QueueManager_1.default(managerOptions, state.queue));
        managers.set(AGENT, new AgentManager_1.default(managerOptions, state.agent));
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
        const aResult = (err) => {
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
        };
        async.series([
            self.device.restart.bind(self.device),
            self.peer.restart.bind(self.peer),
            self.bridge.restart.bind(self.bridge),
            self.channel.restart.bind(self.channel),
            self.dahdi.restart.bind(self.dahdi),
            self.queue.restart.bind(self.queue),
            self.agent.restart.bind(self.agent)
        ], aResult);
    }
    start(callbackFn, context) {
        const self = this;
        try {
            const aResult = (err) => {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
            };
            async.series([
                self.device.start.bind(self.device),
                self.peer.start.bind(self.peer),
                self.bridge.start.bind(self.bridge),
                self.channel.start.bind(self.channel),
                self.dahdi.start.bind(self.dahdi),
                self.queue.start.bind(self.queue),
                self.agent.start.bind(self.agent)
            ], aResult);
        }
        catch (err) {
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
        }
    }
    managers() {
        return new Map([...this.getProp(PROP_MANAGERS).entries()]);
    }
}
exports.default = ServerManagers;
//# sourceMappingURL=Managers.js.map