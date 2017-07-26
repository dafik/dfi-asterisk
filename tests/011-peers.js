"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const asterisk = require("./mock/asterisk-real");
const EndpointManger = require("local-dfi-linphone-endpoint-manager/src/endpointManager");
const manager = require("local-dfi-linphone-endpoint-manager");
const PeerStates = require("../src/enums/peerStates");
const DeviceStates = require("../src/enums/deviceStates");
const local_dfi_debug_logger_1 = require("local-dfi-debug-logger");
const index_1 = require("../index");
const logger = new local_dfi_debug_logger_1.default("sip:factory");
const endpointManger = manager.getInstance(asterisk);
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
                    done(new Error("peer manager is not enabled but required"));
                    return;
                }
                endpointManger.on(EndpointManger.events.ERROR, error);
                endpointManger.on(EndpointManger.events.ENDPOINTS_SET, finish);
                endpointManger.setupEndpoints(1, "pbx", "udp", "sip", "wszystkie-test");
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
        const linPhones = endpointManger.endpoints;
        const keys = [...linPhones.keys()];
        const endpoint1 = linPhones.get(keys[0]);
        const id = endpoint1.getInterface();
        const peer = asterisk.managers.peer.peers.get(id);
        assert.notEqual(peer, undefined);
        if (peer.state.status !== PeerStates.REGISTERED) {
            const x = peer.stateHistory;
            // console.log("%j", x);
        }
        const device = asterisk.managers.device.devices.get(id);
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
    it("chcek sip show users + sip show peer", (done) => {
        const endpointsToReturn = asterisk.managers.peer.peers.getPeersByTech("SIP");
        function addTransports(foundEndpointsTmp) {
            const tmpMap = new Map();
            Array.from(foundEndpointsTmp.keys()).slice(0, 3).forEach((key) => {
                tmpMap.set(key, foundEndpointsTmp.get(key));
            });
            foundEndpointsTmp = tmpMap;
            const foundEndpoints = new Map();
            const waitForEndpoint = new Set(foundEndpointsTmp.keys());
            foundEndpointsTmp.forEach((endpoint1) => {
                logger.debug("sending ast: sip show peer " + endpoint1.objectName);
                asterisk.sendEventGeneratingAction({ Action: index_1.AST_ACTION.COMMAND, Command: "sip show peer " + endpoint1.objectName }, onSipShowPeer.bind(this));
            });
            function onSipShowPeer(err1, resp) {
                if (err1) {
                    throw err1;
                }
                const result = resp.$content.split("\n");
                let name;
                let found = false;
                result.forEach((line) => {
                    if (-1 !== line.indexOf("* Name")) {
                        const parts = line.split(":");
                        name = parts[1].trim();
                        logger.debug("response ast: sip show peer " + name);
                    }
                    if (-1 !== line.indexOf("Allowed.Trsp")) {
                        const transports = line.replace("Allowed.Trsp :", "").trim().split(",");
                        found = true;
                    }
                });
                if (found) {
                    const endpoint = foundEndpointsTmp.get(name);
                    foundEndpoints.set(endpoint.objectName, endpoint);
                }
                else {
                    const c = 1;
                }
                waitForEndpoint.delete(name);
                if (waitForEndpoint.size === 0) {
                    done();
                }
            }
        }
        asterisk.sendAction({ Action: index_1.AST_ACTION.COMMAND, Command: "sip show users" }, (err, response) => {
            let match;
            const foundEndpointsTmp = new Map();
            const lines = response.$content.split("\n");
            lines.shift();
            lines.forEach((line) => {
                match = line.split(/\s+/);
                if (endpointsToReturn.has(match[0])) {
                    const endpoint = endpointsToReturn.get(match[0]);
                    endpoint.password = match[1];
                    endpoint.context = match[2];
                    foundEndpointsTmp.set(endpoint.objectName, endpoint);
                }
            });
            addTransports(foundEndpointsTmp);
        });
    }).timeout(1000000);
    after(onAfter);
});
//# sourceMappingURL=011-peers.js.map