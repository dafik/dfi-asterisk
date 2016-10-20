import BaseServerAction = require("./BaseAction");
import {IDfiActionCallback, IDfiDBGetCallback} from "../../../definitions/interfaces";
import {AST_ACTION} from "../../asterisk/actionNames";
import {IAstActionDBDel, IAstActionDBDelTree, IAstActionDBGet, IAstActionDBPut} from "../../asterisk/actions";
import {IAstEventDBGetResponse} from "../../asterisk/events";
import AstUtil = require("../../astUtil");

class DBServerAction extends BaseServerAction {

    public dbGet(family: string, key: string, callbackFn: IDfiDBGetCallback, context?) {
        this._server.start()
            .then(() => {
                let action: IAstActionDBGet = {
                    Action: AST_ACTION.DB_GET,
                    Family: family,
                    Key: key
                };
                this._server.sendEventGeneratingAction<IAstEventDBGetResponse>(action, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallbackOnce(callbackFn, context, err);
                        return;
                    }
                    let dbgre;
                    if (response.events.length > 0) {
                        dbgre = response.events[0];
                    }
                    AstUtil.maybeCallbackOnce(callbackFn, context, null, dbgre);

                });
            })
            .catch(error => error)
            .then((err) => {
                if (err) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, err);
                }
            });
    }

    public dbDel(family: string, key: string, callbackFn: IDfiActionCallback, context?) {
        this._server.start()
            .then(() => {
                let action: IAstActionDBDel = {
                    Action: AST_ACTION.DB_DEL,
                    Family: family,
                    Key: key
                };
                this._server.sendAction(action, callbackFn, context);
            })
            .catch(error => error)
            .then((err) => {
                if (err) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, err);
                }
            });
    }

    public dbDelTree(family: string, key: string, callbackFn: IDfiActionCallback, context?) {
        this._server.start()
            .then(() => {
                let action: IAstActionDBDelTree = {
                    Action: AST_ACTION.DB_DEL_TREE,
                    Family: family,
                    Key: key

                };
                this._server.sendAction(action, (err, response) => {
                    if (err) {
                        if (err.message === "Database entry not found") {
                            response = err;
                        } else {
                            AstUtil.maybeCallback(callbackFn, context, err);
                            return;
                        }
                    }
                    let dbgre;
                    if (response.events.length > 0) {
                        dbgre = response.events[0];
                    } else {
                        dbgre = response;
                    }
                    AstUtil.maybeCallback(callbackFn, context, null, dbgre);

                }, context);
            })
            .catch(error => error)
            .then((err) => {
                if (err) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, err);
                }
            });
    }

    public dbPut(family: string, key: string, value: string, callbackFn: IDfiActionCallback, context?) {
        this._server.start()
            .then(() => {
                let action: IAstActionDBPut = {
                    Action: AST_ACTION.DB_PUT,
                    Family: family,
                    Key: key,
                    Val: value
                };
                this._server.sendAction(action, callbackFn, context);
            })
            .catch(error => error)
            .then((err) => {
                if (err) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, err);
                }
            });
    }
}
export = DBServerAction;
