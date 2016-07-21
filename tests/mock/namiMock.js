var net = require('net');
var events = require('events');
var debugEventEmitter = require('events').EventEmitter;
var actions = require('local-nami-extended').Actions;
var namiResponse = require('local-nami-extended').Response;

var util = require('util');
var namiEvents = require('local-nami-extended').Events;
var timer = require('timers');

var ConnectionState = require('local-asterisk-node').enums.ManagerConnectionState;

var Responses = require('./../fixtures/SocketResponses');
var crypto = require('crypto');

/**
 * Nami client.
 * @constructor
 * @param amiData The configuration for ami.
 * @augments EventEmitter
 * @memberOf nami
 */
function Nami(amiData) {
    Nami.super_.call(this);
    this.logger = require('log4js').getLogger('Nami.Client');
    this.connected = false;
    this.amiData = amiData;
    this.EOL = "\r\n";
    this.EOM = this.EOL + this.EOL;
    this.welcomeMessage = "Asterisk Call Manager/.*" + this.EOL;
    this.received = false;
    this.responses = {};
    this.callbacks = {};
    this.classResponses = [];
    this.registeredClassResponses = {};
    this._state = ConnectionState.INITIAL;
    this.on('namiRawMessage', this.onRawMessage);
    this.on('namiRawResponse', this.onRawResponse);
    this.on('namiRawEvent', this.onRawEvent);
}
// Nami inherits from the EventEmitter so Nami itself can throw events.
util.inherits(Nami, debugEventEmitter);

Nami.prototype.registerResponseClass = function (action, responseClass) {
    this.registeredClassResponses[action] = responseClass
};
/**
 * Called when a message arrives and is decoded as an event (namiRawEvent event).
 * This will actually instantiate an Event. If the event has an ActionID,
 * the corresponding response is looked up and will have this event appended.
 * Otherwise, the event "namiEvent" is fired. Also, the event "namiEvent<EventName>"
 * is fired (i.e: on event Dial, namiEventDial will be fired).
 *
 * @see Nami#onRawMessage(String)
 * @param {Event} event An Event message.
 * @returns void
 */
Nami.prototype.onRawEvent = function (event) {
    this.logger.debug('Got event: ' + JSON.stringify(event));
    if (typeof (event.actionid) !== 'undefined' && typeof (this.responses[event.actionid]) !== 'undefined' && typeof (this.callbacks[event.actionid]) !== 'undefined') {
        this.responses[event.actionid].events.push(event);
        if (event.event.indexOf('Complete') !== -1 || ((typeof (event.eventlist) !== 'undefined') && event.eventlist.indexOf('Complete') !== -1) || event.event.indexOf('DBGetResponse') !== -1) {
            this.callbacks[event.actionid](this.responses[event.actionid]);
            delete this.callbacks[event.actionid];
            delete this.responses[event.actionid];
        }
    } else {
        this.emit('namiEvent', event);
        this.emit('namiEvent' + event.event, event);
    }
};

/**
 * Called when a message arrives and is decoded as a response (namiRawResponse event).
 * This will actually instantiate a Response. If this response has associated events
 * (still to be received), it is buffered.
 * Otherwise, the callback used in send() will be called with the response.
 * @see Nami#onRawMessage(String)
 * @see Nami#send(String)
 * @param {Response} response A Response message.
 * @returns void
 */
Nami.prototype.onRawResponse = function (response) {
    this.logger.debug('Got response: ' + JSON.stringify(response));
    if ((typeof (response.message) !== 'undefined') && (response.message.indexOf('follow') !== -1)) {
        this.responses[response.actionid] = response;
    } else if (typeof (this.callbacks[response.actionid]) !== 'undefined') {
        this.callbacks[response.actionid](response);
        delete this.callbacks[response.actionid];
        delete this.responses[response.actionid];
    }
};

