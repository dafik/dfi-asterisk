"use strict";
const
    async = require('async'),
    util = require('util'),
    _ = require('lodash'),
    EventObject = require('./internal/eventObject'),

    dAmiLib = require("../examples/dfi-asterisk-ami/src/dAmi"),
    DAmi = dAmiLib.DAmi,

    actions = dAmiLib.Actions,
    events = dAmiLib.Events,
    responses = dAmiLib.Responses,
    AsteriskAction = dAmiLib.AsteriskAction,

    Command = actions.Command,

    AsteriskLogger = require('./internal/asteriskLogger'),

    ManagerConnectionStates = require('./enums/defs/managerConnectionStates'),

    AsteriskServerEvents = require('./events/def/asteriskServerEvents'),
    ActionUniqueId = require('./internal/actions/actionUniqueId'),
    AsteriskServerDispatcher = require('./internal/asteriskEventDispatcher'),
    AsteriskActions = require('./internal/asteriskActions'),
    AsteriskManagers = require('./internal/asteriskManagers'),

    ManagerError = responses.ManagerError;

const amiHandlers = {
    amiLoginIncorrect () {
        this.logger.debug('on amiLoginIncorrect' + JSON.stringify(arguments));
    },
    amiConnected () {
        this.logger.debug('on amiConnected' + JSON.stringify(arguments));
        this.emit(AsteriskServerEvents.Connected);
    },

    amiEvent (event) {
        this.logger.trace('on amiEvent: %j', event);
        this.dispatcher.dispatch(event);
    },

    //socket

    amiConnectionConnect () {
        this.logger.debug('on amiConnectionConnect' + JSON.stringify(arguments));
    },
    amiConnectionError (had_error) {
        /**
         * @type {Error}
         */
        //var e = arguments[0].error;
        this.logger.error('on amiConnectionError' + JSON.stringify(arguments));

        //throw new Error('ManagerCommunicationException("' + e.message + "  -  " + JSON.stringify(e));
        //TODO reconnect

    },
    amiConnectionClose () {
        this.logger.warn('on amiConnectionClose' + JSON.stringify(arguments));
        console.log('restart');

        //TODO
        this._reInitialize();
    },
    amiConnectionTimeout () {
        this.logger.warn('on amiConnectionTimeout' + JSON.stringify(arguments));
    },
    amiConnectionEnd () {
        this.logger.warn('on amiConnectionEnd' + JSON.stringify(arguments));
    },
    /**
     * @this AsteriskServer
     * @param event
     */
    waitHandler(event) {
        if (event.event == 'fullybooted') {
            amiHandlers.amiEvent.call(this, event);
        } else {
            this.get('pendingEvents').push(event);
        }
    }
};


var maybeCallback = function (callback, thisp, err, response) {
    if (_.isFunction(callback)) {
        callback.call(thisp, err, response)
    }
};

/**
 * @namespace ast
 */

/**
 * @namespace ast.enums
 */
/**
 * @namespace ast.events
 */
/**
 * @namespace ast.interface
 */
/**
 * @namespace ast.internal
 */
/**
 * @namespace ast.managers
 */
/**
 * @namespace ast.models
 */


/**
 * @typedef AsteriskServer
 * @extends EventObject
 * @extends EventEmitter
 * @property {function} emit
 */
class AsteriskServer extends EventObject {


    /**
     * @returns {{logger :AsteriskLogger,loggerRequest:AsteriskLogger,loggerResponse:AsteriskLogger }}
     */
    get loggers() {
        return this.get('loggers');
    }

    get logger() {
        return this.get('loggers').logger;
    }

    get dispatcher() {
        return this.get('dispatcher');
    }

    get events() {
        return this.get('events');
    }

    get actions() {
        return this.get('actions');
    }

    /**
     * @returns {AsteriskManagers}
     */
    get managers() {
        return this.get('managers');
    }

    /**
     * @returns {dAmi.DAmi}
     */
    get eventConnection() {
        return this.get('eventConnection');
    }

    get initialized() {
        return this.get('initialized');
    }

    /**
     *
     * @param {string} name
     * @returns {AsteriskManager}
     */
    getManager(name) {
        return this.managers.get(name);
    }

    isMangerEnabled(name) {
        var manager = this.getManager(name);
        if (manager) {
            return manager.isEnabled();
        }
        return undefined;
    }


    //send

