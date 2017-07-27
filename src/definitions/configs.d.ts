import {IAmiClientOptions} from "local-asterisk-ami-client/lib/Interfaces";
import {IDfiBaseObjectConfig} from "local-dfi-base/src/dfiInterfaces";
import AsteriskServer = require("../asteriskServer");
import ServerManagers = require("../internal/server/Managers");
import AsteriskModel = require("../internal/asteriskModel");

export interface IDfiAstConfigCollection<M extends AsteriskModel> extends IDfiBaseObjectConfig {
    idField?: string;
    model?: new (...args: any[]) => M;
}

export interface IDfiAstConfigServerOptions extends IDfiBaseObjectConfig {
    fresh?: boolean;
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
    amiOptions?: IAmiClientOptions;
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
