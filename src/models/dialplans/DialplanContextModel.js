"use strict";
const AsteriskModel = require("../../internal/asteriskModel");
const PROP_NAME = "name";
const PROP_REGISTRAR = "registrar";
const P_PROP_EXTENSIONS = "extensions";
class DialplanContext extends AsteriskModel {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_NAME;
        super(attributes, options);
        this.setProp(P_PROP_EXTENSIONS, new Map());
    }
    get registrar() {
        return this.get(PROP_REGISTRAR);
    }
    get name() {
        return this.get(PROP_NAME);
    }
    get extensions() {
        return new Map([...this.getProp(P_PROP_EXTENSIONS)]);
    }
    addExtension(extension) {
        return this.getProp(P_PROP_EXTENSIONS).set(extension.name, extension);
    }
}
DialplanContext.map = new Map([
    ["Context", PROP_NAME],
    ["Registrar", PROP_REGISTRAR]
]);
module.exports = DialplanContext;
//# sourceMappingURL=DialplanContextModel.js.map