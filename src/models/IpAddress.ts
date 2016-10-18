import {IDfiAstModelAttribsIpAddress} from "../definitions/models";
import DfiModel = require("../../tmp/local-dfi-base/src/dfiModel");

const PROP_IP = "ipAddress";
const PROP_MASK = "mask";
const PROP_PORT = "port";

class Ip extends DfiModel {

    protected static map = new Map([
        ["ipAddress", PROP_IP],
        ["mask", PROP_MASK],
        ["port", PROP_PORT]
    ]);

    constructor(attributes: IDfiAstModelAttribsIpAddress, options?) {
        super(attributes, options);
        let ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

        if (!attributes.mask.match(ipReg)) {
            throw new Error();
        }
        if (attributes.ipAddress && !attributes.ipAddress.match(ipReg)) {
            throw new Error();
        }
    }

    get ipAddress() {
        return this.get(PROP_IP);
    }

    get mask() {
        return this.get(PROP_MASK);
    }

    get port() {
        return this.get(PROP_PORT);
    }

    public equal(ip: Ip): boolean {
        return this.ipAddress === ip.ipAddress && this.mask === ip.mask && this.port === ip.port;
    }
}

export = Ip;
