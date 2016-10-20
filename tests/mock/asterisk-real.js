"use strict";
const getServerInstance = require("../../src/asteriskServerInstance");
module.exports = getServerInstance({
    managers: {
        agent: true,
        bridge: true,
        channel: true,
        dahdi: true,
        device: true,
        peer: true,
        queue: true
    },
    server: {
        // host: "localhost",
        host: "pbx",
        port: "5038",
        secret: "node@pbx",
        username: "node"
    }
});
//# sourceMappingURL=asterisk-real.js.map