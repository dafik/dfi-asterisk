"use strict";
const
    dAmiLib = require("../../../examples/dfi-asterisk-ami/src/dAmi"),
    actions = dAmiLib.Actions,

    DbGet = actions.DBGet,
    DbDel = actions.DBDel,
    DbDelTree = actions.DBDelTree,
    DbPut = actions.DBPut;

/**
 * @typedef AsteriskActionDb
 * @property {AsteriskServer} server
 */
class AsteriskActionDb {
    /**
     * @param {AsteriskServer} server
     */
    constructor(server) {
        this.server = server;
    }

    /**
     * @param {String} family
     * @param {String} key
     * @param {function} [callback] - The callback that handles the response.
     * @param thisp
     */
    dbGet(family, key, callback, thisp) {
        this.server.start(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            /**
             * @type {DbGet}
             */
            var action = new DbGet(family, key);
            this.server.sendEventGeneratingAction(action, onResponse);
        }

        /**
         * @param err
         * @param  response
         */
        function onResponse(err, response) {
            if (err) {
                callback.call(thisp, err);
                return;
            }
            var dbgre;
            if (response.events.length > 0) {

                dbgre = response.events[0];
            } else {
                dbgre = response
            }


            if (typeof callback == "function") {
                callback.call(thisp, null, dbgre);
            }
        }
    }


    /**
     * @param {String} family
     * @param {String} key
     * @param {function} callback
     * @param {{}} thisp callback this
     */
    dbDel(family, key, callback, thisp) {
        this.server.start(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }

            /**
             * @type {DbDel}
             */
            var action = new DbDel(family, key);
            this.server.sendAction(action, callback, thisp);
        }
    }

    /**
     * @param {String} family
     * @param {function((ManagerError|null),ManagerResponse)} [callback]
     * @param {*} [thisp] callback this
     */
    dbDelTree(family, callback, thisp) {
        this.server.start(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            /**
             * @type {DbDelTree}
             */
            var action = new DbDelTree(family);
            this.server.sendAction(action, onResponse, thisp);

        }

        /**
         * @param err
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (err) {
                if (err.message == 'Database entry not found') {
                    response = err;
                } else {
                    callback.call(thisp, err);
                    return
                }
            }
            var dbgre;
            if (response.events.length > 0) {
                dbgre = response.events[0];
            } else {
                dbgre = response
            }
            if (typeof callback == "function") {
                callback.call(thisp, null, dbgre);
            }
        }
    }


    /**
     * @param {String} family
     * @param {String} key
     * @param {String} value
     * @param callback
     */
    dbPut(family, key, value, callback) {
        this.server.start(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            /**
             * @type {DbPut}
             */
            var action = new DbPut(family, key, value);
            this.server.sendAction(action, callback);
        }
    }
}
module.exports = AsteriskActionDb;