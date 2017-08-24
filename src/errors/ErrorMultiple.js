"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorMultiple extends Error {
    constructor(message, errors) {
        super(message);
        this.message = message;
        this.name = "Not Allowed Action";
        this.errors = errors;
    }
}
exports.default = ErrorMultiple;
//# sourceMappingURL=ErrorMultiple.js.map