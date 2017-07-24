"use strict";
const BaseServerAction = require("./BaseAction");
const AstUtil = require("../../astUtil");
const ManagerCommunication = require("../../../errors/ManagerCommunication");
const AST_ACTION = require("../../asterisk/actionNames");
class ModuleServerAction extends BaseServerAction {
    isModuleLoaded(module, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = {
                Action: AST_ACTION.MODULE_CHECK,
                Module: module
            };
            this._server.sendAction(action, (err, xxx) => {
                let loaded = true;
                if (err) {
                    loaded = false;
                    if (err.message !== "Module not loaded") {
                        AstUtil.maybeCallback(callbackFn, context, err);
                        return;
                    }
                }
                AstUtil.maybeCallback(callbackFn, context, null, loaded);
            });
        })
            .catch((error) => {
            if (error) {
                AstUtil.maybeCallbackOnce(callbackFn, context, error);
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
                Action: AST_ACTION.MODULE_LOAD,
                LoadType: loadType,
                Module: module
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    AstUtil.maybeCallback(callbackFn, context, new ManagerCommunication(response.Message ? response.Message : response.Response));
                }
            });
        })
            .catch((error) => {
            if (error) {
                AstUtil.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
}
const MODULE_LOAD_TYPES = Object.assign({}, Object.create(null), { LOAD_TYPE_LOAD: "load", LOAD_TYPE_RELOAD: "reload", LOAD_TYPE_UNLOAD: "unload" });
module.exports = ModuleServerAction;
//# sourceMappingURL=ModuleAction.js.map