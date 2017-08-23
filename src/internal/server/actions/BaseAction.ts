import AsteriskServer from "../../../asteriskServer";

abstract class BaseServerAction {
    protected _server: AsteriskServer;

    constructor(server: AsteriskServer) {
        this._server = server;
    }
}
export default BaseServerAction;

/*

 this._server.start()
 .then(() => {

 })
 .catch(error => error)
 .then((err) => {
 if (err) {
 AstUtil.maybeCallbackOnce(callbackFn, context, err);
 }
 });

 */
