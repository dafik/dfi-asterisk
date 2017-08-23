class InvalidPenalty extends Error {

    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = "InvalidPenalty";
    }
}
export default InvalidPenalty;
