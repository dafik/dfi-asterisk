import BaseServerAction = require("./BaseAction");
import AstUtil = require("../../astUtil");
import ManagerCommunication = require("../../../errors/ManagerCommunication");
import AST_ACTION = require("../../asterisk/actionNames");
import {IDfiCallbackResult} from "../../../definitions/interfaces";

import {IAstActionModuleCheck, IAstActionModuleLoad} from "../../asterisk/actions";

class ModuleServerAction extends BaseServerAction {

    public isModuleLoaded(module: string, callbackFn: IDfiCallbackResult, context?) {
        this._server.start()
            .then(() => {
                const action: IAstActionModuleCheck = {
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

    public loadModule(module: string) {
        this._sendModuleLoadAction(module, MODULE_LOAD_TYPES.LOAD_TYPE_LOAD);
    }

    public unloadModule(module: string) {
        this._sendModuleLoadAction(module, MODULE_LOAD_TYPES.LOAD_TYPE_UNLOAD);
    }

    public reloadModule(module: string) {
        this._sendModuleLoadAction(module, MODULE_LOAD_TYPES.LOAD_TYPE_RELOAD);
    }

    public reloadAllModules() {
        this._sendModuleLoadAction(null, MODULE_LOAD_TYPES.LOAD_TYPE_RELOAD);
    }

    private _sendModuleLoadAction(module: string, loadType: string, callbackFn?: IDfiCallbackResult, context?) {

        this._server.start()
            .then(() => {
                const action: IAstActionModuleLoad = {
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

const MODULE_LOAD_TYPES = {
    ...Object.create(null),

    LOAD_TYPE_LOAD: "load",
    LOAD_TYPE_RELOAD: "reload",
    LOAD_TYPE_UNLOAD: "unload"
};

export = ModuleServerAction;
