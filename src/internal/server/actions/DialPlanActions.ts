import BaseServerAction = require("./BaseAction");
import {IDfiGetDialplanCallback, IDfiGetDialplansCallback} from "../../../definitions/interfaces";
import {AST_ACTION} from "../../asterisk/actionNames";
import {IAstActionShowDialPlan} from "../../asterisk/actions";
import {IAstEventListDialplan} from "../../asterisk/events";

import AstUtil = require("../../astUtil");
import DialplanContext = require("../../../models/dialans/DialplanContextModel");
import DialplanExtension = require("../../../models/dialans/DialplanExtensionModel");
import DialplanPriority = require("../../../models/dialans/DialplanPriorityModel");

class DialPlanServerAction extends BaseServerAction {

    public getDialplans(callbackFn: IDfiGetDialplansCallback, context?) {

        this._server.start()
            .then(() => {
                let action: IAstActionShowDialPlan = {Action: AST_ACTION.SHOW_DIALPLAN};
                this._server.sendEventGeneratingAction<IAstEventListDialplan>(action, (err, response) => {
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

    public getDialplan(name, callbackFn: IDfiGetDialplanCallback, context?) {

        this._server.start()
            .then(() => {
                let action: IAstActionShowDialPlan = {Action: AST_ACTION.SHOW_DIALPLAN, Context: name};
                this._server.sendEventGeneratingAction<IAstEventListDialplan>(action, (err, response) => {
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

    private _buildDialplans(events: IAstEventListDialplan[]): Map<string, DialplanContext> {
        let dialplans: Map<string, DialplanContext> = new Map();

        events.forEach((event: IAstEventListDialplan) => {
            let context: DialplanContext = dialplans.get(event.Context);
            if (!context) {
                context = new DialplanContext(event);
                dialplans.set(context.id, context);
            }

            let extension: DialplanExtension = context.extensions.get(event.Extension);
            if (!extension) {
                extension = new DialplanExtension(event, {context});
                context.addExtension(extension);
            }

            let priority: DialplanPriority = extension.priorities.get(event.Priority);
            if (!priority) {
                priority = new DialplanPriority(event, {context, extension});
                extension.addPriority(priority);
            }
        });

        return dialplans;
    }
}
export = DialPlanServerAction;
