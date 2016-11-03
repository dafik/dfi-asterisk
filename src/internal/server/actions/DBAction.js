"use strict";
const BaseServerAction = require("./BaseAction");
const util_1 = require("util");
const AstUtil = require("../../astUtil");
const AST_ACTION = require("../../asterisk/actionNames");
class DBServerAction extends BaseServerAction {
    dbGet(family, key, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
                Action: AST_ACTION.DB_GET,
                Family: family,
                Key: key
            };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, err);
                    return;
                }
                let dbgre = response.events.shift();
                AstUtil.maybeCallbackOnce(callbackFn, context, null, {
                    Family: dbgre.Family,
                    Key: dbgre.Key,
                    Val: dbgre.Val
                });
            });
        })
            .catch(error => error)
            .then((err) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            }
        });
    }
    dbDel(family, variable, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
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
                    AstUtil.maybeCallback(callbackFn, context, new Error(util_1.format("Unable to set global variable %s response %s", variable, response.Response)));
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
    dbDelTree(family, variable, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
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
                    AstUtil.maybeCallback(callbackFn, context, new Error(util_1.format("Unable to set global variable %s response %s", variable, response.Response)));
                    return;
                }
                AstUtil.maybeCallback(callbackFn, context);
            }, context);
        })
            .catch(error => error)
            .then((err) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            }
        });
    }
    dbPut(family, variable, value, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
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
module.exports = DBServerAction;
//# sourceMappingURL=DBAction.js.map