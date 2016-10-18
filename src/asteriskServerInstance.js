"use strict";
const AsteriskServer = require("./asteriskServer");
let instance = null;
function getServerInstance(options) {
    if (instance === null) {
        if (options) {
            instance = new AsteriskServer(options);
        }
        else {
            throw new Error("server start options missing");
        }
    }
    return instance;
}
module.exports = getServerInstance;
//# sourceMappingURL=asteriskServerInstance.js.map