import DebugLogger from "local-dfi-debug-logger";
import * as _ from "lodash";
import {IDfiCallbackResult} from "../definitions/interfaces";
import {IAstAction} from "./asterisk/actions";

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
    "none", // VarSet event in pbx.c
    "<none>",
    "-none-", // IP push res in PeerEntryEvent
    "(none)",
    "<not set>",
    "(not set)",
    "<no name>",
    "n/a", // channel in AgentsEvent
    "<null>",
    "(null)", // appData in ListDialplanEvent
    ""
];

class AstUtil {
    /**
     * Checks if a String represents <code>true</code> or <code>false</code> according to Asterisk's logic.
     * To support the dnd property of ZapShowChannelsEvent this method
     * also considered the string "Enabled" as true.
     */
    public static isTrue(o) {
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
    public static parseCallerId(s: string): string[] {
        const result: string[] = [];
        let lbPosition: number;
        let rbPosition: number;
        let name: string;
        let nbr: string;

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

    public static isNull(s) {
        if (s === "" || s === null || typeof s === "undefined") {
            return true;
        }

        if (!(typeof s === "string")) {
            return false;
        }

        return -1 !== NULL_LITERALS.indexOf(s.toLowerCase());
    }

    public static duration2sec(duration: string): number {
        const parts: string[] = duration.split(":");
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

    public static uniqueActionID(): number {
        return uniqueActionID();
    }

    public static maybeCallback(fn: IDfiCallbackResult, context, err?, response?): void {
        if (_.isFunction(fn)) {
            fn.call(context, err, response);
        }
    }

    public static maybeCallbackOnce(fn: IDfiCallbackResult, context, err?, response?): void {
        if (_.isFunction(fn)) {
            if (fn.fired) {
                AstUtil.logger.error("callback was fired before fn : \n%s", ((fn.prototype && fn.prototype.constructor) ? fn.prototype.constructor : fn.toString()));
                throw err ? err : response;
            } else {
                fn.fired = true;
                fn.call(context, err, response);
            }
        }
    }

    public static serializeMessage(message: IAstAction) {
        if (!message) {
            return "";
        }
        if (!message.ActionID) {
            message.ActionID = "AN_" + AstUtil.uniqueActionID();
        }

        const rawStr = Object.keys(message).reduce((result, currentKey) => {
            if (currentKey !== "serialize") {
                if (Array.isArray(message[currentKey])) {
                    (message[currentKey] as string[]).forEach((val) => {
                        result.push(`${currentKey}: ${val}`);
                    });
                } else {
                    result.push(`${currentKey}: ${message[currentKey]}`);
                }
            }
            return result;
        }, []).join(CRLF);

        return rawStr === "" ? rawStr : rawStr + CRLF.repeat(2);
    }

    private static get logger() {
        return logger;
    }
}

const CRLF = "\r\n";

const logger = new DebugLogger("dfi:as:AstUtil");

const uniqueActionID = (() => {
    let nextId = 1;
    return () => {
        return nextId++;
    };
})();

export = AstUtil;
