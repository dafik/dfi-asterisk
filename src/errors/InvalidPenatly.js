"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidPenalty extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidPenalty";
    }
}
exports.default = InvalidPenalty;
//# sourceMappingURL=InvalidPenatly.js.map