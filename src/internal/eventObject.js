"use strict";
const _ = require('lodash'),
    EventEmitter = require('eventemitter3'),
    ss = require('events').EventEmitter
    ;


/**
 * @typedef EventObject
 * @extends EventEmitter
 *
 */
class EventObject extends EventEmitter {
    constructor(options) {
        super();

        this._priv = {};
        if (options) {
            this._priv['options'] = options;
        }
    }

    /**
     * @this EventObject
     */
    get options() {
        return this._priv.options;
    }

    get(name) {
        if (_.has(this._priv, name)) {
            return this._priv[name];
        }
        return undefined;
    }

    set(name, value) {
        this._priv[name] = value;

        return this;
    }

    has(name) {
        return _.has(this.name);
    }


    initialize() {

    }

    on(name, callback, context) {
        var ret = super.on(name, callback, context)
        if (Array.isArray(this._events[name]) && this._events[name].length > 10) {
            this.logger.error(new Error('memory leak detected %j'))
        }
        return ret
    };

    destroy() {
        this.removeAllListeners();

        _.keys(this._priv).forEach(function (name) {
            delete this._priv[name];
        }, this);

    }
}

Object.defineProperty(EventObject.prototype, '_priv', {
    writable: true,
    get function () {
        return this._priv;
    }
});


module.exports = EventObject;


