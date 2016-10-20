import {IDfiAstConfigAstServer, IDfiAstConfigServer} from "./definitions/configs";
import {IDfiAstEventsServer} from "./definitions/events";
import {
    IDfiAMIMultiCallback,
    IDfiAMIResponse,
    IDfiAMIResponseCommand,
    IDfiAMIResponseGetvar,
    IDfiAMIResponseMessage,
    IDfiAMIResponseMessageMulti,
    IDfiAstResponseMessageMulti,
    IDfiCallback, IDfiActionCallback
} from "./definitions/interfaces";
import {AST_ACTION} from "./internal/asterisk/actionNames";
import {IAstAction, IAstActionCommand, IAstActionGetvar} from "./internal/asterisk/actions";
import {AST_EVENT} from "./internal/asterisk/eventNames";
import {IAstEvent} from "./internal/asterisk/events";
import * as _ from "lodash";
import async = require("async");
import AmiClient = require("asterisk-ami-client");

import DfiEventObject = require("local-dfi-base/src/dfiEventObject");
import EventDispatcher = require("./internal/server/EventDispatcher");
import ServerActions = require("./internal/server/Actions");
import ServerManagers = require("./internal/server/Managers");

import AstUtil = require("./internal/astUtil");
import ManagerCommunication = require("./errors/ManagerCommunication");
import AsteriskVersion = require("./internal/server/Version");
import ManagerError = require("./errors/ManagerError");

const PROP_AMI = "ami";
const PROP_AMI_HANDLERS = "amiHandlers";
const PROP_INITIALIZED = "initialized";
const PROP_INITIALIZATION_STARTED = "initializationStarted";
const PROP_PENDING_EVENTS = "pendingEvents";
const PROP_MULTIPART_RESPONSES = "multipartResponses";
const PROP_MULTIPART_RESPONSE_HANDLER = "multipartResponseHandler";
const PROP_ALLOWED_ACTIONS = "allowedActions";
const PROP_DISPATCHER = "dispatcher";
const PROP_ACTIONS = "actions";
const PROP_MANAGERS = "managers";
const PROP_VERSION = "version";
const PROP_OPTIONS = "options";

class AsteriskServer extends DfiEventObject {

    static get events(): IDfiAstEventsServer {
        return EVENTS;
    }

    constructor(options: IDfiAstConfigServer) {

        super({loggerName: "dfi:as:"});

        this.setProp(PROP_INITIALIZED, false);
        this.setProp(PROP_INITIALIZATION_STARTED, false);
        this.setProp(PROP_PENDING_EVENTS, []);
        this.setProp(PROP_MULTIPART_RESPONSES, new Map());
        this.setProp(PROP_ALLOWED_ACTIONS, new Set());

        this._initializeOptions(options);
        this._initializeEventConnection();
        this._initializeAmiHandlers();

        this.setProp(PROP_DISPATCHER, new EventDispatcher(this));
        this.setProp(PROP_ACTIONS, new ServerActions(this));
        this.setProp(PROP_MANAGERS, new ServerManagers(this));

        this.setProp(PROP_MULTIPART_RESPONSE_HANDLER, this._onMultipartResponse.bind(this));
    }

    get managers(): ServerManagers {
        return this.getProp(PROP_MANAGERS);
    }

    get actions(): ServerActions {
        return this.getProp(PROP_ACTIONS);
    }

    get dispatcher() {
        return this.getProp(PROP_DISPATCHER);
    }

    get initialized() {
        return this.getProp(PROP_INITIALIZED);
    }

    get version(): AsteriskVersion {
        return this.getProp(PROP_VERSION);
    }

    set version(version: AsteriskVersion) {
        this.setProp(PROP_VERSION, version);
    }

    public get allowedActions(): Set<string> {
        return this.getProp(PROP_ALLOWED_ACTIONS);
    }

    private get _ami(): AmiClient {
        return this.getProp(PROP_AMI);
    };

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

    public get isConnected(): boolean {
        return this._ami && this._ami.isConnected;
    }

