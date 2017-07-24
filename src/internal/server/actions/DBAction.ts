import BaseServerAction = require("./BaseAction");
import AstUtil = require("../../astUtil");
import AST_ACTION = require("../../asterisk/actionNames");
import {IDfiAMICallbackError, IDfiDBGetCallback} from "../../../definitions/interfaces";

import {format} from "util";
import {IAstActionDBDel, IAstActionDBDelTree, IAstActionDBGet, IAstActionDBPut} from "../../asterisk/actions";
import {IAstEventDBGetResponse} from "../../asterisk/events";

class DBServerAction extends BaseServerAction {

    public dbGet(family: string, key: string, callbackFn: IDfiDBGetCallback, context?) {
        this._server.start()
            .then(() => {
                const action: IAstActionDBGet = {
                    Action: AST_ACTION.DB_GET,
                    Family: family,
                    Key: key
                };
                this._server.sendEventGeneratingAction<IAstEventDBGetResponse>(action, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallbackOnce(callbackFn, context, err);
                        return;
                    }
                    const dbgre = response.events.shift();

                    AstUtil.maybeCallbackOnce(callbackFn, context, null, {
                        Family: dbgre.Family,
                        Key: dbgre.Key,
                        Val: dbgre.Val

                    });

                });
            })
            .catch((error) => {
                if (error) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, error);
                }
            });
    }

    public dbDel(family: string, variable: string, callbackFn: IDfiAMICallbackError<IAstActionDBDel>, context?) {
        this._server.start()
            .then(() => {
                const action: IAstActionDBDel = {
                    Action: AST_ACTION.DB_DEL,
                    Family: family,
                    Key: variable
                };
                this._server.sendAction(action, (err, response) => {
                    if (err) {
                        this._server.logger.error("Unable to delete database variable %s  %s", variable, err.message);
                        AstUtil.maybeCallback(callbackFn, context, err);
                        return;
                    }
                    if (response.Response !== "Success") {
                        this._server.logger.error("Unable to delete database variable %s  response %s", variable, response.Response);
                        AstUtil.maybeCallback(callbackFn, context, new Error(format("Unable to set global variable %s response %s", variable, response.Response)));
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

    public dbDelTree(family: string, variable: string, callbackFn: IDfiAMICallbackError<IAstActionDBDelTree>, context?) {
        this._server.start()
            .then(() => {
                const action: IAstActionDBDelTree = {
                    Action: AST_ACTION.DB_DEL_TREE,
                    Family: family,
                    Key: variable

                };
                this._server.sendAction(action, (err, response) => {
                    if (err) {
                        this._server.logger.error("Unable to delete database variable %s  %s", variable, err.message);
                        AstUtil.maybeCallback(callbackFn, context, err);
                        return;
                    }
                    if (response.Response !== "Success") {
                        this._server.logger.error("Unable to delete database variable %s  response %s", variable, response.Response);
                        AstUtil.maybeCallback(callbackFn, context, new Error(format("Unable to set global variable %s response %s", variable, response.Response)));
                        return;
                    }

                    AstUtil.maybeCallback(callbackFn, context);

                }, context);
            })
            .catch((error) => {
                if (error) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, error);
                }
            });
    }

    public dbPut(family: string, variable: string, value: string, callbackFn: IDfiAMICallbackError<IAstActionDBPut>, context?) {
        this._server.start()
            .then(() => {
                const action: IAstActionDBPut = {
                    Action: AST_ACTION.DB_PUT,
                    Family: family,
                    Key: variable,
                    Val: value
                };
                this._server.sendAction(action, (err, response) => {
                    if (err) {
                        this._server.logger.error("Unable to set database variable %s to %s %s", variable, value, err.message);
                        AstUtil.maybeCallback(callbackFn, context, err);
                        return;
                    }
                    if (response.Response !== "Success") {
                        this._server.logger.error("Unable to set database variable %s to %s response %s", variable, value, response.Response);
                        AstUtil.maybeCallback(callbackFn, context, new Error(format("Unable to set global variable %s to %s response %s", variable, value, response.Response)));
                        return;
                    }

                    AstUtil.maybeCallback(callbackFn, context);

                });
            })
            .catch((err) => {
                if (err) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, err);
                }
            });
    }
}

export = DBServerAction;
