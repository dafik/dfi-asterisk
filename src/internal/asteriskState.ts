import DebugLogger from "local-dfi-debug-logger";

abstract class AsteriskState {

    public static byValue(status, stateClass): typeof stateClass {
        let tmp;
        const states = stateClass.STATES;
        for (const key  in  states) {
            if (states.hasOwnProperty(key) && states[key] === status) {
                tmp = new stateClass(states[key], key);
                return tmp;
            }
        }

        if (-1 === AsteriskState.unknown.indexOf(status)) {
            AsteriskState.unknown.push(status);
            AsteriskState.logger.error("all: %j", AsteriskState.unknown);
        }

        AsteriskState.logger.warn("unknown state %j ,%j", stateClass.constructor.name, status);
        return new stateClass("UNKNOWN", status);
    }

    public static byName(status, stateClass): typeof stateClass {
        status = status.toUpperCase();

        let tmp;
        if (stateClass.STATES.hasOwnProperty(status)) {
            tmp = new stateClass(stateClass.STATES[status], status);
            return tmp;
        }

        if (-1 === AsteriskState.unknown.indexOf(status)) {
            AsteriskState.unknown.push(status);
            AsteriskState.logger.warn("unknown state %j ,%j", stateClass.constructor.name === "Function" ? stateClass.name : stateClass.constructor.name, status);
            AsteriskState.logger.error("all: %j", AsteriskState.unknown);
            return new stateClass("UNKNOWN", status);
        }

        return null;
    }

    public static byNameOrValue(status, stateClass): typeof stateClass {

        let tmp = this.byName(status, stateClass);
        if (tmp) {
            return tmp;
        }
        tmp = this.byValue(status, stateClass);
        if (tmp) {
            return tmp;
        }

        return null;
    }

    protected static STATES;

    private static logger = new DebugLogger("dfi:as:state");

    private static unknown = [];

    public status: any;
    public name: string;

    constructor(status, name: string) {
        this.status = status;
        this.name = name;
    }

    public toString() {
        let
            sb = this.constructor.name;
        sb += "[";
        Object.keys(this).forEach((name, index, arr) => {
            sb += name + "=" + this[name];
            if (index < arr.length - 1) {
                sb += ";";
            }
        }, this);

        sb += "]";
        return sb;
    }
}

export default AsteriskState;
