"use strict";
const dfiEventObject_1 = require("local-dfi-base/src/dfiEventObject");
const AstUtil = require("../astUtil");
const P_PROP_COLLECTION = "collection";
const P_PROP_MANAGERS = "managers";
const P_PROP_EVENTSMAP = "eventsMap";
const P_PROP_ENABLED = "enabled";
const P_PROP_SERVER = "server";
class AsteriskManager extends dfiEventObject_1.default {
    constructor(options, enabled, collection) {
        options.loggerName = "dfi:as:";
        super(options);
        this.setProp(P_PROP_COLLECTION, collection);
        this.setProp(P_PROP_EVENTSMAP, new Map());
        this.setProp(P_PROP_ENABLED, !!enabled);
    }
    get enabled() {
        return this.getProp(P_PROP_ENABLED);
    }
    get server() {
        return this.getProp(P_PROP_SERVER);
    }
    get eventsMap() {
        return this.getProp(P_PROP_EVENTSMAP);
    }
    get serverEvents() {
        return this.getProp(P_PROP_SERVER).constructor.events;
    }
    static get events() {
        return EVENTS;
    }
    get _collection() {
        return this.getProp(P_PROP_COLLECTION);
    }
    get _managers() {
        return this.getProp(P_PROP_MANAGERS);
    }
    restart(callbackFn, context) {
        this.server.logger.info("manager %s restarted", this.constructor.name);
        AstUtil.maybeCallbackOnce(callbackFn, context, null, this.constructor.name);
    }
    handleEvent(event) {
        this.logger.debug("handle from %s : %s", this.constructor.name, event.Event);
        this.logger.trace("handle from %s : %s", this.constructor.name, event);
        this.logger.debug("handle : %s", event.Event);
        if (this.eventsMap.has(event.Event)) {
            this.eventsMap.get(event.Event).call(this, event);
        }
        else {
            this.logger.error("try to handle event from %j : %j", this.constructor.name, event.Event);
        }
    }
    toJSON() {
        return {
            collection: this._collection.toJSON()
        };
    }
    _mapEvents(eventsMap) {
        const events = Object.keys(eventsMap);
        events.forEach((event) => {
            this.eventsMap.set(event, eventsMap[event]);
            this.server.dispatcher.subscribeEvent(event, this);
        }, this);
    }
}
const EVENTS = Object.assign({}, dfiEventObject_1.default.events, { ADD: Symbol("manager:add"), UPDATE: Symbol("manager:update") });
module.exports = AsteriskManager;
//# sourceMappingURL=Manager.js.map