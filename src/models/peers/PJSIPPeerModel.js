"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IpAddressModel_1 = require("../IpAddressModel");
const PeerModel_1 = require("./PeerModel");
/*const PROP_CHANNEL_TYPE = "channelType";
 const PROP_OBJECT_NAME = "objectName";
 const PROP_CHAN_OBJECT_TYPE = "chanObjectType";
 const PROP_DYNAMIC = "dynamic";
 const PROP_STATE = "state";*/
class PJSIPPeer extends PeerModel_1.default {
    constructor(attributes, options) {
        // TODO define interface
        const attr = Object.assign({}, attributes, { ChanObjectType: "", Channeltype: "", Dynamic: "", ObjectName: "", Status: attributes.DeviceState, ip: new IpAddressModel_1.default({
                ipAddress: null,
                mask: null,
                port: null
            }), technology: "PJSIP" });
        super(attr, options);
    }
}
PJSIPPeer.map = new Map([...PeerModel_1.default.map.entries()].concat([
    ["x", "x"] // TODO add mapings
]));
exports.default = PJSIPPeer;
//# sourceMappingURL=PJSIPPeerModel.js.map