import AsteriskServer from "../../src/asteriskServer";
import getServerInstance from "../../src/asteriskServerInstance";

const asterisk: AsteriskServer = getServerInstance({
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

export default asterisk;
