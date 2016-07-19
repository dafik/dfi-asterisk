"use strict";
const debug = require('debug');


var colors = {
    trace: 4,
    debug: 6,
    info: 2,
    warn: 3,
    error: 1,
    fatal: 5,
}
class AsteriskLogger {
    constructor(name) {
        this.name = name;
        this.loggers = {}
    }

    getLogger(type) {
        if (!this.loggers.hasOwnProperty(type)) {
            this.loggers[type] = debug(this.name + ':' + type);
            this.loggers[type].color = colors[type];
        }
        return this.loggers[type];
    }

    trace() {
        let logger = this.getLogger('trace');
        logger.apply(null, arguments);
    }

    debug() {
        let logger = this.getLogger('debug');
        logger.apply(null, arguments);
    }

    info() {
        let logger = this.getLogger('info');
        logger.apply(null, arguments);
    }

    warn() {
        let logger = this.getLogger('warn');
        logger.apply(null, arguments);
    }

    error() {
        let logger = this.getLogger('error');
        logger.apply(null, arguments);
    }

    fatal() {
        let logger = this.getLogger('fatal');
        logger.apply(null, arguments);
    }

}

module.exports = AsteriskLogger;