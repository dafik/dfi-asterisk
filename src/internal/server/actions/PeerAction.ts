import BaseServerAction from "./BaseAction";
import AstUtil from "../../astUtil";
import AST_ACTION from "../../asterisk/actionNames";
import AST_EVENT from "../../asterisk/eventNames";
import {IDfiCallbackResult} from "../../../definitions/interfaces";
import {IAstActionSIPpeers} from "../../asterisk/actions";
import {IAstEventPeerSIPEntry} from "../../asterisk/events";

class PeersServerAction extends BaseServerAction {

    public getEntries(callbackFn: IDfiCallbackResult, context?) {

        this._server.start()
            .then(() => {
                const action: IAstActionSIPpeers = {Action: AST_ACTION.SIP_PEERS};
                this._server.sendEventGeneratingAction(action, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallback(callbackFn, context, err);
                    }
                    const peerEntries = [];

                    response.events.forEach((event: IAstEventPeerSIPEntry) => {
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

export default PeersServerAction;
