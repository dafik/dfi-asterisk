var assert = require("assert"),
    mocha = require('mocha'),
    fs = require('fs'),
    _ = require('lodash'),
    should = require("should"),
    log4js = require('log4js'),

    asteriskServer = require('./../lib/asterisk/live/asteriskServer'),
    events = require('./../lib/nami.extended/src/nami').Event,
    actions = require('./../lib/nami.extended/src/nami').Actions,
    Moment = require('moment'),
    Dialer = require('./../lib/dialer'),
    CallRecordProvider = require('./mock/fakeCallRecordProvider'),
    Linphone = require('./mock/linphone'),
    Predictor = require('./../lib/predictor');


log4js.setGlobalLogLevel('OFF');
log4js.restoreConsole();
log4js.configure(__dirname + '/../log4js.config.json');

Moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';

var eventTimeout = 30000;
function getTimeout(name) {
    var err = new Error('Event never fired in time: "' + eventTimeout + 'ms" for timeout: "' + name + '"');
    return setTimeout(function () {
        assert.doesNotThrow(function () {
            throw err;
        });
        done();
    }, eventTimeout);
}

/**
 * @type {{}}
 */
var config = JSON.parse(fs.readFileSync('./config.json'));
var asterisk = asteriskServer.getInstance(config.asterisk);
var endpointManger = require('./mock/endpointManager').getInstance(asterisk);
var provider = new CallRecordProvider(config.db);

config.callRecordProvider = provider;
config.server = asterisk;

var dialer = new Dialer(config);

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

describe('dialer', function () {
    before(function (done) {
        this.timeout(0);
        var endpointsSetTimeout;

        function init() {
            asterisk.initialize(function (err) {
                if (err) {
                    done();
                    throw  err
                }
                endpointManger.on(endpointManger.events.error, function (err) {
                    done();
                    throw err;
                });
                endpointManger.on(endpointManger.events.endpointsSet, cleanQueues);
                endpointsSetTimeout = getTimeout('endpointsSet');
                endpointManger.setupEndpoints(2, 'udp', 'pjsip');
            })
        }

        function cleanQueues() {
            clearTimeout(endpointsSetTimeout);
            endpointManger.removeListener(endpointManger.events.endpointsSet, cleanQueues);
            asterisk.queueManager.getQueues().forEach(onEachQueue);
            if (wait == 0) {
                wait++;
                finish();
            }
            /**
             * @param {AsteriskQueue} queue
             */
            function onEachQueue(queue) {
                queue.members.forEach(logoutMember);
                function logoutMember(member) {
                    wait++;
                    var wsEvent = {
                        queueName: queue.name,
                        interfaceName: member.interface
                    };
                    dialer.api.queueLogout(wsEvent, finish);
                }
            }

            function finish() {
                wait--;
                if (wait == 0) {
                    done();
                }
            }
        }

        var wait = 0;
        assert.doesNotThrow(init, 'asterisk init failed');
    });
    it('no one in queue', function (done) {
        this.timeout(0);
        var endpoint1,
            endpoint2;
        /**
         * @type {Collection}
         */
        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();
        endpoint1 = linPhones.get(keys[0]);
        endpoint2 = linPhones.get(keys[1]);
        dialer.callRecordProvider = provider;
        function run() {
            endpoint2.on(Linphone.Events.INCOMING, function () {
                throw new Error('incoming on endpoint 2');
            });
            endpoint1.on(Linphone.Events.INCOMING, function () {
                throw new Error('incoming on endpoint 1');
            });
            dialer.on(Dialer.Events.started, startListener);
            dialer.run();
        }

        function onDialerStarted() {
            clearTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, startListener);
            done();
        }

        var dialerStartTimeout = getTimeout('dialerStartTimeout');
        var startListener = onDialerStarted.bind(this);

        assert.doesNotThrow(run, 'dialer run failed');
    });

    it('one in queue', function (done) {
        done();
        return;

        this.timeout(0);
        var waitEndCall = 0;
        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();
        /**
         * @type {Linphone}
         */
        var endpoint1 = linPhones.get(keys[0]);
        /**
         * @type {Linphone}
         */
        var endpoint2 = linPhones.get(keys[1]);

        endpoint1.clearBindings();
        endpoint2.clearBindings();
        var predictor;


        var dialerStartTimeout;

        var endpoint1IncomingTimeout;
        var endpoint1AnswerTimeout;
        var endpoint1EndCallTimeout;

        var endpoint2IncomingTimeout;
        var endpoint2AnswerTimeout;
        var endpoint2EndCallTimeout;

        function run() {
            dialer.on(Dialer.Events.started, onDialerStarted.bind(this));
            dialer.run();
        }

        function onDialerStarted() {
            clearTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, onDialerStarted.bind(this));
            predictor = dialer.predictorStore.get(dialer.predictorStore.keys()[0]);
            assert.equal(predictor._availableAgents, 0, 'initial agents count failed');

            endpoint1.on(Linphone.Events.INCOMING, function () {
                clearTimeout(endpoint1IncomingTimeout);
                endpoint1AnswerTimeout = getTimeout('endpoint1Answer');
                endpoint1.answer();
            });
            endpoint1.on(Linphone.Events.ANSWERED, function () {
                clearTimeout(endpoint1AnswerTimeout);
                waitEndCall++;
                setTimeout(function () {
                    endpoint1EndCallTimeout = getTimeout('endpoint1EndCall');
                    endpoint1.endCall();
                    endpoint2.endCall();
                }, 1000);
            });
            endpoint1.on(Linphone.Events.END_CALL, function () {
                clearTimeout(endpoint1EndCallTimeout);
                checkEnd();
            });

            endpoint2.on(Linphone.Events.INCOMING, function () {
                clearTimeout(endpoint2IncomingTimeout);
                endpoint1IncomingTimeout = getTimeout('endpoint1Incoming');
                endpoint2AnswerTimeout = getTimeout('endpoint2Answer');
                endpoint2.answer();
            });
            endpoint2.on(Linphone.Events.ANSWERED, function () {
                clearTimeout(endpoint2AnswerTimeout);
                waitEndCall++;
            });
            endpoint2.on(Linphone.Events.END_CALL, function () {
                clearTimeout(endpoint2EndCallTimeout);
                checkEnd();
            });

            provider.setCallRecordNumber(endpoint2.configuration.sip);
            predictor.on(Predictor.Events.onMemberAdded, onMemberAdded);
            endpoint2IncomingTimeout = getTimeout('endpoint2Incoming');
            var loginTimeout = getTimeout('queueLogin');

            function onMemberAdded() {
                predictor.removeListener(Predictor.Events.onMemberAdded, onMemberAdded);
                clearTimeout(loginTimeout);
                assert.equal(predictor._availableAgents, 1, 'agents count failed');
            }

            dialer.api.queueLogin({queueName: predictor.queueName, interfaceName: endpoint1.getInterface()}, onQueueLogin);
        }

        function onQueueLogin(err, response) {
            if (err) {
                throw new Error('queue login failed' + response);
            }
        }

        function checkEnd() {
            waitEndCall--;
            if (waitEndCall == 0) {
                done()
            }
        }

        dialerStartTimeout = getTimeout('dialerStart');
        assert.doesNotThrow(run, 'dialer run failed');
    });
    after(function (done) {
        this.timeout(1000000);
        endpointManger.clear(function () {
            done()
        });
    })
});