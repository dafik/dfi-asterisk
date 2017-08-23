"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("../internal/server/Manager");
const PeersCollection_1 = require("../collections/PeersCollection");
const PeerModel_1 = require("../models/peers/PeerModel");
const astUtil_1 = require("../internal/astUtil");
const IAXPeerModel_1 = require("../models/peers/IAXPeerModel");
const PJSIPPeerModel_1 = require("../models/peers/PJSIPPeerModel");
const SIPPeerModel_1 = require("../models/peers/SIPPeerModel");
const IpAddressModel_1 = require("../models/IpAddressModel");
const eventNames_1 = require("../internal/asterisk/eventNames");
const actionNames_1 = require("../internal/asterisk/actionNames");
/**
 * Manages all events related to peers on Asterisk server. For correct work
 * ensure enabled PeerCalledEvents. You have to set
 * <code>eventwhencalled = yes</code> in <code>queues.conf</code>.
 *
 */
class PeerManager extends Manager_1.default {
    constructor(options, state) {
        super(options, state, new PeersCollection_1.default());
        if (!this.enabled) {
            return;
        }
        const map = {};
        map[eventNames_1.default.PEER_STATUS] = this._handlePeerStatusEvent;
        this._mapEvents(map);
    }
    get peers() {
        return this._collection;
    }
    /**
     * Retrieves all peers registered at Asterisk server by sending an PeersAction.
     * @param {function} [callbackFn]
     * @param {*} [context] callback this
     */
    start(callbackFn, context) {
        let waiting = 0;
        function finish() {
            if (waiting === 0) {
                this.server.logger.info('manager "PeerManager" started');
                astUtil_1.default.maybeCallback(callbackFn, context, null, "PeerManager");
            }
        }
        const handlePeers = (err, response) => {
            if (err && err.message !== "No endpoints found") {
                astUtil_1.default.maybeCallback(callbackFn, context, err);
                return;
            }
            if (typeof response !== "undefined") {
                response.events.forEach((event) => {
                    let peer;
                    if (event.Event === eventNames_1.default.ENDPOINT_LIST) {
                        peer = new PJSIPPeerModel_1.default(event);
                        this.logger.debug("Adding peer %j (%s)", peer.id, peer.state.name);
                    }
                    else if (event.Event === eventNames_1.default.PEER_ENTRY) {
                        if (event.Channeltype === "SIP") {
                            peer = new SIPPeerModel_1.default(event);
                        }
                        else if (event.Channeltype === "IAX") {
                            peer = new IAXPeerModel_1.default(event);
                        }
                        else {
                            this.logger.info('unknown peer technology: "' + event.Channeltype + '"');
                        }
                        this.logger.debug("Adding peer %j (%s)", peer.id, peer.state.name);
                    }
                    this._addPeer(peer);
                });
            }
            waiting--;
            finish.call(this);
        };
        this.server.logger.info('starting manager "PeerManager"');
        if (!this.enabled) {
            finish.call(this);
            return;
        }
        const action1 = { Action: actionNames_1.default.IAX_PEERLIST };
        if (this.server.allowedActions.has(action1.Action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action1, handlePeers, this);
        }
        const action2 = { Action: actionNames_1.default.SIP_PEERS };
        if (this.server.allowedActions.has(action2.Action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action2, handlePeers, this);
        }
        const action3 = { Action: actionNames_1.default.PJSIP_SHOW_ENDPOINTS };
        if (this.server.allowedActions.has(action3.Action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action3, handlePeers, this);
        }
        finish.call(this);
    }
    disconnected() {
        this.peers.clear();
    }
    gc() {
        this._removeOldHistory();
    }
    _handlePeerStatusEvent(event) {
        this.logger.debug("handle  PeerStatusEvent peer: %j,(%s),%j", event.Peer, event.PeerStatus, event.Address);
        const peer = this.peers.get(event.Peer);
        if (!peer) {
            this.logger.error('discarding peerstatus: peer not found: %s "', event.Peer);
        }
        else {
            let port = "0";
            let address = null;
            const mask = "255.255.255.255";
            if (peer.technology === PeerModel_1.default.PEER_TECH.SIP) {
                if (event.Address) {
                    const parts = event.Address.split(":");
                    address = parts[0];
                    port = parts[1];
                }
                else {
                    this.logger.error("no addres found %j", event);
                }
            }
            else if (peer.technology === PeerModel_1.default.PEER_TECH.IAX) {
                this.logger.error("error");
            }
            else if (peer.technology === PeerModel_1.default.PEER_TECH.PJSIP) {
                this.logger.error("error");
            }
            const ip = new IpAddressModel_1.default({
                ipAddress: address,
                mask,
                port: parseInt(port, 10)
            });
            peer.handleStatus(event.$time, event.PeerStatus, ip);
        }
    }
    _addPeer(peer) {
        if (this.server.managers.device.enabled) {
            const device = this.server.managers.device.devices.get(peer.id);
            if (device) {
                peer.device = device;
            }
        }
        this.peers.add(peer);
    }
    _removeOldHistory() {
        this.peers.forEach((peer) => {
            peer.removeOldHistory();
        });
    }
}
exports.default = PeerManager;
//# sourceMappingURL=PeerManager.js.map