/**
 * Called by onData() whenever a raw message has been read.
 * Will fire "namiRawEvent" if the raw message represents an event.
 * Will fire "namiRawResponse" if the raw message represents a response.
 * @see Nami#onData(String)
 * @param {String} buffer The raw message read from server.
 * @returns void
 */
Nami.prototype.onRawMessage = function (buffer) {
    var response, event;
    this.logger.debug('Building raw message: ' + JSON.stringify(buffer));
    if (buffer.match(/^Event: /) !== null) {
        event = new namiEvents.Event(buffer);
        this.emit('namiRawEvent', event);
    } else if (buffer.match(/^Response: /) !== null) {
        response = new namiResponse.Response(buffer, this);
        this.emit('namiRawResponse', response);
    } else {
        this.logger.warn("Discarded: |" + buffer + "|");
    }
};

/**
 * Called by node whenever data is available to be read from AMI.
 * Will fire "namiRawMessage" for every complete message read.
 * @param {String} data The data read from server.
 * @see Nami#onRawMessage(String)
 * @returns void
 */
Nami.prototype.onData = function (data) {
    //noinspection JSUnusedAssignment
    var theEOM = -1, msg;
    this.logger.debug('Got data: ' + JSON.stringify(data));
    this.received = this.received.concat(data);
    while ((theEOM = this.received.indexOf(this.EOM)) !== -1) {
        msg = this.received.substr(0, theEOM);
        this.emit('namiRawMessage', msg);
        var startOffset = theEOM + this.EOM.length;
        var skippedEolChars = 0;
        var nextChar = this.received.substr(startOffset + skippedEolChars, 1);
        while (nextChar === "\r" || nextChar === "\n") {
            skippedEolChars++;
            nextChar = this.received.substr(startOffset + skippedEolChars, 1);
        }
        this.logger.debug('Skipped ' + skippedEolChars + ' bytes');
        this.received = this.received.substr(startOffset + skippedEolChars);
    }
};
/**
 * Called when the connection is established to AMI.
 * @returns void
 */
Nami.prototype.onConnect = function () {
    this.connected = true;
};

Nami.prototype.onClosed = function () {
    this.connected = false;
};

/**
 * Called when the first line is received from the server. It will check that
 * the other peer is a valid AMI server. If not valid, the event "namiInvalidPeer"
 * will be fired. If not, a login is tried, and onData() is set as the new handler
 * for incoming data. An anonymous function will handle the login response, firing
 * "namiLoginIncorrect" if the username/password were not correctly validated.
 * On successfull connection, "namiConnected" is emitted.
 * @param {String} data The data read from server.
 * @see Nami#onData(String)
 * @see Login(String, String)
 * @returns void
 */
Nami.prototype.onWelcomeMessage = function (data) {
    var self = this, welcome;
    this.logger.debug('Got welcome message: ' + JSON.stringify(data));
    var re = new RegExp(this.welcomeMessage, "");
    if (data.match(re) === null) {
        this.emit('namiInvalidPeer', data);
    } else {
        this._state = ConnectionState.CONNECTING;
        this.socketOnData = function (data) {
            self.onData(data);
        };
        /**
         * @type {Login}
         */
        var action = new actions.Login(this.amiData.username, this.amiData.secret);
        this.send(
            action,
            function (response) {
                if (response.response !== 'Success') {
                    this._state = ConnectionState.DISCONNECTED;
                    self.emit('namiLoginIncorrect');
                } else {
                    this._state = ConnectionState.CONNECTED;
                    self.emit('namiConnected');
                }
            }
        );
    }
};
/**
 * Closes the connection to AMI.
 * @returns void
 */
Nami.prototype.close = function () {
    //var self = this;
    this._state = ConnectionState.DISCONNECTING;
    //this.send(new action.Logoff(), function () { self.logger.info('Logged out'); });
    this.logger.info('Closing connection');
    this.removeAllListeners();
    this.socket.removeAllListeners();
    this.socket.end();
    this.onClosed();
    this._state = ConnectionState.DISCONNECTED;
};

