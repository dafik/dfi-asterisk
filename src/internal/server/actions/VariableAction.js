"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const actionNames_1 = require("../../asterisk/actionNames");
const astUtil_1 = require("../../astUtil");
const BaseAction_1 = require("./BaseAction");
class VariableServerAction extends BaseAction_1.default {
    getGlobalVariable(variable, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.GET_VAR,
                Variable: variable
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    astUtil_1.default.maybeCallback(callbackFn, context, err);
                }
                astUtil_1.default.maybeCallback(callbackFn, context, null, response.Value);
            });
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
    setGlobalVariable(variable, value, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.SET_VAR,
                Value: value,
                Variable: variable
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    this._server.logger.error("Unable to set global variable %s to %s %j", variable, value, err);
                    astUtil_1.default.maybeCallback(callbackFn, context, err);
                    return;
                }
                if (response.Response !== "Success") {
                    this._server.logger.error("Unable to set global variable %s to %s response %s", variable, value, response.Response);
                    astUtil_1.default.maybeCallback(callbackFn, context, new Error(util_1.format("Unable to set global variable %s to %s response %s", variable, value, response.Response)));
                    return;
                }
                astUtil_1.default.maybeCallback(callbackFn, context);
            });
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
}
exports.default = VariableServerAction;
//# sourceMappingURL=VariableAction.js.map