    /**
     * @param {dAmi.actions} action
     * @param {function((ManagerError|null),ManagerResponse)} [callback]
     * @param {*} [thisp] callback this
     */
    sendEventGeneratingAction(action, callback, thisp) {
        if (!this.checkIsActionAllowed(action)) {
            if (_.isFunction(callback)) {
                var message = 'Not Allowed Action: ' + action.get('Action');
                var err = new ManagerError(message, this);
                err.message = message;
                err.actionid = action.ActionID;
                callback.call(thisp, err);
            }
            return;
        }
        this.logger.debug('action eg: "' + action.Action + '" id:' + action.id);
        this.logger.trace('sending ' + action.Action + "\n" + action.marshall());

        this.loggers.loggerRequest.trace("\n\n" + action.marshall().trim() + "\n");


        this.eventConnection.send(action, onResponse, this);


        function onResponse(response) {
            if (response instanceof ManagerError) {
                this.logger.error('ManagerCommunicationException %s ,  action: %j response %j', action.Action, action, response);
                maybeCallback(callback, thisp, err, response);
                return;
            }
            if (action.Action == 'Command') {
                this.logger.debug('response for ev: %s command: %s response: %s', action.Action, action.Command, response.response);
            } else {
                this.logger.debug('response for ev: %s response: %s ', action.Action, response.response);
            }
            if (this.logger.trace.enabled) {
                var log = _.clone(response);
                delete log.lines;
                this.logger.trace('sendEventGeneratingResponse - %j' + log);
            }
            maybeCallback(callback, thisp, null, response);
        }
    }

    checkIsActionAllowed(action) {
        if (action instanceof AsteriskAction) {
            action = action.get('Action');
        }
        return -1 != this.options.allowedActions.indexOf(action);
    }


    /**
     * @param {AsteriskAction|dAmi.actions} action
     * @param {function((ManagerError|null),(ManagerResponse))} [callback]
     * @param {*} [thisp] callback this
     */
    sendAction(action, callback, thisp) {
        callback = callback || null;

        if (-1 == this.options.allowedActions.indexOf(action.get('Action'))) {
            if (_.isFunction(callback)) {
                var message = 'Not Allowed Action: ' + action.get('Action');
                var err = new ManagerError(message);
                err.message = message;
                err.actionid = action.ActionID;
                callback.call(thisp, err);
            }
            return;
        }
        if (action.Action == 'Getvar') {
            this.logger.debug('action: "' + action.Action + '" var: "' + action.Variable + '" channel: "' + action.Channel + '"');
        } else {
            if (action.Action == 'Command') {
                this.logger.debug('action: "' + action.Action + '" comm: ' + action.Command);
            } else {
                this.logger.debug('action: "' + action.Action + '"');
            }
        }
        this.logger.trace('sending ' + action.Action + "\n" + action.marshall());
        this.loggers.loggerRequest.trace("\n\n" + action.marshall().trim() + "\n");

        if (action.Action == 'Getvar') {
            //setTimeout(function () {
            this.eventConnection.send(action, onResponse, this);
            //}.bind(this), 10)
        } else {
            this.eventConnection.send(action, onResponse, this);
        }


        function onResponse(response) {
            if (response instanceof ManagerError) {
                if (action.Action != 'Getvar' && response.message != 'No such channel') {
                    this.logger.error('ManagerCommunicationException %s ,  action: %j response %j', action.Action, action, response.message);
                    maybeCallback(callback, thisp, response);
                    return;
                }
            }
            if (action.Action == 'Getvar') {
                this.logger.debug('response for: "' + action.Action + '" var: "' + Object.keys(response.variables)[0] + '" value: "' + response.value + '" channel: "' + action.Channel + '"');
            } else {
                this.logger.debug('response for: "' + action.Action + '" result: "' + response.getResult() + '" ' + ((response.getMessage() && response.getMessage() != 'Success') ? response.getMessage() : ''));
            }
            var trace = JSON.parse(JSON.stringify(response));
            delete  trace.lines;
            delete trace.EOL;
            this.logger.trace('%j', trace);
            maybeCallback(callback, thisp, null, response)
        }
    }

    sendActionOnEventConnection() {
        return this.sendAction.apply(this, arguments)
    }

    //private

    _initializeLoggers() {
        this.set('loggers', {});
        this.loggers.logger = new AsteriskLogger('AsteriskServer');
        this.loggers.loggerRequest = new AsteriskLogger('Ami.Request');
        this.loggers.loggerResponse = new AsteriskLogger('Ami.Response');
    }

    _initializeOptions(options) {

        var defaultState = {
            channel: true,
            peer: true,
            device: true,
            bridge: true,
            dahdi: true,
            queue: true,
            agent: true,
            meetMe: true
        };
        var currentState = !_.isUndefined(options, 'managers') ? options.managers : {};

        options['allowedActions'] = ['Command'];
        options['managers'] = _.extend(defaultState, currentState);

        this.set('options', options);
    }

    _initializeEventConnection() {

        let opts = _.has(this.get('options'), 'server') ? this.get('options').server : null;

        if (_.has(opts, 'port') && _.has(opts, 'host') && _.has(opts, 'username') && _.has(opts, 'secret')) {
            let eventConnection = new DAmi(opts);
            this.set('eventConnection', eventConnection);
            AsteriskServer.registerResponseClasses(eventConnection);

        } else {
            throw new Error('improper configuration');
            //improper configuration
        }


    }

