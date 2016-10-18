import async = require("async");
import * as _ from "lodash";
import {IDfiAstConfigAstServer, IDfiAstConfigServer} from "./definitions/configs";
import {IDfiAstEventsServer} from "./definitions/events";
import {IDfiAMIResponse, IDfiAMIResponseGetvar, IDfiCallback, IDfiAMIResponseCommand, IDfiAMIResponseMessage, IDfiAmiMultiCallback} from "./definitions/interfaces";
import {IAstAction, IAstActionCommand, IAstActionGetvar} from "./internal/asterisk/actions";
import { AST_EVENT} from "./internal/asterisk/eventNames";
import {IAstEvent} from "./internal/asterisk/events";

import DfiEventObject = require("local-dfi-base/src/dfiEventObject");

import EventDispatcher = require("./internal/server/EventDispatcher");
import ServerActions = require("./internal/server/Actions");
import ServerManagers = require("./internal/server/Managers");

import AmiClient = require("asterisk-ami-client");

import AstUtil = require("./internal/astUtil");
import ManagerCommunication = require("./errors/ManagerCommunication");
import AsteriskVersion = require("./internal/server/Version");
import ManagerError = require("./errors/ManagerError");

class AsteriskServer extends DfiEventObject {

    constructor(options: IDfiAstConfigServer) {

        super({loggerName: "dfi:as:"});

        this.setProp("initialized", false);
        this.setProp("initializationStarted", false);
        this.setProp("pendingEvents", []);
        this.setProp("responses", new Map());
        this.setProp("allowedActions", new Set());

        this._initializeOptions(options);
        this._initializeEventConnection();
        this._initializeAmiHandlers();

        this.setProp("dispatcher", new EventDispatcher(this));
        this.setProp("actions", new ServerActions(this));
        this.setProp("managers", new ServerManagers(this));

    }

    get managers(): ServerManagers {
        return this.getProp("managers");
    }

    get actions(): ServerActions {
        return this.getProp("actions");
    }

    get dispatcher() {
        return this.getProp("dispatcher");
    }

    get initialized() {
        return this.getProp("initialized");
    }

    get version(): AsteriskVersion {
        return this.getProp("version");
    }

    set version(version: AsteriskVersion) {
        this.setProp("version", version);
    }

    static get events(): IDfiAstEventsServer {
        return Events;
    }

    private get _ami(): AmiClient {
        return this.getProp("ami");
    };

    get _allowedActions(): Set<string> {
        return this.getProp("allowedActions");
    }

