"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAction_1 = require("./BaseAction");
const astUtil_1 = require("../../astUtil");
const actionNames_1 = require("../../asterisk/actionNames");
const util_1 = require("util");
class DBServerAction extends BaseAction_1.default {
    dbGet(family, key, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.DB_GET,
                Family: family,
                Key: key
            };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
                    return;
                }
                const dbgre = response.events.shift();
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, {
                    Family: dbgre.Family,
                    Key: dbgre.Key,
                    Val: dbgre.Val
                });
            });
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
    dbDel(family, variable, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.DB_DEL,
                Family: family,
                Key: variable
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    this._server.logger.error("Unable to delete database variable %s  %s", variable, err.message);
                    astUtil_1.default.maybeCallback(callbackFn, context, err);
                    return;
                }
                if (response.Response !== "Success") {
                    this._server.logger.error("Unable to delete database variable %s  response %s", variable, response.Response);
                    astUtil_1.default.maybeCallback(callbackFn, context, new Error(util_1.format("Unable to set global variable %s response %s", variable, response.Response)));
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
    dbDelTree(family, variable, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.DB_DEL_TREE,
                Family: family,
                Key: variable
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    this._server.logger.error("Unable to delete database variable %s  %s", variable, err.message);
                    astUtil_1.default.maybeCallback(callbackFn, context, err);
                    return;
                }
                if (response.Response !== "Success") {
                    this._server.logger.error("Unable to delete database variable %s  response %s", variable, response.Response);
                    astUtil_1.default.maybeCallback(callbackFn, context, new Error(util_1.format("Unable to set global variable %s response %s", variable, response.Response)));
                    return;
                }
                astUtil_1.default.maybeCallback(callbackFn, context);
            }, context);
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
    dbPut(family, variable, value, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.DB_PUT,
                Family: family,
                Key: variable,
                Val: value
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    this._server.logger.error("Unable to set database variable %s to %s %s", variable, value, err.message);
                    astUtil_1.default.maybeCallback(callbackFn, context, err);
                    return;
                }
                if (response.Response !== "Success") {
                    this._server.logger.error("Unable to set database variable %s to %s response %s", variable, value, response.Response);
                    astUtil_1.default.maybeCallback(callbackFn, context, new Error(util_1.format("Unable to set global variable %s to %s response %s", variable, value, response.Response)));
                    return;
                }
                astUtil_1.default.maybeCallback(callbackFn, context);
            });
        })
            .catch((err) => {
            if (err) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
            }
        });
    }
}
exports.default = DBServerAction;
//# sourceMappingURL=DBAction.js.map