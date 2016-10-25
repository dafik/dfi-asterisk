"use strict";
const assert = require("assert");
const asterisk = require("./mock/asterisk-real");
const EndpointManger = require("local-dfi-linphone-endpoint-manager/src/endpointManager");
const manager = require("local-dfi-linphone-endpoint-manager");
const PeerStates = require("../src/enums/peerStates");
const DeviceStates = require("../src/enums/deviceStates");
let endpointManger = manager.getInstance(asterisk);
describe("peers", () => {
    function onAfter(done) {
        this.timeout(1000000);
        endpointManger.clear(() => {
            done();
        });
    }
    function onBefore(done) {
        this.timeout(0);
        assert.doesNotThrow(init, "asterisk init failed");
        function init() {
            asterisk.start()
                .then(() => {
                if (!asterisk.managers.peer.enabled) {
                    done(new Error("peer manager is not enabled but required for originate async"));
                    return;
                }
                if (!asterisk.managers.device.enabled) {
                    done(new Error("device manager is not enabled but required for originate async"));
                    return;
                }
                endpointManger.on(EndpointManger.events.ERROR, error);
                endpointManger.on(EndpointManger.events.ENDPOINTS_SET, finish);
                endpointManger.setupEndpoints(1, "udp", "sip", "wszystkie-test");
                function error(err) {
                    endpointManger.removeListener(EndpointManger.events.ERROR, error);
                    endpointManger.removeListener(EndpointManger.events.ENDPOINTS_SET, finish);
                    done();
                    throw err;
                }
                function finish() {
                    endpointManger.removeListener(EndpointManger.events.ERROR, error);
                    endpointManger.removeListener(EndpointManger.events.ENDPOINTS_SET, finish);
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
    }
    function onCheckPresence(done) {
        this.timeout(0);
        let linPhones = endpointManger.endpoints;
        let keys = [...linPhones.keys()];
        let endpoint1 = linPhones.get(keys[0]);
        let id = endpoint1.getInterface();
        let peer = asterisk.managers.peer.peers.get(id);
        assert.notEqual(peer, undefined);
        if (peer.state.status !== PeerStates.REGISTERED) {
            let x = peer.stateHistory;
        }
        let device = asterisk.managers.device.devices.get(id);
        assert.notEqual(device, undefined);
        if (device.state.status !== DeviceStates.NOT_INUSE) {
            setTimeout(() => {
                assert.equal(device.state.status, DeviceStates.NOT_INUSE);
                done();
            }, 1000);
        }
        else {
            assert.equal(device.state.status, DeviceStates.NOT_INUSE);
            done();
        }
    }
    before(onBefore);
    it("check presense", onCheckPresence);
    after(onAfter);
});
//# sourceMappingURL=011-peers.js.map