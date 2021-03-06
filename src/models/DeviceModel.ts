import {IDfiAstModelAttribsDevice, IDfiAstModelOptions} from "../definitions/models";
import AsteriskModel from "../internal/asteriskModel";
import DeviceState from "../states/deviceState";
import Peer from "./peers/PeerModel";

const PROP_DEVICE = "device";
const PROP_STATE = "state";
const PROP_PEER = "peer";
const PROP_LAST_UPDATE = "lastUpdate";

class Device extends AsteriskModel {

    protected static map = new Map([
        ["Device", PROP_DEVICE],
        ["State", PROP_STATE]
    ]);

    constructor(attributes: IDfiAstModelAttribsDevice, options?: IDfiAstModelOptions) {
        options = options || {};
        options.idAttribute = PROP_DEVICE;

        attributes.State = DeviceState.byName(attributes.State);

        super(attributes, options);
    }

    get device(): string {
        return this.get(PROP_DEVICE);
    }

    get state(): DeviceState {
        return this.get(PROP_STATE);
    }

    set state(state: DeviceState) {
        this.set(PROP_STATE, state);
    }

    public setLastUpdate($time: number): void {
        this.setProp(PROP_LAST_UPDATE, $time);
    }

    get peer(): Peer {
        return this.getProp(PROP_PEER);
    }

    set peer(value: Peer) {
        this.setProp(PROP_PEER, value);
    }
}

export default Device;
