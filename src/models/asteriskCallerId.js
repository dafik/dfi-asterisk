"use strict";
const
    astUtil = require('../objects/astUtil');

/**
 * Represents a Caller*ID containing name and number.
 */
class AsteriskCallerId {
    constructor(name, number) {
        this.name = name;
        this.number = number;
    }

    get(property) {
        if (this.hasOwnProperty(property)) {
            return this[property]
        }

        return undefined;
    }


    /**
     * @param {object} o
     * @returns boolean
     */
    equals(o) {
        if (this == o) {
            return true;
        }
        if (o == null || this.__proto__.constructor.name != o.__proto__.constructor.name) {
            return false;
        }


        /**
         *
         * @type {AsteriskCallerId}
         */
        var callerId = o;


        //TODO check
        if (this.get('name') ? !this.get('name') == callerId.get('name') : callerId.get('name') != null) {
            return false;
        }
        return !(this.number != null ? !this.number.equals(callerId.number) : callerId.number != null);


    }

    /**
     * @returns number
     */
    hashCode() {
        /**
         *
         * @type {number}
         */
        var result = this.name != null ? this.name.hashCode() : 0;
        result = 31 * result + (this.number != null ? this.number.hashCode() : 0);
        return result;
    }


    /**
     * Parses a caller id string in the form
     * <code>"Some Name" &lt;1234&gt;</code> to a AsteriskCallerId object.
     *
     * @param {string} s the caller id string to parse.
     * @returns {AsteriskCallerId} the corresponding AsteriskCallerId object which is never <code>null</code>.
     * @see AstUtil#parseCallerId(String)
     */
    static valueOf(s) {
        /**
         * @type {String[]}
         */
        var parsedCallerId;

        parsedCallerId = astUtil.parseCallerId(s);
        return new AsteriskCallerId(parsedCallerId[0], parsedCallerId[1]);
    }
}

module.exports = AsteriskCallerId;
