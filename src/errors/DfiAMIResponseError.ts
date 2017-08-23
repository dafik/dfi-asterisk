import {IAstAction, IAstActionCommand} from "../internal/asterisk/actions";

class DfiAMIResponseError<A extends (IAstAction | IAstActionCommand)> extends Error {
    public action;

    constructor(message: string, action?: A) {
        super(message);
        this.message = message;
        this.name = "DfiAMIResponse";

        this.action = action;
    }
}

export default DfiAMIResponseError;