    public sendAction(action: IAstAction | IAstActionGetvar | IAstActionCommand, callbackFn?: IDfiActionCallback, context?: any) {
        if (!this.allowedActions.has(action.Action)) {
            AstUtil.maybeCallbackOnce(callbackFn, context, "Not Allowed Action: " + action.Action);
            return;
        }

        if (action.Action === AST_ACTION.GET_VAR) {
            this.logger.debug('action: "' + action.Action + '" var: "' + (action as IAstActionGetvar).Variable + '" channel: "' + (action as IAstActionGetvar).Channel + '"');
        } else {
            if (action.Action === AST_ACTION.COMMAND) {
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

    public  sendEventGeneratingAction<E extends IAstEvent>(action: IAstAction | IAstActionCommand, callbackFn: IDfiAMIMultiCallback<E>, context?) {
        if (!this.allowedActions.has(action.Action)) {
            AstUtil.maybeCallback(callbackFn, context, "Not Allowed Action: " + action.Action);
            return;
        }
        if (!Object.hasOwnProperty.call(action, "ActionID")) {
            action.ActionID = "AN_" + AstUtil.uniqueActionID();
        }

        this.logger.debug('action eg: "%s" id: %s', action.Action, action.ActionID);
        this.logger.trace("sending %s %j", action.Action, action);
        this.logger.trace("\n\n %j \n", action);

        let responses = this._getResponses<E>();

        let responseMulti: IDfiAstResponseMessageMulti<E> = {
            ctx: context,
            events: [],
            fn: callbackFn
        };

        responses.set(action.ActionID, responseMulti);
        if (responses.size === 1) {
            this._ami.on("event", this.getProp(PROP_MULTIPART_RESPONSE_HANDLER));
        }
        let actionToSend: IAstAction|string = action;
        if (action.serialize) {
            actionToSend = AstUtil.serializeMessage(action);
        }

        (this._ami.send(actionToSend, true) as Promise<IDfiAMIResponse>)
            .then((response: IDfiAMIResponse) => {
                if (response.Response && response.Response === "Error") {
                    this.logger.error("ManagerCommunicationException %s ,  action: %j response %j", action.Action, action, response);

                    responses.delete(response.ActionID);
                    if (responses.size === 0) {
                        this._ami.removeListener("event", this.getProp(PROP_MULTIPART_RESPONSE_HANDLER));
                    }
                    AstUtil.maybeCallback(callbackFn, context, response);
                    return;
                }
                if (action.Action === "Command") {
                    this.logger.debug("response for ev: %s command: %s response: %s", action.Action, (action as IAstActionCommand).Command, response.Response);
                } else {
                    this.logger.debug("response for ev: %s response: %s ", action.Action, response.Response);
                }
                if (this.logger.isTraceEnabled()) {
                    this.logger.trace("sendEventGeneratingResponse - %j", response);
                }
                this.getProp(PROP_MULTIPART_RESPONSE_HANDLER)(response);
            })
            .catch(error => error)
            .then(error => {
                if (error instanceof Error) {
                    AstUtil.maybeCallback(callbackFn, context, error);
                }
            });
    }

    private _getResponses<E extends IAstEvent>(): Map<string, IDfiAstResponseMessageMulti<E>> {
        return this.getProp(PROP_MULTIPART_RESPONSES);
    }

    private _finishMultipartResponse<E extends IAstEvent>(response, resp: IDfiAMIResponseMessageMulti<E>) {
        let responses = this._getResponses();
        responses.delete(response.ActionID);
        if (responses.size === 0) {
            this._ami.removeListener("event", this.getProp(PROP_MULTIPART_RESPONSE_HANDLER));
        }

        let fn = resp.fn;
        let ctx = resp.ctx;
        delete resp.fn;
        delete resp.ctx;

        AstUtil.maybeCallback(fn, ctx, null, resp);
    }

    private _onMultipartResponse(response) {
        if (response.ActionID) {
            let resp = this._getResponses().get(response.ActionID);
            if (resp) {
                if (response.EventList) {
                    if (response.EventList === "start") {
                        Object.assign(resp, response);
                    } else if (response.EventList === "Complete") {
                        this._finishMultipartResponse.call(this, response, resp);
                    }
                } else if (response.Response === "Follows") {
                    Object.assign(resp, response);
                    this._finishMultipartResponse.call(this, response, resp);
                } else {
                    resp.events.push(response);
                }
            }

        }
    }

    private _initializeOptions(options: IDfiAstConfigServer) {

        let defaultState = {
            agent: true,
            bridge: true,
            channel: true,
            dahdi: true,
            device: true,
            meetMe: true,
            peer: true,
            queue: true
        };

        this.allowedActions.add("Command");
        options.managers = Object.assign(defaultState, options.managers);

        this.setProp(PROP_OPTIONS, options);
    }

    private _initializeEventConnection() {
        let eventConnection = new AmiClient({
            addTime: true,
            attemptsDelay: 1000,
            emitEventsByTypes: false,
            emitResponsesById: true,
            eventFilter: null,  // filter disabled
            eventTypeToLowerCase: false,
            keepAlive: false,
            keepAliveDelay: 1000,
            maxAttemptsCount: 30,
            reconnect: true
        });

        this.setProp(PROP_AMI, eventConnection);
        // AsteriskServer.registerResponseClasses(eventConnection);
    }

    private _initializeAmiHandlers() {
        let handlers = {};
        for (let eventName in amiHandlers) {
            if (_.has(amiHandlers, eventName)) {
                handlers[eventName] = amiHandlers[eventName].bind(this);
            }
        }
        this.setProp(PROP_AMI_HANDLERS, handlers);

    }

    private _initializeIfNeeded(callbackFn: IDfiCallback, context?) {

        let initialize = () => {
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
                }, this);
            }
            if (this.getProp("initializationStarted")) {
                return;
            }
            this.once(AsteriskServer.events.CONNECTED, onConnected.bind(this));

            ami.once("amiConnectionTimeout", errorFn);
            ami.once("amiConnectionError", errorFn);

            if (!ami.isConnected) {
                let opts: IDfiAstConfigAstServer = _.has(this.getProp("options"), "server") ? this.getProp("options").server : null;

                this.setProp(PROP_INITIALIZATION_STARTED, true);
                this._bindAmiEvents();
                ami.connect(opts.username, opts.secret, {host: opts.host, port: parseInt(opts.port, 10)})
                    .catch((onInitializedError.bind(this)));
            }
        };

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
                onAll.bind(self)
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
            this.setProp(PROP_INITIALIZED, true);
            this.setProp(PROP_INITIALIZATION_STARTED, false);

            this.emit(AsteriskServer.events.INIT);
            AstUtil.maybeCallback(callback, context);
        }

