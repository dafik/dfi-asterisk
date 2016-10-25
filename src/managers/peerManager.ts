import AsteriskManager = require("../internal/server/Manager");
import Peers = require("../collections/PeersCollection");
import Peer = require("../models/peers/PeerModel");
import {IDfiAMIMultiCallback, IDfiCallbackResult} from "../definitions/interfaces";
import {AST_ACTION} from "../internal/asterisk/actionNames";
import {IAstActionIAXpeerlist, IAstActionPJSIPShowEndpoints, IAstActionSIPpeers} from "../internal/asterisk/actions";
import {AST_EVENT} from "../internal/asterisk/eventNames";
import {IAstEventEndpointList, IAstEventPeerEntry, IAstEventPeerIAXEntry, IAstEventPeerSIPEntry, IAstEventPeerStatus} from "../internal/asterisk/events";

import AstUtil = require("../internal/astUtil");
import IAXPeer = require("../models/peers/IAXPeerModel");
import PJSIPPeer = require("../models/peers/PJSIPPeerModel");
import SIPPeer = require("../models/peers/SIPPeerModel");
import Ip = require("../models/IpAddress");

/**
 * Manages all events related to peers on Asterisk server. For correct work
 * ensure enabled PeerCalledEvents. You have to set
 * <code>eventwhencalled = yes</code> in <code>queues.conf</code>.
 *
 */
class PeerManager extends AsteriskManager<Peer, Peers> {

    constructor(options, state) {
        super(options, state, new Peers());

    }

    get peers(): Peers {
        return this._collection;
    }

    /**
     * Retrieves all peers registered at Asterisk server by sending an PeersAction.
     * @param {function} [callbackFn]
     * @param {*} [context] callback this
     */
    public start(callbackFn?: IDfiCallbackResult, context?) {
        let waiting = 0;

        function finish() {
            if (waiting === 0) {
                this.server.logger.info('manager "PeerManager" started');
                AstUtil.maybeCallback(callbackFn, context, null, "PeerManager");
            }
        }

        let handlePeers: IDfiAMIMultiCallback<IAstEventPeerEntry|IAstEventEndpointList> = (err, response) => {
            if (err && err.message !== "No endpoints found") {
                AstUtil.maybeCallback(callbackFn, context, err);
                return;
            }
            if (typeof response !== "undefined") {
                response.events.forEach((event: IAstEventEndpointList|IAstEventPeerEntry) => {

                    let peer: SIPPeer|IAXPeer|PJSIPPeer;

                    if (event.Event === AST_EVENT.ENDPOINT_LIST) {
                        let peer = new PJSIPPeer(event as IAstEventEndpointList);
                        this.logger.debug("Adding peer %j (%s)", peer.id, peer.state.name);

                    } else if (event.Event === AST_EVENT.PEER_ENTRY) {

                        if ((event as IAstEventPeerEntry).Channeltype === "SIP") {
                            peer = new SIPPeer(event as IAstEventPeerSIPEntry);
                        } else if ((event as IAstEventPeerEntry).Channeltype === "IAX") {
                            peer = new IAXPeer(event as IAstEventPeerIAXEntry);
                        } else {
                            this.logger.info('unknown peer technology: "' + (event as IAstEventPeerEntry).Channeltype + '"');
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
        map[AST_EVENT.PEER_STATUS] = this._handlePeerStatusEvent;
        this._mapEvents(map);

        let action1: IAstActionIAXpeerlist = {Action: AST_ACTION.IAX_PEERLIST};
        if (this.server.allowedActions.has(action1.Action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action1, handlePeers, this);
        }
        let action2: IAstActionSIPpeers = {Action: AST_ACTION.SIP_PEERS};
        if (this.server.allowedActions.has(action2.Action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action2, handlePeers, this);
        }
        let action3: IAstActionPJSIPShowEndpoints = {Action: AST_ACTION.PJSIP_SHOW_ENDPOINTS};
        if (this.server.allowedActions.has(action3.Action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action3, handlePeers, this);
        }
        finish.call(this);
    }

    public disconnected() {
        this.peers.clear();
    }

    public gc() {
        this._removeOldHistory();
    }

    private _handlePeerStatusEvent(event: IAstEventPeerStatus) {
        this.logger.debug("handle  PeerStatusEvent peer: %j,(%s),%j", event.Peer, event.PeerStatus, event.Address);

        let peer = this.peers.get(event.Peer);
        if (!peer) {
            this.logger.error('discarding peerstatus: peer not found: %s "', event.Peer);
        } else {
            let port = "0";
            let address = null;
            let mask = "255.255.255.255";

            if (peer.technology === Peer.PEER_TECH.SIP) {
                if (event.Address) {
                    let parts = event.Address.split(":");
                    address = parts[0];
                    port = parts[1];
                } else {
                    this.logger.error("no addres found");
                }
            } else if (peer.technology === Peer.PEER_TECH.IAX) {
                this.logger.error("error");
            } else if (peer.technology === Peer.PEER_TECH.PJSIP) {
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

    private _addPeer(peer: Peer) {
        if (this.server.managers.device.enabled) {
            let device = this.server.managers.device.devices.get(peer.id);
            if (device) {
                peer.device = device;
            }
        }

        this.peers.add(peer);
    }

    private _removeOldHistory() {

        this.peers.forEach((peer: Peer) => {
            peer.removeOldHistory();
        });
    }
}

export = PeerManager;
