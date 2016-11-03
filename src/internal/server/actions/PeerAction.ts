import BaseServerAction = require("./BaseAction");
import {IDfiCallbackResult} from "../../../definitions/interfaces";
import {IAstActionSIPpeers} from "../../asterisk/actions";
import {IAstEventPeerSIPEntry} from "../../asterisk/events";
import AstUtil = require("../../astUtil");
import AST_ACTION = require("../../asterisk/actionNames");
import AST_EVENT = require("../../asterisk/eventNames");

class PeersServerAction extends BaseServerAction {

    public getEntries(callbackFn: IDfiCallbackResult, context?) {

        this._server.start()
            .then(() => {
                let action: IAstActionSIPpeers = {Action: AST_ACTION.SIP_PEERS};
                this._server.sendEventGeneratingAction(action, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallback(callbackFn, context, err);
                    }
                    let peerEntries = [];

                    response.events.forEach((event: IAstEventPeerSIPEntry) => {
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
export = PeersServerAction;
