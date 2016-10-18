class ManagerError extends Error {
    public response;

    constructor(message: string, response?) {
        super(message);
        this.message = message;
        this.name = "ManagerError";

        this.response = response;
    }
}

export = ManagerError;
