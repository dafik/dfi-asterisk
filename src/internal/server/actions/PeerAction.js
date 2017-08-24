"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionNames_1 = require("../../asterisk/actionNames");
const eventNames_1 = require("../../asterisk/eventNames");
const astUtil_1 = require("../../astUtil");
const BaseAction_1 = require("./BaseAction");
class PeersServerAction extends BaseAction_1.default {
    getEntries(callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = { Action: actionNames_1.default.SIP_PEERS };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    astUtil_1.default.maybeCallback(callbackFn, context, err);
                }
                const peerEntries = [];
                response.events.forEach((event) => {
                    if (event.Event === eventNames_1.default.PEER_ENTRY) {
                        peerEntries.push(event);
                    }
                }, this);
                astUtil_1.default.maybeCallback(callbackFn, context, null, peerEntries);
            });
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
}
exports.default = PeersServerAction;
//# sourceMappingURL=PeerAction.js.map