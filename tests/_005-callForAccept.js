var assert = require("assert"),
    mocha = require('mocha'),
    fs = require('fs'),
    _ = require('lodash'),
    should = require("should"),
    log4js = require('log4js'),

    asteriskServer = require('./../lib/asterisk/live/asteriskServer'),
    AsteriskChannel = require('./../lib/asterisk/live/asteriskChannel'),
    events = require('./../lib/nami.extended/src/nami').Event,
    actions = require('./../lib/nami.extended/src/nami').Actions,
    Moment = require('moment'),
    Dialer = require('./../lib/dialer'),
    CallRecordProvider = require('./mock/fakeCallRecordProvider'),
    MysqlCallRecordProvider = require('./../lib/callRecordProvider/mysql'),
    Linphone = require('./mock/linphone'),
    Predictor = require('./../lib/predictor'),
    Caller = require('./../lib/caller'),
    Collection = require('./../lib/utils/collection');


require('./mock/helper');


var config = JSON.parse(fs.readFileSync('./config.json'));
var asterisk = asteriskServer.getInstance(config.asterisk);
/**
 * @type {EndpointManager}
 */
var endpointManger = require('./mock/endpointManager').getInstance(asterisk);
var provider = new CallRecordProvider(config.db);

var mProvider = new MysqlCallRecordProvider(config.db);

config.callRecordProvider = mProvider;
config.server = asterisk;
config.dialer.autoStartPredictors = false;
config.dialer.autoStartCallers = false;

var dialer = new Dialer(config);

var caller = new Caller({
    name: 'callForAcceptFake',
    ratio: 1,
    sourceContext: 'testSource',
    destExtension: 's',
    destContext: 'callForAccept',
    destPriority: 1,
    dialer: dialer,
    callRecordProvider: provider
});

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
/**
 * @type {function}
 */
removeTimeout;
/**
 * @type {function}
 */
clearTimeouts;
/**
 * @type {function}
 */
getTimeout;
/**
 * @type {function}
 */
getLogger;
/**
 * @type {function(function,Caller,EndpointManger,string)}
 */
endTest;

