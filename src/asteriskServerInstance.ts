import AsteriskServer = require("./asteriskServer");
import {IDfiAstConfigServerOptions} from "./definitions/configs";

let instance: AsteriskServer = null;

function getServerInstance(options?: IDfiAstConfigServerOptions, fresh?: boolean): AsteriskServer {
    fresh = fresh || false;

    if (instance === null || fresh) {
        if (options) {
            instance = new AsteriskServer(options);
        } else {
            throw new Error("server start options missing");
        }
    }
    return instance;
}

export = getServerInstance;
