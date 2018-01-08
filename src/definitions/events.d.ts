import {IDfiBaseEventObjectEvents, IDfiBaseModelEvents} from "dfi-base/src/dfiInterfaces";

// events
export interface IDfiAstEventsServer extends IDfiBaseEventObjectEvents {
    CONNECTED: symbol;
    BEFORE_INIT: symbol;
    INIT: symbol;
    REINIT: symbol;
    BEFORE_REINIT: symbol;
}

export interface IDfiAstEventsPeer extends IDfiBaseModelEvents {
    PROPERTY_STATE: symbol;
    PROPERTY_ADDRESS: symbol;
}

export interface IDfiAstEventsQueueManager extends IDfiAstEventsManager {
    MEMBER_ADD: symbol;
    MEMBER_REMOVE: symbol;
}
export interface IDfiAstEventsChannelManager extends IDfiAstEventsManager {
    CHANNEL_ADD: symbol;
}

export interface IDfiAstEventsManager extends IDfiBaseEventObjectEvents {
    ADD: symbol;
    UPDATE: symbol;
}

export interface IDfiAstEventsQueue extends IDfiBaseModelEvents {
    ENTRY_ADD: symbol;
    ENTRY_LEAVE: symbol;
    MEMBER_ADD: symbol;
    MEMBER_LEAVE: symbol;
    SERVICE_LEVEL_EXCEEDED: symbol;
}
