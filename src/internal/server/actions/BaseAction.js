"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseServerAction {
    constructor(server) {
        this._server = server;
    }
}
exports.default = BaseServerAction;
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