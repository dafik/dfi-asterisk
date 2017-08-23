"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ManagerError extends Error {
    constructor(message, response) {
        super(message);
        this.message = message;
        this.name = "ManagerError";
        this.response = response;
    }
}
exports.default = ManagerError;
//# sourceMappingURL=ManagerError.js.map