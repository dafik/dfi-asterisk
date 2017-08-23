"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAction_1 = require("./BaseAction");
const astUtil_1 = require("../../astUtil");
const ManagerError_1 = require("../../../errors/ManagerError");
const ConfigFile_1 = require("../ConfigFile");
const actionNames_1 = require("../../asterisk/actionNames");
class ConfigServerAction extends BaseAction_1.default {
    getConfig(filename, callbackFn, context) {
        // TODO check OCB
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.GET_CONFIG,
                Filename: filename
            };
            this._server.sendAction(action, onResponse);
        }, (err) => {
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
        });
        function onResponse(err, response) {
            if (err) {
                const error = new ManagerError_1.default("Response to GetConfigAction(\"" + filename + "\") " + err.message);
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
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
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, new ConfigFile_1.default(filename, categories));
        }
    }
}
exports.default = ConfigServerAction;
//# sourceMappingURL=ConfigAction.js.map