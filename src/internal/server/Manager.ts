import DfiEventObject from "local-dfi-base/src/dfiEventObject";
import AsteriskServer from "../../asteriskServer";
import {IDfiAstManagerOptions} from "../../definitions/configs";
import {IDfiAstEventsManager, IDfiAstEventsServer} from "../../definitions/events";
import {IDfiCallbackResult, IEventHandle, IEventHandlersMap} from "../../definitions/interfaces";
import {IAstEvent} from "../asterisk/events";
import AsteriskCollection from "../asteriskCollection";
import AsteriskModel from "../asteriskModel";
import AstUtil from "../astUtil";
import ServerManagers from "./Managers";

const P_PROP_COLLECTION = "collection";
const P_PROP_MANAGERS = "managers";
const P_PROP_EVENTSMAP = "eventsMap";
const P_PROP_ENABLED = "enabled";
const P_PROP_SERVER = "server";

abstract class AsteriskManager<M extends AsteriskModel, C extends AsteriskCollection<M>> extends DfiEventObject {

    constructor(options: IDfiAstManagerOptions, enabled: boolean, collection: C) {
        options.loggerName = "dfi:as:";

        super(options);

        this.setProp(P_PROP_COLLECTION, collection);
        this.setProp(P_PROP_EVENTSMAP, new Map());

        this.setProp(P_PROP_ENABLED, enabled);
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

    protected get _managers(): ServerManagers {
        return this.getProp(P_PROP_MANAGERS);
    }

    public restart(callbackFn: IDfiCallbackResult<null, string>, context?): void {
        // TODO implement
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

    protected _mapEvents(eventsMap: IEventHandlersMap): void {
        const events = Object.keys(eventsMap);
        events.forEach((event) => {
            this.eventsMap.set(event, eventsMap[event]);
            this.server.dispatcher.subscribeEvent(event, this);
        }, this);
    }
}

const EVENTS = {
    ...DfiEventObject.events,

    ADD: Symbol("manager:add"),
    UPDATE: Symbol("manager:update")
};

export default AsteriskManager;
