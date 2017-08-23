"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IllegalArgument extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "IllegalArgumentError";
    }
}
exports.default = IllegalArgument;
//# sourceMappingURL=IllegalArgument.js.map