"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskServerInstance_1 = require("../../src/asteriskServerInstance");
const asterisk = asteriskServerInstance_1.default({
    config: {
        managers: {
            agent: false,
            bridge: true,
            channel: true,
            dahdi: false,
            device: true,
            peer: true,
            queue: false
        },
        server: {
            // host: "localhost",
            host: "pbx",
            port: "5038",
            secret: "node@pbx",
            username: "node"
        }
    }
});
exports.default = asterisk;
//# sourceMappingURL=asterisk-real.js.map