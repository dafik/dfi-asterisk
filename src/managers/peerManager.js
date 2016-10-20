"use strict";
const AsteriskManager = require("../internal/server/Manager");
const Peers = require("../collections/PeersCollection");
const Peer = require("../models/peers/PeerModel");
const actionNames_1 = require("../internal/asterisk/actionNames");
const eventNames_1 = require("../internal/asterisk/eventNames");
const AstUtil = require("../internal/astUtil");
const IAXPeer = require("../models/peers/IAXPeerModel");
const PJSIPPeer = require("../models/peers/PJSIPPeerModel");
const SIPPeer = require("../models/peers/SIPPeerModel");
const Ip = require("../models/IpAddress");
/**
 * Manages all events related to peers on Asterisk server. For correct work
 * ensure enabled PeerCalledEvents. You have to set
 * <code>eventwhencalled = yes</code> in <code>queues.conf</code>.
 *
 */
class PeerManager extends AsteriskManager {
    constructor(options, state) {
        super(options, state, new Peers());
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
                AstUtil.maybeCallback(callbackFn, context, null, "PeerManager");
            }
        }
        let handlePeers = (err, response) => {
            if (err && err.Message !== "No endpoints found") {
                AstUtil.maybeCallback(callbackFn, context, err);
                return;
            }
            if (typeof response !== "undefined") {
                response.events.forEach((event) => {
                    let peer;
                    if (event.Event === eventNames_1.AST_EVENT.ENDPOINT_LIST) {
                        let peer = new PJSIPPeer(event);
                        this.logger.debug("Adding peer %j (%s)", peer.id, peer.state.name);
                    }
                    else if (event.Event === eventNames_1.AST_EVENT.PEER_ENTRY) {
                        if (event.Channeltype === "SIP") {
                            peer = new SIPPeer(event);
                        }
                        else if (event.Channeltype === "IAX") {
                            peer = new IAXPeer(event);
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
        let map = {};
        map[eventNames_1.AST_EVENT.PEER_STATUS] = this._handlePeerStatusEvent;
        this._mapEvents(map);
        let action1 = { Action: actionNames_1.AST_ACTION.IAX_PEERLIST };
        if (this.server.allowedActions.has(action1.Action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action1, handlePeers, this);
        }
        let action2 = { Action: actionNames_1.AST_ACTION.SIP_PEERS };
        if (this.server.allowedActions.has(action2.Action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action2, handlePeers, this);
        }
        let action3 = { Action: actionNames_1.AST_ACTION.PJSIP_SHOW_ENDPOINTS };
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
        let peer = this.peers.get(event.Peer);
        if (!peer) {
            this.logger.error('discarding peerstatus: peer not found: %s "', event.Peer);
        }
        else {
            let port;
            let address;
            let mask = "255.255.255.255";
            if (peer.technology === Peer.PEER_TECH.SIP) {
                let parts = event.Address.split(":");
                address = parts[0];
                port = parts[1];
            }
            else if (peer.technology === Peer.PEER_TECH.IAX) {
                this.logger.error("error");
            }
            else if (peer.technology === Peer.PEER_TECH.PJSIP) {
                this.logger.error("error");
            }
            let ip = new Ip({
                ipAddress: address,
                mask,
                port: parseInt(port, 10)
            });
            peer.handleStatus(event.$time, event.PeerStatus, ip);
        }
    }
    _addPeer(peer) {
        if (this.server.managers.device.enabled) {
            let device = this.server.managers.device.devices.get(peer.id);
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
module.exports = PeerManager;
//# sourceMappingURL=peerManager.js.map