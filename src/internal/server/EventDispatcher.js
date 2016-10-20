"use strict";
const DfiObject = require("local-dfi-base/src/dfiObject");
const eventNames_1 = require("../asterisk/eventNames");
class EventDispatcher extends DfiObject {
    constructor(server) {
        super({ loggerName: "dfi:as:" });
        this.setProp("server", server);
        this.setProp("subscriptions", new Map());
    }
    subscribeEvent(event, manager) {
        if (!this.getProp("subscriptions").has(event)) {
            this.getProp("subscriptions").set(event, new Set());
        }
        this.getProp("subscriptions").get(event).add(manager);
    }
    subscribeEvents(events, manager) {
        events.forEach((event) => {
            this.subscribeEvent(event, manager);
        }, this);
    }
    dispatch(event) {
        if (event.Event === eventNames_1.AST_EVENT.ORIGINATE_RESPONSE) {
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
module.exports = EventDispatcher;
//# sourceMappingURL=EventDispatcher.js.map