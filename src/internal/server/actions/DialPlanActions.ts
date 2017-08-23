import BaseServerAction from "./BaseAction";

import AstUtil from "../../astUtil";
import DialplanContext from "../../../models/dialplans/DialplanContextModel";
import DialplanExtension from "../../../models/dialplans/DialplanExtensionModel";
import DialplanPriority from "../../../models/dialplans/DialplanPriorityModel";
import AST_ACTION from "../../asterisk/actionNames";
import {IDfiGetDialplanCallback, IDfiGetDialplansCallback} from "../../../definitions/interfaces";

import {IAstActionShowDialPlan} from "../../asterisk/actions";
import {IAstEventListDialplan} from "../../asterisk/events";

class DialPlanServerAction extends BaseServerAction {

    public getDialplans(callbackFn: IDfiGetDialplansCallback, context?) {

        this._server.start()
            .then(() => {
                const action: IAstActionShowDialPlan = {Action: AST_ACTION.SHOW_DIALPLAN};
                this._server.sendEventGeneratingAction<IAstEventListDialplan>(action, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallbackOnce(callbackFn, context, err);
                        return;
                    }

                    const dialplans = this._buildDialplans(response.events);
                    AstUtil.maybeCallbackOnce(callbackFn, context, null, dialplans);
                });
            })
            .catch((error) => {
                if (error) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, error);
                }
            });
    }

    public getDialplan(name, callbackFn: IDfiGetDialplanCallback, context?) {

        this._server.start()
            .then(() => {
                const action: IAstActionShowDialPlan = {Action: AST_ACTION.SHOW_DIALPLAN, Context: name};
                this._server.sendEventGeneratingAction<IAstEventListDialplan>(action, (err, response) => {
                    if (err) {
                        AstUtil.maybeCallbackOnce(callbackFn, context, err);
                        return;
                    }

                    const dialplan = this._buildDialplans(response.events).get(name);
                    AstUtil.maybeCallbackOnce(callbackFn, context, null, dialplan);
                });
            })
            .catch((error) =>  {
                if (error) {
                    AstUtil.maybeCallbackOnce(callbackFn, context, error);
                }
            });
    }

    private _buildDialplans(events: IAstEventListDialplan[]): Map<string, DialplanContext> {
        const dialplans: Map<string, DialplanContext> = new Map();

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

export default DialPlanServerAction;
