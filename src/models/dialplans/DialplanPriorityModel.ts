import {IDfiAstModelAttribsDialplanPriority, IDfiAstModelOptionsDialplanPriority} from "../../definitions/models";
import AsteriskModel from "../../internal/asteriskModel";
import DialplanContext from "./DialplanContextModel";
import DialplanExtension from "./DialplanExtensionModel";

const PROP_NAME = "name";
const PROP_APPLICATION = "application";
const PROP_APP_DATA = "appData";
const P_PROP_CONTEXT = "context";
const P_PROP_EXTENSION = "extension";

class DialplanPriority extends AsteriskModel {
    protected static map = new Map([
        ["Priority", PROP_NAME],
        ["Application", PROP_APPLICATION],
        ["AppData", PROP_APP_DATA]
    ]);

    constructor(attributes: IDfiAstModelAttribsDialplanPriority, options?: IDfiAstModelOptionsDialplanPriority) {
        options = options || {};
        options.idAttribute = PROP_NAME;

        super(attributes, options);
    }

    public get name() {
        return this.get(PROP_NAME);
    }

    public get priority() {
        return this.get(PROP_NAME);
    }

    public get application() {
        return this.get(PROP_APPLICATION);
    }

    public get appData() {
        return this.get(PROP_APP_DATA);
    }

    public get context(): DialplanContext {
        return this.get(P_PROP_CONTEXT);
    }

    public get extension(): DialplanExtension {
        return this.get(P_PROP_EXTENSION);
    }

}

export default DialplanPriority;
