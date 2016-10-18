"use strict";
const BaseServerAction = require("./BaseAction");
const actionNames_1 = require("../../asterisk/actionNames");
const eventNames_1 = require("../../asterisk/eventNames");
const AstUtil = require("../../astUtil");
class PeersServerAction extends BaseServerAction {
    getEntries(callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = { Action: actionNames_1.AST_ACTION.SIP_PEERS };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    AstUtil.maybeCallback(callbackFn, context, err);
                }
                let peerEntries = [];
                response.events.forEach((event) => {
                    if (event.Event === eventNames_1.AST_EVENT.PEER_ENTRY) {
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