    _initializeAmiHandlers() {
        var handlers = {};
        for (let eventName in amiHandlers) {
            if (_.has(amiHandlers, eventName)) {
                handlers[eventName] = amiHandlers[eventName].bind(this);
            }
        }
        this.set('amiHandlers', handlers);

    }

    constructor(options) {
        super();
        this._initializeLoggers();
        this._initializeOptions(options);
        this._initializeEventConnection();

        this._initializeAmiHandlers();


        this.set('dispatcher', new AsteriskServerDispatcher(this));
        this.set('actions', new AsteriskActions(this));
        this.set('managers', new AsteriskManagers(this));

        this.set('initialized', false);
        this.set('initializationStarted', false);
        this.set('pendingEvents', []);


        this.logger.error('test');
        this.logger.warn('test');

    }

    handleEvent(event) {
        switch (event.event) {

            case 'connect':
                this._handleConnectEvent(event);
                break;
            case 'disconnect':
                this._handleDisconnectEvent(event);
                break;

            case 'originateresponse':
                this._handleOriginateEvent(event);
                break;

            default:
                this.logger.error('try to handle event %j', event.event);
        }
    }

    /**
     * @param {function((ManagerError|null))} [callback]
     * @param {*} [thisp] callback this
     * @private
     */
    _initializeIfNeeded(callback, thisp) {

        /**
         * @this AsteriskServer
         */
        function initialize() {
            let eventConnection = this.eventConnection;

            this.emit(AsteriskServerEvents.BeforeInitialized);
            if (typeof eventConnection == "undefined") {
                onInitializedError.call(thisp, new Error('nor event connection object and proper configuration provided'));
            }
            if (_.isFunction(callback)) {
                this.once(AsteriskServerEvents.Initialized, function () {
                    eventConnection.removeListener('amiConnectionTimeout', errorFn);
                    eventConnection.removeListener('amiConnectionError', errorFn);

                    onInitialized.call(this)
                }, this)
            }
            if (this.get('initializationStarted')) {
                return;
            }
            this.once(AsteriskServerEvents.Connected, onConnected.bind(this));

            eventConnection.once('amiConnectionTimeout', errorFn);
            eventConnection.once('amiConnectionError', errorFn);

            if (eventConnection.getState() == ManagerConnectionStates.INITIAL || eventConnection.getState() == ManagerConnectionStates.DISCONNECTED) {
                this.set('initializationStarted', true);
                this._bindAmiEvents();
                eventConnection.open();
            }
            this.set('gcTimer', setInterval(this._gc.bind(this), 10000));
        }

        function onConnectionError(event) {
            //TODO reconnect
            onInitializedError.call(this, new Error('ManagerCommunicationException("Unable to login: " + ' + event.error.message + ', ' + event.error + ');'));
        }

        function onConnected() {
            var self = this;

            async.series([
                self.actions.core.getAvailableActions.bind(self.actions.core),
                self.actions.core.filterRTCP.bind(self.actions.core),
                self.managers.start.bind(self.managers),

                onAll.bind(self)
            ], function (err) {
                if (err) {
                    maybeCallback(callback, thisp, err);
                }

            });
        }

        /**
         * @this AsteriskServer
         * @param callback
         */
        function onAll(callback) {
            this.logger.debug('on onAll');
            this.logger.info("Initializing done");
            this.set('initialized', true);
            this.set('initializationStarted', false);

            this.emit(AsteriskServerEvents.Initialized);
            maybeCallback(callback, thisp);
        }

        function onInitialized() {
            this.logger.debug('on onInitialized');
            maybeCallback(callback, thisp);
        }

        function onInitializedError(err) {
            this.logger.debug('on onInitializedError %j', err);
            maybeCallback(callback, thisp);
        }

        var errorFn = onConnectionError.bind(this);


        if (this.initialized) {
            onInitialized.call(this);
        } else {
            initialize.call(this);
        }
    }

