"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ManagerCommunication extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "ManagerCommunication";
    }
}
exports.default = ManagerCommunication;
//# sourceMappingURL=ManagerCommunication.js.map