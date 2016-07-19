"use strict";
const  dAmiLib = require("local-dfi-asterisk-ami"),

    actions = dAmiLib.Actions,

    ModuleCheckAction = actions.ModuleCheck,
    ModuleLoadAction = actions.ModuleLoad,
    ModuleLoadTypes = require('../../enums/defs/moduleLoadTypes');

class AsteriskActionModule {
    constructor(server) {
        this.server = server;
    }


    /**
     * @param {String} module
     * @param {function} [callback]
     * @param thisp
     */
    isModuleLoaded(module, callback, thisp) {
        this._initializeIfNeeded(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            /**
             * @type {ModuleCheckAction}
             */
            var action = new ModuleCheckAction(module);
            this.sendAction(action, onResponse)
        }

        function onResponse(err) {
            if (err) {
                callback.call(thisp, err);
                return;
            }
            callback.call(thisp, null);
        }
    }

    /**
     * @param {String} module
     */
    loadModule(module) {
        this.sendModuleLoadAction(module, ModuleLoadTypes.LOAD_TYPE_LOAD);
    }

    /**
     * @param {String} module
     */
    unloadModule(module) {
        this.sendModuleLoadAction(module, ModuleLoadTypes.LOAD_TYPE_UNLOAD);
    }

    /**
     * @param {String} module
     */
    reloadModule(module) {
        this.sendModuleLoadAction(module, ModuleLoadTypes.LOAD_TYPE_RELOAD);
    }

    reloadAllModules() {
        this.sendModuleLoadAction(null, ModuleLoadTypes.LOAD_TYPE_RELOAD);
    }

    /**
     * @param {String} module
     * @param {String} loadType
     * @param thisp
     */
    sendModuleLoadAction(module, loadType, thisp) {
        this._initializeIfNeeded(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            /**
             * @type {ModuleLoadAction}
             */
            var action = new ModuleLoadAction(module, loadType);
            this.sendAction(action, onResponse);
        }

        /**
         * @param err
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (err) {
                callback.call(thisp, new Error('ManagerCommunicationException(' + response.getMessage() + ', null);'));
            }
        }
    }


}
module.exports = AsteriskActionModule;