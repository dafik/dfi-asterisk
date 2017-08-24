import {format} from "util";
import {IDfiAMIResponseGetvar, IDfiCallbackError, IDfiCallbackResult} from "../../../definitions/interfaces";
import AST_ACTION from "../../asterisk/actionNames";
import {IAstActionGetvar, IAstActionSetvar} from "../../asterisk/actions";
import AstUtil from "../../astUtil";
import BaseServerAction from "./BaseAction";

class VariableServerAction extends BaseServerAction {

    public getGlobalVariable(variable: string, callbackFn: IDfiCallbackResult<Error, string>, context?) {

        this._server.start()
            .then(() => {
                const action: IAstActionGetvar = {
                    Action: AST_ACTION.GET_VAR,
                    Variable: variable
                };

                this._server.sendAction<IDfiAMIResponseGetvar>(action, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallback(callbackFn, context, err);
                    }
                    AstUtil.maybeCallback(callbackFn, context, null, response.Value);
                });
            })
            .catch((error) => {
                if (error) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, error);
                }
            });
    }

    public setGlobalVariable(variable: string, value: string, callbackFn: IDfiCallbackError<Error>, context?) {

        this._server.start()
            .then(() => {
                const action: IAstActionSetvar = {
                    Action: AST_ACTION.SET_VAR,
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
                        AstUtil.maybeCallback(callbackFn, context, new Error(format("Unable to set global variable %s to %s response %s", variable, value, response.Response)));
                        return;
                    }

                    AstUtil.maybeCallback(callbackFn, context);
                });
            })
            .catch((error) => {
                if (error) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, error);
                }
            });
    }
}

export default VariableServerAction;