describe('call for accept', function () {
    before(function (done) {
        this.timeout(0);
        //log4js.setGlobalLogLevel('DEBUG');
        //log4js.restoreConsole();
        function init() {
            asterisk.initialize(function (err) {
                if (err) {
                    done();
                    throw  err
                }
                endpointManger.on(endpointManger.events.error, function (err) {
                    //done();
                    throw err;
                });
                endpointManger.on(endpointManger.events.endpointsSet, done);
                if (-1 == asterisk._allowedActions.indexOf('PjsipShowEndpoints')) {
                    endpointManger.setupEndpoints(1, 'udp', 'sip', 'wszystkie-test');
                } else {
                    endpointManger.setupEndpoints(8, 'udp', 'pjsip');
                }
            })
        }

        function cleanQueues() {
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
                    getLogger().info('============================START=============================');
                    done();
                }
            }
        }

        var wait = 0;
        assert.doesNotThrow(init, 'asterisk init failed');
    });
    afterEach(function (done) {
        getLogger().debug('============================ after each start=============================');
        setTimeout(function () {
            getLogger().debug('============================ after each end=============================');
            done();
        }, 1900)
    });
    it('call bad number', function (done) {
        global.useTimeouts = false;
        getLogger().info('============================call bad number=============================');
        this.timeout(0);
        var dialerStartTimeout,
            callerStartTimeout,
            callerOnFailureTimeout;


        var badNumber = 'badNumber';

        /**
         * @type {Collection}
         */

        var linPhones = endpointManger.endpoints;


        function run() {
            linPhones.forEach(function (endpoint) {
                endpoint.on(Linphone.Events.INCOMING, function (line, id, endpoint) {
                    throw new Error('incoming on endpoint: "' + endpoint.getSipNumber() + '"');
                });
            })

            dialerStartTimeout = getTimeout('dialerStart')
            dialer.on(Dialer.Events.started, startListener);
            dialer.run();
        }

        function onDialerStarted() {
            removeTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, startListener);

            caller = dialer.callerStore.get('callForAcceptFake');
            caller.callRecordProvider.setCallRecordNumber(badNumber);
            caller.on(Caller.Events.STARTED, onCallerStarted);

            callerStartTimeout = getTimeout('callerStart');
            caller.start();
        }

        function onCallerStarted() {
            removeTimeout(callerStartTimeout);
            caller.removeListener(Caller.Events.STARTED, onCallerStarted);

            callerOnFailureTimeout = getTimeout('callerOnFailure');

            caller.on(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.FAILURE, onFailure);
            caller.on(Caller.Events.NO_ANSWER, onFailure);
        }

        function onDialing(/*callRecord, channel*/) {
            //assert(false, 'Event onDialing emitted for channel: "' + channel.name + '"');
            //after();
        }


        function onFailure() {
            caller.stop();
            removeTimeout(callerOnFailureTimeout);
            assert(true, 'Event onFailure emitted');
            endTest(done, caller, endpointManger, 'call bad number');
        }

        var dialerStartTimeout = getTimeout('dialerStart');
        var startListener = onDialerStarted.bind(this);

        assert.doesNotThrow(run, 'dialer run failed');


    });
    it('call no answer number', function (done) {
        getLogger().info('============================call no answer number=============================');

        this.timeout(0);
        var callerStartTimeout;
        var callerOnDialingTimeout;
        var callerOnNoAnswerTimeout;
        var endpoint1onIncomingTimeout;
        var endpoint1onEndCallTimeout;

        /**
         * @type {Collection}
         */

        var linPhones = endpointManger.endpoints;

        function run() {
            dialer.on(Dialer.Events.started, onDialerStarted);
            dialer.run();
        }

        function onDialerStarted() {
            removeTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, onDialerStarted);

            caller.callRecordProvider.setCallRecordNumber(linPhones.get(linPhones.keys()[0]).getSipNumber());
            caller.on(Caller.Events.STARTED, onCallerStarted);


            callerStartTimeout = getTimeout('callerStart');
            caller.timeout = 300;
            caller.start();
        }

        function onCallerStarted() {
            removeTimeout(callerStartTimeout);
            caller.removeListener(Caller.Events.STARTED, onCallerStarted);

            callerOnDialingTimeout = getTimeout('callerOnDialing');

            caller.on(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.FAILURE, onFailure);
        }

        function onDialing(callrecord) {

            removeTimeout(callerOnDialingTimeout);
            caller.removeListener(Caller.Events.DIALING, onDialing);

            linPhones.get(callrecord.phonenumber).on(Linphone.Events.INCOMING, onIncoming);
            endpoint1onIncomingTimeout = getTimeout('endpoint1onIncoming');


            caller.on(Caller.Events.NO_ANSWER, onNoAnswer);
            callerOnNoAnswerTimeout = getTimeout('callerOnNoAnswer', caller.timeout);
        }

        function onNoAnswer(callrecord) {
            removeTimeout(callerOnNoAnswerTimeout);
            assert(true, 'Event onDialing emitted');
            caller.stop();

            linPhones.get(callrecord.phonenumber).on(Linphone.Events.END_CALL, onEndCall);
            endpoint1onEndCallTimeout = getTimeout('endpoint1onEndCall');
            linPhones.get(callrecord.phonenumber).endCall();

        }

        function onIncoming(line, id, endpoint) {
            removeTimeout(endpoint1onIncomingTimeout);
            endpoint.removeListener(Linphone.Events.INCOMING, onIncoming);
        }

        function onEndCall(line, endpoint) {
            removeTimeout(endpoint1onEndCallTimeout);
            endpoint.removeListener(Linphone.Events.END_CALL, onEndCall);

            endTest(done, caller, endpointManger, 'call no answer number');
        }

        /**
         * @param callRecord
         * @param {Error} cause
         */
        function onFailure(callRecord, cause) {
            assert(false, 'Event onFailure emitted: ' + cause.message);
            endTest(done, caller, endpointManger, 'call no answer number');
        }

        var dialerStartTimeout = getTimeout('dialerStart');
        assert.doesNotThrow(run, 'dialer run failed');


    });
    it('call busy number', function (done) {
        getLogger().info('============================call busy number=============================');
        //start caller
        //wait for busy

        this.timeout(0);
        var callerStartTimeout;
        var callerOnDialingTimeout;
        var callerOnBusyTimeout;


        function run() {
            dialer.on(Dialer.Events.started, onDialerStarted);
            dialer.run();
        }

        function onDialerStarted() {
            removeTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, onDialerStarted);

            //dialer.callRecordProvider.setCallRecordNumber(1151);
            caller.on(Caller.Events.STARTED, onCallerStarted);

            callerStartTimeout = getTimeout('callerStart');
            caller.timeout = 300;
            caller.sourceContext = 'busytest';
            caller.start();
        }


        function onCallerStarted() {
            removeTimeout(callerStartTimeout);
            caller.removeListener(Caller.Events.STARTED, onCallerStarted);

            callerOnDialingTimeout = getTimeout('callerOnDialing');

            caller.on(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.FAILURE, onFailure);
        }


        function onDialing() {
            removeTimeout(callerOnDialingTimeout);
            caller.removeListener(Caller.Events.DIALING, onDialing);

            caller.on(Caller.Events.NO_ANSWER, onNoAnswer);
            caller.on(Caller.Events.BUSY, onBusy);

            callerOnBusyTimeout = getTimeout('callerOnBusy', caller.timeout);
        }

        function onBusy() {
            removeTimeout(callerOnBusyTimeout);
            assert(true, 'Event onNoAnswer emitted');
            endTest(done, caller, endpointManger, 'call busy number', atEnd);
        }

        function onNoAnswer() {
            assert(false, 'Event onNoAnswer emitted');
            endTest(done, caller, endpointManger, 'call busy number', atEnd);
        }

        /**
         * @param callRecord
         * @param {Error} cause
         */
        function onFailure(callRecord, cause) {
            assert(false, 'Event onFailure emitted: ' + cause.message);
            endTest(done, caller, endpointManger, 'call busy number', atEnd);
        }

        function atEnd() {
            caller.sourceContext = 'testSource';
        }

        var dialerStartTimeout = getTimeout('dialerStart');
        assert.doesNotThrow(run, 'dialer run failed');

    });
    it('call one available number', function (done) {
        global.useTimeouts = false;
        getLogger().info('============================call one available number=============================');
        this.timeout(0);
        var callerStartTimeout;
        var callerOnDialingTimeout;
        var callerOnSuccessTimeout;

        var endpoint1onIncomingTimeout;
        var endpoint1onAnsweredTimeout;
        var endpoint1onEndCallTimeout;

        /**
         * @type {Collection}
         */

        var linPhones = endpointManger.endpoints;

        function run() {

            //caller.callRecordProvider = mProvider;

            dialer.on(Dialer.Events.started, onDialerStarted);
            dialer.run();
        }

        function onDialerStarted() {
            removeTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, onDialerStarted);

            caller = dialer.callerStore.get(dialer.callerStore.keys()[0]);

            caller.callRecordProvider.setCallRecordNumber(endpoint1.configuration.sip);

            caller.on(Caller.Events.STARTED, onCallerStarted);

            callerStartTimeout = getTimeout('callerStart');
            caller.timeout = 300;
            caller.start();
        }


        function onCallerStarted() {
            removeTimeout(callerStartTimeout);
            caller.removeListener(Caller.Events.STARTED, onCallerStarted);

            callerOnDialingTimeout = getTimeout('callerOnDialing');

            caller.on(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.FAILURE, onFailure);
        }

        function onDialing(callRecord) {

            removeTimeout(callerOnDialingTimeout);
            caller.removeListener(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.NO_ANSWER, onNoAnswer);

            endpointManger.endpoints.get(callRecord.phonenumber).on(Linphone.Events.INCOMING, onIncoming);
            endpoint1onIncomingTimeout = getTimeout('endpoint1onIncoming');
        }

        function onIncoming(line, id, endpoint) {
            removeTimeout(endpoint1onIncomingTimeout);
            endpoint.removeListener(Linphone.Events.INCOMING, onIncoming);

            endpoint.on(Linphone.Events.ANSWERED, onAnswered);
            endpoint1onAnsweredTimeout = getTimeout('endpoint1onAnswered');
            endpoint.answer(id)
        }

        function onAnswered(line, id, endpoint) {
            removeTimeout(endpoint1onAnsweredTimeout);
            caller.removeListener(Caller.Events.ANSWERED, onAnswered);

            caller.on(Caller.Events.SUCCESS, onSuccess);
            assert(true, 'Event onNoAnswer emitted');

            callerOnSuccessTimeout = getTimeout('callerOnSuccess');

            endpoint1onEndCallTimeout = getTimeout('endpoint1onIncoming');
            endpoint.on(Linphone.Events.END_CALL, onCallEnd);

            endpoint.endCall(id);

        }

        function onSuccess() {
            removeTimeout(callerOnSuccessTimeout);
            assert(true, 'Event onSuccess emitted');

            caller.stop();
        }

        function onCallEnd(line, endpoint) {
            removeTimeout(endpoint1onEndCallTimeout);
            endpoint.removeListener(Linphone.Events.END_CALL, onCallEnd);

            getLogger().info('end onCallEnd');
            endTest(done, caller, endpointManger, 'call one available number');
        }

        function onNoAnswer() {
            assert(false, 'Event onNoAnswer emitted');
            getLogger().info('end onNoAnswer');
            endTest(done, caller, endpointManger, 'call one available number');
        }

        /**
         * @param callRecord
         * @param {Error} cause
         */
        function onFailure(callRecord, cause) {
            assert(false, 'Event onFailure emitted: ' + cause.message);
            getLogger().info('end onFailure');
            endTest(done, caller, endpointManger, 'call one available number');
        }


        var dialerStartTimeout = getTimeout('dialerStart');
        assert.doesNotThrow(run, 'dialer run failed');

    });
    it('call dialplan_brakwyboru', function (done) {
        global.useTimeouts = false;
        getLogger().info('============================call dialplan_brakwyboru=============================');
        this.timeout(0);
        var endpoint1;
        var callerStartTimeout;
        var callerOnDialingTimeout;
        var callerOnSuccessTimeout;

        var endpoint1onIncomingTimeout;
        var endpoint1onAnsweredTimeout;

        /**
         * @type {Collection}
         */

        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();

        endpoint1 = linPhones.get(keys[0]);

        var waitTimeout = 2;

        function run() {
            dialer.on(Dialer.Events.started, onDialerStarted);
            dialer.run();
        }

        function onDialerStarted() {
            removeTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, onDialerStarted);

            caller.callRecordProvider.setCallRecordNumber(endpoint1.configuration.sip);
            caller.on(Caller.Events.STARTED, onCallerStarted);
            endpoint1.on(Linphone.Events.INCOMING, onIncoming);

            endpoint1onIncomingTimeout = getTimeout('endpoint1onIncoming');
            callerStartTimeout = getTimeout('callerStart');
            caller.timeout = 300;
            caller.start();
        }


        function onCallerStarted() {
            removeTimeout(callerStartTimeout);
            caller.removeListener(Caller.Events.STARTED, onCallerStarted);

            callerOnDialingTimeout = getTimeout('callerOnDialing');

            caller.on(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.FAILURE, onFailure);
        }

        function onDialing(callRecord, channel) {
            removeTimeout(callerOnDialingTimeout);
            caller.removeListener(Caller.Events.DIALING, onDialing);

            caller.on(Caller.Events.NO_ANSWER, onNoAnswer);
            channel.on(AsteriskChannel.Events.PROPERTY_CURRENT_EXTENSION, onExtensionChange);


            /**
             * @param {PropertyChangeEvent} event
             */
            function onExtensionChange(event) {
                /**
                 * @type {Extension}
                 */
                var newValue = event.getNewValue();
                getLogger().info(channel.getName() + ' : ' + newValue);
                getLogger().debug(channel.getName() + ' : ' + event.toString());

                if (newValue.getContext() == 'callForAccept' && newValue.getExtension() == 't' && newValue.getPriority() == 1) {
                    getLogger().warn('timeout reached');
                    waitTimeout--;
                }
            }
        }

        function onIncoming(line, id, endpoint) {
            removeTimeout(endpoint1onIncomingTimeout);
            endpoint.removeListener(Linphone.Events.INCOMING, onIncoming);

            endpoint.on(Linphone.Events.ANSWERED, onAnswered);
            endpoint1onAnsweredTimeout = getTimeout('endpoint1onAnswered');
            endpoint.answer(id)
        }

        function onAnswered(line, id, endpoint) {
            removeTimeout(endpoint1onAnsweredTimeout);
            caller.removeListener(Caller.Events.ANSWERED, onAnswered);

            caller.on(Caller.Events.SUCCESS, onSuccess);
            assert(true, 'Event onAnswered emitted');

            //callerOnSuccessTimeout = getTimeout('callerOnSuccess');
            endpoint.on(Linphone.Events.END_CALL, onEndCall)
        }


        function onEndCall() {
            endpoint1.removeListener(Linphone.Events.END_CALL, onEndCall);
            assert(true, 'Event onEndCall emitted');

            assert.equal(waitTimeout, 0, 'not choose count failed');

            endTest(done, caller, endpointManger, 'call dialplan_brakwyboru');
        }


        function onSuccess() {
            //removeTimeout(callerOnSuccessTimeout);
            assert(true, 'Event onSuccess emitted');
            caller.stop();
        }

        function onNoAnswer() {
            assert(false, 'Event onNoAnswer emitted');
            endTest(done, caller, endpointManger, 'call dialplan_brakwyboru');
        }

        /**
         * @param callRecord
         * @param {Error} cause
         */
        function onFailure(callRecord, cause) {
            assert(false, 'Event onFailure emitted: ' + cause.message);
            endTest(done, caller, endpointManger, 'call dialplan_brakwyboru');
        }

        var dialerStartTimeout = getTimeout('dialerStart');
        assert.doesNotThrow(run, 'dialer run failed');
    });
    it('call dialplan_blednywybor', function (done) {
        getLogger().info('============================call dialplan_blednywybor=============================');
        this.timeout(0);
        var endpoint1;
        var callerStartTimeout;
        var callerOnDialingTimeout;
        var callerOnSuccessTimeout;

        var endpoint1onIncomingTimeout;
        var endpoint1onAnsweredTimeout;

        /**
         * @type {Collection}
         */

        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();

        endpoint1 = linPhones.get(keys[0]);

        var incorrectWait = 2;

        function run() {
            dialer.on(Dialer.Events.started, onDialerStarted);
            dialer.run();
        }

        function onDialerStarted() {
            removeTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, onDialerStarted);

            caller.callRecordProvider.setCallRecordNumber(endpoint1.configuration.sip);
            caller.on(Caller.Events.STARTED, onCallerStarted);
            endpoint1.on(Linphone.Events.INCOMING, onIncoming);

            endpoint1onIncomingTimeout = getTimeout('endpoint1onIncoming');
            callerStartTimeout = getTimeout('callerStart');
            caller.timeout = 300;
            caller.start();
        }


        function onCallerStarted() {
            removeTimeout(callerStartTimeout);
            caller.removeListener(Caller.Events.STARTED, onCallerStarted);

            callerOnDialingTimeout = getTimeout('callerOnDialing');

            caller.on(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.FAILURE, onFailure);
        }

        function onDialing(callRecord, channel) {
            removeTimeout(callerOnDialingTimeout);
            caller.removeListener(Caller.Events.DIALING, onDialing);

            caller.on(Caller.Events.NO_ANSWER, onNoAnswer);

            channel.on(AsteriskChannel.Events.PROPERTY_CURRENT_EXTENSION, onExtensionChange);


            /**
             * @param {PropertyChangeEvent} event
             */
            function onExtensionChange(event) {
                /**
                 * @type {Extension}
                 */
                var nVal = event.getNewValue();
                getLogger().info(channel.getName() + ' : ' + nVal);
                getLogger().debug(channel.getName() + ' : ' + event.toString());


                if (nVal.getContext() == 'callForAccept' && nVal.getExtension() == 's' && nVal.getApplication() == 'BackGround' && nVal.getAppData() == 'dpi-menu-0') {
                    getLogger().warn('menu playback');
                    endpoint1._write('2');
                }

                if (nVal.getContext() == 'callForAccept' && nVal.getExtension() == 'i' && nVal.getPriority() == 1) {
                    getLogger().warn('incorrect choose');
                    incorrectWait--;
                }
                /*
                 setTimeout(function () {
                 endpoint1._write('1');
                 }, 6000);


                 */
            }


        }

        function onIncoming(line, id) {
            removeTimeout(endpoint1onIncomingTimeout);
            endpoint1.removeListener(Linphone.Events.INCOMING, onIncoming);

            endpoint1.on(Linphone.Events.ANSWERED, onAnswered);
            endpoint1onAnsweredTimeout = getTimeout('endpoint1onAnswered');
            endpoint1.answer(id)
        }

        function onAnswered() {
            removeTimeout(endpoint1onAnsweredTimeout);
            caller.removeListener(Caller.Events.ANSWERED, onAnswered);

            caller.on(Caller.Events.SUCCESS, onSuccess);
            assert(true, 'Event onAnswered emitted');

            callerOnSuccessTimeout = getTimeout('callerOnSuccess');

            endpoint1.on(Linphone.Events.END_CALL, onEndCall)

        }


        function onEndCall() {
            endpoint1.removeListener(Linphone.Events.END_CALL, onEndCall);
            assert(true, 'Event onEndCall emitted');
            //TODO timeout time calculate

            assert.equal(incorrectWait, 0, 'bad choose count filed');


            endTest(done, caller, endpointManger, 'call dialplan_brakwyboru');
        }

        function onSuccess() {
            removeTimeout(callerOnSuccessTimeout);
            assert(true, 'Event onSuccess emitted');
            caller.stop();


        }

        function onNoAnswer() {
            assert(false, 'Event onNoAnswer emitted');
            endTest(done, caller, endpointManger, 'call dialplan_blednywybor');
        }

        /**
         * @param callRecord
         * @param {Error} cause
         */
        function onFailure(callRecord, cause) {
            assert(false, 'Event onFailure emitted: ' + cause.message);
            endTest(done, caller, endpointManger, 'call dialplan_blednywybor');
        }

        var dialerStartTimeout = getTimeout('dialerStart');
        assert.doesNotThrow(run, 'dialer run failed');
    });
    it('call dialplan_akceptacja', function (done) {
        global.useTimeouts = false;
        getLogger().info('============================call dialplan_akceptacja=============================');
        this.timeout(0);
        var endpoint1;
        var callerStartTimeout;
        var callerOnDialingTimeout;
        var callerOnSuccessTimeout;

        var endpoint1onIncomingTimeout;
        var endpoint1onAnsweredTimeout;

        /**
         * @type {Collection}
         */

        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();

        endpoint1 = linPhones.get(keys[0]);

        function run() {
            dialer.on(Dialer.Events.started, onDialerStarted);
            dialer.run();
        }

        function onDialerStarted() {
            removeTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, onDialerStarted);

            caller.callRecordProvider.setCallRecordNumber(endpoint1.configuration.sip);
            caller.on(Caller.Events.STARTED, onCallerStarted);
            endpoint1.on(Linphone.Events.INCOMING, onIncoming);

            endpoint1onIncomingTimeout = getTimeout('endpoint1onIncoming');
            callerStartTimeout = getTimeout('callerStart');
            caller.timeout = 300;
            caller.start();
        }


        function onCallerStarted() {
            removeTimeout(callerStartTimeout);
            caller.removeListener(Caller.Events.STARTED, onCallerStarted);

            callerOnDialingTimeout = getTimeout('callerOnDialing');

            caller.on(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.FAILURE, onFailure);
        }

        function onDialing(callrecord, channel) {
            removeTimeout(callerOnDialingTimeout);
            caller.removeListener(Caller.Events.DIALING, onDialing);

            caller.on(Caller.Events.NO_ANSWER, onNoAnswer);
            channel.on(AsteriskChannel.Events.PROPERTY_CURRENT_EXTENSION, onExtensionChange);


            /**
             * @param {PropertyChangeEvent} event
             */
            function onExtensionChange(event) {
                /**
                 * @type {Extension}
                 */
                var nVal = event.getNewValue();
                getLogger().info(channel.getName() + ' : ' + nVal);
                getLogger().debug(channel.getName() + ' : ' + event.toString());

                //if(nVal.getContext() == 'callForAccept' && nVal.getExtension() == 's' && nVal.getApplication() == '')
            }


        }

        function onIncoming(line, id) {
            removeTimeout(endpoint1onIncomingTimeout);
            endpoint1.removeListener(Linphone.Events.INCOMING, onIncoming);

            endpoint1.on(Linphone.Events.ANSWERED, onAnswered);
            endpoint1onAnsweredTimeout = getTimeout('endpoint1onAnswered');
            endpoint1.answer(id)
        }

        function onAnswered(line, id, endpoint) {
            removeTimeout(endpoint1onAnsweredTimeout);
            caller.removeListener(Caller.Events.ANSWERED, onAnswered);

            caller.on(Caller.Events.SUCCESS, onSuccess);
            assert(true, 'Event onAnswered emitted');

            callerOnSuccessTimeout = getTimeout('callerOnSuccess');

            endpoint.on(Linphone.Events.END_CALL, onEndCall)

            setTimeout(function () {
                endpoint._write('1');
            }, 6000);

        }

        function onEndCall() {
            endpoint1.removeListener(Linphone.Events.END_CALL, onEndCall);
            assert(true, 'Event onEndCall emitted');
            //TODO timeout time calculate
            endTest(done, caller, endpointManger, 'call dialplan_akceptacja');
        }

        function onSuccess() {
            removeTimeout(callerOnSuccessTimeout);
            assert(true, 'Event onSuccess emitted');
            caller.stop();
        }

        function onNoAnswer() {
            assert(false, 'Event onNoAnswer emitted');
            endTest(done, caller, endpointManger, 'call dialplan_brakwyboru');
        }

        /**
         * @param callRecord
         * @param {Error} cause
         */
        function onFailure(callRecord, cause) {
            assert(false, 'Event onFailure emitted: ' + cause.message);
            endTest(done, caller, endpointManger, 'call dialplan_akceptacja');
        }

        var dialerStartTimeout = getTimeout('dialerStart');
        assert.doesNotThrow(run, 'dialer run failed');
    });
    it('call dialplan_odrzucenie', function (done) {
        getLogger().info('============================call dialplan_odrzucenie=============================');
        endTest(done, caller, endpointManger, 'call dialplan_odrzucenie');
    });

    it('caller ratio_1_success_7times', function (done) {
        global.useTimeouts = false;
        getLogger().info('============================caller ratio_1_success_7times=============================');
        this.timeout(0);
        var endpoint1;
        var endpoint2;
        var callerCallWait = 7;
        var callerStartTimeout;
        var callerOnDialingTimeout;
        var callerOnSuccessTimeout;

        var endpoint1onIncomingTimeout;
        var endpoint1onAnsweredTimeout;

        /**
         * @type {Collection}
         */

        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();

        endpoint1 = linPhones.get(keys[0]);
        endpoint2 = linPhones.get(keys[1]);

        function run() {
            dialer.on(Dialer.Events.started, onDialerStarted);
            dialer.run();
        }


        function onDialerStarted() {
            getLogger().warn('onDialerStarted');
            removeTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, onDialerStarted);

            caller.callRecordProvider.setCallRecordNumber([endpoint1.getSipNumber(), endpoint2.getSipNumber()]);
            caller.on(Caller.Events.STARTED, onCallerStarted);

            callerStartTimeout = getTimeout('callerStart');
            caller.timeout = 300;
            caller.start();
        }

        function onCallerStarted() {
            getLogger().warn('onCallerStarted');
            caller.removeListener(Caller.Events.STARTED, onCallerStarted);

            bindEndpointIncoming(endpoint1);
            bindEndpointIncoming(endpoint2);
            bindCallerDialing();
        }

        function bindCallerDialing() {
            getLogger().warn('bindCallerDialing');

            caller.on(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.FAILURE, onFailure);
        }

        function onDialing(callrecord, channel) {
            getLogger().warn('onDialing');

            caller.removeListener(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.NO_ANSWER, onNoAnswer);
            caller.on(Caller.Events.SUCCESS, onSuccess);

            channel.on(AsteriskChannel.Events.PROPERTY_CURRENT_EXTENSION, onExtensionChange);


            /**
             * @param {PropertyChangeEvent} event
             */
            function onExtensionChange(event) {
                /**
                 * @type {Extension}
                 */
                var nVal = event.getNewValue();
                getLogger().info(channel.getName() + ' : ' + nVal);
                getLogger().debug(channel.getName() + ' : ' + event.toString());
            }


        }

        /**
         * @param callRecord
         * @param {AsteriskChannel} channel
         */
        function onSuccess(callRecord, channel) {
            getLogger().warn('onSuccess++++++++++++++++++++++++++++++++++++++++++++++++++++');

            var endpoint = callRecord.phonenumber == '1154' ? endpoint1 : endpoint2;
            endpoint.clearBindings();

            caller.removeListener(Caller.Events.SUCCESS, onSuccess);
            caller.removeListener(Caller.Events.NO_ANSWER, onNoAnswer);

            callerCallWait--;
            if (callerCallWait == 0) {
                endTest(done, caller, endpointManger, 'caller ratio_1_success_3times');
            } else {
                bindEndpointIncoming(endpoint);
                bindCallerDialing();
            }
        }

        function onNoAnswer() {
            getLogger().warn('onNoAnswer');
            var x = 1;
            //assert(false, 'Event onNoAnswer emitted');
            //endTest(done, caller, endpointManger, 'call dialplan_brakwyboru');
        }

        /**
         * @param callRecord
         * @param {Error} cause
         */
        function onFailure(callRecord, cause) {
            getLogger().warn('onFailure');
            var x = 1;
            //assert(false, 'Event onFailure emitted: ' + cause.message);
            //endTest(done, caller, endpointManger, 'call dialplan_brakwyboru');
        }

        function bindEndpointIncoming(endpoint) {
            getLogger().warn('bindEndpointIncoming');
            endpoint.on(Linphone.Events.INCOMING, onIncoming);
        }

        function onIncoming(line, id, endpoint) {
            getLogger().warn('onIncoming');

            endpoint.removeListener(Linphone.Events.INCOMING, onIncoming);
            endpoint.on(Linphone.Events.ANSWERED, onAnswered);
            endpoint.answer(id)
        }

        function onAnswered(line, id, endpoint) {
            getLogger().warn('onAnswered');

            endpoint.removeListener(Linphone.Events.ANSWERED, onAnswered);

            setTimeout(function () {
                endpoint._write('1');
            }, 6000);
        }


        function onEndCall(line, endpoint) {
            getLogger().warn('onEndCall');
        }

        var dialerStartTimeout = getTimeout('dialerStart');
        assert.doesNotThrow(run, 'dialer run failed');
    });

    it('caller ratio_6_success_100times', function (done) {
        global.useTimeouts = false;
        getLogger().info('============================caller ratio_1_success_7times=============================');
        this.timeout(0);
        var callerCallWait = 20;

        var callerStartTimeout;
        var callerOnDialingTimeout;
        var callerOnSuccessTimeout;

        var endpoint1onIncomingTimeout;
        var endpoint1onAnsweredTimeout;

        /**
         * @type {Collection}
         */

        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();

        function run() {
            dialer.on(Dialer.Events.started, onDialerStarted);
            dialer.run();
        }


        function onDialerStarted() {
            getLogger().warn('onDialerStarted');
            removeTimeout(dialerStartTimeout);
            dialer.removeListener(Dialer.Events.started, onDialerStarted);

            caller = dialer.callerStore.get('callForAccept');
            caller.on(Caller.Events.STARTED, onCallerStarted);

            caller.on(Caller.Events.DIALING, onDialing);
            caller.on(Caller.Events.FAILURE, onFailure);
            caller.on(Caller.Events.NO_ANSWER, onNoAnswer);
            caller.on(Caller.Events.SUCCESS, onSuccess);


            callerStartTimeout = getTimeout('callerStart');
            caller.timeout = 300;
            ;
            caller.start();
        }

        function onCallerStarted() {
            getLogger().warn('onCallerStarted');
            caller.removeListener(Caller.Events.STARTED, onCallerStarted);

            for (var i = 0; i < keys.length; i++) {
                bindEndpointIncoming(endpointManger.endpoints.get(keys[i]));
            }
        }


        function onDialing(callrecord, channel) {
            getLogger().warn('onDialing');

            channel.on(AsteriskChannel.Events.PROPERTY_CURRENT_EXTENSION, onExtensionChange);

            /**
             * @param {PropertyChangeEvent} event
             */
            function onExtensionChange(event) {
                /**
                 * @type {Extension}
                 */
                var nVal = event.getNewValue();
                //getLogger().info(channel.getName() + ' : ' + nVal);
                getLogger().debug(channel.getName() + ' : ' + event.toString());
            }
        }

        /**
         * @param callRecord
         * @param {AsteriskChannel} channel
         */
        function onSuccess(callRecord, channel) {
            getLogger().warn('onSuccess++++++++++++++++++++++++++++++++++++++++++++++++++++   ' + callerCallWait);

            var endpoint = endpointManger.endpoints.get(callRecord.phonenumber);
            endpoint.clearBindings();

            callerCallWait--;

            if (callerCallWait == 0) {
                endTest(done, caller, endpointManger, 'caller ratio_1_success_3times');
            } else {
                bindEndpointIncoming(endpoint);
            }
        }

        function onNoAnswer() {
            getLogger().warn('onNoAnswer');
            var x = 1;
            //assert(false, 'Event onNoAnswer emitted');
            //endTest(done, caller, endpointManger, 'call dialplan_brakwyboru');
        }

        /**
         * @param callRecord
         * @param {Error} cause
         */
        function onFailure(callRecord, cause) {
            getLogger().warn('onFailure');
            var x = 1;
            //assert(false, 'Event onFailure emitted: ' + cause.message);
            //endTest(done, caller, endpointManger, 'call dialplan_brakwyboru');
        }

        function bindEndpointIncoming(endpoint) {
            getLogger().warn('bindEndpointIncoming');
            endpoint.on(Linphone.Events.INCOMING, onIncoming);
        }

        function onIncoming(line, id, endpoint) {
            getLogger().warn('onIncoming');

            endpoint.removeListener(Linphone.Events.INCOMING, onIncoming);
            endpoint.on(Linphone.Events.ANSWERED, onAnswered);
            endpoint.answer(id)
        }

        function onAnswered(line, id, endpoint) {
            getLogger().warn('onAnswered');

            var rand = (Math.floor(Math.random() * 6) + 1) * 1000;

            rand = 6000;
            setTimeout(function () {
                endpoint._write('1');
            }, rand);
        }


        function onEndCall(line, endpoint) {
            getLogger().warn('onEndCall');
        }

        var dialerStartTimeout = getTimeout('dialerStart');
        assert.doesNotThrow(run, 'dialer run failed');
    });


    after(function (done) {
        this.timeout(1000000);
        endpointManger.clear(function () {
            done()
        });
    })
});