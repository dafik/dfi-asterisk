"use strict";
class NoSuchInterface extends Error {
    constructor(message, member) {
        super(message);
        this.message = message;
        this.name = "NoSuchInterface";
        this.member = member;
    }
}
module.exports = NoSuchInterface;
//# sourceMappingURL=NoSuchInterface.js.map