"use strict";
const DebugLogger = require("local-dfi-debug-logger");
class AsteriskState {
    constructor(status, name) {
        this.status = status;
        this.name = name;
    }
    static byValue(status) {
        let tmp;
        let states = this.STATES;
        for (let key in states) {
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
    static byName(status) {
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
    static byNameOrValue(status) {
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