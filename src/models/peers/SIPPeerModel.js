"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PeerModel_1 = require("./PeerModel");
const IpAddressModel_1 = require("../IpAddressModel");
const astUtil_1 = require("../../internal/astUtil");
const PROP_CHANNEL_TYPE = "channelType";
const PROP_OBJECT_NAME = "objectName";
const PROP_CHAN_OBJECT_TYPE = "chanObjectType";
const PROP_DYNAMIC = "dynamic";
const PROP_STATE = "state";
const PROP_AUTO_FORCE_R_PORT = "autoForceRPort";
const PROP_FORCE_R_PORT = "forceRPort";
const PROP_AUTO_COMEDIA = "autoComedia";
const PROP_COMEDIA = "comedia";
const PROP_VIDEO_SUPPORT = "VvdeoSupport";
const PROP_TEXT_SUPPORT = "textSupport";
const PROP_ACL = "acl";
const PROP_REAL_TIME_DEVICE = "realtimeDevice";
const PROP_DESCRIPTION = "description";
class SIPPeer extends PeerModel_1.default {
    constructor(attributes, options) {
        const attr = Object.assign({}, attributes, { ACL: !!astUtil_1.default.isTrue(attributes.ACL), AutoComedia: !!astUtil_1.default.isTrue(attributes.AutoComedia), AutoForcerport: !!astUtil_1.default.isTrue(attributes.AutoForcerport), Comedia: !!astUtil_1.default.isTrue(attributes.Comedia), Forcerport: !!astUtil_1.default.isTrue(attributes.Forcerport), RealtimeDevice: !!astUtil_1.default.isTrue(attributes.RealtimeDevice), TextSupport: !!astUtil_1.default.isTrue(attributes.TextSupport), VideoSupport: !!astUtil_1.default.isTrue(attributes.VideoSupport), ip: new IpAddressModel_1.default({
                ipAddress: astUtil_1.default.isNull(attributes.IPaddress) ? null : attributes.IPaddress,
                mask: "255.255.255.255",
                port: parseInt(attributes.IPport, 10)
            }), technology: "SIP" });
        super(attr, options);
    }
}
SIPPeer.map = new Map([...PeerModel_1.default.map.entries()].concat([
    ["Channeltype", PROP_CHANNEL_TYPE],
    ["ObjectName", PROP_OBJECT_NAME],
    ["ChanObjectType", PROP_CHAN_OBJECT_TYPE],
    ["Dynamic", PROP_DYNAMIC],
    ["Status", PROP_STATE],
    ["AutoForcerport", PROP_AUTO_FORCE_R_PORT],
    ["Forcerport", PROP_FORCE_R_PORT],
    ["AutoComedia", PROP_AUTO_COMEDIA],
    ["Comedia", PROP_COMEDIA],
    ["VideoSupport", PROP_VIDEO_SUPPORT],
    ["TextSupport", PROP_TEXT_SUPPORT],
    ["ACL", PROP_ACL],
    ["RealtimeDevice", PROP_REAL_TIME_DEVICE],
    ["Description", PROP_DESCRIPTION]
]));
exports.default = SIPPeer;
//# sourceMappingURL=SIPPeerModel.js.map