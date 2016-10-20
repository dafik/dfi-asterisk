"use strict";
const BaseServerAction = require("./BaseAction");
const actionNames_1 = require("../../asterisk/actionNames");
const AstUtil = require("../../astUtil");
class DBServerAction extends BaseServerAction {
    dbGet(family, key, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
                Action: actionNames_1.AST_ACTION.DB_GET,
                Family: family,
                Key: key
            };
            this._server.sendEventGeneratingAction(action, (err, response) => {
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
    dbDel(family, key, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
                Action: actionNames_1.AST_ACTION.DB_DEL,
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
    dbDelTree(family, key, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
                Action: actionNames_1.AST_ACTION.DB_DEL_TREE,
                Family: family,
                Key: key
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    if (err.message === "Database entry not found") {
                        response = err;
                    }
                    else {
                        AstUtil.maybeCallback(callbackFn, context, err);
                        return;
                    }
                }
                let dbgre;
                if (response.events.length > 0) {
                    dbgre = response.events[0];
                }
                else {
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
    dbPut(family, key, value, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
                Action: actionNames_1.AST_ACTION.DB_PUT,
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
module.exports = DBServerAction;
//# sourceMappingURL=DBAction.js.map