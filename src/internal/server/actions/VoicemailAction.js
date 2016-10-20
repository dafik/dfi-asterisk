"use strict";
const BaseServerAction = require("./BaseAction");
const AstUtil = require("../../astUtil");
const actionNames_1 = require("../../asterisk/actionNames");
const VoiceMailbox = require("../../../models/VoiceMailboxModel");
const SHOW_VOICEMAIL_USERS_COMMAND = "voicemail show users";
const SHOW_VOICEMAIL_USERS_PATTERN = /^(\S+)\s+(\S+)\s+(.{25})\s+(\d+)/;
class VoiceMailServerAction extends BaseServerAction {
    getVoicemailBoxes(callbackFn, context) {
        this._server.start()
            .then(() => {
            this._server.sendAction({ Action: actionNames_1.AST_ACTION.COMMAND, Command: SHOW_VOICEMAIL_USERS_COMMAND }, (err, commandResponse) => {
                if (err) {
                    AstUtil.maybeCallback(callbackFn, context, err);
                    return;
                }
                let voicemailboxes = [];
                if (!commandResponse.$content) {
                    this._server.logger.error("Response to CommandAction(\"" + SHOW_VOICEMAIL_USERS_COMMAND + "\") " + commandResponse.Message);
                    return voicemailboxes;
                }
                let result = commandResponse.$content.split("\n");
                if (result == null || result.length < 1) {
                    return voicemailboxes;
                }
                // remove headline
                result.shift();
                let matcher;
                result.forEach((line) => {
                    matcher = SHOW_VOICEMAIL_USERS_PATTERN.exec(line);
                    if (matcher && matcher.length > 0) {
                        voicemailboxes.push(new VoiceMailbox({
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
                    let fullName = voicemailbox.mailbox + "@" + voicemailbox.context;
                    let action = {
                        Action: actionNames_1.AST_ACTION.MAILBOX_COUNT, Mailbox: fullName
                    };
                    this._server.sendAction(action, (err1, response) => {
                        if (err1) {
                            AstUtil.maybeCallback(callbackFn, context, err1);
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
                            AstUtil.maybeCallback(callbackFn, context, null, voicemailboxes);
                        }
                    });
                }, this);
            }, this);
        }, (err) => {
            AstUtil.maybeCallback(callbackFn, context, err);
        });
    }
}
module.exports = VoiceMailServerAction;
//# sourceMappingURL=VoicemailAction.js.map