        function onInitialized() {
            this.logger.debug("on onInitialized");
            AstUtil.maybeCallback(callbackFn, context);
        }

        function onInitializedError(err) {
            this.logger.debug("on onInitializedError %j", err);
            AstUtil.maybeCallback(callbackFn, context, err);
        }

        let errorFn = onConnectionError.bind(this);

        if (this.initialized) {
            onInitialized.call(this);
        } else {
            initialize.call(this);
        }
    }

    private _bindAmiEvents() {
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
                let pendingEvents = this.getProp(PROP_PENDING_EVENTS);

                if (pendingEvents.length > 0) {
                    this.logger.info("begin issuing pending events");
                    while (pendingEvents.length > 0) {
                        wEvent = pendingEvents.shift();
                        handlers.event.call(this, wEvent);
                    }
                    this.logger.info("end issuing pending events");
                }
                this._ami.removeListener("event", handlers.waitHandler);  // remove tmp handler
                this._ami.on("event", handlers.event);  // restore original handler
            }
        }

        let handlers = this.getProp(PROP_AMI_HANDLERS);

        for (let eventName in handlers) {
            if (handlers.hasOwnProperty(eventName)) {
                if (eventName !== "event") {
                    if (eventName === "waitHandler") {
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
        this.logger.trace("on amiEvent: %j", event);
        this.dispatcher.dispatch(event);
    },
    response (response) {
        this.logger.trace("on amiResponse: %j", response);

    },
    internalError (hadError) {
        // let e = arguments[0].error;
        this.logger.error("on amiConnectionError" + JSON.stringify(arguments));

        // throw new Error('ManagerCommunicationException("' + e.message + "  -  " + JSON.stringify(e));
        // TODO reconnect
        throw hadError;

    },
    amiConnectionClose () {
        this.logger.warn("on amiConnectionClose" + JSON.stringify(arguments));
        this.logger.fatal("restart");

        // TODO
        this._reInitialize();
    },
    amiConnectionTimeout () {
        this.logger.warn("on amiConnectionTimeout" + JSON.stringify(arguments));
    },
    amiConnectionEnd () {
        this.logger.warn("on amiConnectionEnd" + JSON.stringify(arguments));
    },
    waitHandler(event) {
        if (event.Event === AST_EVENT.FULLY_BOOTED) {
            amiHandlers.event.call(this, event);
        } else {
            if (!event.ActionID) {
                this.getProp("pendingEvents").push(event);
            }
        }
    }
};

const EVENTS: IDfiAstEventsServer = Object.assign(
    Object.assign({}, DfiEventObject.events),
    {
        BEFORE_INIT: Symbol("astBeforeInitialized"),
        BEFORE_REINIT: Symbol("astBeforeReInitialized"),
        CONNECTED: Symbol("astConnected"),
        INIT: Symbol("astInitialized"),
        REINIT: Symbol("astReInitialized")
    }
);

export = AsteriskServer;
