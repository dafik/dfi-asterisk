import Peer = require("./PeerModel");
import {IDfiAstModelAttribsPeer, IDfiAstModelAttribsPJSIPPeer, IDfiAstModelOptions} from "../../definitions/models";
import Ip = require("../IpAddressModel");

/*const PROP_CHANNEL_TYPE = "channelType";
 const PROP_OBJECT_NAME = "objectName";
 const PROP_CHAN_OBJECT_TYPE = "chanObjectType";
 const PROP_DYNAMIC = "dynamic";
 const PROP_STATE = "state";*/

class PJSIPPeer extends Peer {

    protected static map = new Map(
        [...Peer.map.entries()].concat([
            ["x", "x"] // TODO add mapings
        ])
    );

    constructor(attributes: IDfiAstModelAttribsPJSIPPeer, options?: IDfiAstModelOptions) {
        // TODO define interface

        const attr: IDfiAstModelAttribsPeer = {
            ...attributes,
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
        };

        super(attr, options);
    }
}
export = PJSIPPeer;
