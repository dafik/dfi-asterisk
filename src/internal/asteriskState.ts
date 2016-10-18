import DebugLogger = require("local-dfi-debug-logger");

abstract class AsteriskState {

    public static byValue<T extends AsteriskState>(status): T {
        let tmp;
        let states = this.STATES;
        for (let key  in  states) {
            if (states.hasOwnProperty(key) && states[key] === status) {
                tmp = new this(states[key], key);
                return tmp;
            }
        }

        if (-1 === AsteriskState.unknown.indexOf(status)) {
            AsteriskState.unknown.push(status);
            AsteriskState.logger.error("all: %j", AsteriskState.unknown);
        }

        AsteriskState.logger.warn("unknown state %j ,%j", this.constructor.name, status);
        return new this("UNKNOWN", status);
    }

    public static byName<T extends AsteriskState>(status): T {
        status = status.toUpperCase();

        let tmp;
        if (this.STATES.hasOwnProperty(status)) {
            tmp = new this(this.STATES[status], status);
            return tmp;
        }

        if (-1 === AsteriskState.unknown.indexOf(status)) {
            AsteriskState.unknown.push(status);
            AsteriskState.logger.warn("unknown state %j ,%j", this.constructor.name === "Function" ? this.name : this.constructor.name, status);
            AsteriskState.logger.error("all: %j", AsteriskState.unknown);
            return new this("UNKNOWN", status);
        }

        return null;
    }

    public static byNameOrValue(status) {

        let tmp = this.byName(status);
        if (tmp) {
            return tmp;
        }
        tmp = this.byValue(status);
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
export = AsteriskState;
