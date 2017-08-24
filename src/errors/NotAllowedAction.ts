import {AsteriskActionType1} from "../definitions/interfaces";

class NotAllowedAction extends Error {
    public action: AsteriskActionType1;

    constructor(message: string, action?: AsteriskActionType1) {
        super(message);
        this.message = message;
        this.name = "Not Allowed Action";

        this.action = action;
    }
}

export default NotAllowedAction;