/**
 * Opens the connection to AMI.
 * @returns void
 */
Nami.prototype.open = function () {
    this.logger.debug('Opening connection');
    this.received = "";
    this.initializeSocket();
};

/**
 * Creates a new socket and handles connection events.
 * @returns undefined
 */
Nami.prototype.initializeSocket = function () {
    this.logger.debug('Initializing fake socket');
    var self = this;
    var baseEvent = 'namiConnection';

    this.socketOnConnect = function () {
        self.logger.debug('Socket connected');
        self.onConnect();
        var event = {event: 'Connect'};
        self.emit(baseEvent + event.event, event);
    };

    // @param {Error} error Fires right before the `close` event
    this.onError = function (error) {
        self.logger.debug('Socket error: ' + JSON.stringify(error));
        var event = {event: 'Error', error: error};
        self.emit(baseEvent + event.event, event);
    };

    // @param {Boolean} had_error If the connection closed from an error.
    this.socketOnClose = function (had_error) {
        self.logger.debug('Socket closed');
        self.onClosed();
        var event = {event: 'Close', had_error: had_error};
        self.emit(baseEvent + event.event, event);
    };

    this.socketOnTimeout = function () {
        self.logger.debug('Socket timeout');
        var event = {event: 'Timeout'};
        self.emit(baseEvent + event.event, event);
    };

    this.socketOnEnd = function () {
        self.logger.debug('Socket ended');
        var event = {event: 'End'};
        self.emit(baseEvent + event.event, event);
    };

    this.socketOnceData = function (data) {
        self.onWelcomeMessage(data);
    };


    this.socketOnConnect();

    var data = "Asterisk Call Manager/2.5.0\r\n";
    this.socketOnceData(data);


};

/**
 * Reopens the socket connection to AMI.
 * @returns undefined
 */
Nami.prototype.reopen = function () {
    this.logger.debug('Reopening connection');
    this.initializeSocket();
};

/**
 * Sends an action to AMI.
 *
 * @param {Action} action The action to be sent.
 * @param {function} callback The optional callback to be invoked when the
 * responses arrives.
 *
 * @returns void
 */
Nami.prototype.send = function (action, callback) {
    if (action.hasOwnProperty('responseClass')) {
        this.classResponses[action.ActionID] = action['responseClass'];
        delete action['responseClass'];
    } else if (this.registeredClassResponses.hasOwnProperty(action.Action)) {
        this.classResponses[action.ActionID] = this.registeredClassResponses[action.Action];
    }
    this.logger.debug('Sending: ' + JSON.stringify(action));
    this.callbacks[action.ActionID] = callback;
    this.responses[action.ActionID] = "";

    var clone = {};
    for (var name in action) {
        if (action.hasOwnProperty(name) && name != 'id' && name != 'ActionID') {
            clone[name] = action [name];
        }
    }

    var mSerial = JSON.stringify(clone);
    var shaHash = crypto.createHash('sha1');
    shaHash.update(mSerial);

    var hash = shaHash.digest('hex');
    var knownResponses = [], line;
    if (Responses.hasOwnProperty(hash)) {
        knownResponses = Responses[hash].lines;
        var self = this;
        process.nextTick(function () {
            for (var i = 0; i < knownResponses.length; i++) {
                if (Responses[hash].actionId != action.ActionID) {
                    var x = 1;
                }
                line = knownResponses[i].replace('ActionID: ' + Responses[hash].actionId, 'ActionID: ' + action.ActionID);
                //line = knownResponses[i];
                self.onData(line);
            }
        })
    } else {
        this.logger.debug('unknown response for action: ' + action.Action + ' with Hash: ' + hash);

    }

};

Nami.prototype.getState = function () {
    return this._state;
};

exports.Nami = Nami;
exports.Actions = actions;
exports.Event = namiEvents;
exports.Response = namiResponse;
