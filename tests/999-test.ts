import AmiClient from "dfi-asterisk-ami-client";

describe("Core actions", () => {

    it("getAvailableActions", (done) => {

        const ami = new AmiClient({
            addTime: true,
            attemptsDelay: 1000,
            emitEventsByTypes: false,
            emitResponsesById: false,
            eventFilter: null,  // filter disabled
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
            .connect(opts.username, opts.secret, {host: opts.host, port: parseInt(opts.port, 10)})
            .then(() => {
                setTimeout(done, 1900);
            });
    });

});
