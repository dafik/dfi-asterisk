"use strict";
const BaseServerAction = require("./BaseAction");
const actionNames_1 = require("../../asterisk/actionNames");
const AstUtil = require("../../astUtil");
const ManagerCommunication = require("../../../errors/ManagerCommunication");
class ModuleServerAction extends BaseServerAction {
    isModuleLoaded(module, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
                Action: actionNames_1.AST_ACTION.MODULE_CHECK,
                Module: module
            };
            this._server.sendAction(action, (err, xxx) => {
                let loaded = true;
                if (err) {
                    loaded = false;
                    if (err.response !== "Module not loaded") {
                        AstUtil.maybeCallback(callbackFn, context, err);
                        return;
                    }
                }
                AstUtil.maybeCallback(callbackFn, context, null, loaded);
            });
        })
            .catch(error => error)
            .then((err) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
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
            let action = {
                Action: actionNames_1.AST_ACTION.MODULE_LOAD,
                LoadType: loadType,
                Module: module
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    AstUtil.maybeCallback(callbackFn, context, new ManagerCommunication(response));
                }
            });
        })
            .catch(error => error)
            .then((err) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            }
        });
    }
}
const MODULE_LOAD_TYPES = Object.assign(Object.create(null), {
    LOAD_TYPE_LOAD: "load",
    LOAD_TYPE_RELOAD: "reload",
    LOAD_TYPE_UNLOAD: "unload"
});
module.exports = ModuleServerAction;
//# sourceMappingURL=ModuleAction.js.map