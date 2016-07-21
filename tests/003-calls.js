const assert = require("assert"),
    fs = require('fs'),
    mocha = require('mocha'),
    should = require("should"),
    log4js = require('log4js');

const actions = require('local-dfi-asterisk-ami').Actions,
    OriginateCallback = require('../src/objects/originateCallback'),
    Linphone = require('../tmp/dfi-linphone/src/linphone');

/**
 * @type {AsteriskServer}
 */
var asterisk = require('./mock/asterisk-real');
var endpointManger = require('../tmp/dfi-linphone-endpoint-manager/endpointManager').getInstance(asterisk);


var answerTimeout = 2000;
var endCallTimeout = 5000;
var eventTimeout = 30000;

function getTimeout(name) {
    return setTimeout(function () {
        assert(false, 'Event never fired in time: "' + eventTimeout + 'ms" for timeout: "' + name + '"');
        done();
    }, eventTimeout);
}

/**
 * @type {function}
 */
describe;
/**
 * @type {function}
 */
before;
/**
 * @type {function}
 */
it;
/**
 * @type {function}
 */
after;

describe('calls', function () {
    before(function (done) {
        if ((process.argv.length == 3 && process.argv[2] == '/srv/dev/projects/node/dialer2/tests')
            || process.argv.length == 7 && process.argv[6] == '/srv/dev/projects/node/dialer2/tests'
        ) {
            answerTimeout = 200;
            endCallTimeout = 500;
        }

        this.timeout(0);
        //log4js.setGlobalLogLevel('DEBUG');
        //log4js.restoreConsole();
        //noinspection JSCheckFunctionSignatures
        assert.doesNotThrow(init, 'asterisk init failed');

        function init() {
            asterisk.start(function (err) {
                if (err) {
                    done();
                    throw  err
                }
                endpointManger.on(endpointManger.events.error, error);
                endpointManger.on(endpointManger.events.endpointsSet, finish);

                endpointManger.setupEndpoints(2, 'udp', 'pjsip', 'wszystkie-test');

                function error(err) {
                    endpointManger.removeListener(endpointManger.events.endpointsSet, error);
                    endpointManger.removeListener(endpointManger.events.endpointsSet, finish);
                    done();
                    throw err;
                }

                function createDialplan(technology) {

                    let action = new actions.ShowDialPlan();
                    action.set('Context', 'testSource');
                    asterisk.sendAction(action, function (err, resp) {
                        if (err) {
                            throw err;
                        }
                    });


                    var commands = [
                        new actions.DialplanExtensionAdd('testSource', 'h', 1, 'Hangup', 16, 1),
                        new actions.DialplanExtensionAdd('testSource', '_X.', 1, 'Noop', '1,calling testsource ${EXTEN}', 1),
                        new actions.DialplanExtensionAdd('testSource', '_X.', 2, 'Dial', technology + '/${EXTEN},30,F', 1),
                        new actions.DialplanExtensionAdd('testDestination', 'h', 1, 'Hangup', 16, 1),
                        new actions.DialplanExtensionAdd('testDestination', '_X.', 1, 'Noop', '1,calling testdestination ${EXTEN}', 1),
                        new actions.DialplanExtensionAdd('testDestination', '_X.', 2, 'Dial', technology + '/${EXTEN},30,F', 1),
                    ];
                    let idx = 0;

                    function send(action) {
                        asterisk.sendAction(action, function (err, resp) {
                            if (err) {
                                throw err;
                            }
                            idx++;
                            if (idx < commands.length) {
                                send(commands[idx]);
                            } else {
                                done();
                            }
                        })
                    }

                    send(commands[idx]);


                }

                function finish(technology) {
                    endpointManger.removeListener(endpointManger.events.endpointsSet, error);
                    endpointManger.removeListener(endpointManger.events.endpointsSet, finish);
                    createDialplan(technology);
                }
            })
        }

    });
    it('simple call between to endpoints', function (done) {
        //done();
        var waitEndCall = 0;
        var linPhones = endpointManger.getEndpoints();
        var keys = Object.keys(linPhones);

        var endpoint1 = linPhones[keys[0]];
        var endpoint2 = linPhones[keys[1]];

        endpoint1.on(Linphone.Events.ANSWERED, function () {
            waitEndCall = waitEndCall + 2;
            setTimeout(function () {
                endCall(endpoint1);
                endCall(endpoint2);
            }, 200);
        });

        endpoint2.on(Linphone.Events.INCOMING, function () {
            endpoint2.answer();
        });

        makeCall(endpoint1, endpoint2);

        function makeCall(linphone, target) {
            linphone.makeCall(target.configuration.sip)
        }

        function endCall(linphone) {
            linphone.endCall();
            linphone.on(Linphone.Events.END_CALL, checkEnd)
        }

        function checkEnd() {
            waitEndCall--;
            this.clearBindings();
            if (waitEndCall == 0) {
                done()
            }
        }
    });
    it('call using originate between to endpoints', function (done) {
        this.timeout(0);
        var waitEndCall = 0;


        function run() {
            var endpoint1IncomingTimeout,
                endpoint2IncomingTimeout,
                endpoint1AnswerTimeout,
                endpoint2AnswerTimeout,
                endpoint1EndCallTimeout,
                endpoint2EndCallTimeout;

            var linPhones = endpointManger.getEndpoints();
            var keys = Object.keys(linPhones);

            var endpoint1 = linPhones[keys[0]];
            var endpoint2 = linPhones[keys[1]];

            endpoint1.on(Linphone.Events.INCOMING, function () {
                clearTimeout(endpoint1IncomingTimeout);
                setTimeout(function () {
                    endpoint1AnswerTimeout = getTimeout('endpoint1Answer');
                    endpoint1.answer();
                }, answerTimeout)
            });
            endpoint1.on(Linphone.Events.ANSWERED, function () {
                clearTimeout(endpoint1AnswerTimeout);
                waitEndCall++;
            });
            endpoint1.on(Linphone.Events.END_CALL, function () {
                clearTimeout(endpoint1EndCallTimeout);
                checkEnd();
            });


            endpoint2.on(Linphone.Events.INCOMING, function () {
                clearTimeout(endpoint2IncomingTimeout);
                setTimeout(function () {
                    endpoint2AnswerTimeout = getTimeout('endpoint2Answer');
                    endpoint2.answer();
                }, answerTimeout)

            });
            endpoint2.on(Linphone.Events.ANSWERED, function () {
                clearTimeout(endpoint2AnswerTimeout);
                waitEndCall++;
                setTimeout(function () {
                    endpoint1EndCallTimeout = getTimeout('endpoint1EndCall');
                    endpoint2EndCallTimeout = getTimeout('endpoint2EndCall');
                    endpoint2.endCall();
                }, endCallTimeout);
            });
            endpoint2.on(Linphone.Events.END_CALL, function () {
                clearTimeout(endpoint2EndCallTimeout);
                checkEnd();
            });


            endpoint1IncomingTimeout = getTimeout('endpoint1Incoming');
            endpoint2IncomingTimeout = getTimeout('endpoint2Incoming');

            makeCall(endpoint2, endpoint1);
        };


        run();

        /**
         *
         * @param {Linphone} target
         * @param {Linphone} source
         */
        function makeCall(target, source) {

            var sSip = source.getSipNumber();
            var tSip = target.getSipNumber();
            /**
             * @type {Originate}
             */
            var action = new actions.Originate();
            action.set('Channel', "Local/" + sSip + "@testSource/n");
            action.set('Exten', tSip);
            action.set('Context', "testDestination");
            action.set('Priority', '1');
            //action.setVariables(vars);
            action.set('Async', true.toString());

            var ocb = new OriginateCallback();

            asterisk.actions.originate.async(action, ocb, onOriginateChannel);
        }

        function onOriginateChannel(err) {
            if (err) {
                throw err;
            }
        }

        function checkEnd() {
            waitEndCall--;
            if (waitEndCall == 0) {
                done();
            }
        }
    });
    after(function (done) {
        this.timeout(1000000);
        endpointManger.clear(function () {
            done()
        });
    })
});
