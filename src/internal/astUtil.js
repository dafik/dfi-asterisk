"use strict";
const local_dfi_debug_logger_1 = require("local-dfi-debug-logger");
const _ = require("lodash");
const TRUE_LITERALS = [
    "yes",
    "true",
    "y",
    "t",
    "1",
    "on",
    "enabled"
];
const NULL_LITERALS = [
    "<unknown>",
    "unknown",
    "none",
    "<none>",
    "-none-",
    "(none)",
    "<not set>",
    "(not set)",
    "<no name>",
    "n/a",
    "<null>",
    "(null)",
    ""
];
class AstUtil {
    /**
     * Checks if a String represents <code>true</code> or <code>false</code> according to Asterisk's logic.
     * To support the dnd property of ZapShowChannelsEvent this method
     * also considered the string "Enabled" as true.
     */
    static isTrue(o) {
        if (o == null || typeof o === "undefined") {
            return false;
        }
        if (_.isBoolean(o)) {
            return o;
        }
        const s = _.isString(o) ? o.toString() : o.toString();
        return -1 !== TRUE_LITERALS.indexOf(s.toLowerCase());
    }
    /**
     * Parses a string for caller id information.
     * The caller id string should be in the form <code>"Some Name" &lt;1234&gt;</code>.
     * This resembles <code>ast_callerid_parse</code> in
     * <code>callerid.c</code> but strips any whitespace.
     *
     * @param {string} s the string to parse
     * @returns string[] a String[] with name (index 0) and number (index 1)
     */
    static parseCallerId(s) {
        const result = [];
        let lbPosition;
        let rbPosition;
        let name;
        let nbr;
        if (s == null) {
            return result;
        }
        lbPosition = s.lastIndexOf("<");
        rbPosition = s.lastIndexOf(">");
        // no opening and closing brace? use value as CallerId name
        if (lbPosition < 0 || rbPosition < 0) {
            name = s.trim();
            if (name.length === 0) {
                name = null;
            }
            result[0] = name;
            return result;
        }
        nbr = s.substring(lbPosition + 1, rbPosition).trim();
        if (nbr.length === 0) {
            nbr = null;
        }
        name = s.substring(0, lbPosition).trim();
        if (name.startsWith("\"") && name.endsWith("\"") && name.length > 1) {
            name = name.substring(1, name.length - 1).trim();
        }
        if (name.length === 0) {
            name = null;
        }
        result[0] = name;
        result[1] = nbr;
        return result;
    }
    /**
     * @param {object} s the string to test, may be null. If s is not a string the only test that is performed is a check for null.
     * @returns boolean true if the s was null in Asterisk, false otherwise.
     */
    static isNull(s) {
        if (s === "" || s === null || typeof s === "undefined") {
            return true;
        }
        if (!(typeof s === "string")) {
            return false;
        }
        return -1 !== NULL_LITERALS.indexOf(s.toLowerCase());
    }
    static duration2sec(duration) {
        const parts = duration.split(":");
        switch (parts.length) {
            case 1:
                return parseInt(parts[0], 10);
            case 2:
                return parseInt(parts[1], 10) + parseInt(parts[0], 10) * 60;
            case 3:
                return parseInt(parts[2], 10) + parseInt(parts[1], 10) * 60 + parseInt(parts[0], 10) * 24;
            default:
                logger.error("error");
        }
    }
    static uniqueActionID() {
        return uniqueActionID();
    }
    static maybeCallback(fn, context, err, response) {
        if (_.isFunction(fn)) {
            fn.call(context, err, response);
        }
    }
    static maybeCallbackOnce(fn, context, err, response) {
        if (_.isFunction(fn)) {
            if (fn.fired) {
                AstUtil.logger.error("callback was fired before fn : \n%s", ((fn.prototype && fn.prototype.constructor) ? fn.prototype.constructor : fn.toString()));
                throw err ? err : response;
            }
            else {
                fn.fired = true;
                fn.call(context, err, response);
            }
        }
    }
    static serializeMessage(message) {
        if (!message) {
            return "";
        }
        if (!message.ActionID) {
            message.ActionID = "AN_" + AstUtil.uniqueActionID();
        }
        const rawStr = Object.keys(message).reduce((result, currentKey) => {
            if (currentKey !== "serialize") {
                if (Array.isArray(message[currentKey])) {
                    message[currentKey].forEach((val) => {
                        result.push(`${currentKey}: ${val}`);
                    });
                }
                else {
                    result.push(`${currentKey}: ${message[currentKey]}`);
                }
            }
            return result;
        }, []).join(CRLF);
        return rawStr === "" ? rawStr : rawStr + CRLF.repeat(2);
    }
    static get logger() {
        return logger;
    }
}
const CRLF = "\r\n";
const logger = new local_dfi_debug_logger_1.default("dfi:as:AstUtil");
const uniqueActionID = (() => {
    let nextId = 1;
    return () => {
        return nextId++;
    };
})();
module.exports = AstUtil;
//# sourceMappingURL=astUtil.js.map