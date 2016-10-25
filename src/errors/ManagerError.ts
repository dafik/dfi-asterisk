import {IDfiAMIResponseError} from "../definitions/interfaces";
import {IAstAction} from "../internal/asterisk/actions";

class ManagerError extends Error implements IDfiAMIResponseError {
    public action: IAstAction;
    public response;

    constructor(message: string, response?) {
        super(message);
        this.message = message;
        this.name = "ManagerError";

        this.response = response;
    }
}

export = ManagerError;
