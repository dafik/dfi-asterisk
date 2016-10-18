"use strict";
class InvalidPenalty extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidPenalty";
    }
}
module.exports = InvalidPenalty;
//# sourceMappingURL=InvalidPenatly.js.map