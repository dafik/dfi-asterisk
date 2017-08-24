import {IDfiCallbackResult} from "../../../definitions/interfaces";
import AST_ACTION from "../../asterisk/actionNames";
import {IAstActionSIPpeers} from "../../asterisk/actions";
import AST_EVENT from "../../asterisk/eventNames";
import {IAstEventPeerSIPEntry} from "../../asterisk/events";
import AstUtil from "../../astUtil";
import BaseServerAction from "./BaseAction";

class PeersServerAction extends BaseServerAction {

    public getEntries(callbackFn: IDfiCallbackResult<Error, IAstEventPeerSIPEntry[]>, context?) {

        this._server.start()
            .then(() => {
                const action: IAstActionSIPpeers = {Action: AST_ACTION.SIP_PEERS};
                this._server.sendEventGeneratingAction(action, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallback(callbackFn, context, err);
                    }
                    const peerEntries: IAstEventPeerSIPEntry[] = [];

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
