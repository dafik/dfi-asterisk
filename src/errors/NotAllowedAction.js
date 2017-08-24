"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotAllowedAction extends Error {
    constructor(message, action) {
        super(message);
        this.message = message;
        this.name = "Not Allowed Action";
        this.action = action;
    }
}
exports.default = NotAllowedAction;
//# sourceMappingURL=NotAllowedAction.js.map