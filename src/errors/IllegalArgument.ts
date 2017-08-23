class IllegalArgument extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = "IllegalArgumentError";
    }
}
export default IllegalArgument;
