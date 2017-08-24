import {IDfiAstModelAttribsDialplanContext, IDfiAstModelOptions} from "../../definitions/models";
import AsteriskModel from "../../internal/asteriskModel";
import DialplanExtension from "./DialplanExtensionModel";

const PROP_NAME = "name";
const PROP_REGISTRAR = "registrar";

const P_PROP_EXTENSIONS = "extensions";

class DialplanContext extends AsteriskModel {
    protected static map = new Map([
        ["Context", PROP_NAME],
        ["Registrar", PROP_REGISTRAR]
    ]);

    constructor(attributes: IDfiAstModelAttribsDialplanContext, options?: IDfiAstModelOptions) {
        options = options || {};
        options.idAttribute = PROP_NAME;

        super(attributes, options);

        this.setProp(P_PROP_EXTENSIONS, new Map());
    }

    public get registrar() {
        return this.get(PROP_REGISTRAR);
    }

    public get name() {
        return this.get(PROP_NAME);
    }

    public get extensions(): Map<string, DialplanExtension> {
        return new Map([...(this.getProp(P_PROP_EXTENSIONS) as Map<string, DialplanExtension>)]);
    }

    public addExtension(extension: DialplanExtension) {
        return this.getProp(P_PROP_EXTENSIONS).set(extension.name, extension);
    }

}

export default DialplanContext;
