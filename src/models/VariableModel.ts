import AsteriskModel = require("../internal/asteriskModel");
import {IDfiAstModelAttribsVariable} from "../definitions/models";

const PROP_NAME = "name";
const PROP_VALUE = "value";

class Variable extends AsteriskModel {

    protected static map = new Map([
        [PROP_NAME, PROP_NAME],
        [PROP_VALUE, PROP_VALUE]
    ]);

    constructor(attributes: IDfiAstModelAttribsVariable, options?) {
        options = options || {};
        options.idAttribute = PROP_NAME;
        super(attributes, options);
    }

    get name() {
        return this.get(PROP_NAME);
    }

    get value() {
        return this.get(PROP_VALUE);
    }

    set value(value) {
        this.set(PROP_VALUE, value);
    }
}
export = Variable;
