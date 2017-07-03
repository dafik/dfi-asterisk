"use strict";
const getServerInstance = require("../../src/asteriskServerInstance");
const asterisk = getServerInstance({
    config: {
        managers: {
            agent: false,
            bridge: false,
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
module.exports = asterisk;
//# sourceMappingURL=asterisk-real.js.map