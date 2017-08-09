import Peer = require("./PeerModel");
import Ip = require("../IpAddressModel");
import AstUtil = require("../../internal/astUtil");
import {IDfiAstModelAttribsSipPeer, IDfiAstModelOptions} from "../../definitions/models";

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

class SIPPeer extends Peer {

    protected static map = new Map(
        [...Peer.map.entries()].concat([
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
        ])
    );

    constructor(attributes: IDfiAstModelAttribsSipPeer, options?: IDfiAstModelOptions) {

        const attr: IDfiAstModelAttribsSipPeer = {
            ...attributes,

            ACL: !!AstUtil.isTrue(attributes.ACL),

            AutoComedia: !!AstUtil.isTrue(attributes.AutoComedia),
            AutoForcerport: !!AstUtil.isTrue(attributes.AutoForcerport),
            Comedia: !!AstUtil.isTrue(attributes.Comedia),
            Forcerport: !!AstUtil.isTrue(attributes.Forcerport),
            RealtimeDevice: !!AstUtil.isTrue(attributes.RealtimeDevice),
            TextSupport: !!AstUtil.isTrue(attributes.TextSupport),
            VideoSupport: !!AstUtil.isTrue(attributes.VideoSupport),

            ip: new Ip({
                ipAddress: AstUtil.isNull(attributes.IPaddress) ? null : attributes.IPaddress,
                mask: "255.255.255.255",
                port: parseInt(attributes.IPport, 10)
            }),
            technology: "SIP"
        };
        super(attr, options);
    }
}

export = SIPPeer;
