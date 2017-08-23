import AsteriskModel from "../internal/asteriskModel";
import {IDfiAstModelAttribsExtension, IDfiAstModelOptions} from "../definitions/models";

const PROP_CONTEXT = "context";
const PROP_EXTEN = "exten";
const PROP_PRIORITY = "priority";
const PROP_APPLICATION = "application";
const PROP_APP_DATA = "appData";

class Extension extends AsteriskModel {

    protected static map = new Map([
        ["Context", PROP_CONTEXT],
        ["Exten", PROP_EXTEN],
        ["Priority", PROP_PRIORITY],
        ["Application", PROP_APPLICATION],
        ["AppData", PROP_APP_DATA]
    ]);

    constructor(attributes: IDfiAstModelAttribsExtension, options?: IDfiAstModelOptions) {
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

export default Extension;
