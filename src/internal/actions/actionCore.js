"use strict";
const
    dAmiLib = require("../../../examples/dfi-asterisk-ami/src/dAmi"),
    actions = dAmiLib.Actions,
    responses = dAmiLib.Responses,


    CommandAction = actions.Command,
    Version = require('../../internal/asteriskVersion'),

    SHOW_VERSION_FILES_COMMAND = "core show file version",
    SHOW_VERSION_FILES_PATTERN = /^([\S]+)\s+Revision: ([0-9\.]+)/,
    SHOW_VERSION_COMMAND = "core show version"

    ;

class AsteriskActionCore {
    constructor(server) {
        this.server = server;
    }

    /**
     * @param {function((ManagerError|null))} callback
     * @param [thisp]
     */
    getAvailableActions(callback, thisp) {
        function onResponse(err, response) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            var found = []; //
            var lines = response.getResults();
            lines.forEach(onEachResponseLine);
            /**
             * @param {string} line
             * @param {number} index
             */
            function onEachResponseLine(line, index) {
                if (index > 1 && index < lines.length) {
                    found.push(line.trim().split(' ')[0]);
                }
            }

            this.server.options.allowedActions = found.sort();
            callback.call(thisp, null);
        }

        this.server.loggers.logger.debug('on getAvailableActions');
        var action = new CommandAction('manager show commands');

        this.server.sendEventGeneratingAction(action, onResponse, this);
    }

    filterRTCP(callback) {
        this.server.loggers.logger.debug('on onAvailableActions');
        var action = new actions.Filter('Add', '!Event: RTCP');
        this.server.sendAction(action, callback);
    }

    getVersion(callback) {
        this.server.loggers.logger.debug('on getVersion');

        var action = new CommandAction(SHOW_VERSION_COMMAND);
        this.server.sendEventGeneratingAction(action, onVersion, this);

        function onVersion(err, response) {
            this.server.loggers.logger.debug('on onVersion');

            var tmp = response.getResults()[0].replace(/built by.+/, '').replace('Asterisk', '').trim();
            if (-1 != tmp.indexOf('SVN')) {
                tmp = tmp.replace('SVN-branch-', '').replace(/-r.*/, '').trim() + '.-1.-1';
            }
            this.server.version = new Version(tmp);
            callback();
        }
    }


    /**
     * @param {function((ManagerError|null),Version)} callback
     * @param thisp
     */
    getVersionGETTEROLD(callback, thisp) {

        this._initializeIfNeeded(onInitialized, this);

        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            callback.call(thisp, null, this.version);
        }
    }

    /**
     *
     * @param {String} file
     * @param {function((ManagerError|null),number[])} [callback]
     * @param thisp
     */
    getFileVersion(file, callback, thisp) {
        /**
         * @type {String}
         */
        var fileVersion = null;
        /**
         * @type {String[]}
         */
        var parts;
        /**
         * @type {number[]}
         */
        var intParts;
        /**
         * @type {number}
         */
        var i;

        this._initializeIfNeeded(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            if (this.versions == null) {
                /**
                 * @type {CommandAction}
                 */
                var action = new CommandAction(SHOW_VERSION_FILES_COMMAND);
                this.sendEventGeneratingAction(action, onResponse);

            } else {
                onFileVersion(this.versions.get(file));
            }


        }

        function onFileVersion(fileVersion) {
            if (fileVersion == null) {
                return null;
            }

            parts = fileVersion.split(".");
            intParts = [];


            for (i = 0; i < parts.length; i++) {
                try {
                    intParts[i] = parseInt(parts[i]);
                } catch (e) {
                    //NumberFormatException
                    intParts[i] = 0;
                }
            }
            if (typeof callback == "function") {
                callback.call(thisp, null, intParts);
            }
        }

        function onResponse(err, response) {
            if (err) {
                this.loggers.logger.warn("Unable to send '" + SHOW_VERSION_FILES_COMMAND + "' command.", e);
                callback.call(thisp, err);
                return;
            }
            if (response instanceof responses.CommandResponse) {
                //Map < String, String >
                var map;
                map = new Collection();
                //List < String >
                var result;

                result = response.getResults();

                for (i = 2; i < result.length - 1; i++) {
                    /**
                     * @type {String}
                     */
                    var line;
                    /**
                     * @type {[]}
                     */
                    var matcher;

                    line = result[i];
                    matcher = SHOW_VERSION_FILES_PATTERN.exec(line);
                    if (matcher && matcher.length > 0) {
                        /**
                         * @type {String}
                         */
                        var key = matcher[1];
                        /**
                         * @type {String}
                         */
                        var value = matcher[2];

                        map.put(key, value);
                    }
                }

                fileVersion = map.get(file);
                this.versions = map;

                onFileVersion(fileVersion);

            } else {
                this.loggers.logger.error("Response to CommandAction(\"" + SHOW_VERSION_FILES_COMMAND + "\") was not a CommandResponse but " + response);
            }
        }

    }


//List<String>
    /**
     *
     * @param {String} command
     * @returns {*}
     * @param {function((ManagerError|null),string[])} [callback]
     * @param thisp
     */
    executeCliCommand(command, callback, thisp) {
        this._initializeIfNeeded(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            /**
             * @type {CommandAction}
             */
            var action = new CommandAction(command);
            this.sendAction(action, onResponse);
        }

        /**
         *
         * @param err
         * @param {CommandResponse} response
         */
        function onResponse(err, response) {
            if (err) {
                callback.call(thisp, new Error('ManagerCommunicationException("Response to CommandAction(\"" + command \") was not a CommandResponse but "' + response));
            }
            if (typeof callback == "function") {
                callback.call(thisp, null, response.getResults());
            }
        }
    }


}
module.exports = AsteriskActionCore;