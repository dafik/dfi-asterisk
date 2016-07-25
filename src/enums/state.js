"use strict";
const
    AsteriskLogger = require('../internal/asteriskLogger'),
    _ = require('lodash');

class State {
    /**
     * Returns value specified by int. Use this to transform

     * @param {number} status integer representation of the status.
     * @returns {State} corresponding QueueMemberState object or <code>null</code> if none matches.
     */
    static byValue(status) {
        let tmp, states = this.prototype.States;
        for (let key  in  states) {
            if (states.hasOwnProperty(key) && states[key] == status) {
                tmp = new this(states[key], key);
                return tmp;
            }
        }

        if (-1 == State.prototype.unknown.indexOf(status)) {
            State.prototype.unknown.push(status);
            State.prototype.logger.error('all: %j', State.prototype.unknown);
        }

        State.prototype.logger.warn('unknown state %j ,%j', this.prototype.constructor.name, status);
        return new this('UNKNOWN', status);
    }

    static byName(status) {
        status = status.toUpperCase();

        var tmp;
        if (this.prototype.States.hasOwnProperty(status)) {
            tmp = new this(this.prototype.States[status], status);
            return tmp;
        }

        if (-1 == State.prototype.unknown.indexOf(status)) {
            State.prototype.unknown.push(status);
            State.prototype.logger.warn('unknown state %j ,%j', this.prototype.constructor.name, status);
            State.prototype.logger.error('all: %j', State.prototype.unknown);
            return new this('unknown', status);
        }

        return null;
    }

    static byNameOrValue(status) {

        var tmp = this.byName(status);
        if (tmp) {
            return tmp;
        }
        tmp = this.byValue(status);
        if (tmp) {
            return tmp;
        }


        return null;
    }

    nameByValue(value) {
        throw  new Error('check this');
        if (value == null) {
            return null;
        }
        //ChannelState
        var tmp, key;
        for (key in ChannelStates) {
            if (ChannelStates.hasOwnProperty(key)) {
                tmp = ChannelStates[key];
                if (tmp == value) {
                    return key;
                }
            }
        }
        return null;
    }


    toString() {
        var sb = this.constructor.name;
        sb += "[";
        Object.keys(this).forEach(function (name, index, arr) {
            sb += name + '=' + this[name];
            if (index < arr.length - 1) {
                sb += ";"
            }
        }, this);

        sb += "]";
        return sb;
    }
}

State.prototype.logger = new AsteriskLogger('dfi:as:state');
State.prototype.unknown = [];

module.exports = State;

