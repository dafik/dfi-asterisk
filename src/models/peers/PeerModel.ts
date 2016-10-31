import AsteriskModel = require("../../internal/asteriskModel");
import AstUtil = require("../../internal/astUtil");
import PeerStateHistoryEntry = require("../histories/PeerStateHistoryEntry");
import {IDfiAstEventsPeer} from "../../definitions/events";
import {IDfiAstModelAttribsPeer, IDfiAstModelOptions} from "../../definitions/models";
import PeerStates = require("../../enums/peerStates");
import Ip = require("../IpAddressModel");
import Device = require("../DeviceModel");
import PeerChannels = require("../../collections/channels/PeerChannelsCollection");
import PeerState = require("../../states/peerState");
import Channel = require("../ChannelModel");
import PeerAddressHistoryEntry = require("../histories/PeerAddressHistoryEntry");

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
        attributes.Dynamic = AstUtil.isTrue(attributes.Dynamic) ? true : false;

        if (attributes.Status) {
            let status = attributes.Status;
            if (status.match(/OK \(.*\)/)) {
                attributes.state = PeerState.byValue(2);
            } else {
                attributes.state = PeerState.byName(status);
            }
        } else {
            attributes.state = PeerState.byValue(0);
        }
        super(attributes, options);

        this.setProp(P_PROP_STATE_HISTORY, []);
        this.setProp(P_PROP_ADDRESS_HISTORY, []);
        this.setProp(P_PROP_CHANNELS, new PeerChannels());

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

    private get _channels(): PeerChannels {
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
        this._channels.add(channel);
    }

    public removeChannel(channel: Channel) {
        this._channels.remove(channel.id);
    }

    public removeOldHistory(): void {
        let stateHistories = this.stateHistory;
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

        let stateHistory = this.stateHistory;
        let oldState = this.state;
        let historyEntry = new PeerStateHistoryEntry(date, state);

        let last = stateHistory.length > 0 ? stateHistory[stateHistory.length - 1] : undefined;
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
        let oldAddress = this.ip;
        if (oldAddress && oldAddress.equal(address)) {
            return;
        }
        let historyEntry = new PeerAddressHistoryEntry(date, address);
        this.addressHistory.push(historyEntry);

        this.set(PROP_IP, address);
        this.emit(Peer.events.PROPERTY_ADDRESS, this, {new: address, old: oldAddress});
    }
}

const EVENTS = Object.assign(
    Object.assign({}, AsteriskModel.events),
    {
        PROPERTY_ADDRESS: Symbol("peer" + PROP_IP),
        PROPERTY_STATE: Symbol("peer" + PROP_STATE)
    }
);

export = Peer;
