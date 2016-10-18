"use strict";
class ManagerCommunication extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "ManagerCommunication";
    }
}
module.exports = ManagerCommunication;
//# sourceMappingURL=ManagerCommunication.js.map