import DfiObject from "local-dfi-base/src/dfiObject";
import {IDfiAstConfigAstManager} from "../../definitions/configs";
import {IDfiCallbackResult} from "../../definitions/interfaces";
import async = require("async");
import ChannelManager = require("../../managers/ChannelManager");
import PeerManager = require("../../managers/PeerManager");
import DeviceManager = require("../../managers/DeviceManager");
import BridgeManager = require("../../managers/BridgeManager");
import DahdiManager = require("../../managers/DahdiManager");
import QueueManager = require("../../managers/QueueManager");
import AgentManager = require("../../managers/AgentManager");
import AstUtil = require("../astUtil");
import AsteriskManager = require("./Manager");
import AsteriskModel = require("../asteriskModel");
import AsteriskCollection = require("../asteriskCollection");
import AsteriskServer = require("../../asteriskServer");

const PROP_MANAGERS = "managers";
const PROP_SERVER = "server";

const DEVICE = "device";
const PEER = "peer";
const BRIDGE = "bridge";
const CHANNEL = "channel";
const DAHDI = "dahdi";
const QUEUE = "queue";
const AGENT = "agent";

class ServerManagers extends DfiObject {

    constructor(server: AsteriskServer) {
        super();

        this.setProp(PROP_MANAGERS, new Map());
        this.setProp(PROP_SERVER, server);

        const managers: Map<string, AsteriskManager<AsteriskModel, AsteriskCollection<AsteriskModel>>> = this.getProp(PROP_MANAGERS);
        const managerOptions = {managers: this, server};

        const state: IDfiAstConfigAstManager = server.managerConfig;

        managers.set(DEVICE, new DeviceManager(managerOptions, state.device));
        managers.set(PEER, new PeerManager(managerOptions, state.peer));
        managers.set(BRIDGE, new BridgeManager(managerOptions, state.bridge));
        managers.set(DAHDI, new DahdiManager(managerOptions, state.dahdi));
        managers.set(CHANNEL, new ChannelManager(managerOptions, state.channel));
        managers.set(QUEUE, new QueueManager(managerOptions, state.queue));
        managers.set(AGENT, new AgentManager(managerOptions, state.agent));
    }

    get channel(): ChannelManager {
        return this.getProp(PROP_MANAGERS).get(CHANNEL);
    }

    get peer(): PeerManager {
        return this.getProp(PROP_MANAGERS).get(PEER);
    }

    get device(): DeviceManager {
        return this.getProp(PROP_MANAGERS).get(DEVICE);
    }

    get bridge(): BridgeManager {
        return this.getProp(PROP_MANAGERS).get(BRIDGE);
    }

    get dahdi(): DahdiManager {
        return this.getProp(PROP_MANAGERS).get(DAHDI);
    }

    get queue(): QueueManager {
        return this.getProp(PROP_MANAGERS).get(QUEUE);
    }

    get agent(): AgentManager {
        return this.getProp(PROP_MANAGERS).get(AGENT);
    }

    public restart(callbackFn: IDfiCallbackResult, context?) {
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

    public start(callbackFn: IDfiCallbackResult, context?) {
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
        } catch (err) {
            AstUtil.maybeCallbackOnce(callbackFn, context, err);
        }
    }

    public managers<T extends AsteriskManager<AsteriskModel, AsteriskCollection<AsteriskModel>>>(): Map<string, T> {
        return new Map([...(this.getProp(PROP_MANAGERS) as Map<string, T>).entries()]);
    }
}

export = ServerManagers;
