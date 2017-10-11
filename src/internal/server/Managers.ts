import * as async from "async";
import DfiObject from "local-dfi-base/src/dfiObject";
import AsteriskServer from "../../asteriskServer";
import {IDfiAstConfigAstManager} from "../../definitions/configs";
import {AsyncResultArrayCallback, IDfiCallbackError} from "../../definitions/interfaces";
import AgentManager from "../../managers/AgentManager";
import BridgeManager from "../../managers/BridgeManager";
import ChannelManager from "../../managers/ChannelManager";
import DahdiManager from "../../managers/DahdiManager";
import DeviceManager from "../../managers/DeviceManager";
import PeerManager from "../../managers/PeerManager";
import QueueManager from "../../managers/QueueManager";
import AsteriskCollection from "../asteriskCollection";
import AsteriskModel from "../asteriskModel";
import AstUtil from "../astUtil";
import AsteriskManager from "./Manager";

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

    public restart(callbackFn: IDfiCallbackError<Error>, context?) {
        const self = this;

        const aResult: AsyncResultArrayCallback<any, any> = (err) => {
            AstUtil.maybeCallbackOnce(callbackFn, context, err);
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

    public start(callbackFn: IDfiCallbackError<Error>, context?) {
        const self = this;
        try {

            const aResult: AsyncResultArrayCallback<any, any> = (err) => {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
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
        } catch (err) {
            AstUtil.maybeCallbackOnce(callbackFn, context, err);
        }
    }

    public managers<T extends AsteriskManager<AsteriskModel, AsteriskCollection<AsteriskModel>>>(): Map<string, T> {
        return new Map([...(this.getProp(PROP_MANAGERS) as Map<string, T>).entries()]);
    }
}

export default ServerManagers;
