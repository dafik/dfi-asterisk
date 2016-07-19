"use strict";
const _ = require('lodash');

/**
 * Some static utility methods to imitate Asterisk specific logic.
 * <p/>
 * See Asterisk's <code>util.c</code>.
 * <p/>
 * Client code is not supposed to use this class.

 */



var TRUE_LITERALS = [];
TRUE_LITERALS.push("yes");
TRUE_LITERALS.push("true");
TRUE_LITERALS.push("y");
TRUE_LITERALS.push("t");
TRUE_LITERALS.push("1");
TRUE_LITERALS.push("on");
TRUE_LITERALS.push("enabled");

var NULL_LITERALS = [];
NULL_LITERALS.push("<unknown>");
NULL_LITERALS.push("unknown");
NULL_LITERALS.push("none"); // VarSet event in pbx.c
NULL_LITERALS.push("<none>");
NULL_LITERALS.push("-none-"); // IPpushress in PeerEntryEvent
NULL_LITERALS.push("(none)");
NULL_LITERALS.push("<not set>");
NULL_LITERALS.push("(not set)");
NULL_LITERALS.push("<no name>");
NULL_LITERALS.push("n/a"); // channel in AgentsEvent
NULL_LITERALS.push("<null>");
NULL_LITERALS.push("(null)"); // appData in ListDialplanEvent
NULL_LITERALS.push("");


class AstUtil {
    /**
     * Checks if a String represents <code>true</code> or <code>false</code>
     * according to Asterisk's logic.
     * To support the dnd property of
     * {@link ZapShowChannelsEvent} this method
     * also consideres the string "Enabled" as true.
     *
     * @param {object}  o the Object (usually a String) to check for <code>true</code>.
     * @returns boolean <code>true</code> if s represents <code>true</code>,
     *         <code>false</code> otherwise.
     */

    static isTrue(o) {
        if (o == null || typeof o == "undefined") {
            return false;
        }

        if (_.isBoolean(o)) {
            return o;
        }

        var s;
        if (_.isString(o)) {
            s = o.toString()
        } else {
            s = o.toString();
        }
        return -1 != TRUE_LITERALS.indexOf(s.toLowerCase());

    };

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
        /**
         * @type {string[]}
         */

        var result = [];
        /**
         * @type {number}
         */
        var lbPosition;
        /**
         * @type {number}
         */
        var rbPosition;
        /**
         * @type {string}
         */
        var name;
        /**
         * @type {string}
         */
        var number;

        if (s == null || typeof s == "undefined") {
            return result;
        }

        lbPosition = s.lastIndexOf('<');
        rbPosition = s.lastIndexOf('>');

        // no opening and closing brace? use value as AsteriskCallerId name
        if (lbPosition < 0 || rbPosition < 0) {
            name = s.trim();
            if (name.length() == 0) {
                name = null;
            }
            result[0] = name;
            return result;
        }
        else {
            number = s.substring(lbPosition + 1, rbPosition).trim();
            if (number.length() == 0) {
                number = null;
            }
        }

        name = s.substring(0, lbPosition).trim();
        var rStart = /^"/;
        var rEnd = /"$/;
        if (rStart.test(name) && rEnd.test(name) && name.length() > 1) {
            name = name.substring(1, name.length() - 1).trim();
        }
        if (name.length() == 0) {
            name = null;
        }

        result[0] = name;
        result[1] = number;
        return result;
    };

    /**
     * @param {object} s the string to test, may be null. If s is not a string the only test that is performed is a check for null.
     * @returns boolean true if the s was null in Asterisk, false otherwise.
     */

    static isNull(s) {
        if (s == '' || s == null || typeof s == null || typeof s == "undefined") {
            return true;
        }

        if (!(typeof s == 'string')) {
            return false;
        }

        return -1 != NULL_LITERALS.indexOf(s.toLowerCase());
    };

    static event2Obj(event) {
        var obj = {};

        for (var name in event) {
            if (event.hasOwnProperty(name)) {
                if (name != 'event' && name != 'EOL' && name != 'actionid' && name != 'lines') {
                    obj[name] = event[name];
                }
            }
        }
        return obj
    }

    static  isEqual(a, b) {
        return a == b
    }

}
module.exports = AstUtil;