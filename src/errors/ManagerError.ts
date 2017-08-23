import {IDfiAMIResponseError} from "../definitions/interfaces";
import {IAstAction} from "../internal/asterisk/actions";

class ManagerError<A extends IAstAction> extends Error implements IDfiAMIResponseError<A> {
    public action: A;
    public response;

    constructor(message: string, response?) {
        super(message);
        this.message = message;
        this.name = "ManagerError";

        this.response = response;
    }
}

export default ManagerError;
