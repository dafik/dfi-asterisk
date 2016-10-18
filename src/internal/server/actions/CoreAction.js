"use strict";
const BaseServerAction = require("./BaseAction");
const actionNames_1 = require("../../asterisk/actionNames");
const AsteriskVersion = require("../Version");
const AstUtil = require("../../astUtil");
const ManagerCommunication = require("../../../errors/ManagerCommunication");
const ManagerError = require("../../../errors/ManagerError");
const SHOW_VERSION_FILES_COMMAND = "core show file version";
const SHOW_VERSION_FILES_PATTERN = /^([\S]+)\s+([0-9\.]+)/;
const SHOW_VERSION_COMMAND = "core show version";
class CoreServerAction extends BaseServerAction {
    getAvailableActions(callbackFn, context) {
        this._server.logger.debug("on getAvailableActions");
        let action = {
            Action: actionNames_1.AST_ACTION.COMMAND,
            Command: "manager show commands"
        };
        this._server.sendAction(action, (err, response) => {
            if (err) {
                callbackFn.call(context, err);
                return;
            }
            let found = []; //
            let lines = response.$content.split("\n");
            lines.forEach(onEachResponseLine);
            function onEachResponseLine(line, index) {
                if (index > 1 && index < lines.length) {
                    found.push(line.trim().split(" ")[0]);
                }
            }
            found.forEach(value => this._server._allowedActions.add(value));
            callbackFn.call(context, null);
        }, this);
    }
    filterRTCP(callbackFn, context) {
        this._server.logger.debug("on onAvailableActions");
        let action = {
            Action: actionNames_1.AST_ACTION.FILTER,
            Filter: "!Event: RTCP",
            Operation: "Add"
        };
        this._server.sendAction(action, callbackFn, context);
    }
    getVersion(callbackFn, context) {
        this._server.logger.debug("on getVersion");
        if (this._server.version) {
            AstUtil.maybeCallback(callbackFn, context, null, this._server.version);
        }
        if (!this._server.isConnected()) {
            AstUtil.maybeCallbackOnce(callbackFn, context, new ManagerCommunication("not connected"));
            return;
        }
        let action = {
            Action: actionNames_1.AST_ACTION.COMMAND,
            Command: SHOW_VERSION_COMMAND
        };
        this._server.sendEventGeneratingAction(action, (err, response) => {
            this._server.logger.debug("on onVersion");
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            }
            let tmp = response.getResults()[0].replace(/built by.+/, "").replace("Asterisk", "").trim();
            if (-1 !== tmp.indexOf("SVN")) {
                tmp = tmp.replace("SVN-branch-", "").replace(/-r.*/, "").trim() + ".-1.-1";
            }
            this._server.version = new AsteriskVersion(tmp);
            AstUtil.maybeCallback(callbackFn, context, null, this._server.version);
        }, this);
    }
    getFileVersion(file, callbackFn, context) {
        function onFileVersion(fileVersion) {
            if (fileVersion == null) {
                return null;
            }
            let parts = fileVersion.split(".");
            let intParts = [];
            parts.forEach(part => {
                intParts.push(parseInt(part, 10));
            });
            AstUtil.maybeCallbackOnce(callbackFn, context, null, intParts);
        }
        if (this.versions) {
            onFileVersion(this.versions.get(file));
            return;
        }
        this._server.start()
            .then(() => {
            let action = {
                Action: actionNames_1.AST_ACTION.COMMAND,
                Command: SHOW_VERSION_FILES_COMMAND
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    this._server.logger.warn("Unable to send '" + SHOW_VERSION_FILES_COMMAND + "' command.", err);
                    AstUtil.maybeCallbackOnce(callbackFn, context, err);
                    return;
                }
                if (response.$content) {
                    let map = new Map();
                    let result = response.$content.split("\n");
                    result.shift();
                    result.shift();
                    result.forEach(line => {
                        let matcher = SHOW_VERSION_FILES_PATTERN.exec(line);
                        if (matcher && matcher.length > 2) {
                            map.set(matcher[1], matcher[2]);
                        }
                    });
                    this.versions = map;
                    onFileVersion(map.get(file));
                }
            }, this);
        })
            .catch(error => error)
            .then(err => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            }
        });
    }
    executeCliCommand(command, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = {
                Action: actionNames_1.AST_ACTION.COMMAND,
                Command: command
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    let error = new ManagerError("Response to CommandAction(\"" + command + "\") was not a CommandResponse but " + response.Message, response);
                    AstUtil.maybeCallbackOnce(callbackFn, context, error);
                }
                else {
                    AstUtil.maybeCallbackOnce(callbackFn, context, null, response);
                }
            }, this);
        }, (error) => {
            if (error) {
                AstUtil.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
}
module.exports = CoreServerAction;
//# sourceMappingURL=CoreAction.js.map