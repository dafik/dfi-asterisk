"use strict";
const Peer = require("./PeerModel");
const Ip = require("../IpAddress");
const PROP_CHANNEL_TYPE = "channelType";
const PROP_OBJECT_NAME = "objectName";
const PROP_CHAN_OBJECT_TYPE = "chanObjectType";
const PROP_DYNAMIC = "dynamic";
const PROP_STATE = "state";
class PJSIPPeer extends Peer {
    constructor(attributes, options) {
        // TODO define interface
        let attr = Object.assign(attributes, {
            ChanObjectType: "",
            Channeltype: "",
            Dynamic: "",
            ObjectName: "",
            Status: attributes.DeviceState,
            ip: new Ip({
                ipAddress: null,
                mask: null,
                port: null
            }),
            technology: "PJSIP"
        });
        super(attr, options);
    }
}
PJSIPPeer.map = new Map([
    ["x", "x"] // TODO add mapings
]);
module.exports = PJSIPPeer;
//# sourceMappingURL=PJSIPPeerModel.js.map