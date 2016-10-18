import {IDfiBaseObjectConfig} from "local-dfi-base/src/dfiInterfaces";

export interface IDfiAstConfigCollection extends IDfiBaseObjectConfig {
    idField?: string;
    model: Function;
}

export interface IDfiAstConfigServer extends Object {
    server: IDfiAstConfigAstServer;
    managers: IDfiAstConfigAstManager;
}
export interface IDfiAstConfigAstServer extends Object {
    host: string;
    port: string;
    username: string;
    secret: string;
}
export interface IDfiAstConfigAstManager extends Object {
    channel: boolean;
    peer: boolean;
    device: boolean;
    bridge: boolean;
    dahdi: boolean;
    queue: boolean;
    agent: boolean;
    meetMe: boolean;
}
