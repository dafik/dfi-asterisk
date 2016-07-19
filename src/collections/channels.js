"use strict";
const AsteriskCollection = require('../internal/asteriskCollection'),

    _ = require('lodash'),
    SEPARATOR = '/';

var AsteriskChannel = require('../models/asteriskChannel');

class ChannelsCollection extends AsteriskCollection {
    constructor() {

        //TODO hack
        if (AsteriskChannel.constructor.name != 'AsteriskChannel') {
            ChannelsCollection.prototype._model = require('../models/asteriskChannel');
        }


        super();

        this._byName = {};
        this._byTech = {};

        this.on('add', this.onChannelAdd, this);
        this.on('remove', this.onChannelRemove, this);
    }

    /**
     *
     * @param {AsteriskChannel} channel
     */
    onChannelAdd(channel) {
        if (channel.getProp('sourceEvent') == 'dahdishowchannels') {
            return;
        }
        var name = channel.get('channel');

        var parts = name.split(SEPARATOR),
            technology = parts.shift();

        this._byName[name] = channel;
        if (!_.has(this._byTech, technology)) {
            this._byTech[technology] = {};
        }
        this._byTech[technology] [parts.join(SEPARATOR)] = channel;

    }

    onChannelRemove(channel) {
        if (typeof channel.get != 'function') {
            var x = 1;
        }

        var name = channel.get('channel'),
            parts = name.split(SEPARATOR),
            technology = parts.shift();

        delete this._byName[name];
        delete this._byTech[technology] [parts.join(SEPARATOR)];
        if (_.keys(this._byTech[technology]).length == 0) {
            delete this._byTech[technology];
        }
    }

    destroy() {
        this.removeListener('add');
        this.removeListener('remove');

        delete this._byName;
        delete this._byTech;

        super.destroy()
    }
}

ChannelsCollection.prototype._model = AsteriskChannel;
ChannelsCollection.prototype._idField = 'id';

module.exports = ChannelsCollection;


