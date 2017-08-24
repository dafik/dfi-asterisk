"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VoiceMailboxModel_1 = require("../../../models/VoiceMailboxModel");
const actionNames_1 = require("../../asterisk/actionNames");
const astUtil_1 = require("../../astUtil");
const BaseAction_1 = require("./BaseAction");
const SHOW_VOICEMAIL_USERS_COMMAND = "voicemail show users";
const SHOW_VOICEMAIL_USERS_PATTERN = /^(\S+)\s+(\S+)\s+(.{25})\s+(\d+)/;
class VoiceMailServerAction extends BaseAction_1.default {
    getVoicemailBoxes(callbackFn, context) {
        this._server.start()
            .then(() => {
            this._server.sendAction({ Action: actionNames_1.default.COMMAND, Command: SHOW_VOICEMAIL_USERS_COMMAND }, (err, commandResponse) => {
                if (err) {
                    astUtil_1.default.maybeCallback(callbackFn, context, err);
                    return;
                }
                const voicemailboxes = [];
                if (!commandResponse.$content) {
                    this._server.logger.error("Response to CommandAction(\"" + SHOW_VOICEMAIL_USERS_COMMAND + "\") " + commandResponse.Message);
                    return voicemailboxes;
                }
                const result = commandResponse.$content.split("\n");
                if (result == null || result.length < 1) {
                    return voicemailboxes;
                }
                // remove headline
                result.shift();
                let matcher;
                result.forEach((line) => {
                    matcher = SHOW_VOICEMAIL_USERS_PATTERN.exec(line);
                    if (matcher && matcher.length > 0) {
                        voicemailboxes.push(new VoiceMailboxModel_1.default({
                            Event: "voicemail show users",
                            context: matcher[1],
                            mailbox: matcher[2],
                            newMessages: parseInt(matcher[4], 10),
                            user: matcher[3].trim()
                        }));
                    }
                });
                // get message count for each mailbox
                let pending = voicemailboxes.length;
                voicemailboxes.forEach((voicemailbox) => {
                    const fullName = voicemailbox.mailbox + "@" + voicemailbox.context;
                    const action = {
                        Action: actionNames_1.default.MAILBOX_COUNT, Mailbox: fullName
                    };
                    this._server.sendAction(action, (err1, response) => {
                        if (err1) {
                            astUtil_1.default.maybeCallback(callbackFn, context, err1);
                            return;
                        }
                        pending--;
                        if (response) {
                            voicemailbox.newMessages = parseInt(response.NewMessages, 10);
                            voicemailbox.oldMessages = parseInt(response.OldMessages, 10);
                            voicemailbox.urgMessages = parseInt(response.UrgMessages, 10);
                        }
                        else {
                            this._server.logger.error("Response to MailboxCountAction was not a MailboxCountResponse but " + response);
                        }
                        if (pending === 0) {
                            astUtil_1.default.maybeCallback(callbackFn, context, null, voicemailboxes);
                        }
                    });
                }, this);
            }, this);
        }, (err) => {
            astUtil_1.default.maybeCallback(callbackFn, context, err);
        });
    }
}
exports.default = VoiceMailServerAction;
//# sourceMappingURL=VoicemailAction.js.map