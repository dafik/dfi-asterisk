"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BridgeChannelsCollection_1 = require("../collections/channels/BridgeChannelsCollection");
const eventNames_1 = require("../internal/asterisk/eventNames");
const asteriskModel_1 = require("../internal/asteriskModel");
const PROP_UNIQUE_ID = "uniqueid";
const PROP_TYPE = "type";
const PROP_TECHNOLOGY = "technology";
const PROP_CREATOR = "creator";
const PROP_ = "name";
const PROP_NUM_CHANNELS = "numChannels";
const PROP_LOCAL_ONE_UNIQUE_ID = "localOneUniqueId";
const PROP_LOCAL_TWO_UNIQUE_ID = "localTwoUniqueId";
const PROP_IS_HANGUP_FIRST = "isHangupFirst";
const PROP_IS_HANGUP_SECOND = "isHangupSecond";
const P_PROP_CHANNELS = "channels";
class Bridge extends asteriskModel_1.default {
    constructor(attributes, options) {
        if (attributes.Event === eventNames_1.default.BRIDGE_CREATE) {
            attributes.id = attributes.BridgeUniqueid;
        }
        else if (attributes.Event === eventNames_1.default.BRIDGE_LIST_ITEM) {
            attributes.id = attributes.BridgeUniqueid;
        }
        super(attributes, options);
        this.setProp(P_PROP_CHANNELS, new BridgeChannelsCollection_1.default());
    }
    get uniqueid() {
        return this.get(PROP_UNIQUE_ID);
    }
    get type() {
        return this.get(PROP_TYPE);
    }
    get technology() {
        return this.get(PROP_TECHNOLOGY);
    }
    get creator() {
        return this.get(PROP_CREATOR);
    }
    get name() {
        return this.get(PROP_);
    }
    get numChannels() {
        return this.get(PROP_NUM_CHANNELS);
    }
    get localOneUniqueId() {
        return this.get(PROP_LOCAL_ONE_UNIQUE_ID);
    }
    get localTwoUniqueId() {
        return this.get(PROP_LOCAL_TWO_UNIQUE_ID);
    }
    get isHangupFirst() {
        return this.get(PROP_IS_HANGUP_FIRST);
    }
    get isHangupSecond() {
        return this.get(PROP_IS_HANGUP_SECOND);
    }
    set isHangupFirst(val) {
        this.set(PROP_IS_HANGUP_FIRST, val);
    }
    set isHangupSecond(val) {
        this.set(PROP_IS_HANGUP_SECOND, val);
    }
    get _channels() {
        return this.getProp(P_PROP_CHANNELS);
    }
    addChannel(channel) {
        this._channels.add(channel);
    }
    hasChannel(channel) {
        return this._channels.has(channel);
    }
    removeChannel(channel) {
        this._channels.remove(channel);
    }
    get channelsSize() {
        return this._channels.size;
    }
    destroy() {
        this._channels
            .clear()
            .destroy();
        super.destroy();
    }
}
Bridge.map = new Map([
    ["BridgeType", PROP_TYPE],
    ["BridgeTechnology", PROP_TECHNOLOGY],
    ["BridgeCreator", PROP_CREATOR],
    ["BridgeName", PROP_],
    ["BridgeNumChannels", PROP_NUM_CHANNELS],
    ["BridgeUniqueid", PROP_UNIQUE_ID],
    ["id", "id"],
    ["isHangupFirst", PROP_IS_HANGUP_FIRST],
    ["isHangupSecond", PROP_IS_HANGUP_SECOND]
]);
exports.default = Bridge;
//# sourceMappingURL=BridgeModel.js.map