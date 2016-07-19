"use strict";
const
    _ = require('lodash'),
    AsteriskLogger = require('./asteriskLogger'),
    EventObject = require('../internal/eventObject'),
    defaultLogger = new AsteriskLogger('AsteriskManager');


class AsteriskManager extends EventObject {

    constructor(options, state, collection) {
        super(options);

        this.set('collection', collection);
        this.set('eventsMap', new Map());
        this.set('logger', new AsteriskLogger(this.constructor.name));

        this.set('enabled', state);
    }

    reStart(callback, thisp) {
        if (typeof callback == "function") {
            this.server.loggers.logger.info('manager %s restarted', this.constructor.name);
            callback.call(thisp, null, this.constructor.name);
        }
    }

    /**
     * @returns {AsteriskServer}
     */
    get server() {
        return this.options.server
    }

    /**
     * @returns {AsteriskLogger}
     */
    get logger() {
        return this.get('logger');
    }

    /**
     * @returns {boolean}
     */
    get enabled() {
        return this.get('enabled');
    }

    /**
     *
     * @returns {Map}
     */
    get eventsMap() {
        return this.get('eventsMap');
    }

    _mapEvents(eventsMap) {
        var events = Object.keys(eventsMap);
        events.forEach(function (event) {
            this.eventsMap.set(event, eventsMap[event]);
            this.server.dispatcher.subscribeEvent(event, this)
        }, this);
    }

    handleEvent(event) {
        defaultLogger.debug('handle from %j : %s', this.constructor.name, event.event);
        defaultLogger.trace('handle from %j : %j', this.constructor.name, event);

        this.logger.debug('handle : %s', event.event);

        if (this.eventsMap.has(event.event)) {
            var handle = this.eventsMap.get(event.event);
            handle.call(this, event);
        } else {
            defaultLogger.error('try to handle event from %j : %j', this.constructor.name, event.event);
        }
    }

    gc() {

    }

    isEnabled() {
        return this.enabled;
    }

    toJSON() {
        return {};
        //return {subscribedEvt: _.keys(this._eventsMap.toJSON())};
    }

}
module.exports = AsteriskManager;