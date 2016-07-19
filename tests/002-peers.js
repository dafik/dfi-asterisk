const assert = require("assert"),
    fs = require('fs'),
    mocha = require('mocha'),
    should = require("should"),
    log4js = require('log4js');

/**
 * @type {Asterisk}
 */
var asterisk = require('./mock/asterisk-real');
var endpointManger = require('./mock/endpointManager').getInstance(asterisk);


log4js.setGlobalLogLevel('OFF');
var logConfig = JSON.parse(fs.readFileSync(__dirname + '/mock/log4js.config.json'));
log4js.configure(logConfig);
log4js.restoreConsole();


const nami = require('../examples/nami-extended/src/nami');

var config = require('./mock/config.json');

var events = nami.Event;
var actions = nami.Actions;
var Moment = require('moment');

var OriginateCallback = require('../src/objects/originateCallback');

var Linphone = require('./mock/linphone');

var answerTimeout = 200;
var endCallTimeout = 500;
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

                endpointManger.setupEndpoints(1, 'udp', 'pjsip');

                function error(err) {
                    endpointManger.removeListener(endpointManger.events.endpointsSet, error);
                    endpointManger.removeListener(endpointManger.events.endpointsSet, finish);
                    done();
                    throw err;
                }

                function finish() {
                    endpointManger.removeListener(endpointManger.events.endpointsSet, error);
                    endpointManger.removeListener(endpointManger.events.endpointsSet, finish);
                    done();
                }
            })
        }

    });
    it('check presense', function (done) {
        this.timeout(0);
        var endpoint1IncomingTimeout,
            endpoint2IncomingTimeout,
            endpoint1AnswerTimeout,
            endpoint2AnswerTimeout,
            endpoint1EndCallTimeout,
            endpoint2EndCallTimeout;

        var waitEndCall = 0;
        var linPhones = endpointManger.endpoints;
        var keys = linPhones.keys();
        /**
         * @type {Linphone}
         */
        var endpoint1 = linPhones.get(keys[0]);


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

    });
    after(function (done) {
        this.timeout(1000000);
        endpointManger.clear(function () {
            done()
        });
    })
});
