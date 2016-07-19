/**
 * Created by z.wieczorek on 03.10.14.
 */

var events = require('events');
var util = require('util');
/**
 *
 * @constructor
 * @extends events#EventEmitter
 * @property {logger} logger
 */
function DebugEventEmitter() {
    DebugEventEmitter.super_.call(this);
    this.logger = false;
}
util.inherits(DebugEventEmitter, events.EventEmitter);

DebugEventEmitter.prototype.setLogger = function (logger) {
    if (typeof this.logger == "undefined" || !this.logger) {
        this.logger = logger;
    }
};

DebugEventEmitter.prototype.emit = function emit() {

    if (this.logger) {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        var dType = args.shift();
        var err = new Error();
        var from = err.stack.toString().split("\n")[2];

        try {
            JSON.stringify(args, null, "\t");
        } catch (e) {
            this.logger.error(e.message);
        }

        this.logger.debug('EE emit: ' + dType);
        this.logger.trace('EE emit: ' + dType + ' args:' + JSON.stringify(args) + ' at: ' + from);
    }
    this.emitSupper.apply(this, arguments);
};
DebugEventEmitter.prototype.emitSupper = events.EventEmitter.prototype.emit;

DebugEventEmitter.prototype.addListener = function (type, listener) {
    if (this.logger) {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        var dType = args.shift();
        var err = new Error();
        var from = err.stack.toString().split("\n")[2];


        this.logger.debug('EE add: "' + dType + '"');
        this.logger.trace('EE add: "' + dType + '" args:' + JSON.stringify(args) + ' at: ' + from);
    }
    this.addListenerSupper(type, listener);
};
DebugEventEmitter.prototype.addListenerSupper = events.EventEmitter.prototype.addListener;
DebugEventEmitter.prototype.on = DebugEventEmitter.prototype.addListener;

module.exports = DebugEventEmitter;