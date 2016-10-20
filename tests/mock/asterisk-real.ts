import getServerInstance = require("../../src/asteriskServerInstance");

export = getServerInstance({
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
