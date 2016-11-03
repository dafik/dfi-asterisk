"use strict";
const BaseServerAction = require("./BaseAction");
const AstUtil = require("../../astUtil");
const DialplanContext = require("../../../models/dialplans/DialplanContextModel");
const DialplanExtension = require("../../../models/dialplans/DialplanExtensionModel");
const DialplanPriority = require("../../../models/dialplans/DialplanPriorityModel");
const AST_ACTION = require("../../asterisk/actionNames");
class DialPlanServerAction extends BaseServerAction {
    getDialplans(callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = { Action: AST_ACTION.SHOW_DIALPLAN };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, err);
                    return;
                }
                let dialplans = this._buildDialplans(response.events);
                AstUtil.maybeCallbackOnce(callbackFn, context, null, dialplans);
            });
        })
            .catch(error => error)
            .then((err) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            }
        });
    }
    getDialplan(name, callbackFn, context) {
        this._server.start()
            .then(() => {
            let action = { Action: AST_ACTION.SHOW_DIALPLAN, Context: name };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, err);
                    return;
                }
                let dialplan = this._buildDialplans(response.events).get(name);
                AstUtil.maybeCallbackOnce(callbackFn, context, null, dialplan);
            });
        })
            .catch(error => error)
            .then((err) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
            }
        });
    }
    _buildDialplans(events) {
        let dialplans = new Map();
        events.forEach((event) => {
            let context = dialplans.get(event.Context);
            if (!context) {
                context = new DialplanContext(event);
                dialplans.set(context.id, context);
            }
            let extension = context.extensions.get(event.Extension);
            if (!extension) {
                extension = new DialplanExtension(event, { context });
                context.addExtension(extension);
            }
            let priority = extension.priorities.get(event.Priority);
            if (!priority) {
                priority = new DialplanPriority(event, { context, extension });
                extension.addPriority(priority);
            }
        });
        return dialplans;
    }
}
module.exports = DialPlanServerAction;
//# sourceMappingURL=DialPlanActions.js.map