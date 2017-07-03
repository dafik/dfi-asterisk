import BaseServerAction = require("./BaseAction");
import Channel = require("../../../models/ChannelModel");
import {IDfiCallbackResult} from "../../../definitions/interfaces";

import {IAstActionPlayDTMF} from "../../asterisk/actions";
import AstUtil = require("../../astUtil");
import AST_ACTION = require("../../asterisk/actionNames");

class DTMFServerAction extends BaseServerAction {

    public send(channel: Channel | string | string, digit, callbackFn?: IDfiCallbackResult, context?) {

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
                this._server.sendAction(action, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallback(callbackFn, context, err);
                        return;
                    }
                    const dbgre = response.events.length > 0 ? response.events[0] : response;
                    AstUtil.maybeCallback(callbackFn, context, null, dbgre);
                }, context);
            })
            .catch((error) => error)
            .then((err) => {
                if (err) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, err);
                }
            });
    }
}
export = DTMFServerAction;
