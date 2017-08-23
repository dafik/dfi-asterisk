"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const astUtil_1 = require("../internal/astUtil");
const dfiObject_1 = require("local-dfi-base/src/dfiObject");
const P_PROP_NAME = "name";
const P_PROP_NUMBER = "number";
class CallerId extends dfiObject_1.default {
    /**
     * Parses a caller id string in the form
     * <code>"Some Name" &lt;1234&gt;</code> to a AsteriskCallerId object.
     */
    static valueOf(s) {
        const parsedCallerId = astUtil_1.default.parseCallerId(s);
        return new CallerId(parsedCallerId[0], parsedCallerId[1]);
    }
    constructor(name, nbr) {
        super();
        this.setProp(P_PROP_NAME, astUtil_1.default.isNull(name) ? null : name);
        this.setProp(P_PROP_NUMBER, astUtil_1.default.isNull(nbr) ? null : nbr);
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
exports.default = CallerId;
//# sourceMappingURL=CallerIdModel.js.map