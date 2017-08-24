import {IDfiAstModelAttribsDialplanExtension, IDfiAstModelOptionsDialplanExtension} from "../../definitions/models";
import AsteriskModel from "../../internal/asteriskModel";
import DialplanContext from "./DialplanContextModel";
import DialplanPriority from "./DialplanPriorityModel";

const PROP_NAME = "name";

const P_PROP_CONTEXT = "context";
const P_PROP_PRIORITIES = "priorities";

class DialplanExtension extends AsteriskModel {
    protected static map = new Map([
        ["Extension", PROP_NAME]
    ]);

    constructor(attributes: IDfiAstModelAttribsDialplanExtension, options?: IDfiAstModelOptionsDialplanExtension) {
        options = options || {};
        options.idAttribute = PROP_NAME;

        super(attributes, options);

        this.setProp(P_PROP_PRIORITIES, new Map());
    }

    public get name() {
        return this.get(PROP_NAME);
    }

    public get extension() {
        return this.get(PROP_NAME);
    }

    public get context(): DialplanContext {
        return this.get(P_PROP_CONTEXT);
    }

    public get priorities(): Map<string, DialplanPriority> {
        return new Map([...(this.getProp(P_PROP_PRIORITIES) as Map<string, DialplanPriority>)]);
    }

    public addPriority(priority: DialplanPriority) {
        return this.getProp(P_PROP_PRIORITIES).set(priority.id, priority);
    }
}

export default DialplanExtension;
