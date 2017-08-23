"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfiObject_1 = require("local-dfi-base/src/dfiObject");
const eventNames_1 = require("../asterisk/eventNames");
class EventDispatcher extends dfiObject_1.default {
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
        if (event.Event === eventNames_1.default.ORIGINATE_RESPONSE) {
            this.getProp("server").actions.originate.handleOriginateEvent(event);
        }
        if (this.getProp("subscriptions").has(event.Event)) {
            this.logger.debug("event %s", event.Event);
            const sub = this.getProp("subscriptions").get(event.Event);
            sub.forEach((manager) => {
                manager.handleEvent(event);
            });
        }
    }
}
exports.default = EventDispatcher;
//# sourceMappingURL=EventDispatcher.js.map