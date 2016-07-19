"use strict";
const EventEmitter = require('eventemitter3'),
    _ = require('lodash'),

    EventObject = require('./eventObject'),
    AsteriskLogger = require('./asteriskLogger'),
    AsteriskServer = require('../asteriskServer'),
    State = require('../enums/state'),

    notAllowedAttrs = ['event', 'EOL', 'actionid', 'lines'],

    skipIdCheck = [
        'ExtensionHistoryEntry',
        'AsteriskExtension',
        'AsteriskQueueEntry'
    ];

/**
 * @class
 * @extends EventEmitter
 */

class AsteriskModel extends EventObject {
    constructor(attributes, options) {
        super(options);

        this.setProp('sourceEvent', attributes['event']);
        this.setProp('logger', new AsteriskLogger(this.constructor.name));

        this.attributes = this._filterAttributes(attributes);

        this.stampLastUpdate();


        this.on('change:state', function (model, newState) {
            if (!(newState instanceof State)) {
                this._getDefaultLogger().error('trying to set state with not State obj %s, %j ', newState, newState);
            }
        }, this);

        this.initialize();

        if (-1 == skipIdCheck.indexOf(this.constructor.name) && !_.has(this, 'id')) {
            throw new Error('New asterisk model without id: ' + this.constructor.name);
        }
    }

    getLastUpdateMillis() {
        return this.get('lastUpdate');
    }

    stampLastUpdate() {
        this.set('lastUpdate', Date.now());
    }

    get logger() {
        return this.getProp('logger');
    }

    /**
     * @returns {AsteriskServer}
     */
    get server() {
        let server = _.has(this.options, 'server') ? this.options.server : undefined;
        if (!server) {
            server = AsteriskServer.getInstance();
        }
        return server;
    }

    initialize() {

    }

    destroy() {
        super.destroy();

        _.keys(this.attributes).forEach(function (name) {
            delete this.attributes[name];
        }, this);

        delete this.attributes;
        delete this.id;

    }

    _getDefaultLogger() {
        if (this.logger) {
            return this.logger
        }
        return new AsteriskLogger('default');
    }

    _filterAttributes(attributes, additional) {
        additional = additional || [];
        var filtered = {};


        _.forOwn(attributes, function (value, key) {
            if (-1 === notAllowedAttrs.indexOf(key) && -1 === additional.indexOf(key)) {
                filtered[key] = value
            }
        });

        return filtered;
    }

    get(attribute) {

        if (_.has(this.attributes, attribute)) {
            return this.attributes[attribute]
        }
        if (attribute == 'id' && _.has(this, 'id')) {
            return this.id;
        }
        return undefined;
    }

    has(attribute) {
        return _.has(this.attributes, attribute);
    }

    set(attribute, value) {
        var old = this.get(attribute);
        this.attributes[attribute] = value;
        if (old == undefined) {
            this.emit('add', this);
        }
        this.emit('change', this, attribute, value, old);
        this.emit('change:' + attribute, this, value, old);

        return this;
    }

    unset(attribute) {
        if (_.has(this.attributes, attribute)) {
            return delete this.attributes[attribute]
        }
        return undefined;
    }

    //
    getProp(property) {

        return super.get(property)
    }

    hasProp(property) {
        return super.has(property);
    }

    setProp(property, value) {
        super.set(property, value);
        return this;
    }


    toPlain() {
        var tmp = {id: this.id};
        _.forEach(this.attributes, function (value, key) {
            tmp[key] = value;
        })
        return tmp;
    }


    toString() {
        var val,
            sb = this.constructor.name,
            skip = ['event', 'actionid'],
            keys = Object.keys(this.attributes),
            filtered = [];

        function filter(name) {
            return -1 == skip.indexOf(name);

        }

        if (this.constructor.name == 'AsteriskChannel') {
            var x = 1;
        }
        try {

            filtered = keys.filter(filter).sort();

            sb += "[";
            filtered.forEach(function (name, index, arr) {
                val = this.attributes[name];
                if (val) {
                    if (val.constructor.name == 'Moment') {
                        try {
                            val = val.toISOString();
                        } catch (e) {
                            var z = 1;
                        }
                    } else if (typeof val == 'object') {
                        try {
                            val = '[' + val.constructor.name + ']';
                        } catch (e) {
                            var x = 1;
                        }
                    }
                }
                sb += name + '=' + val;
                if (index < arr.length - 1) {
                    sb += ";"
                }
            }, this);

            sb += "]";
            return sb;
        } catch (e1) {
            var x = 1;
        }
    }

    toJSON() {
        return this.attributes
    }
}


module.exports = AsteriskModel;