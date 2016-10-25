import AsteriskServer = require("./asteriskServer");

let instance: AsteriskServer = null;

function getServerInstance(options?): AsteriskServer {
    if (instance === null) {
        if (options) {
            instance = new AsteriskServer(options);
        } else {
            throw new Error("server start options missing");
        }
    }
    return instance;
}
export = getServerInstance;
