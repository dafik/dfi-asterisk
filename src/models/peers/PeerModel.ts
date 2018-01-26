import PeerChannels from "../../collections/channels/PeerChannelsCollection";
import {IDfiAstEventsPeer} from "../../definitions/events";
import {IDfiAstModelAttribsPeer, IDfiAstModelOptions} from "../../definitions/models";
import PeerStates from "../../enums/peerStates";
import AsteriskModel from "../../internal/asteriskModel";
import AstUtil from "../../internal/astUtil";
import PeerState from "../../states/peerState";
import Channel from "../ChannelModel";
import Device from "../DeviceModel";
import PeerAddressHistoryEntry from "../histories/PeerAddressHistoryEntry";
import PeerStateHistoryEntry from "../histories/PeerStateHistoryEntry";
import Ip from "../IpAddressModel";

const PROP_TECHNOLOGY = "technology";
const PROP_IP = "ip";
const PROP_STATE = "state";
const PROP_CHANNEL_TYPE = "channelType";
const PROP_OBJECT_NAME = "objectName";
const PROP_CHAN_OBJECT_TYPE = "chanObjectType";
const PROP_DYNAMIC = "dynamic";

const P_PROP_STATE_HISTORY = "stateHistory";
const P_PROP_ADDRESS_HISTORY = "addressHistory";
const P_PROP_CHANNELS = "channels";
const P_PROP_DEVICE = "device";
const P_PROP_QUEUES = "queues";

const PEER_TECH = {
    IAX: "IAX2",
    PJSIP: "PJSIP",
    SIP: "SIP"
};

class Peer extends AsteriskModel {

    protected static map = new Map([
        ["technology", PROP_TECHNOLOGY],
        ["ip", PROP_IP],
        ["state", PROP_STATE],

        ["Channeltype", PROP_CHANNEL_TYPE],
        ["ObjectName", PROP_OBJECT_NAME],
        ["ChanObjectType", PROP_CHAN_OBJECT_TYPE],
        ["Dynamic", PROP_DYNAMIC]
    ]);

    public static get PEER_TECH() {
        return PEER_TECH;
    }

    constructor(attributes: IDfiAstModelAttribsPeer, options?: IDfiAstModelOptions) {

        attributes.id = attributes.technology + "/" + attributes.ObjectName;
        attributes.Dynamic = AstUtil.isTrue(attributes.Dynamic);

        if (attributes.Status) {
            const status = attributes.Status;
            attributes.state = status.match(/OK \(.*\)/) ? PeerState.byValue(2) : PeerState.byName(status);
        } else {
            attributes.state = PeerState.byValue(0);
        }
        super(attributes, options);

        this.setProp(P_PROP_STATE_HISTORY, []);
        this.setProp(P_PROP_ADDRESS_HISTORY, []);
        this.setProp(P_PROP_CHANNELS, new PeerChannels());
        this.setProp(P_PROP_QUEUES, new Set());

        this._stateChanged(this.lastUpdate, attributes.state);
        this._addressChanged(this.lastUpdate, attributes.ip);

    }

    get technology(): string {
        return this.get(PROP_TECHNOLOGY);
    }

    get ip(): Ip {
        return this.get(PROP_IP);
    }

    get channelType(): string {
        return this.get(PROP_CHANNEL_TYPE);
    }

    get objectName(): string {
        return this.get(PROP_OBJECT_NAME);
    }

    get chanObjectType(): string {
        return this.get(PROP_CHAN_OBJECT_TYPE);
    }

    get dynamic(): string {
        return this.get(PROP_DYNAMIC);
    }

    get state(): PeerState {
        return this.get(PROP_STATE);
    }

    get stateHistory(): PeerStateHistoryEntry[] {
        return this.getProp(P_PROP_STATE_HISTORY);
    }

    get addressHistory(): PeerAddressHistoryEntry[] {
        return this.getProp(P_PROP_ADDRESS_HISTORY);
    }

    get channels(): PeerChannels {
        return this.getProp(P_PROP_CHANNELS);
    }

    get device(): Device {
        return this.getProp(P_PROP_DEVICE);
    }

    set device(device: Device) {
        this.setProp(P_PROP_DEVICE, device);
    }

    public handleStatus(date: number, state: string, address: Ip) {
        this._stateChanged(date, PeerState.byNameOrValue(state));
        if (address) {
            this._addressChanged(date, address);
        }
    }

    public addChannel(channel: Channel) {
        this.channels.add(channel);
    }

    public removeChannel(channel: Channel) {
        this.channels.remove(channel.id);
    }

    public addQueue(queueName: string) {
        (this.getProp(P_PROP_QUEUES) as Set<string>).add(queueName);
    }

    public removeQueue(queueName: string) {
        (this.getProp(P_PROP_QUEUES) as Set<string>).delete(queueName);
    }

    public queues(): string[] {
        return [...(this.getProp(P_PROP_QUEUES) as Set<string>).values()].sort();
    }

    public removeOldHistory(): void {
        const stateHistories = this.stateHistory;
        let entry;
        for (let i = stateHistories.length - 1; i >= 0; i -= 1) {
            entry = stateHistories[i];
            if (entry.state.status === PeerStates.REGISTERED && stateHistories.length - 1 !== i) {
                stateHistories.splice(i, 1);
            }
        }
    }

    static get events(): IDfiAstEventsPeer {
        return EVENTS;
    }

    private _stateChanged(date: number, state: PeerState) {

        const stateHistory = this.stateHistory;
        const oldState = this.state;
        const historyEntry = new PeerStateHistoryEntry(date, state);

        const last = stateHistory.length > 0 ? stateHistory[stateHistory.length - 1] : undefined;
        if (last && last.state.status === state.status) {
            stateHistory.pop();
        } else if (stateHistory.length > 10) {
            stateHistory.shift();
        }

        stateHistory.push(historyEntry);

        this.set(PROP_STATE, state);

        this.emit(Peer.events.PROPERTY_STATE, this, {new: state, old: oldState});
    }

    private _addressChanged(date: number, address: Ip) {
        const oldAddress = this.ip;
        if (oldAddress && oldAddress.equal(address)) {
            return;
        }
        const historyEntry = new PeerAddressHistoryEntry(date, address);
        this.addressHistory.push(historyEntry);

        this.set(PROP_IP, address);
        this.emit(Peer.events.PROPERTY_ADDRESS, this, {new: address, old: oldAddress});
    }
}

const EVENTS = {
    ...AsteriskModel.events,

    PROPERTY_ADDRESS: Symbol("peer" + PROP_IP),
    PROPERTY_STATE: Symbol("peer" + PROP_STATE)
};

export default Peer;
