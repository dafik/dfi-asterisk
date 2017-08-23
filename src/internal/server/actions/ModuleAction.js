"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAction_1 = require("./BaseAction");
const astUtil_1 = require("../../astUtil");
const ManagerCommunication_1 = require("../../../errors/ManagerCommunication");
const actionNames_1 = require("../../asterisk/actionNames");
class ModuleServerAction extends BaseAction_1.default {
    isModuleLoaded(module, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.MODULE_CHECK,
                Module: module
            };
            this._server.sendAction(action, (err, xxx) => {
                let loaded = true;
                if (err) {
                    loaded = false;
                    if (err.message !== "Module not loaded") {
                        astUtil_1.default.maybeCallback(callbackFn, context, err);
                        return;
                    }
                }
                astUtil_1.default.maybeCallback(callbackFn, context, null, loaded);
            });
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
    loadModule(module) {
        this._sendModuleLoadAction(module, MODULE_LOAD_TYPES.LOAD_TYPE_LOAD);
    }
    unloadModule(module) {
        this._sendModuleLoadAction(module, MODULE_LOAD_TYPES.LOAD_TYPE_UNLOAD);
    }
    reloadModule(module) {
        this._sendModuleLoadAction(module, MODULE_LOAD_TYPES.LOAD_TYPE_RELOAD);
    }
    reloadAllModules() {
        this._sendModuleLoadAction(null, MODULE_LOAD_TYPES.LOAD_TYPE_RELOAD);
    }
    _sendModuleLoadAction(module, loadType, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.MODULE_LOAD,
                LoadType: loadType,
                Module: module
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    astUtil_1.default.maybeCallback(callbackFn, context, new ManagerCommunication_1.default(response.Message ? response.Message : response.Response));
                }
            });
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
}
const MODULE_LOAD_TYPES = Object.assign({}, Object.create(null), { LOAD_TYPE_LOAD: "load", LOAD_TYPE_RELOAD: "reload", LOAD_TYPE_UNLOAD: "unload" });
exports.default = ModuleServerAction;
//# sourceMappingURL=ModuleAction.js.map