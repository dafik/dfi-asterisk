"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskModel_1 = require("../../internal/asteriskModel");
const astUtil_1 = require("../../internal/astUtil");
const PeerStateHistoryEntry_1 = require("../histories/PeerStateHistoryEntry");
const peerStates_1 = require("../../enums/peerStates");
const PeerChannelsCollection_1 = require("../../collections/channels/PeerChannelsCollection");
const peerState_1 = require("../../states/peerState");
const PeerAddressHistoryEntry_1 = require("../histories/PeerAddressHistoryEntry");
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
class Peer extends asteriskModel_1.default {
    constructor(attributes, options) {
        attributes.id = attributes.technology + "/" + attributes.ObjectName;
        attributes.Dynamic = astUtil_1.default.isTrue(attributes.Dynamic) ? true : false;
        if (attributes.Status) {
            const status = attributes.Status;
            attributes.state = status.match(/OK \(.*\)/) ? peerState_1.default.byValue(2) : peerState_1.default.byName(status);
        }
        else {
            attributes.state = peerState_1.default.byValue(0);
        }
        super(attributes, options);
        this.setProp(P_PROP_STATE_HISTORY, []);
        this.setProp(P_PROP_ADDRESS_HISTORY, []);
        this.setProp(P_PROP_CHANNELS, new PeerChannelsCollection_1.default());
        this.setProp(P_PROP_QUEUES, new Set());
        this._stateChanged(this.lastUpdate, attributes.state);
        this._addressChanged(this.lastUpdate, attributes.ip);
    }
    static get PEER_TECH() {
        return PEER_TECH;
    }
    get technology() {
        return this.get(PROP_TECHNOLOGY);
    }
    get ip() {
        return this.get(PROP_IP);
    }
    get channelType() {
        return this.get(PROP_CHANNEL_TYPE);
    }
    get objectName() {
        return this.get(PROP_OBJECT_NAME);
    }
    get chanObjectType() {
        return this.get(PROP_CHAN_OBJECT_TYPE);
    }
    get dynamic() {
        return this.get(PROP_DYNAMIC);
    }
    get state() {
        return this.get(PROP_STATE);
    }
    get stateHistory() {
        return this.getProp(P_PROP_STATE_HISTORY);
    }
    get addressHistory() {
        return this.getProp(P_PROP_ADDRESS_HISTORY);
    }
    get _channels() {
        return this.getProp(P_PROP_CHANNELS);
    }
    get device() {
        return this.getProp(P_PROP_DEVICE);
    }
    set device(device) {
        this.setProp(P_PROP_DEVICE, device);
    }
    handleStatus(date, state, address) {
        this._stateChanged(date, peerState_1.default.byNameOrValue(state));
        if (address) {
            this._addressChanged(date, address);
        }
    }
    addChannel(channel) {
        this._channels.add(channel);
    }
    removeChannel(channel) {
        this._channels.remove(channel.id);
    }
    addQueue(queueName) {
        this.getProp(P_PROP_QUEUES).add(queueName);
    }
    removeQueue(queueName) {
        this.getProp(P_PROP_QUEUES).delete(queueName);
    }
    queues() {
        return [...this.getProp(P_PROP_QUEUES).values()].sort();
    }
    removeOldHistory() {
        const stateHistories = this.stateHistory;
        let entry;
        for (let i = stateHistories.length - 1; i >= 0; i -= 1) {
            entry = stateHistories[i];
            if (entry.state.status === peerStates_1.default.REGISTERED && stateHistories.length - 1 !== i) {
                stateHistories.splice(i, 1);
            }
        }
    }
    static get events() {
        return EVENTS;
    }
    _stateChanged(date, state) {
        const stateHistory = this.stateHistory;
        const oldState = this.state;
        const historyEntry = new PeerStateHistoryEntry_1.default(date, state);
        const last = stateHistory.length > 0 ? stateHistory[stateHistory.length - 1] : undefined;
        if (last && last.state.status === state.status) {
            stateHistory.pop();
        }
        else if (stateHistory.length > 10) {
            stateHistory.shift();
        }
        stateHistory.push(historyEntry);
        this.set(PROP_STATE, state);
        this.emit(Peer.events.PROPERTY_STATE, this, { new: state, old: oldState });
    }
    _addressChanged(date, address) {
        const oldAddress = this.ip;
        if (oldAddress && oldAddress.equal(address)) {
            return;
        }
        const historyEntry = new PeerAddressHistoryEntry_1.default(date, address);
        this.addressHistory.push(historyEntry);
        this.set(PROP_IP, address);
        this.emit(Peer.events.PROPERTY_ADDRESS, this, { new: address, old: oldAddress });
    }
}
Peer.map = new Map([
    ["technology", PROP_TECHNOLOGY],
    ["ip", PROP_IP],
    ["state", PROP_STATE],
    ["Channeltype", PROP_CHANNEL_TYPE],
    ["ObjectName", PROP_OBJECT_NAME],
    ["ChanObjectType", PROP_CHAN_OBJECT_TYPE],
    ["Dynamic", PROP_DYNAMIC]
]);
const EVENTS = Object.assign({}, asteriskModel_1.default.events, { PROPERTY_ADDRESS: Symbol("peer" + PROP_IP), PROPERTY_STATE: Symbol("peer" + PROP_STATE) });
exports.default = Peer;
//# sourceMappingURL=PeerModel.js.map