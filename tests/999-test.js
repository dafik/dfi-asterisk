"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const local_asterisk_ami_client_1 = require("local-asterisk-ami-client");
describe("Core actions", () => {
    it("getAvailableActions", (done) => {
        const ami = new local_asterisk_ami_client_1.default({
            addTime: true,
            attemptsDelay: 1000,
            emitEventsByTypes: false,
            emitResponsesById: false,
            eventFilter: null,
            eventTypeToLowerCase: false,
            keepAlive: false,
            keepAliveDelay: 10000,
            maxAttemptsCount: 30,
            reconnect: true
        });
        const opts = {
            host: "pbx",
            port: "5038",
            secret: "node@pbx",
            username: "node"
        };
        ami
            .connect(opts.username, opts.secret, { host: opts.host, port: parseInt(opts.port, 10) })
            .then(() => {
            setTimeout(done, 1900);
        });
    });
});
//# sourceMappingURL=999-test.js.map