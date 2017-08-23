"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoSuchInterface extends Error {
    constructor(message, member) {
        super(message);
        this.message = message;
        this.name = "NoSuchInterface";
        this.member = member;
    }
}
exports.default = NoSuchInterface;
//# sourceMappingURL=NoSuchInterface.js.map