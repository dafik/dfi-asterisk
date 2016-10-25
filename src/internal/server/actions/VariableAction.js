"use strict";
const BaseServerAction = require("./BaseAction");
const actionNames_1 = require("../../asterisk/actionNames");
const util_1 = require("util");
const AstUtil = require("../../astUtil");
class VariableServerAction extends BaseServerAction {
    getGlobalVariable(variable, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
                Action: actionNames_1.AST_ACTION.GET_VAR,
                Variable: variable
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    AstUtil.maybeCallback(callbackFn, context, err);
                }
                AstUtil.maybeCallback(callbackFn, context, null, response.Value);
            });
        })
            .catch(error => error)
            .then((err) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            }
        });
    }
    setGlobalVariable(variable, value, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
                Action: actionNames_1.AST_ACTION.SET_VAR,
                Value: value,
                Variable: variable
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    this._server.logger.error("Unable to set global variable %s to %s %j", variable, value, err);
                    AstUtil.maybeCallback(callbackFn, context, err);
                    return;
                }
                if (response.Response !== "Success") {
                    this._server.logger.error("Unable to set global variable %s to %s response %s", variable, value, response.Response);
                    AstUtil.maybeCallback(callbackFn, context, new Error(util_1.format("Unable to set global variable %s to %s response %s", variable, value, response.Response)));
                    return;
                }
                AstUtil.maybeCallback(callbackFn, context);
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
module.exports = VariableServerAction;
//# sourceMappingURL=VariableAction.js.map