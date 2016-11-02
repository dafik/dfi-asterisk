import AsteriskServer = require("./asteriskServer");
import {IDfiAstConfigServerOptions} from "./definitions/configs";

let instance: AsteriskServer = null;

function getServerInstance(options?: IDfiAstConfigServerOptions): AsteriskServer {
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
