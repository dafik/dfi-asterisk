"use strict";
const DebugLogger = require("local-dfi-debug-logger");
class AsteriskState {
    constructor(status, name) {
        this.status = status;
        this.name = name;
    }
    static byValue(status, stateClass) {
        let tmp;
        const states = stateClass.STATES;
        for (const key in states) {
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
    static byName(status, stateClass) {
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
    static byNameOrValue(status, stateClass) {
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
    toString() {
        let sb = this.constructor.name;
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
AsteriskState.logger = new DebugLogger("dfi:as:state");
AsteriskState.unknown = [];
module.exports = AsteriskState;
//# sourceMappingURL=asteriskState.js.map