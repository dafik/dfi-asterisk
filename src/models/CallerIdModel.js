"use strict";
const AstUtil = require("../internal/astUtil");
const DfiObject = require("local-dfi-base/src/dfiObject");
const P_PROP_NAME = "name";
const P_PROP_NUMBER = "number";
class CallerId extends DfiObject {
    constructor(name, nbr) {
        super();
        this.setProp(P_PROP_NAME, AstUtil.isNull(name) ? null : name);
        this.setProp(P_PROP_NUMBER, AstUtil.isNull(nbr) ? null : nbr);
    }
    /**
     * Parses a caller id string in the form
     * <code>"Some Name" &lt;1234&gt;</code> to a AsteriskCallerId object.
     */
    static valueOf(s) {
        let parsedCallerId = AstUtil.parseCallerId(s);
        return new CallerId(parsedCallerId[0], parsedCallerId[1]);
    }
    get name() {
        return this.getProp(P_PROP_NAME);
    }
    get number() {
        return this.getProp(P_PROP_NUMBER);
    }
    equals(callerId) {
        if (this === callerId) {
            return true;
        }
        if (callerId == null || this.constructor.name !== callerId.constructor.name) {
            return false;
        }
        // TODO check
        if (this.name ? !this.name === callerId.name : callerId.name != null) {
            return false;
        }
        return !(this.number != null ? this.number !== callerId.number : callerId.number != null);
    }
}
module.exports = CallerId;
//# sourceMappingURL=CallerIdModel.js.map