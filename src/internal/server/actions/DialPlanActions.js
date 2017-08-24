"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DialplanContextModel_1 = require("../../../models/dialplans/DialplanContextModel");
const DialplanExtensionModel_1 = require("../../../models/dialplans/DialplanExtensionModel");
const DialplanPriorityModel_1 = require("../../../models/dialplans/DialplanPriorityModel");
const actionNames_1 = require("../../asterisk/actionNames");
const astUtil_1 = require("../../astUtil");
const BaseAction_1 = require("./BaseAction");
class DialPlanServerAction extends BaseAction_1.default {
    getDialplans(callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = { Action: actionNames_1.default.SHOW_DIALPLAN };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
                    return;
                }
                const dialplans = this._buildDialplans(response.events);
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, dialplans);
            });
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
    getDialplan(name, callbackFn, context) {
        this._server.start()
            .then(() => {
            const action = { Action: actionNames_1.default.SHOW_DIALPLAN, Context: name };
            this._server.sendEventGeneratingAction(action, (err, response) => {
                if (err) {
                    astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
                    return;
                }
                const dialplan = this._buildDialplans(response.events).get(name);
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, dialplan);
            });
        })
            .catch((error) => {
            if (error) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, error);
            }
        });
    }
    _buildDialplans(events) {
        const dialplans = new Map();
        events.forEach((event) => {
            let context = dialplans.get(event.Context);
            if (!context) {
                context = new DialplanContextModel_1.default(event);
                dialplans.set(context.id, context);
            }
            let extension = context.extensions.get(event.Extension);
            if (!extension) {
                extension = new DialplanExtensionModel_1.default(event, { context });
                context.addExtension(extension);
            }
            let priority = extension.priorities.get(event.Priority);
            if (!priority) {
                priority = new DialplanPriorityModel_1.default(event, { context, extension });
                extension.addPriority(priority);
            }
        });
        return dialplans;
    }
}
exports.default = DialPlanServerAction;
//# sourceMappingURL=DialPlanActions.js.map