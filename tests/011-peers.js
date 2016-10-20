"use strict";
const assert = require("assert");
const asterisk = require("./mock/asterisk-real");
const EndpointManger = require('local-dfi-linphone-endpoint-manager');
let endpointManger = EndpointManger.getInstance(asterisk);
describe("peers", () => {
    before(function (done) {
        this.timeout(0);
        assert.doesNotThrow(init, 'asterisk init failed');
        function init() {
            asterisk.start()
                .then(() => {
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
                .catch((err) => {
                if (err) {
                    done();
                    throw err;
                }
            });
        }
    });
    it('check presense', function (done) {
        this.timeout(0);
        let linPhones = endpointManger.endpoints;
        let out = {};
        linPhones.forEach(function (entry, key) {
            out[key] = entry;
        });
        let keys = Object.keys(out);
        let endpoint1 = linPhones.get(keys[0]);
        let id = endpoint1.getInterface();
        let p = asterisk.getManager('peer').peers.get(id);
        assert.notEqual(p, undefined);
        assert.equal(p.get('state').status, PeerStates.REGISTERED);
        let d = asterisk.getManager('device').devices.get(id);
        assert.notEqual(d, undefined);
        assert.equal(d.get('state').status, DeviceStates.NOT_INUSE);
        done();
    });
    after(function (done) {
        this.timeout(1000000);
        endpointManger.clear(function () {
            done();
        });
    });
});
//# sourceMappingURL=011-peers.js.map