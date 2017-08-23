"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskModel_1 = require("../../internal/asteriskModel");
const PROP_NAME = "name";
const PROP_REGISTRAR = "registrar";
const P_PROP_EXTENSIONS = "extensions";
class DialplanContext extends asteriskModel_1.default {
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
exports.default = DialplanContext;
//# sourceMappingURL=DialplanContextModel.js.map