"use strict";
class IllegalArgument extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "IllegalArgumentError";
    }
}
module.exports = IllegalArgument;
//# sourceMappingURL=IllegalArgument.js.map