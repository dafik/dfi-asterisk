import BaseServerAction = require("./BaseAction");
import {IDfiCallbackResult} from "../../../definitions/interfaces";
import {IAstActionGetConfig} from "../../asterisk/actions";
import AstUtil = require("../../astUtil");
import ManagerError = require("../../../errors/ManagerError");
import ConfigFile = require("../ConfigFile");
import AST_ACTION = require("../../asterisk/actionNames");
class ConfigServerAction extends BaseServerAction {

    public getConfig(filename, callbackFn: IDfiCallbackResult, context?) {

        // TODO check OCB
        this._server.start()
            .then(() => {
                const action: IAstActionGetConfig = {
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
            const res: {categories: Map<string, {name: string, lines: Map<string, string|string[]>}>} = {categories: new Map()};
            let val;
            let parts;
            let lParts;

            Object.keys(response).forEach((key) => {
                val = response[key];
                if (-1 !== key.indexOf("-")) {
                    parts = key.split("-");
                    if (parts[0] === "Category") {
                        res.categories.set(parts[1], {lines: new Map(), name: val});
                    } else {
                        lParts = val.split("=");
                        if (!res.categories.get(parts[1]).lines.has(lParts[0])) {
                            res.categories.get(parts[1]).lines.set(lParts[0], lParts[1]);
                        } else {
                            if (!Array.isArray(res.categories.get(parts[1]).lines.get(lParts[0]))) {
                                res.categories.get(parts[1]).lines.set(lParts[0], [lParts[1]]);
                            } else {
                                (res.categories.get(parts[1]).lines.get(lParts[0]) as string[]).push(lParts[1]);
                            }
                        }
                    }

                } else {
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
export = ConfigServerAction;
