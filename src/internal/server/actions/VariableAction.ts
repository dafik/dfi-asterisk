import BaseServerAction = require("./BaseAction");
import {IDfiCallback} from "../../../definitions/interfaces";
import {AST_ACTION} from "../../asterisk/actionNames";
import {IAstActionGetvar, IAstActionSetvar} from "../../asterisk/actions";
import AstUtil = require("../../astUtil");

class VariableServerAction extends BaseServerAction {

    public getGlobalVariable(variable: string, callbackFn: IDfiCallback, context?) {

        this._server.start()
            .then(() => {
                let action: IAstActionGetvar = {
                    Action: AST_ACTION.GET_VAR,
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

    public setGlobalVariable(variable: string, value: string, callbackFn: IDfiCallback, context?) {

        this._server.start()
            .then(() => {
                let action: IAstActionSetvar = {
                    Action: AST_ACTION.SET_VAR,
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

export = VariableServerAction;
