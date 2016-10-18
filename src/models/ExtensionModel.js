"use strict";
const AsteriskModel = require("../internal/asteriskModel");
const PROP_CONTEXT = "context";
const PROP_EXTEN = "exten";
const PROP_PRIORITY = "priority";
const PROP_APPLICATION = "application";
const PROP_APP_DATA = "appData";
class Extension extends AsteriskModel {
    constructor(attributes, options) {
        super(attributes, options);
    }
    get context() {
        return this.get(PROP_CONTEXT);
    }
    get exten() {
        return this.get(PROP_EXTEN);
    }
    get priority() {
        return this.get(PROP_PRIORITY);
    }
    get application() {
        return this.get(PROP_APPLICATION);
    }
    get appData() {
        return this.get(PROP_APP_DATA);
    }
}
Extension.map = new Map([
    ["Context", PROP_CONTEXT],
    ["Exten", PROP_EXTEN],
    ["Priority", PROP_PRIORITY],
    ["Application", PROP_APPLICATION],
    ["AppData", PROP_APP_DATA]
]);
module.exports = Extension;
//# sourceMappingURL=ExtensionModel.js.map