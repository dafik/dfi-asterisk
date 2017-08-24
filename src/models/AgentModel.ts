import Queues from "../collections/QueuesCollection";
import {IDfiAstModelAttribsAgent, IDfiAstModelOptions} from "../definitions/models";
import AsteriskModel from "../internal/asteriskModel";
import AgentState from "../states/agentState";
import Device from "./DeviceModel";
import Peer from "./peers/PeerModel";
import Queue from "./queues/QueueModel";

const PROP_NAME = "name";
const PROP_DEVICE = "device";
const PROP_PEER = "peer";
const PROP_STATE = "state";
const P_PROP_QUEUES = "queues";

class Agent extends AsteriskModel {

    protected static map = new Map([
        ["Name", PROP_NAME],
        ["Device", PROP_DEVICE],
        ["Peer", PROP_PEER],
        ["State", PROP_STATE]
    ]);

    constructor(attributes: IDfiAstModelAttribsAgent, options?: IDfiAstModelOptions) {
        options = options || {};
        options.idAttribute = PROP_NAME;

        super(attributes, options);

        this.setProp(P_PROP_QUEUES, new Queues());
    }

    get name(): string {
        return this.get(PROP_NAME);
    }

    get device(): Device {
        return this.get(PROP_DEVICE);
    }

    get peer(): Peer {
        return this.get(PROP_PEER);
    }

    get state(): AgentState {
        return this.get(PROP_STATE);
    }

    set state(state: AgentState) {
        this.set(PROP_STATE, state);
    }

    get queues(): Queues {
        return this.getProp(P_PROP_QUEUES);
    }

    public addQueue(queue: Queue) {
        this.getProp(P_PROP_QUEUES).add(queue);
    }

    public removeQueue(queue: Queue) {
        this.getProp(P_PROP_QUEUES).remove(queue);
    }
}

export default Agent;
