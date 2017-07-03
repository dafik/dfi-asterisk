"use strict";
const BaseServerAction = require("./BaseAction");
const Channel = require("../../../models/ChannelModel");
const AstUtil = require("../../astUtil");
const AST_ACTION = require("../../asterisk/actionNames");
class DTMFServerAction extends BaseServerAction {
    send(channel, digit, callbackFn, context) {
        this._server.start()
            .then(() => {
            if (channel instanceof Channel) {
                channel = channel.name;
            }
            const action = {
                Action: AST_ACTION.PLAY_DTMF,
                Channel: channel,
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
module.exports = DTMFServerAction;
//# sourceMappingURL=DTMFAction.js.map