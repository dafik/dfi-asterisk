"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DfiAMIResponseError extends Error {
    constructor(message, action) {
        super(message);
        this.message = message;
        this.name = "DfiAMIResponse";
        this.action = action;
    }
}
exports.default = DfiAMIResponseError;
//# sourceMappingURL=DfiAMIResponseError.js.map