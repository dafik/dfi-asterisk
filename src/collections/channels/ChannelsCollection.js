"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../../internal/asteriskCollection");
const ChannelModel_1 = require("../../models/ChannelModel");
const eventNames_1 = require("../../internal/asterisk/eventNames");
const SEPARATOR = "/";
const P_PROP_CHANNELS_BY_NAME = "byName";
const P_PROP_CHANNELS_BY_TECH = "byTech";
class Channels extends asteriskCollection_1.default {
    constructor() {
        super({
            model: ChannelModel_1.default
        });
        this.setProp(P_PROP_CHANNELS_BY_NAME, new Map());
        this.setProp(P_PROP_CHANNELS_BY_TECH, new Map());
        this.on(asteriskCollection_1.default.events.ADD, this._onChannelAdd, this);
        this.on(asteriskCollection_1.default.events.REMOVE, this._onChannelRemove, this);
    }
    destroy() {
        this.off(asteriskCollection_1.default.events.ADD, this._onChannelAdd, this);
        this.off(asteriskCollection_1.default.events.REMOVE, this._onChannelRemove, this);
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
        if (channel.sourceEvent === eventNames_1.default.DAHDI_SHOW_CHANNELS) {
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
    _onChannelRemove(channel) {
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
exports.default = Channels;
//# sourceMappingURL=ChannelsCollection.js.map