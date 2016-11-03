"use strict";
const AsteriskCollection = require("../../internal/asteriskCollection");
const Channel = require("../../models/ChannelModel");
const AST_EVENT = require("../../internal/asterisk/eventNames");
const SEPARATOR = "/";
const P_PROP_CHANNELS_BY_NAME = "byName";
const P_PROP_CHANNELS_BY_TECH = "byTech";
class Channels extends AsteriskCollection {
    constructor() {
        super({
            model: Channel
        });
        this.setProp(P_PROP_CHANNELS_BY_NAME, new Map());
        this.setProp(P_PROP_CHANNELS_BY_TECH, new Map());
        this.on(AsteriskCollection.events.ADD, this._onChannelAdd, this);
        this.on(AsteriskCollection.events.REMOVE, this._onChannelRemove, this);
    }
    destroy() {
        this.off(AsteriskCollection.events.ADD, this._onChannelAdd, this);
        this.off(AsteriskCollection.events.REMOVE, this._onChannelRemove, this);
        this.getProp(P_PROP_CHANNELS_BY_NAME).clear();
        this.removeProp(P_PROP_CHANNELS_BY_NAME);
        this.getProp(P_PROP_CHANNELS_BY_TECH).clear();
        this.removeProp(P_PROP_CHANNELS_BY_TECH);
        super.destroy();
    }
    has(element) {
        return super.has(element);
    }
    get(id) {
        return super.get(id);
    }
    add(element) {
        return super.add(element);
    }
    clear() {
        return super.clear();
    }
    forEach(fn, thisArg) {
        super.forEach(fn, thisArg);
    }
    toArray() {
        return super.toArray();
    }
    _onChannelAdd(channel) {
        if (channel.sourceEvent === AST_EVENT.DAHDI_SHOW_CHANNELS) {
            return;
        }
        let name = channel.name;
        let parts = name.split(SEPARATOR);
        let technology = parts.shift();
        this.getProp(P_PROP_CHANNELS_BY_NAME)[name] = channel;
        if (!this.getProp(P_PROP_CHANNELS_BY_TECH).has(technology)) {
            this.getProp(P_PROP_CHANNELS_BY_TECH).set(technology, new Map());
        }
        this.getProp(P_PROP_CHANNELS_BY_TECH).get(technology).set(parts.join(SEPARATOR), channel);
    }
    _onChannelRemove(channel) {
        let name = channel.name;
        let parts = name.split(SEPARATOR);
        let technology = parts.shift();
        this.getProp(P_PROP_CHANNELS_BY_NAME).delete(name);
        this.getProp(P_PROP_CHANNELS_BY_TECH).get(technology).delete(parts.join(SEPARATOR));
        if (this.getProp(P_PROP_CHANNELS_BY_TECH).get(technology).size === 0) {
            this.getProp(P_PROP_CHANNELS_BY_TECH).delete(technology);
        }
    }
}
module.exports = Channels;
//# sourceMappingURL=ChannelsCollection.js.map