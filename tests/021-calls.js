"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const asterisk = require("./mock/asterisk-real");
const Linphone = require("local-dfi-linphone/src/linphone");
const EndpointManger = require("local-dfi-linphone-endpoint-manager/src/endpointManager");
const manager = require("local-dfi-linphone-endpoint-manager");
const DebugLogger = require("local-dfi-debug-logger/debugLogger");
const AST_ACTION = require("../src/internal/asterisk/actionNames");
const endpointManger = manager.getInstance(asterisk);
let answerTimeout = 0;
let endCallTimeout = 0;
const eventTimeout = 30000;
const logger = new DebugLogger("test:calls");
function getTimeout(name, done) {
    return setTimeout(() => {
        assert(false, 'Event never fired in time: "' + eventTimeout + 'ms" for timeout: "' + name + '"');
        done();
    }, eventTimeout);
}
describe("calls", () => {
    function onAfter(done) {
        this.timeout(1000000);
        endpointManger.clear(() => {
            done();
        });
    }
    function onBefore(done) {
        function init(callback, context) {
            function finishInit(err) {
                if (err) {
                    if (!callback.fired) {
                        callback.fired = true;
                        callback.call(context, err);
                        return;
                    }
                }
                if (!callback.fired) {
                    callback.fired = true;
                    callback.call(context, null);
                }
            }
            try {
                let dial1 = false;
                let dial2 = false;
                asterisk.start()
                    .then(() => {
                    endpointManger.on(EndpointManger.events.ERROR, error);
                    endpointManger.on(EndpointManger.events.ENDPOINTS_SET, finishEndpoints);
                    endpointManger.setupEndpoints(2, "udp", "sip", "wszystkie-test");
                    function error(err) {
                        endpointManger.removeListener(EndpointManger.events.ERROR, error);
                        endpointManger.removeListener(EndpointManger.events.ENDPOINTS_SET, finishEndpoints);
                        finishInit(err);
                    }
                    function createDialplan(technology) {
                        const ctx1 = "testSource";
                        const ctx2 = "testDestination";
                        const add = AST_ACTION.DIALPLAN_EXTENSION_ADD;
                        const del = AST_ACTION.DIALPLAN_EXTENSION_REMOVE;
                        asterisk.actions.dialplan.getDialplan(ctx1, (err, dialplan) => {
                            if (err && !err.message.match(/Did not find context/)) {
                                finishInit(err);
                                return;
                            }
                            let priorities;
                            const toDelete = [];
                            if (dialplan) {
                                dialplan.extensions.forEach((extension) => {
                                    priorities = extension.priorities;
                                    [...priorities.keys()].sort().reverse().forEach((key) => {
                                        toDelete.push({ Action: del, Context: dialplan.id, Extension: extension.id, Priority: key });
                                    });
                                });
                            }
                            asterisk.sendActions(toDelete, (err1) => {
                                if (err1) {
                                    finishInit(err1);
                                    return;
                                }
                                const toAdd = [
                                    { Action: add, Application: "Hangup", ApplicationData: "16", Context: ctx1, Extension: "h", Priority: "1", Replace: "1" },
                                    { Action: add, Application: "Noop", ApplicationData: "1,calling testsource ${EXTEN}", Context: ctx1, Extension: "_X.", Priority: "1", Replace: "1" },
                                    { Action: add, Application: "Dial", ApplicationData: technology + "/${EXTEN},30,F", Context: ctx1, Extension: "_X.", Priority: "2", Replace: "1" }
                                ];
                                asterisk.sendActions(toAdd, (err2) => {
                                    if (!err2) {
                                        dial1 = true;
                                        if (dial2) {
                                            finishInit();
                                        }
                                    }
                                });
                            });
                        });
                        asterisk.actions.dialplan.getDialplan(ctx2, (err, dialplan) => {
                            if (err && !err.message.match(/Did not find context/)) {
                                finishInit(err);
                                return;
                            }
                            let priorities;
                            const toDelete = [];
                            if (dialplan) {
                                dialplan.extensions.forEach((extension) => {
                                    priorities = extension.priorities;
                                    [...priorities.keys()].sort().reverse().forEach((key) => {
                                        toDelete.push({ Action: del, Context: dialplan.id, Extension: extension.id, Priority: key });
                                    });
                                });
                            }
                            asterisk.sendActions(toDelete, (err1) => {
                                if (err1) {
                                    finishInit(err1);
                                    return;
                                }
                                const toAdd = [
                                    { Action: add, Application: "Hangup", ApplicationData: "16", Context: ctx2, Extension: "h", Priority: "1", Replace: "1" },
                                    { Action: add, Application: "Noop", ApplicationData: "1,calling testdestination ${EXTEN}", Context: ctx2, Extension: "_X.", Priority: "1", Replace: "1" },
                                    { Action: add, Application: "Dial", ApplicationData: technology + "/${EXTEN},30,F", Context: ctx2, Extension: "_X.", Priority: "2", Replace: "1" }
                                ];
                                asterisk.sendActions(toAdd, (err2) => {
                                    if (!err2) {
                                        dial2 = true;
                                        if (dial1) {
                                            finishInit();
                                        }
                                    }
                                });
                            });
                        });
                    }
                    function finishEndpoints(technology) {
                        endpointManger.removeListener(EndpointManger.events.ERROR, error);
                        endpointManger.removeListener(EndpointManger.events.ENDPOINTS_SET, finishEndpoints);
                        createDialplan(technology);
                    }
                })
                    .catch((err) => {
                    if (err) {
                        finishInit(err);
                    }
                });
            }
            catch (e) {
                finishInit(e);
            }
        }
        if ((process.argv.length === 3 && process.argv[2] === "/srv/dev/projects/node/dialer2/tests")
            || process.argv.length === 7 && process.argv[6] === "/srv/dev/projects/node/dialer2/tests") {
            answerTimeout = 200;
            endCallTimeout = 500;
        }
        this.timeout(0);
        init((err) => {
            done(err);
        }, this);
    }
    function onSimpleCall(done) {
        // done();
        let waitEndCall = 0;
        const linPhones = endpointManger.endpoints;
        const keys = [...linPhones.keys()];
        const endpoint1 = linPhones.get(keys.shift());
        const endpoint2 = linPhones.get(keys.shift());
        endpoint1.on(Linphone.events.ANSWERED, () => {
            waitEndCall = waitEndCall + 2;
            setTimeout(() => {
                endCall(endpoint1);
                endCall(endpoint2);
            }, 200);
        });
        endpoint2.on(Linphone.events.INCOMING, (line, id) => {
            endpoint2.answer(id);
        });
        makeCall(endpoint1, endpoint2);
        function makeCall(linphone, target) {
            linphone.makeCall(target.configuration.sip);
        }
        function endCall(linphone) {
            linphone.endCall();
            linphone.on(Linphone.events.END_CALL, checkEnd);
        }
        function checkEnd() {
            waitEndCall--;
            this.clearBindings();
            if (waitEndCall === 0) {
                done();
            }
        }
    }
    function onOriginateCall(done) {
        this.timeout(0);
        let waitEndCall = 0;
        function run() {
            let endpoint1IncomingTimeout;
            let endpoint2IncomingTimeout;
            let endpoint1AnswerTimeout;
            let endpoint2AnswerTimeout;
            let endpoint1EndCallTimeout;
            let endpoint2EndCallTimeout;
            const linPhones = endpointManger.endpoints;
            const keys = [...linPhones.keys()];
            const endpoint1 = linPhones.get(keys.shift());
            const endpoint2 = linPhones.get(keys.shift());
            endpoint1.on(Linphone.events.INCOMING, (line, id) => {
                clearTimeout(endpoint1IncomingTimeout);
                setTimeout(() => {
                    endpoint1AnswerTimeout = getTimeout("endpoint1Answer", done);
                    endpoint1.answer(id);
                }, answerTimeout);
            });
            endpoint1.on(Linphone.events.ANSWERED, () => {
                clearTimeout(endpoint1AnswerTimeout);
                waitEndCall++;
            });
            endpoint1.on(Linphone.events.END_CALL, () => {
                clearTimeout(endpoint1EndCallTimeout);
                checkEnd();
            });
            endpoint2.on(Linphone.events.INCOMING, (line, id) => {
                clearTimeout(endpoint2IncomingTimeout);
                setTimeout(() => {
                    endpoint2AnswerTimeout = getTimeout("endpoint2Answer", done);
                    endpoint2.answer(id);
                }, answerTimeout);
            });
            endpoint2.on(Linphone.events.ANSWERED, (line, id) => {
                clearTimeout(endpoint2AnswerTimeout);
                waitEndCall++;
                setTimeout(() => {
                    endpoint1EndCallTimeout = getTimeout("endpoint1EndCall", done);
                    endpoint2EndCallTimeout = getTimeout("endpoint2EndCall", done);
                    endpoint2.endCall(id);
                }, endCallTimeout);
            });
            endpoint2.on(Linphone.events.END_CALL, () => {
                clearTimeout(endpoint2EndCallTimeout);
                checkEnd();
            });
            endpoint1IncomingTimeout = getTimeout("endpoint1Incoming", done);
            endpoint2IncomingTimeout = getTimeout("endpoint2Incoming", done);
            makeCall(endpoint2.getSipNumber(), endpoint1.getSipNumber());
        }
        run();
        function makeCall(sSip, tSip) {
            const action = {
                Action: AST_ACTION.ORIGINATE,
                Async: true.toString(),
                Channel: "Local/" + sSip + "@testSource/n",
                Context: "testDestination",
                Exten: tSip.toString(10),
                Priority: "1"
            };
            const ocb = {
                onBusy: () => {
                    logger.info("onBusy");
                },
                onDialing: () => {
                    logger.info("onDialing");
                },
                onFailure: (err) => {
                    logger.info("onFailure");
                    done(err);
                },
                onNoAnswer: () => {
                    logger.info("onNoAnswer");
                },
                onSuccess: () => {
                    logger.info("onSuccess");
                }
            };
            asterisk.actions.originate.async(action, ocb, onOriginateChannel);
        }
        function onOriginateChannel(err) {
            if (err) {
                throw err;
            }
        }
        function checkEnd() {
            waitEndCall--;
            if (waitEndCall === 0) {
                done();
            }
        }
    }
    before(onBefore);
    it("simple call between to endpoints", onSimpleCall);
    it("call using originate between to endpoints", onOriginateCall);
    after(onAfter);
});
//# sourceMappingURL=021-calls.js.map