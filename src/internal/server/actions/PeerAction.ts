import BaseServerAction = require("./BaseAction");
import {IDfiCallbackResult} from "../../../definitions/interfaces";
import {AST_ACTION} from "../../asterisk/actionNames";
import {IAstActionSIPpeers} from "../../asterisk/actions";
import {AST_EVENT} from "../../asterisk/eventNames";
import {IAstEventPeerSIPEntry} from "../../asterisk/events";
import AstUtil = require("../../astUtil");

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
