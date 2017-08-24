class ErrorMultiple<T extends Error> extends Error {
    public errors: T[];

    constructor(message: string, errors?: T[]) {
        super(message);
        this.message = message;
        this.name = "Not Allowed Action";

        this.errors = errors;
    }
}

export default ErrorMultiple;
