"use strict";
const AsteriskModel = require("../../internal/asteriskModel");
const PROP_NAME = "name";
const PROP_APPLICATION = "application";
const PROP_APP_DATA = "appData";
const P_PROP_CONTEXT = "context";
const P_PROP_EXTENSION = "extension";
class DialplanPriority extends AsteriskModel {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_NAME;
        super(attributes, options);
    }
    get name() {
        return this.get(PROP_NAME);
    }
    get priority() {
        return this.get(PROP_NAME);
    }
    get application() {
        return this.get(PROP_APPLICATION);
    }
    get appData() {
        return this.get(PROP_APP_DATA);
    }
    get context() {
        return this.get(P_PROP_CONTEXT);
    }
    get extension() {
        return this.get(P_PROP_EXTENSION);
    }
}
DialplanPriority.map = new Map([
    ["Priority", PROP_NAME],
    ["Application", PROP_APPLICATION],
    ["AppData", PROP_APP_DATA]
]);
module.exports = DialplanPriority;
//# sourceMappingURL=DialplanPriorityModel.js.map