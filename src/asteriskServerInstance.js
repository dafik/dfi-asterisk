"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskServer_1 = require("./asteriskServer");
let instance = null;
function getServerInstance(options, fresh) {
    fresh = fresh || false;
    if (instance === null || fresh) {
        if (options) {
            instance = new asteriskServer_1.default(options);
        }
        else {
            throw new Error("server start options missing");
        }
    }
    return instance;
}
exports.getServerInstance = getServerInstance;
exports.default = getServerInstance;
//# sourceMappingURL=asteriskServerInstance.js.map