    public start(): Promise<AsteriskServer> {
        return new Promise((resolve, reject) => {
                this._initializeIfNeeded(err => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            }
        );
    }

    public isConnected(): boolean {
        return this._ami && this._ami.isConnected;
    }

    public  sendEventGeneratingAction<E extends IAstEvent>(action: IAstAction | IAstActionCommand, callbackFn: IDfiAmiMultiCallback<E>, context?) {
        if (!this._allowedActions.has(action.Action)) {
            AstUtil.maybeCallback(callbackFn, context, "Not Allowed Action: " + action.Action);
            return;
        }
        if (!Object.hasOwnProperty.call(action, "ActionID")) {
            action.ActionID = "AN_" + AstUtil.uniqueActionID()
        }

        this.logger.debug('action eg: "%s" id: %s', action.Action, action.ActionID);
        this.logger.trace("sending %s %j", action.Action, action);
        this.logger.trace("\n\n %j \n", action);

        let responses = this.getProp("responses");

        function onResponse(response) {
            if (response.ActionID) {
                let resp = responses.get(response.ActionID);

                if (response.EventList) {
                    if (response.EventList === "start") {
                        if (resp) {
                            Object.assign(resp, response);
                        } else {
                            let x = 1;
                        }
                    } else if (response.EventList === "Complete") {
                        responses.delete(response.ActionID);
                        if (responses.size === 0) {
                            this._ami.removeListener("event", handler);
                        }
                        if (resp) {
                            let callb = resp.callback;
                            let thisp1 = resp.thisp;
                            delete resp["callback"];
                            delete resp["thisp"];
                            AstUtil.maybeCallback(callb, thisp1, null, resp);
                        } else {
                            let x = 1;
                        }
                    } else {
                        let x = 1;
                    }
                } else if (resp) {
                    resp.events.push(response);
                } else {
                    let x = 1;
                }

            }
        }

        let handler = onResponse.bind(this);

        responses.set(action.ActionID, {
            callback: callbackFn,
            events: [],
            getEvents: function () {
                return this.events;
            },
            thisp: context,
        });
        if (responses.size === 1) {
            this._ami.on("event", handler);
        }
        let actionToSend: IAstAction|string = action;
        if (action.serialize) {
            actionToSend = AstUtil.serializeMessage(action);
        }

        (this._ami.send(actionToSend, true) as Promise<IDfiAMIResponse>)
            .then((response: IDfiAMIResponse) => {
                if (response.Response && response.Response === "Error") {
                    this.logger.error('ManagerCommunicationException %s ,  action: %j response %j', action.Action, action, response);

                    responses.delete(response.ActionID);
                    if (responses.size === 0) {
                        this._ami.removeListener("event", handler);
                    }
                    AstUtil.maybeCallback(callbackFn, context, response);
                    return;
                }
                if (action.Action === "Command") {
                    this.logger.debug('response for ev: %s command: %s response: %s', action.Action, (action as IAstActionCommand).Command, response.Response);
                } else {
                    this.logger.debug('response for ev: %s response: %s ', action.Action, response.Response);
                }
                if (this.logger.isTraceEnabled()) {
                    this.logger.trace('sendEventGeneratingResponse - %j', response);
                }
                onResponse.call(this, response);
            })
            .catch(error => error)
            .then(error => {
                if (error instanceof Error) {
                    AstUtil.maybeCallback(callbackFn, context, error);
                }
            });
    }

    public sendAction(action: IAstAction | IAstActionGetvar | IAstActionCommand, callbackFn?: IDfiCallback, context?: any) {
        if (!this._allowedActions.has(action.Action)) {
            AstUtil.maybeCallbackOnce(callbackFn, context, 'Not Allowed Action: ' + action.Action);
            return;
        }

        if (action.Action == "Getvar") {
            this.logger.debug('action: "' + action.Action + '" var: "' + (action as IAstActionGetvar).Variable + '" channel: "' + (action as IAstActionGetvar).Channel + '"');
        } else {
            if (action.Action == "Command") {
                this.logger.debug('action: "' + action.Action + '" comm: ' + (action as IAstActionCommand).Command);
            } else {
                this.logger.debug('action: "' + action.Action + '"');
            }
        }
        if (this.logger.isTraceEnabled()) {
            this.logger.trace("sending %s %j", action.Action, action);
            this.logger.trace("\n\n %j \n", action);
        }

        let actionToSend: IAstAction|string = action;
        if (action.serialize) {
            actionToSend = AstUtil.serializeMessage(action);
        }

        (this._ami.send(actionToSend, true) as Promise<IDfiAMIResponse>)
            .then((response: IDfiAMIResponse) => {
                if (response.Response === "Error") {
                    throw response;
                }
                /*       if (response instanceof ManagerError) {
                 if (action.Action != "Getvar" && response.message != "No such channel") {
                 this.logger.error('ManagerCommunicationException %s ,  action: %j response %j', action.Action, action, response.message);
                 AstUtil.maybeCallback(callbackFn, context, response);
                 return;
                 }
                 }*/
                if (action.Action === "Getvar") {
                    this.logger.debug('response for: "' + action.Action + '" var: "' + (response as IDfiAMIResponseGetvar).Variable +
                        '" value: "' + (response as IDfiAMIResponseGetvar).Value + '" channel: "' + (action as IAstActionGetvar).Channel + '"');
                } else if (action.Action === "Command") {
                    this.logger.debug('response for: "' + action.Action + ":" + (action as IAstActionCommand).Command +
                        '" result: "' + response.Response + '" ' + (response as IDfiAMIResponseCommand).Message);
                } else {
                    this.logger.debug('response for: "' + action.Action + '" result: "' + response.Response + '" ' +
                        ((response as IDfiAMIResponseMessage).Message ? (response as IDfiAMIResponseMessage).Message : ""));
                }
                if (this.logger.isTraceEnabled()) {
                    this.logger.trace("%j", response);
                }
                AstUtil.maybeCallbackOnce(callbackFn, context, null, response);
            })
            .catch(error => error)
            .then((response: IDfiAMIResponseMessage|Error) => {
                if (response instanceof Error || response.Response === "Error") {
                    let error = (response as Error);
                    if ((response as IDfiAMIResponse).Response === "Error") {
                        error = new ManagerError((response as IDfiAMIResponseMessage).Message);
                    }
                    AstUtil.maybeCallbackOnce(callbackFn, context, error);
                }
            });
    }

    private _initializeOptions(options: IDfiAstConfigServer) {

        let defaultState = {
            channel: true,
            peer: true,
            device: true,
            bridge: true,
            dahdi: true,
            queue: true,
            agent: true,
            meetMe: true
        };
        let currentState = _.has(options, "managers") ? options.managers : {};

        this._allowedActions.add("Command");
        options["managers"] = Object.assign(defaultState, currentState);

        this.setProp("options", options);
    }

    private _initializeEventConnection() {

        let opts = _.has(this.getProp("options"), "server") ? this.getProp("options").server : null;

        if (_.has(opts, "port") && _.has(opts, "host") && _.has(opts, "username") && _.has(opts, "secret")) {
            //let eventConnection = new DAmi(opts);

            let eventConnection = new AmiClient({
                reconnect: true,
                maxAttemptsCount: 30,
                attemptsDelay: 1000,
                keepAlive: true,
                keepAliveDelay: 1000,
                emitEventsByTypes: true,
                eventTypeToLowerCase: false,
                emitResponsesById: true,
                addTime: true,
                eventFilter: null  // filter disabled
            });

            this.setProp("ami", eventConnection);
            //AsteriskServer.registerResponseClasses(eventConnection);

        } else {
            throw new Error("improper configuration");
            //improper configuration
        }


    }

    _initializeAmiHandlers() {
        let handlers = {};
        for (let eventName in amiHandlers) {
            if (_.has(amiHandlers, eventName)) {
                handlers[eventName] = amiHandlers[eventName].bind(this);
            }
        }
        this.setProp("amiHandlers", handlers);

    }

    _initializeIfNeeded(callbackFn: IDfiCallback, context?) {

        function initialize() {
            let ami = this._ami;

            this.emit(AsteriskServer.events.BEFORE_INIT);

            if (typeof ami === "undefined") {
                let err = new Error("nor event connection object and proper configuration provided");
                onInitializedError.call(this, err);
            }
            if (_.isFunction(callbackFn)) {
                this.once(AsteriskServer.events.INIT, () => {
                    ami.removeListener("amiConnectionTimeout", errorFn);
                    ami.removeListener("amiConnectionError", errorFn);

                    onInitialized.call(this);
                }, this)
            }
            if (this.getProp("initializationStarted")) {
                return;
            }
            this.once(AsteriskServer.events.CONNECTED, onConnected.bind(this));

            ami.once("amiConnectionTimeout", errorFn);
            ami.once("amiConnectionError", errorFn);

            if (!ami._connection) {
                let opts: IDfiAstConfigAstServer = _.has(this.getProp("options"), "server") ? this.getProp("options").server : null;

                this.setProp("initializationStarted", true);
                this._bindAmiEvents();
                ami.connect(opts.username, opts.secret, {host: opts.host, port: opts.port})
                    .catch((onInitializedError.bind(this)));
            }
        }

        function onConnectionError(event) {
            // TODO reconnect
            let err = new ManagerCommunication("Unable to login: " + event.error.message + ", " + event.error);
            onInitializedError.call(this, err);
        }

        function onConnected() {
            let self: AsteriskServer = this;

            async.series([
                self.actions.core.getAvailableActions.bind(self.actions.core),
                self.actions.core.filterRTCP.bind(self.actions.core),
                self.managers.start.bind(self.managers),
                onAll.bind(self),
            ], (err) => {
                if (err) {
                    AstUtil.maybeCallback(callbackFn, context, err);
                }

            });
        }

        /**
         * @this AsteriskServer
         * @param callback
         */
        function onAll(callback) {
            this.logger.debug("on onAll");
            this.logger.info("Initializing done");
            this.setProp("initialized", true);
            this.setProp("initializationStarted", false);

            this.emit(AsteriskServer.events.INIT);
            AstUtil.maybeCallback(callback, context);
        }

        function onInitialized() {
            this.logger.debug("on onInitialized");
            AstUtil.maybeCallback(callbackFn, context);
        }

        function onInitializedError(err) {
            this.logger.debug('on onInitializedError %j', err);
            AstUtil.maybeCallback(callbackFn, context, err);
        }

        let errorFn = onConnectionError.bind(this);


        if (this.initialized) {
            onInitialized.call(this);
        } else {
            initialize.call(this);
        }
    }

    _bindAmiEvents() {
        /**
         * @this AsteriskServer
         */
        function onInitialized() {
            this.logger.info("onINITIALIZED");

            process.nextTick(run.bind(this));
            /**
             * @this AsteriskServer
             */
            function run() {
                let wEvent;
                let pendingEvents = this.getProp("pendingEvents");

                if (pendingEvents.length > 0) {
                    this.logger.info("begin issuing pending events");
                    while (pendingEvents.length > 0) {
                        wEvent = pendingEvents.shift();
                        handlers.event.call(this, wEvent);
                    }
                    this.logger.info("end issuing pending events");
                }
                this._ami.removeListener("event", handlers.waitHandler);  //remove tmp handler
                this._ami.on("event", handlers.event);  //restore original handler
            }
        }

        let handlers = this.getProp("amiHandlers");

        for (let eventName in handlers) {
            if (handlers.hasOwnProperty(eventName)) {
                if (eventName != "event") {
                    if (eventName == "waitHandler") {
                        this._ami.on("event", handlers[eventName]);
                    } else {
                        this._ami.on(eventName, handlers[eventName]);
                    }
                }
            }
        }
        this.once(AsteriskServer.events.INIT, onInitialized.bind(this));
    }

}

const amiHandlers = {
    amiLoginIncorrect () {
        this.logger.debug("on amiLoginIncorrect" + JSON.stringify(arguments));
    },
    connect () {
        this.logger.debug("on amiConnected");
        this.emit(AsteriskServer.events.CONNECTED);
    },

    event (event) {
        this.logger.trace('on amiEvent: %j', event);
        this.dispatcher.dispatch(event);
    },
    response (response) {
        this.logger.trace('on amiResponse: %j', response);

    },
    internalError (had_error) {
        //let e = arguments[0].error;
        this.logger.error("on amiConnectionError" + JSON.stringify(arguments));

        //throw new Error('ManagerCommunicationException("' + e.message + "  -  " + JSON.stringify(e));
        //TODO reconnect
        throw had_error;

    },
    amiConnectionClose () {
        this.logger.warn("on amiConnectionClose" + JSON.stringify(arguments));
        console.log("restart");

        //TODO
        this._reInitialize();
    },
    amiConnectionTimeout () {
        this.logger.warn("on amiConnectionTimeout" + JSON.stringify(arguments));
    },
    amiConnectionEnd () {
        this.logger.warn("on amiConnectionEnd" + JSON.stringify(arguments));
    },
    waitHandler(event) {
        if (event.Event == AST_EVENT.FULLY_BOOTED) {
            amiHandlers.event.call(this, event);
        } else {
            if (!event.ActionID) {
                this.getProp("pendingEvents").push(event);
            }
        }
    }
};
const Events: IDfiAstEventsServer = Object.assign(
    Object.assign({}, DfiEventObject.events),
    {
        CONNECTED: Symbol("astConnected"),
        BEFORE_INIT: Symbol("astBeforeInitialized"),
        INIT: Symbol("astInitialized"),
        REINIT: Symbol("astReInitialized"),
        BEFORE_REINIT: Symbol("astBeforeReInitialized"),
    }
);


export = AsteriskServer;