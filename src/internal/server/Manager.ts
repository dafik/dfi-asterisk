import DfiEventObject = require("local-dfi-base/src/dfiEventObject");
import {IDfiAstEventsManager, IDfiAstEventsServer} from "../../definitions/events";
import {IDfiCallbackResult, IEventHandle} from "../../definitions/interfaces";
import {IAstEvent} from "../asterisk/events";
import {IDfiBaseObjectConfig} from "local-dfi-base/src/dfiInterfaces";
import AsteriskServer = require("../../asteriskServer");
import AsteriskCollection = require("../asteriskCollection");
import AsteriskModel = require("../asteriskModel");
import AstUtil = require("../astUtil");

const P_PROP_COLLECTION = "collection";
const P_PROP_EVENTSMAP = "eventsMap";
const P_PROP_ENABLED = "enabled";
const P_PROP_SERVER = "server";

abstract class AsteriskManager<M extends AsteriskModel, C extends AsteriskCollection<M>> extends DfiEventObject {

    constructor(options: IDfiBaseObjectConfig, enabled: boolean, collection: C) {
        options.loggerName = "dfi:as:";

        super(options);

        this.setProp(P_PROP_COLLECTION, collection);
        this.setProp(P_PROP_EVENTSMAP, new Map());

        this.setProp(P_PROP_ENABLED, !!enabled);
    }

    get enabled(): boolean {
        return this.getProp(P_PROP_ENABLED);
    }

    protected get server(): AsteriskServer {
        return this.getProp(P_PROP_SERVER);
    }

    private get eventsMap(): Map<string, IEventHandle> {
        return this.getProp(P_PROP_EVENTSMAP);
    }

    protected get serverEvents(): IDfiAstEventsServer {
        return this.getProp(P_PROP_SERVER).constructor.events;
    }

    static get events(): IDfiAstEventsManager {
        return EVENTS;
    }

    protected get _collection(): C {
        return this.getProp(P_PROP_COLLECTION);
    }

    public restart(callbackFn: IDfiCallbackResult, context?): void {
        this.server.logger.info("manager %s restarted", this.constructor.name);
        AstUtil.maybeCallbackOnce(callbackFn, context, null, this.constructor.name);
    }

    public handleEvent<T extends IAstEvent>(event: T) {
        this.logger.debug("handle from %s : %s", this.constructor.name, event.Event);
        this.logger.trace("handle from %s : %s", this.constructor.name, event);

        this.logger.debug("handle : %s", event.Event);

        if (this.eventsMap.has(event.Event)) {
            this.eventsMap.get(event.Event).call(this, event);
        } else {
            this.logger.error("try to handle event from %j : %j", this.constructor.name, event.Event);
        }
    }

    public toJSON() {
        return {
            collection: this._collection.toJSON()
        };
    }

    protected _mapEvents(eventsMap: Object): void {
        let events = Object.keys(eventsMap);
        events.forEach((event) => {
            this.eventsMap.set(event, eventsMap[event]);
            this.server.dispatcher.subscribeEvent(event, this);
        }, this);
    }
}
const EVENTS = Object.assign(
    Object.assign({}, DfiEventObject.events),
    {
        ADD: Symbol("manager:add"),
        UPDATE: Symbol("manager:update")
    }
);

export = AsteriskManager;
