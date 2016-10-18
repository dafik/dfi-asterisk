"use strict";
class BaseServerAction {
    constructor(server) {
        this._server = server;
    }
}
module.exports = BaseServerAction;
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
//# sourceMappingURL=BaseAction.js.map