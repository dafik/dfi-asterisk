import AsteriskCollection = require("../../internal/asteriskCollection");
import Channel = require("../../models/ChannelModel");
import AST_EVENT = require("../../internal/asterisk/eventNames");

const SEPARATOR = "/";
const P_PROP_CHANNELS_BY_NAME = "byName";
const P_PROP_CHANNELS_BY_TECH = "byTech";

class Channels extends AsteriskCollection<Channel> {

    constructor() {
        super({
            model: Channel
        });

        this.setProp(P_PROP_CHANNELS_BY_NAME, new Map());
        this.setProp(P_PROP_CHANNELS_BY_TECH, new Map());

        this.on(AsteriskCollection.events.ADD, this._onChannelAdd, this);
        this.on(AsteriskCollection.events.REMOVE, this._onChannelRemove, this);
    }

    public destroy() {
        this.off(AsteriskCollection.events.ADD, this._onChannelAdd, this);
        this.off(AsteriskCollection.events.REMOVE, this._onChannelRemove, this);

        this.getProp(P_PROP_CHANNELS_BY_NAME).clear();
        this.removeProp(P_PROP_CHANNELS_BY_NAME);

        this.getProp(P_PROP_CHANNELS_BY_TECH).clear();
        this.removeProp(P_PROP_CHANNELS_BY_TECH);

        super.destroy();
    }

    public has(element: any | Channel): boolean {
        return super.has(element);
    }

    public get(id: any): Channel {
        return super.get(id);
    }

    public add(element: Channel): this {
        return super.add(element);
    }

    public clear(): this {
        return super.clear();
    }

    public forEach(fn: (value: Channel, index: string, map: Map<string, Channel>) => void, thisArg?: any): void {
        super.forEach(fn, thisArg);
    }

    public toArray(): Channel[] {
        return super.toArray();
    }

    private _onChannelAdd(channel: Channel) {
        if (channel.sourceEvent === AST_EVENT.DAHDI_SHOW_CHANNELS) {
            return;
        }
        const name = channel.name;
        const parts = name.split(SEPARATOR);
        const technology = parts.shift();

        this.getProp(P_PROP_CHANNELS_BY_NAME)[name] = channel;
        if (!this.getProp(P_PROP_CHANNELS_BY_TECH).has(technology)) {
            this.getProp(P_PROP_CHANNELS_BY_TECH).set(technology, new Map());
        }
        this.getProp(P_PROP_CHANNELS_BY_TECH).get(technology).set(parts.join(SEPARATOR), channel);

    }

    private _onChannelRemove(channel) {
        const name = channel.name;
        const parts = name.split(SEPARATOR);
        const technology = parts.shift();

        this.getProp(P_PROP_CHANNELS_BY_NAME).delete(name);
        this.getProp(P_PROP_CHANNELS_BY_TECH).get(technology).delete(parts.join(SEPARATOR));
        if (this.getProp(P_PROP_CHANNELS_BY_TECH).get(technology).size === 0) {
            this.getProp(P_PROP_CHANNELS_BY_TECH).delete(technology);
        }
    }
}

export = Channels;
