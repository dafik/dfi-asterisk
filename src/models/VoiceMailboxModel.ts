import {IDfiAstModelAttribsVoiceMailbox, IDfiAstModelOptions} from "../definitions/models";
import AsteriskModel from "../internal/asteriskModel";

const PROP_CONTEXT = "context";
const PROP_MAILBOX = "mailbox";
const PROP_NEW_MESSAGES = "newMessages";
const PROP_OLD_MESSAGES = "oldMessages";
const PROP_URGENT_MESSAGES = "urgMessages";
const PROP_USER = "user";

class VoiceMailbox extends AsteriskModel {

    protected static map = new Map([
        ["context", PROP_CONTEXT],
        ["mailbox", PROP_MAILBOX],
        ["newMessages", PROP_NEW_MESSAGES],
        ["user", PROP_USER]
    ]);

    constructor(attributes: IDfiAstModelAttribsVoiceMailbox, options?: IDfiAstModelOptions) {
        options = options || {};
        options.idAttribute = "device";

        super(attributes, options);
    }

    get context(): string {
        return this.get(PROP_CONTEXT);
    }

    get mailbox(): string {
        return this.get(PROP_MAILBOX);
    }

    get user(): string {
        return this.get(PROP_USER);
    }

    get newMessages(): number {
        return this.get(PROP_NEW_MESSAGES);
    }

    get oldMessages(): number {
        return this.get(PROP_OLD_MESSAGES);
    }

    get urgMessages(): number {
        return this.get(PROP_URGENT_MESSAGES);
    }

    set newMessages(count: number) {
        this.set(PROP_NEW_MESSAGES, count);
    }

    set oldMessages(count: number) {
        this.set(PROP_OLD_MESSAGES, count);
    }

    set urgMessages(count: number) {
        this.set(PROP_URGENT_MESSAGES, count);
    }
}

export default VoiceMailbox;
