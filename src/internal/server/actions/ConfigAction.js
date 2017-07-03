"use strict";
const BaseServerAction = require("./BaseAction");
const AstUtil = require("../../astUtil");
const ManagerError = require("../../../errors/ManagerError");
const ConfigFile = require("../ConfigFile");
const AST_ACTION = require("../../asterisk/actionNames");
class ConfigServerAction extends BaseServerAction {
    getConfig(filename, callbackFn, context) {
        // TODO check OCB
        this._server.start()
            .then(() => {
            const action = {
                Action: AST_ACTION.GET_CONFIG,
                Filename: filename
            };
            this._server.sendAction(action, onResponse);
        }, (err) => {
            AstUtil.maybeCallbackOnce(callbackFn, context, err);
        });
        function onResponse(err, response) {
            if (err) {
                const error = new ManagerError("Response to GetConfigAction(\"" + filename + "\") " + err.message);
                AstUtil.maybeCallbackOnce(callbackFn, context, error);
            }
            const res = { categories: new Map() };
            let val;
            let parts;
            let lParts;
            Object.keys(response).forEach((key) => {
                val = response[key];
                if (-1 !== key.indexOf("-")) {
                    parts = key.split("-");
                    if (parts[0] === "Category") {
                        res.categories.set(parts[1], { lines: new Map(), name: val });
                    }
                    else {
                        lParts = val.split("=");
                        if (!res.categories.get(parts[1]).lines.has(lParts[0])) {
                            res.categories.get(parts[1]).lines.set(lParts[0], lParts[1]);
                        }
                        else {
                            if (!Array.isArray(res.categories.get(parts[1]).lines.get(lParts[0]))) {
                                res.categories.get(parts[1]).lines.set(lParts[0], [lParts[1]]);
                            }
                            else {
                                res.categories.get(parts[1]).lines.get(lParts[0]).push(lParts[1]);
                            }
                        }
                    }
                }
                else {
                    res[key] = val;
                }
            });
            const categories = new Map();
            res.categories.forEach((category) => {
                categories.set(category.name, category.lines);
            });
            AstUtil.maybeCallbackOnce(callbackFn, context, null, new ConfigFile(filename, categories));
        }
    }
}
module.exports = ConfigServerAction;
//# sourceMappingURL=ConfigAction.js.map