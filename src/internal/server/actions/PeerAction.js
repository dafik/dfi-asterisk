"use strict";
const BaseServerAction = require("./BaseAction");
const AstUtil = require("../../astUtil");
const AST_ACTION = require("../../asterisk/actionNames");
const AST_EVENT = require("../../asterisk/eventNames");
class PeersServerAction extends BaseServerAction {
    getEntries(callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = { Action: AST_ACTION.SIP_PEERS };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    AstUtil.maybeCallback(callbackFn, context, err);
                }
                const peerEntries = [];
                response.events.forEach((event) => {
                    if (event.Event === AST_EVENT.PEER_ENTRY) {
                        peerEntries.push(event);
                    }
                }, this);
                AstUtil.maybeCallback(callbackFn, context, null, peerEntries);
            });
        })
            .catch((error) => {
            if (error) {
                AstUtil.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
}
module.exports = PeersServerAction;
//# sourceMappingURL=PeerAction.js.map