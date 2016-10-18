import DfiObject = require("local-dfi-base/src/dfiObject");
import AsteriskServer = require("../../asteriskServer");
import AsteriskManager = require("./Manager");
import AsteriskModel = require("../asteriskModel");
import AsteriskCollection = require("../asteriskCollection");
import {AST_EVENT} from "../asterisk/eventNames";

class EventDispatcher extends DfiObject {

    constructor(server: AsteriskServer) {
        super();

        this.setProp("server", server);
        this.setProp("subscriptions", new Map());
    }

    public subscribeEvent<M extends AsteriskModel, C extends AsteriskCollection<M>, T extends AsteriskManager<M, C>>(event: string, manager: T) {
        if (!this.getProp("subscriptions").has(event)) {
            this.getProp("subscriptions").set(event, new Set());
        }
        this.getProp("subscriptions").get(event).add(manager);
    }

    public subscribeEvents<M extends AsteriskModel, C extends AsteriskCollection<M>, T extends AsteriskManager<M, C>>(events: Array<string>, manager: T) {
        events.forEach((event) => {
            this.subscribeEvent(event, manager);
        }, this);
    }

    public dispatch(event) {

        if (event.Event === AST_EVENT.ORIGINATE_RESPONSE) {
            this.getProp("server").actions.originate.handleOriginateEvent(event);
        }

        if (this.getProp("subscriptions").has(event.Event)) {
            this.logger.debug("event %s", event.Event);
            let sub = this.getProp("subscriptions").get(event.Event);
            sub.forEach((manager) => {
                manager.handleEvent(event);
            });
        }
    }

}
export = EventDispatcher;
