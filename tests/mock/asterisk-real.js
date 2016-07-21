var asteriskServer = require('../../src/asteriskServer');

/**
 * @type {AsteriskServer}
 */
module.exports = asteriskServer.getInstance(
    {
        server: {
            host: "localhost",
            port: 5038,
            username: "node",
            secret: "node@pbx"
        },
        deleteOldChannelsOnStartup: false
    }
);