    _reInitialize() {

        /**
         * @this AsteriskServer
         */
        function initialize() {
            let eventConnection = this.eventConnection;

            this.emit(AsteriskServerEvents.BeforeReInitialized);
            if (typeof eventConnection == "undefined") {
                onInitializedError.call(thisp, new Error('nor event connection object and proper configuration provided'));
            }
            this.once(AsteriskServerEvents.ReInitialized, function () {
                eventConnection.removeListener('amiConnectionTimeout', errorFn);
                eventConnection.removeListener('amiConnectionError', errorFn);

            }, this);

            if (this.get('initializationStarted')) {
                return;
            }
            this.once(AsteriskServerEvents.Connected, onConnected.bind(this));

            eventConnection.once('amiConnectionTimeout', errorFn);
            eventConnection.once('amiConnectionError', errorFn);

            if (eventConnection.getState() == ManagerConnectionStates.INITIAL || eventConnection.getState() == ManagerConnectionStates.DISCONNECTED) {
                this.set('initializationStarted', true);
                eventConnection.reopen();
            }
        }

        function onConnectionError(event) {
            //TODO reconnect
            onInitializedError.call(this, new Error('ManagerCommunicationException("Unable to login: " + ' + event.error.message + ', ' + event.error + ');'));
        }

        function onConnected() {
            this.managers.reStart(function () {
                this.emit(AsteriskServerEvents.ReInitialized);
            }, this);

        }

        function onInitialized() {
            this.logger.debug('on onReInitialized');
            maybeCallback(callback, thisp);
        }

        function onInitializedError(err) {
            this.logger.debug('on onReInitializedError %j', err);

        }

        var errorFn = onConnectionError.bind(this);

        initialize.call(this);
    }

    /**
     * @private
     */
    _bindAmiEvents() {
        /**
         * @this AsteriskServer
         */
        function onInitialized() {
            this.logger.info('onINITIALIZED');

            process.nextTick(run.bind(this));
            /**
             * @this AsteriskServer
             */
            function run() {
                let wEvent;
                let pendingEvents = this.get('pendingEvents');

                if (pendingEvents.length > 0) {
                    this.logger.info('begin issuing pending events');
                    while (pendingEvents.length > 0) {
                        wEvent = pendingEvents.shift();
                        handlers.amiEvent.call(this, wEvent);
                    }
                    this.logger.info('end issuing pending events');
                }
                this.eventConnection.removeListener('amiEvent', handlers.waitHandler);  //remove tmp handler
                this.eventConnection.on('amiEvent', handlers.amiEvent);  //restore original handler
            }
        }

        let handlers = this.get('amiHandlers');

        for (let eventName in handlers) {
            if (handlers.hasOwnProperty(eventName)) {
                if (eventName != 'amiEvent') {
                    if (eventName == 'waitHandler') {
                        this.eventConnection.on('amiEvent', handlers[eventName]);
                    } else {
                        this.eventConnection.on(eventName, handlers[eventName]);
                    }
                }
            }
        }
        this.once(AsteriskServerEvents.Initialized, onInitialized.bind(this));
    }

    /**
     * @private
     */
    _unbindAmiEvents() {
        let eventConnection = this.get('eventConnection');
        let amiHandlers = this.get('amiHandlers');

        for (let event in amiHandlers) {
            if (amiHandlers.hasOwnProperty(event)) {
                eventConnection.removeListener(event, amiHandlers[event]);
            }
        }

    }


    /**
     * Requests the current state from the asterisk server after the connection
     * to the asterisk server is restored.
     * @private
     */
    _handleConnectEvent() {
        try {
            this.start();
        }
        catch (e) {
            //Exception
            this.logger.error("Unable to reinitialize state after reconnection", e);
        }
    }


    /**
     * Resets the internal state when the connection to the asterisk server is lost.
     * @private
     */
    _handleDisconnectEvent() {
        this._unbindAmiEvents();

        // same for channels, agents and queues rooms, they are reinitialized when reconnected
        this.managers.channel.disconnected();
        //this.managers.agent.disconnected();
        //this.managers.meetMe.disconnected();
        this.managers.queue.disconnected();
        this.set('initialized', false);
    }


    /**
     * @param {function((ManagerError|null))} [callback]
     * @param {*} [thisp] callback this
     */
    start(callback, thisp) {

        this._initializeIfNeeded(callback, thisp);
    }


    shutdown() {
        let eventConnection = this.get('eventConnection');
        if (eventConnection != null && (eventConnection.getState() == ManagerConnectionStates.CONNECTED || eventConnection.getState() == ManagerConnectionStates.RECONNECTING)) {
            eventConnection.close();
        }
        //TODO check events ar un bind
    }


    _gc() {
        this.managers.gc();
    }


    static idCounter() {
        return ActionUniqueId();
    }

    static registerResponseClasses(eventConnection) {
        let responseClass, responseMap = {
//            GetConfig: 'GetConfigResponse',
//            MailboxCount: 'MailboxCountResponse'
        };
        for (let action in responseMap) {
            responseClass = responseMap[action];
            eventConnection.registerResponseClass(action, responseClass);
        }
    }
}


/**
 * @type {AsteriskServer}
 */
var instance = null;
/**
 * @param {object} options
 * @returns AsteriskServer
 */
module.exports.getInstance = function (options) {
    if (instance === null) {
        instance = new AsteriskServer(options);
    }
    return instance;
};
module.exports.destroy = function () {
    if (instance !== null) {
        instance.shutdown();
        instance = null;
    }
};