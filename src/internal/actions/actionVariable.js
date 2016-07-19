"use strict";
const
    dAmiLib = require("../../../examples/dfi-asterisk-ami/src/dAmi"),
    Getvar = dAmiLib.Actions.Getvar,
    Setvar = dAmiLib.Actions.Setvar;

class AsteriskActionVariable {
    constructor(server) {
        this.server = server;
    }


    /**
     * @param {String} variable
     * @param {function(ManagerError|null,string)} [callback]
     * @param thisp
     */
    getGlobalVariable(variable, callback, thisp) {
        //TODO check
        /**
         * @type {String}
         */
        var value;

        this._initializeIfNeeded(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            this.sendAction(new Getvar(variable), onResponse);
        }

        /**
         * @param err
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (err) {
                callback.call(thisp.err)
            }

            value = response.getAttribute("Value");
            if (value == null) {
                value = response.getAttribute(variable); // for Asterisk 1.0.x
            }
            callback.call(thisp, null, value);
        }
    }

    /**
     * @param {String} variable
     * @param {String} value
     * @param thisp
     */
    setGlobalVariable(variable, value, thisp) {
        this._initializeIfNeeded(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            /**
             * @type {dAmi.actions.Setvar}
             */
            var action = new Setvar(variable, value);
            this.sendAction(action, onResponse);
        }

        /**
         * @param err
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (err) {
                this.loggers.logger.error("Unable to set global variable '" + variable + "' to '" + value + "':" + response.getMessage());
                callback.call(thisp, err);

            }
        }
    }

}

module.exports = AsteriskActionVariable;