"use strict";
const Peer = require("./PeerModel");
const Ip = require("../IpAddressModel");
const AstUtil = require("../../internal/astUtil");
const PROP_CHANNEL_TYPE = "channelType";
const PROP_OBJECT_NAME = "objectName";
const PROP_OBJECT_USER_NAME = "objectUserName";
const PROP_CHAN_OBJECT_TYPE = "chanObjectType";
const PROP_DYNAMIC = "dynamic";
const PROP_STATE = "state";
const PROP_TRUNK = "trunk";
const PROP_ENCRYPTION = "encryption";
class IAXPeer extends Peer {
    constructor(attributes, options) {
        const attr = Object.assign({}, attributes, { Encryption: AstUtil.isTrue(attributes.Encryption) ? true : false, Trunk: AstUtil.isTrue(attributes.Trunk) ? true : false, ip: new Ip({
                ipAddress: attributes.IPaddress,
                mask: attributes.Mask,
                port: parseInt(attributes.Port, 10)
            }), technology: "IAX2" });
        super(attr, options);
    }
}
IAXPeer.map = new Map([...Peer.map.entries()].concat([
    ["Channeltype", PROP_CHANNEL_TYPE],
    ["ObjectName", PROP_OBJECT_NAME],
    ["ObjectUsername", PROP_OBJECT_USER_NAME],
    ["ChanObjectType", PROP_CHAN_OBJECT_TYPE],
    ["Dynamic", PROP_DYNAMIC],
    ["Trunk", PROP_TRUNK],
    ["Encryption", PROP_ENCRYPTION],
    ["Status", PROP_STATE]
]));
module.exports = IAXPeer;
//# sourceMappingURL=IAXPeerModel.js.map