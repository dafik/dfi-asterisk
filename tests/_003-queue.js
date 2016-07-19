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
//log4js.configure(__dirname + '/../log4js.config.json');

Moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';
var config = JSON.parse(fs.readFileSync('./config.json'));
var asterisk = asteriskServer.getInstance(config.asterisk);
var endpointManger = require('./mock/endpointManager').getInstance(asterisk);
var provider = new CallRecordProvider(config.db, false);

config.callRecordProvider = provider;
config.server = asterisk;

var dialer = new Dialer(config);

var eventTimeout = 3000;
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

describe('queue', function () {
    before(function (done) {
        this.timeout(0);
        //log4js.setGlobalLogLevel('DEBUG');
        //log4js.restoreConsole();

        //noinspection JSCheckFunctionSignatures
        assert.doesNotThrow(init, 'asterisk init failed');

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
                endpointManger.setupEndpoints(2, 'udp', 'pjsip');
            })
        }

        function cleanQueues() {
            endpointManger.removeListener(endpointManger.events.endpointsSet, cleanQueues);
            var wait = 0;
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
                    dialer.run();
                    done();
                }
            }
        }
    });


    it('add interface to queue', function (done) {
        this.timeout(0);
        var predictor = dialer.predictorStore.get(dialer.predictorStore.keys()[0]);
        assert.equal(predictor._availableAgents, 0, 'initial agents count failed');
        predictor.on(Predictor.Events.onMemberAdded, onMemberAdded);

        function onMemberAdded() {
            predictor.removeListener(Predictor.Events.onMemberAdded, onMemberAdded);
            clearTimeout(loginTimeout);
            assert.equal(predictor._availableAgents, 0, 'initial agents count failed');
            assert(true);
            done();
        }

        var loginTimeout = getTimeout('queueLogin');
        dialer.api.queueLogin({queueName: predictor.queueName, interfaceName: 'PJSIP/1151'});
    });
    it('remove interface from queue', function (done) {
        this.timeout(0);
        var predictor = dialer.predictorStore.get(dialer.predictorStore.keys()[0]);
        assert.equal(predictor._availableAgents, 0, 'initial agents count failed');

        var logoutTimeout = getTimeout('queueLogout');
        predictor.on(Predictor.Events.onMemberRemoved, onMemberRemoved);
        function onMemberRemoved() {
            predictor.removeListener(Predictor.Events.onMemberRemoved, onMemberRemoved);
            clearTimeout(logoutTimeout);
            assert.equal(predictor._availableAgents, 0, 'initial agents count failed');
            assert(true);
            done();
        }


        var wsEvent = {
            queueName: predictor.queueName,
            interfaceName: 'PJSIP/1151'
        };
        dialer.api.queueLogout(wsEvent);
    });
    it('add client to queue ', function (done) {
        this.timeout(0);

        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();
        /**
         * @type {Linphone}
         */
        var endpoint1 = linPhones.get(keys[0]);
        /**
         * @type {Predictor}
         */
        var predictor = dialer.predictorStore.get(dialer.predictorStore.keys()[0]);
        assert.equal(predictor._availableAgents, 0, 'initial agents count failed');
        predictor.on(Predictor.Events.onMemberAdded, onMemberAdded);
        function onMemberAdded() {
            predictor.removeListener(Predictor.Events.onMemberAdded, onMemberAdded);
            clearTimeout(loginTimeout);
            assert.equal(predictor._availableAgents, 1, 'agents count failed');
            done();
        }

        var loginTimeout = getTimeout('queueLogin');
        dialer.api.queueLogin({queueName: predictor.queueName, interfaceName: endpoint1.getInterface()});
    });
    it('remove client from queue', function (done) {
        this.timeout(0);

        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();
        /**
         * @type {Linphone}
         */
        var endpoint1 = linPhones.get(keys[0]);

        var predictor = dialer.predictorStore.get(dialer.predictorStore.keys()[0]);
        assert.equal(predictor._availableAgents, 1, 'initial agents count failed');
        predictor.on(Predictor.Events.onMemberRemoved, onMemberRemoved);
        function onMemberRemoved() {
            predictor.removeListener(Predictor.Events.onMemberRemoved, onMemberRemoved);
            clearTimeout(logoutTimeout);
            assert.equal(predictor._availableAgents, 0, 'agents count failed');
            assert(true);
            done();
        }

        var logoutTimeout = getTimeout('queueLogout');
        dialer.api.queueLogout({queueName: predictor.queueName, interfaceName: endpoint1.getInterface()});
    });
    it('client unregister in queue', function (done) {
        this.timeout(0);
        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();
        /**
         * @type {Linphone}
         */
        var endpoint1 = linPhones.get(keys[0]);

        /**
         * @type {Predictor}
         */


        var predictor = dialer.predictorStore.get(dialer.predictorStore.keys()[0]);

        assert.equal(predictor._availableAgents, 0, 'initial agents count failed');


        function login(callback) {
            predictor.on(Predictor.Events.onMemberAdded, onMemberAdded);
            function onMemberAdded() {
                predictor.removeListener(Predictor.Events.onMemberAdded, onMemberAdded);
                clearTimeout(loginTimeout);
                assert.equal(predictor._availableAgents, 1, 'agents count failed');
                assert(true);
                callback();
            }

            var loginTimeout = getTimeout('queueLogin');
            dialer.api.queueLogin({queueName: predictor.queueName, interfaceName: endpoint1.getInterface()});
        }

        function unregister(callback) {
            assert.equal(endpoint1.registered, true, 'endpoint not registered');

            function onHandleMemberStateChangeUnregister() {
                predictor.removeListener(Predictor.Events.handleMemberStateChange, onHandleMemberStateChangeUnregister);
                clearTimeout(stateChangeTimeout);
                assert.equal(predictor._availableAgents, 0, 'agents count failed');
                finish();
            }

            function onLinphoneUnregistered() {
                assert.equal(endpoint1.registered, false, 'endpoint registered');
                endpoint1.removeListener(Linphone.Events.UNREGISTERED, onLinphoneUnregistered);
                clearTimeout(linphoneUnregisteredTimeout);
                finish();
            }

            function finish() {
                waitForUnregisterEvents--;
                if (waitForUnregisterEvents == 0) {
                    callback()
                }
            }

            var waitForUnregisterEvents = 2;
            predictor.on(Predictor.Events.handleMemberStateChange, onHandleMemberStateChangeUnregister);
            endpoint1.on(Linphone.Events.UNREGISTERED, onLinphoneUnregistered);

            var stateChangeTimeout = getTimeout('stateChange');
            var linphoneUnregisteredTimeout = getTimeout('linphoneUnregistered');
            endpoint1.unregister();

        }

        function register(callback) {
            assert.equal(endpoint1.registered, false, 'endpoint registered');

            function onHandleMemberStateChangeRegister() {
                //assert.equal(endpoint1.registered, true, 'endpoint not registered');
                predictor.removeListener(Predictor.Events.handleMemberStateChange, onHandleMemberStateChangeRegister);
                clearTimeout(stateChangeTimeout);
                assert.equal(predictor._availableAgents, 1, 'agents count failed');
                finish();
            }

            function onLinphoneRegistered() {
                assert.equal(endpoint1.registered, true, 'endpoint registered');
                endpoint1.removeListener(Linphone.Events.REGISTERED, onLinphoneRegistered);
                clearTimeout(linphoneUnregisteredTimeout);
                finish();
            }

            function finish() {
                waitForUnregisterEvents--;
                if (waitForUnregisterEvents == 0) {
                    callback()
                }
            }

            var waitForUnregisterEvents = 2;
            predictor.on(Predictor.Events.handleMemberStateChange, onHandleMemberStateChangeRegister);
            endpoint1.on(Linphone.Events.REGISTERED, onLinphoneRegistered);

            var linphoneUnregisteredTimeout = getTimeout('linphoneUnregistered');
            var stateChangeTimeout = getTimeout('stateChange');

            endpoint1.register();
        }

        function logout(callback) {

            function onMemberRemoved() {
                predictor.removeListener(Predictor.Events.onMemberRemoved, onMemberRemoved);
                clearTimeout(logoutTimeout);
                assert.equal(predictor._availableAgents, 0, 'agents count failed');
                assert(true);
                callback();
            }

            predictor.on(Predictor.Events.onMemberRemoved, onMemberRemoved);
            var logoutTimeout = getTimeout('queueLogout');
            dialer.api.queueLogout({queueName: predictor.queueName, interfaceName: endpoint1.getInterface()});
        }


        login(onLogged);
        function onLogged() {
            unregister(onUnregistered)
        }

        function onUnregistered() {
            register(onRegistered)
        }

        function onRegistered() {
            logout(onLogout);
        }

        function onLogout() {
            done();
        }
    });


    it('client pause/resume in queue', function (done) {
        this.timeout(0);
        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();
        /**
         * @type {Linphone}
         */
        var endpoint1 = linPhones.get(keys[0]);
        /**
         * @type {Predictor}
         */
        var predictor = dialer.predictorStore.get(dialer.predictorStore.keys()[0]);
        assert.equal(predictor._availableAgents, 0, 'initial agents count failed');

        function login(callback) {
            var loginTimeout = setTimeout(function () {
                assert(false, 'Event never fired in time ' + eventTimeout); //or assert.fail, or whatever.
                done(); //I don't remember whether or not you still supposed to call done()
            }, eventTimeout);

            predictor.on(Predictor.Events.onMemberAdded, onMemberAdded);
            function onMemberAdded() {
                predictor.removeListener(Predictor.Events.onMemberAdded, onMemberAdded);
                clearTimeout(loginTimeout);
                assert.equal(predictor._availableAgents, 1, 'agents count failed');
                assert(true);
                callback();
            }


            var wsEvent = {
                queueName: predictor.queueName,
                interfaceName: endpoint1.getInterface()
            };
            dialer.api.queueLogin(wsEvent);
        }

        function logout(callback) {
            var logoutTimeout = setTimeout(function () {
                assert(false, 'Event never fired in time ' + eventTimeout); //or assert.fail, or whatever.
                done(); //I don't remember whether or not you still supposed to call done()
            }, eventTimeout);

            predictor.on(Predictor.Events.onMemberRemoved, onMemberRemoved);
            function onMemberRemoved() {
                predictor.removeListener(Predictor.Events.onMemberRemoved, onMemberRemoved);
                clearTimeout(logoutTimeout);
                assert.equal(predictor._availableAgents, 0, 'agents count failed');
                assert(true);
                callback();
            }


            var wsEvent = {
                queueName: predictor.queueName,
                interfaceName: endpoint1.getInterface()
            };
            dialer.api.queueLogout(wsEvent);
        }

        function pause(callback) {
            predictor.on(Predictor.Events.handleMemberStateChange, onHandleMemberStateChangePaused);
            var stateChangeTimeout = setTimeout(function () {
                assert(false, 'Event never fired in time ' + eventTimeout); //or assert.fail, or whatever.
                done(); //I don't remember whether or not you still supposed to call done()
            }, eventTimeout);

            /**
             * @param {PropertyChangeEvent} event
             */
            function onHandleMemberStateChangePaused(event) {
                if (event.propertyName == 'paused') {
                    assert.equal(endpoint1.registered, true, 'endpoint not registered');
                    predictor.removeListener(Predictor.Events.handleMemberStateChange, onHandleMemberStateChangePaused);
                    clearTimeout(stateChangeTimeout);
                    assert.equal(predictor._availableAgents, 0, 'agents count failed');
                    callback();
                }
            }


            var wsEvent = {
                queueName: predictor.queueName,
                interfaceName: endpoint1.getInterface()
            };
            dialer.api.queuePause(wsEvent);
        }

        function resume(callback) {
            predictor.on(Predictor.Events.handleMemberStateChange, onHandleMemberStateChangePaused);
            var stateChangeTimeout = setTimeout(function () {
                assert(false, 'Event never fired in time ' + eventTimeout); //or assert.fail, or whatever.
                done(); //I don't remember whether or not you still supposed to call done()
            }, eventTimeout);

            /**
             * @param {PropertyChangeEvent} event
             */
            function onHandleMemberStateChangePaused(event) {
                if (event.propertyName == 'paused') {
                    assert.equal(endpoint1.registered, true, 'endpoint not registered');
                    predictor.removeListener(Predictor.Events.handleMemberStateChange, onHandleMemberStateChangePaused);
                    clearTimeout(stateChangeTimeout);
                    assert.equal(predictor._availableAgents, 1, 'agents count failed');
                    callback();
                }
            }


            var wsEvent = {
                queueName: predictor.queueName,
                interfaceName: endpoint1.getInterface()
            };
            dialer.api.queueResume(wsEvent);
        }


        login(onLogged);
        function onLogged() {
            pause(onPaused)
        }

        function onPaused() {
            logout(onLogout);
        }

        function onLogout() {
            login(onLogged2)
        }

        function onLogged2() {
            pause(onPaused2);
        }

        function onPaused2() {
            resume(onResume);
        }

        function onResume() {
            logout(done);
        }
    });
    after(function (done) {
        this.timeout(1000000);
        endpointManger.clear(function () {
            done()
        });
    })
});