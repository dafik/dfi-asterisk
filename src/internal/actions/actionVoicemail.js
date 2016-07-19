"use strict";
const  dAmiLib = require("local-dfi-asterisk-ami"),

    actions = dAmiLib.Actions,
    responses = dAmiLib.Responses,
    Voicemailbox = require('../../models/asteriskVoiceMailbox'),

    MailboxCountAction = actions.MailboxCount,

    SHOW_VOICEMAIL_USERS_COMMAND = "voicemail show users",
    SHOW_VOICEMAIL_USERS_PATTERN = /^(\S+)\s+(\S+)\s+(.{25})\s+(\d+)/

    ;

class AsteriskActionVoiceMail {
    constructor(server) {
        this.server = server;
    }

    /**
     *
     * @returns {Voicemailbox[]}
     */
    getVoicemailboxes(callback, thisp) {


        this._initializeIfNeeded(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            /**
             * @type {CommandAction}
             */
            var action = new CommandAction(SHOW_VOICEMAIL_USERS_COMMAND);
            this.sendAction(action, onResponse);
        }

        /**
         * @param err
         * @param {CommandResponse} commandResponse
         */
        function onResponse(err, commandResponse) {
            if (err) {
                callback.call(thisp, err);
                return;
            }
            /**
             * @type  {Voicemailbox[]}
             */
            var voicemailboxes;

            //noinspection JSMismatchedCollectionQueryUpdate
            /**
             * @type  {String[]}
             */
            var result;
            voicemailboxes = [];
            if (!(commandResponse instanceof responses.CommandResponse)) {
                this.loggers.logger.error("Response to CommandAction(\"" + SHOW_VOICEMAIL_USERS_COMMAND + "\") was not a CommandResponse but " + commandResponse);
                return voicemailboxes;
            }
            result = commandResponse.commandresponse;
            if (result == null || result.length < 1) {
                return voicemailboxes;
            }

            // remove headline
            result.shift();

            result.forEach(onEachResult);
            function onEachResult(line) {
                /**
                 * @type {[]}
                 */
                var matcher;
                /**
                 * @type {Voicemailbox}
                 */
                var voicemailbox;
                /**
                 * @type {String}
                 */
                var context;
                /**
                 * @type {String}
                 */
                var mailbox;
                /**
                 * @type {String}
                 */
                var user;
                var newMessages;

                matcher = SHOW_VOICEMAIL_USERS_PATTERN.exec(line);
                if (matcher && matcher.length > 0) {
                    context = matcher[1];
                    mailbox = matcher[2];
                    user = matcher[3].trim();
                    newMessages = matcher[4];

                    voicemailbox = new Voicemailbox(mailbox, context, user);
                    voicemailbox.setNewMessages(newMessages);
                    voicemailboxes.push(voicemailbox);
                }
            }

            // get message count for each mailbox
            var pending = 0;
            voicemailboxes.forEach(onEachVoiceMailbox);
            function onEachVoiceMailbox(voicemailbox) {
                /**
                 * @type {String}
                 */
                var fullname;

                fullname = voicemailbox.getMailbox() + "@" + voicemailbox.getContext();
                /**
                 * @type {MailboxCountAction}
                 */
                var action = new MailboxCountAction(fullname);
                this.sendAction(action, onResponse);
                pending++;
                function onResponse(err, response) {
                    if (err) {
                        callback.call(thisp, err);
                        return
                    }
                    pending--;
                    if (response instanceof ManagerResponse) {
                        /**
                         * @type {MailboxCountResponse}
                         */
                        var mailboxCountResponse;

                        mailboxCountResponse = response;
                        voicemailbox.setNewMessages(mailboxCountResponse.newmessages);
                        voicemailbox.setOldMessages(mailboxCountResponse.oldmessages);
                    } else {
                        this.loggers.logger.error("Response to MailboxCountAction was not a MailboxCountResponse but " + response);
                    }
                    if (pending == 0) {
                        if (typeof callback == "function") {
                            callback.call(thisp, null, voicemailboxes);
                        }
                    }
                }
            }

        }
    }

}
module.exports = AsteriskActionVoiceMail;