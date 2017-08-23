import AsteriskServer from "./asteriskServer";
import {IDfiAstConfigServerOptions} from "./definitions/configs";

let instance: AsteriskServer = null;

export function getServerInstance(options?: IDfiAstConfigServerOptions, fresh?: boolean): AsteriskServer {
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

export default getServerInstance;
