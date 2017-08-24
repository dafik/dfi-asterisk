import {IDfiCallbackResult} from "../../../definitions/interfaces";
import Channel from "../../../models/ChannelModel";
import AST_ACTION from "../../asterisk/actionNames";
import AstUtil from "../../astUtil";
import BaseServerAction from "./BaseAction";

import {IAstActionPlayDTMF} from "../../asterisk/actions";

class DTMFServerAction extends BaseServerAction {

    public send(channel: Channel | string | string, digit, callbackFn?: IDfiCallbackResult<Error, {}>, context?) {

        this._server.start()
            .then(() => {
                if (channel instanceof Channel) {
                    channel = channel.name;
                }

                const action: IAstActionPlayDTMF = {
                    Action: AST_ACTION.PLAY_DTMF,
                    Channel: channel as string,
                    Digit: digit,
                    Duration: "1000"
                };
                this._server.sendEventGeneratingAction(action, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallback(callbackFn, context, err);
                        return;
                    }
                    const dbgre = response.events.length > 0 ? response.events[0] : response;
                    AstUtil.maybeCallback(callbackFn, context, null, dbgre);
                }, context);
            })
            .catch((error) => {
                if (error) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, error);
                }
            });
    }
}

export default DTMFServerAction;
