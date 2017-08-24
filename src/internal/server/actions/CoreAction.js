"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ManagerCommunication_1 = require("../../../errors/ManagerCommunication");
const ManagerError_1 = require("../../../errors/ManagerError");
const actionNames_1 = require("../../asterisk/actionNames");
const astUtil_1 = require("../../astUtil");
const Version_1 = require("../Version");
const BaseAction_1 = require("./BaseAction");
const SHOW_VERSION_FILES_COMMAND = "core show file version";
const SHOW_VERSION_FILES_PATTERN = /^([\S]+)\s+([0-9.]+)/;
const SHOW_VERSION_COMMAND = "core show version";
class CoreServerAction extends BaseAction_1.default {
    getAvailableActions(callbackFn, context) {
        this._server.logger.debug("on getAvailableActions");
        const action = {
            Action: actionNames_1.default.COMMAND,
            Command: "manager show commands"
        };
        this._server.sendAction(action, (err, response) => {
            if (err) {
                callbackFn.call(context, err);
                return;
            }
            const found = []; //
            const lines = response.$content.split("\n");
            lines.forEach(onEachResponseLine);
            function onEachResponseLine(line, index) {
                if (index > 1 && index < lines.length) {
                    found.push(line.trim().split(" ")[0]);
                }
            }
            found.forEach((value) => this._server.allowedActions.add(value));
            callbackFn.call(context, null);
        }, this);
    }
    filterRTCP(callbackFn, context) {
        this._server.logger.debug("on onAvailableActions");
        const action = {
            Action: actionNames_1.default.FILTER,
            Filter: "!Event: RTCP",
            Operation: "Add"
        };
        this._server.sendAction(action, callbackFn, context);
    }
    getAsteriskVersion(callbackFn, context) {
        this._server.logger.debug("on getVersion");
        if (this._server.version) {
            astUtil_1.default.maybeCallback(callbackFn, context, null, this._server.version);
        }
        if (!this._server.isConnected) {
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, new ManagerCommunication_1.default("not connected"));
            return;
        }
        const action = {
            Action: actionNames_1.default.COMMAND,
            Command: SHOW_VERSION_COMMAND
        };
        this._server.sendAction(action, (err, response) => {
            this._server.logger.debug("on onVersion");
            if (err) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
            }
            let tmp = response.$content.replace(/built by.+/, "").replace("Asterisk", "").trim();
            if (-1 !== tmp.indexOf("SVN")) {
                tmp = tmp.replace("SVN-branch-", "").replace(/-r.*/, "").trim() + ".-1.-1";
            }
            this._server.version = new Version_1.default(tmp);
            astUtil_1.default.maybeCallback(callbackFn, context, null, this._server.version);
        }, this);
    }
    getFileVersion(file, callbackFn, context) {
        function onFileVersion(fileVersion) {
            if (fileVersion == null) {
                return null;
            }
            const parts = fileVersion.split(".");
            const intParts = [];
            parts.forEach((part) => {
                intParts.push(parseInt(part, 10));
            });
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, intParts);
        }
        if (this.versions) {
            onFileVersion(this.versions.get(file));
            return;
        }
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.COMMAND,
                Command: SHOW_VERSION_FILES_COMMAND
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    this._server.logger.warn("Unable to send '" + SHOW_VERSION_FILES_COMMAND + "' command.", err);
                    astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
                    return;
                }
                if (response.$content) {
                    const map = new Map();
                    const result = response.$content.split("\n");
                    result.shift();
                    result.shift();
                    result.forEach((line) => {
                        const matcher = SHOW_VERSION_FILES_PATTERN.exec(line);
                        if (matcher && matcher.length > 2) {
                            map.set(matcher[1], matcher[2]);
                        }
                    });
                    this.versions = map;
                    onFileVersion(map.get(file));
                }
            }, this);
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
    executeCliCommand(command, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = {
                Action: actionNames_1.default.COMMAND,
                Command: command
            };
            this._server.sendAction(action, (err, response) => {
                if (err) {
                    const error = new ManagerError_1.default("Response to CommandAction(\"" + command + "\") was not a CommandResponse but " + response.Message, response);
                    astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
                }
                else {
                    astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, response);
                }
            }, this);
        }, (error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
}
exports.default = CoreServerAction;
//# sourceMappingURL=CoreAction.js.map