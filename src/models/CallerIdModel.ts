import DfiObject from "local-dfi-base/src/dfiObject";
import AstUtil from "../internal/astUtil";

const P_PROP_NAME = "name";
const P_PROP_NUMBER = "number";

class CallerId extends DfiObject {

    /**
     * Parses a caller id string in the form
     * <code>"Some Name" &lt;1234&gt;</code> to a AsteriskCallerId object.
     */
    public static valueOf(s: string): CallerId {
        const parsedCallerId = AstUtil.parseCallerId(s);
        return new CallerId(parsedCallerId[0], parsedCallerId[1]);
    }

    constructor(name: string, nbr: string) {
        super();
        this.setProp(P_PROP_NAME, AstUtil.isNull(name) ? null : name);
        this.setProp(P_PROP_NUMBER, AstUtil.isNull(nbr) ? null : nbr);
    }

    get name() {
        return this.getProp(P_PROP_NAME);
    }

    get number() {
        return this.getProp(P_PROP_NUMBER);
    }

    public equals(callerId: CallerId): boolean {
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

export default CallerId;
