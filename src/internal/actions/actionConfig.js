"use strict";
const dAmiLib = require("local-dfi-asterisk-ami"),
    GetConfigAction = dAmiLib.Actions.GetConfig;

class AsteriskActionConfig {
    constructor(server) {
        this.server = server;
    }

    /**
     * @param {String} filename
     * @returns ConfigFile
     * @param {function((ManagerError|null),ConfigFile)} [callback]
     * @param thisp
     */
    getConfig(filename, callback, thisp) {

        //TODO check OCB
        this._initializeIfNeeded(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            /**
             * @type {GetConfigAction}
             */
            var action = new GetConfigAction(filename);
            this.sendAction(action, onResponse);
        }

        /**
         * @param err
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (err) {
                callback.call(thisp, new Error('ManagerCommunicationException("Response to GetConfigAction(\"" + filename + "\") was not a CommandResponse but " + response, null); '));
            }
            /**
             * @type {GetConfigResponse}
             */
            var getConfigResponse;
            getConfigResponse = response;
            var categories = new Collection();
            //noinspection JSMismatchedCollectionQueryUpdate
            /**
             * @type {String[]}
             */
            var categoryMap = getConfigResponse.categories;
            categoryMap.forEach(function (category) {
                var lines;

                if (getConfigResponse.config.hasOwnProperty(category)) {
                    lines = getConfigResponse.config[category];
                } else {
                    lines = []
                }
                categories.put(category, lines);
            });
            if (typeof callback == "function") {
                /**
                 * @type {ConfigFile}
                 */
                var config = new ConfigFile(filename, categories);
                callback(config);
            }
        }
    }

}
module.exports = AsteriskActionConfig;