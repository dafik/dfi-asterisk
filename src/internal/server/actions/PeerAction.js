"use strict";
const BaseServerAction = require("./BaseAction");
const AstUtil = require("../../astUtil");
const AST_ACTION = require("../../asterisk/actionNames");
const AST_EVENT = require("../../asterisk/eventNames");
class PeersServerAction extends BaseServerAction {
    getEntries(callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = { Action: AST_ACTION.SIP_PEERS };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    AstUtil.maybeCallback(callbackFn, context, err);
                }
                let peerEntries = [];
                response.events.forEach((event) => {
                    if (event.Event === AST_EVENT.PEER_ENTRY) {
                        peerEntries.push(event);
                    }
                }, this);
                AstUtil.maybeCallback(callbackFn, context, null, peerEntries);
            });
        })
            .catch(error => error)
            .then((err) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            }
        });
    }
}
module.exports = PeersServerAction;
//# sourceMappingURL=PeerAction.js.map