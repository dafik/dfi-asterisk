"use strict";
const BaseServerAction = require("./BaseAction");
const actionNames_1 = require("../../asterisk/actionNames");
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
                let value = response.getAttribute("Value");
                if (value == null) {
                    value = response.getAttribute(variable); // for Asterisk 1.0.x
                }
                AstUtil.maybeCallback(callbackFn, context, null, value);
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
                    this._server.logger.error("Unable to set global variable %s to %s ", variable, value, response.getMessage());
                    AstUtil.maybeCallback(callbackFn, context, err);
                }
                AstUtil.maybeCallback(callbackFn, context, null, response);
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