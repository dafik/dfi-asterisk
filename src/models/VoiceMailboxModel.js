"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskModel_1 = require("../internal/asteriskModel");
const PROP_CONTEXT = "context";
const PROP_MAILBOX = "mailbox";
const PROP_NEW_MESSAGES = "newMessages";
const PROP_OLD_MESSAGES = "oldMessages";
const PROP_URGENT_MESSAGES = "urgMessages";
const PROP_USER = "user";
class VoiceMailbox extends asteriskModel_1.default {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = "device";
        super(attributes, options);
    }
    get context() {
        return this.get(PROP_CONTEXT);
    }
    get mailbox() {
        return this.get(PROP_MAILBOX);
    }
    get user() {
        return this.get(PROP_USER);
    }
    get newMessages() {
        return this.get(PROP_NEW_MESSAGES);
    }
    get oldMessages() {
        return this.get(PROP_OLD_MESSAGES);
    }
    get urgMessages() {
        return this.get(PROP_URGENT_MESSAGES);
    }
    set newMessages(count) {
        this.set(PROP_NEW_MESSAGES, count);
    }
    set oldMessages(count) {
        this.set(PROP_OLD_MESSAGES, count);
    }
    set urgMessages(count) {
        this.set(PROP_URGENT_MESSAGES, count);
    }
}
VoiceMailbox.map = new Map([
    ["context", PROP_CONTEXT],
    ["mailbox", PROP_MAILBOX],
    ["newMessages", PROP_NEW_MESSAGES],
    ["user", PROP_USER]
]);
exports.default = VoiceMailbox;
//# sourceMappingURL=VoiceMailboxModel.js.map