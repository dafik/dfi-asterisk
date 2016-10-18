import DfiObject = require("local-dfi-base/src/dfiObject");
import async = require("async");
import ChannelManager = require("../../managers/channelManager");
import PeerManager = require("../../managers/peerManager");
import DeviceManager = require("../../managers/deviceManager");
import BridgeManager = require("../../managers/bridgeManager");
import DahdiManager = require("../../managers/dahdiManager");
import QueueManager = require("../../managers/queueManager");
import AgentManager = require("../../managers/agentManager");
import AstUtil = require("../astUtil");
import {IDfiAstConfigAstManager} from "../../definitions/configs";
import {IDfiCallback} from "../../definitions/interfaces";
import AsteriskManager = require("./Manager");
import AsteriskModel = require("../asteriskModel");
import AsteriskCollection = require("../asteriskCollection");

const MANAGERS = "managers";
const DEVICE = "device";
const PEER = "peer";
const BRIDGE = "bridge";
const CHANNEL = "channel";
const DAHDI = "dahdi";
const QUEUE = "queue";
const AGENT = "agent";

class ServerManagers extends DfiObject {

    constructor(server) {
        super();

        let managerOptions = {server};
        let state: IDfiAstConfigAstManager = server.options.managers;

        this.setProp(MANAGERS, new Map());

        let managers: Map<string, AsteriskManager<AsteriskModel, AsteriskCollection<AsteriskModel>>> = this.getProp(MANAGERS);

        managers.set(DEVICE, new DeviceManager(managerOptions, state.device));
        managers.set(PEER, new PeerManager(managerOptions, state.peer));
        managers.set(BRIDGE, new BridgeManager(managerOptions, state.bridge));
        managers.set(CHANNEL, new ChannelManager(managerOptions, state.channel));
        managers.set(DAHDI, new DahdiManager(managerOptions, state.dahdi));
        managers.set(QUEUE, new QueueManager(managerOptions, state.queue));
        managers.set(AGENT, new AgentManager(managerOptions, state.agent));
    }

    get channel(): ChannelManager {
        return this.getProp(MANAGERS).get(CHANNEL);
    }

    get peer(): PeerManager {
        return this.getProp(MANAGERS).get(PEER);
    }

    get device(): DeviceManager {
        return this.getProp(MANAGERS).get(DEVICE);
    }

    get bridge(): BridgeManager {
        return this.getProp(MANAGERS).get(BRIDGE);
    }

    get dahdi(): DahdiManager {
        return this.getProp(MANAGERS).get(DAHDI);
    }

    get queue(): QueueManager {
        return this.getProp(MANAGERS).get(QUEUE);
    }

    get agent(): AgentManager {
        return this.getProp(MANAGERS).get(AGENT);
    }

    public restart(callbackFn: IDfiCallback, context?) {
        let self = this;
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

    public start(callbackFn: IDfiCallback, context?) {
        let self = this;
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
        } catch (err) {
            AstUtil.maybeCallbackOnce(callbackFn, context, err);
        }
    }

    public  managers<T extends AsteriskManager<AsteriskModel, AsteriskCollection<AsteriskModel>>>(): Map<string, T> {
        return new Map([...(this.getProp(MANAGERS) as Map<string, T>).entries()]);
    }
}

export = ServerManagers;
