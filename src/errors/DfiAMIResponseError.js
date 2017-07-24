"use strict";
class DfiAMIResponseError extends Error {
    constructor(message, action) {
        super(message);
        this.message = message;
        this.name = "DfiAMIResponse";
        this.action = action;
    }
}
module.exports = DfiAMIResponseError;
//# sourceMappingURL=DfiAMIResponseError.js.map