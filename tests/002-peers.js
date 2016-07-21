
const assert = require("assert"),
    fs = require('fs'),
    ami = require('local-dfi-asterisk-ami'),
    PeerStates = require('../src/enums/defs/peerStates'),
    DeviceStates = require('../src/enums/defs/deviceStates'),
    /**
     * @type {Asterisk}
     */
    asterisk = require('./mock/asterisk-real'),

    endpointManger = require('../tmp/dfi-linphone-endpoint-manager/endpointManager').getInstance(asterisk),


    config = require('./mock/config.json');


var answerTimeout = 200,
    endCallTimeout = 500,
    eventTimeout = 3000;

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

describe('peers', function () {
    before(function (done) {
        if ((process.argv.length == 3 && process.argv[2] == '/srv/dev/projects/node/dialer2/tests')
            || process.argv.length == 7 && process.argv[6] == '/srv/dev/projects/node/dialer2/tests'
        ) {
            answerTimeout = 200;
            endCallTimeout = 500;
        }

        this.timeout(0);

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

                endpointManger.setupEndpoints(1, 'udp', 'pjsip', 'wszystkie-test');

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
        var linPhones = endpointManger.endpoints;
        var out = {};
        linPhones.forEach(function (entry, key) {
            out[key] = entry;
        });

        var keys = Object.keys(out);

        var endpoint1 = linPhones.get(keys[0]);
        var id = endpoint1.getInterface();

        var p = asterisk.getManager('peer').peers.get(id);
        assert.notEqual(p, undefined);
        assert.equal(p.get('state').status, PeerStates.REGISTERED);
        var d = asterisk.getManager('device').devices.get(id);
        assert.notEqual(d, undefined);
        assert.equal(d.get('state').status, DeviceStates.NOT_INUSE);
        done();

    });
    after(function (done) {
        this.timeout(1000000);
        endpointManger.clear(function () {
            done()
        });
    })
});
