"use strict";
const AsteriskModel = require("../../internal/asteriskModel");
const AstUtil = require("../../internal/astUtil");
const PeerStateHistoryEntry = require("../histories/peerStateHistoryEntry");
const PeerStates = require("../../enums/peerStates");
const PeerChannels = require("../../collections/channels/PeerChannelsCollection");
const PeerState = require("../../states/peerState");
const PeerAddressHistoryEntry = require("../histories/peerAddressHistoryEntry");
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
    constructor(attributes, options) {
        attributes.id = attributes.technology + "/" + attributes.ObjectName;
        attributes.Dynamic = AstUtil.isTrue(attributes.Dynamic) ? true : false;
        if (attributes.Status) {
            let status = attributes.Status;
            if (status.match(/OK \(.*\)/)) {
                attributes.state = PeerState.byValue(2);
            }
            else {
                attributes.state = PeerState.byName(status);
            }
        }
        else {
            attributes.state = PeerState.byValue(0);
        }
        super(attributes, options);
        this.setProp(P_PROP_STATE_HISTORY, []);
        this.setProp(P_PROP_ADDRESS_HISTORY, []);
        this.setProp(P_PROP_CHANNELS, new PeerChannels());
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
        this._stateChanged(date, PeerState.byNameOrValue(state));
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
    removeOldHistory() {
        let stateHistories = this.stateHistory;
        let entry;
        for (let i = stateHistories.length - 1; i >= 0; i -= 1) {
            entry = stateHistories[i];
            if (entry.state.status === PeerStates.REGISTERED && stateHistories.length - 1 !== i) {
                stateHistories.splice(i, 1);
            }
        }
    }
    static get events() {
        return EVENTS;
    }
    _stateChanged(date, state) {
        let stateHistory = this.stateHistory;
        let oldState = this.state;
        let historyEntry = new PeerStateHistoryEntry(date, state);
        let last = stateHistory.length > 0 ? stateHistory[stateHistory.length - 1] : undefined;
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
        let oldAddress = this.ip;
        if (oldAddress && oldAddress.equal(address)) {
            return;
        }
        let historyEntry = new PeerAddressHistoryEntry(date, address);
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
const EVENTS = Object.assign(Object.assign({}, AsteriskModel.events), {
    PROPERTY_ADDRESS: Symbol("peer" + PROP_IP),
    PROPERTY_STATE: Symbol("peer" + PROP_STATE)
});
module.exports = Peer;
//# sourceMappingURL=PeerModel.js.map