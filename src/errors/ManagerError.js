"use strict";
class ManagerError extends Error {
    constructor(message, response) {
        super(message);
        this.message = message;
        this.name = "ManagerError";
        this.response = response;
    }
}
module.exports = ManagerError;
//# sourceMappingURL=ManagerError.js.map