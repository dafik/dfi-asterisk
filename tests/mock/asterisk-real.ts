import getServerInstance = require("../../src/asteriskServerInstance");
import AsteriskServer = require("../../src/asteriskServer");

let asterisk: AsteriskServer = getServerInstance({
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

export =  asterisk;
