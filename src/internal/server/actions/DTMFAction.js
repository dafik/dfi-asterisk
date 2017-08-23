"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAction_1 = require("./BaseAction");
const ChannelModel_1 = require("../../../models/ChannelModel");
const astUtil_1 = require("../../astUtil");
const actionNames_1 = require("../../asterisk/actionNames");
class DTMFServerAction extends BaseAction_1.default {
    send(channel, digit, callbackFn, context) {
        this._server.start()
            .then(() => {
            if (channel instanceof ChannelModel_1.default) {
                channel = channel.name;
            }
            const action = {
                Action: actionNames_1.default.PLAY_DTMF,
                Channel: channel,
                Digit: digit,
                Duration: "1000"
            };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    astUtil_1.default.maybeCallback(callbackFn, context, err);
                    return;
                }
                const dbgre = response.events.length > 0 ? response.events[0] : response;
                astUtil_1.default.maybeCallback(callbackFn, context, null, dbgre);
            }, context);
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
}
exports.default = DTMFServerAction;
//# sourceMappingURL=DTMFAction.js.map