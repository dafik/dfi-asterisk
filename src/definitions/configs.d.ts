import {IDfiBaseObjectConfig} from "local-dfi-base/src/dfiInterfaces";
import AsteriskServer = require("../asteriskServer");
import ServerManagers = require("../internal/server/Managers");

export interface IDfiAstConfigCollection extends IDfiBaseObjectConfig {
    idField?: string;
    model: Function;
}

export interface IDfiAstConfigServerOptions extends IDfiBaseObjectConfig {
    config: IDfiAstConfigServer;
}

export interface IDfiAstConfigServer extends Object {
    server: IDfiAstConfigAstServer;
    managers?: IDfiAstConfigAstManagerConfig;
}
export interface IDfiAstConfigAstServer extends Object {
    host: string;
    port: string;
    username: string;
    secret: string;
}
export interface IDfiAstConfigAstManagerConfig extends Object {
    channel?: boolean;
    peer?: boolean;
    device?: boolean;
    bridge?: boolean;
    dahdi?: boolean;
    queue?: boolean;
    agent?: boolean;
}
export interface IDfiAstConfigAstManager extends Object {
    channel: boolean;
    peer: boolean;
    device: boolean;
    bridge: boolean;
    dahdi: boolean;
    queue: boolean;
    agent: boolean;
}
export interface IDfiAstManagerOptions extends IDfiBaseObjectConfig {
    managers: ServerManagers;
    server: AsteriskServer;
}