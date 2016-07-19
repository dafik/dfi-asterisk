"use strict";
const 
    _ = require('lodash'),
    AsteriskManager = require('../internal/asteriskManager'),

    dAmiLib = require("../../examples/dfi-asterisk-ami/src/dAmi"),
    actions = dAmiLib.Actions,



    PeersCollection = require('../collections/peers'),
    AsteriskPJSIPPeer = require('../models/peers/asteriskPJSIPPeer'),
    AsteriskIAXPeer = require('../models/peers/asteriskIAXPeer'),
    AsteriskSipPeer = require('../models/peers/asteriskSIPPeer');


/**
 * Manages all events related to peers on Asterisk server. For correct work
 * ensure enabled PeerCalledEvents. You have to set
 * <code>eventwhencalled = yes</code> in <code>queues.conf</code>.
 *
 * @memberOf manager
 * @param {AsteriskServer} asteriskServer
 * @constructor
 *
 * @property {Logger} logger
 * @property {AsteriskServer} server
 * @property {PeersCollection} peers A Map of peers by their peersId.
 * @property {ChannelManager} channelManager

 */
class PeerManager extends AsteriskManager {

    constructor(options, state) {
        super(options, state);
        this.peers = new PeersCollection();
    }

    /**
     * Retrieves all peers registered at Asterisk server by sending an PeersAction.
     * @param {function} [callback]
     * @param {*} [thisp] callback this
     */
    start(callback, thisp) {
        var waiting = 0;
        var action;

        function handleIaxPeers(err, response) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            if (typeof response != "undefined") {
                response.getEvents().forEach(onEachEvent, this)
            }
            waiting--;
            checkWaiting.call(this);
            function onEachEvent(event) {
                //if (event.event == 'EndpointList' || event.event == 'events'.EndpointList) {
                if (event.event == 'peerentry') {
                    handlePeerEntry.call(this, event);
                } else {
                    var x = 1;
                }
            }
        }

        function handleSipPeers(err, response) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            if (typeof response != "undefined") {
                response.getEvents().forEach(onEachEvent, this)
            }
            //TODO implement
            waiting--;
            checkWaiting.call(this);

            function onEachEvent(event) {
                //if (event.event == 'EndpointList' || event.event == 'events'.EndpointList) {
                if (event.event == 'peerentry') {
                    handlePeerEntry.call(this, event);
                } else {
                    var x = 1;
                }
            }
        }

        function handlePjsipPeers(err, response) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            if (typeof response != "undefined") {
                response.getEvents().forEach(onEachEvent, this)
            }
            waiting--;
            checkWaiting.call(this);
            function onEachEvent(event) {
                //if (event.event == 'EndpointList' || event.event == 'events'.EndpointList) {
                if (event.event == 'endpointlist') {
                    handleEndpointList.call(this, event);
                } else {
                    var x = 1;
                }
            }
        }

        function handlePeerEntry(event) {
            /**
             * @type {AsteriskPeer}
             */
            var peer;
            if (event.channeltype == 'SIP') {
                peer = new AsteriskSipPeer(event, {server: this.server});
            } else if (event.channeltype == 'IAX') {
                peer = new AsteriskIAXPeer(event, {server: this.server});
            } else {
                this.logger.info('unknown peer technology: "' + event.channeltype + '"');
            }

            this.logger.debug("Adding peer %j (%s)", peer.id, peer.get('state').name);
            this._addPeer(peer);
        }

        function handleEndpointList(event) {
            /**
             * @type {AsteriskPeer}
             */
            var peer = new AsteriskPJSIPPeer(event, {server: this.server, event: event});
            this.logger.debug("Adding peer %j (%s)", peer.id, peer.get('state').name);
            this._addPeer(peer);
            //this.peers.add(peer);
        }

        function finish() {
            if (typeof callback == "function") {
                this.server.loggers.logger.info('manager "PeerManager" started');
                callback.call(thisp, null, 'PeerManager');
            }
        }

        function checkWaiting() {
            if (waiting == 0) {
                finish.call(this);
            }
        }

        this.server.loggers.logger.info('starting manager "PeerManager"');

        if (!this.enabled) {
            finish.call(this);
            return
        }

        var map = {
            //peerStatus

            'peerstatus': this._handlePeerStatusEvent
        };

        this._mapEvents(map);

        action = new actions.IAXpeerlist();  //asterisk < 12
        if (this.server.checkIsActionAllowed(action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action, handleIaxPeers, this)
        }
        action = new actions.SIPpeers();
        if (this.server.checkIsActionAllowed(action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action, handleSipPeers, this)
        }
        action = new actions.PJSIPShowEndpoints();
        if (this.server.checkIsActionAllowed(action)) {
            waiting++;
            this.server.sendEventGeneratingAction(action, handlePjsipPeers, this);
        }
        checkWaiting.call(this);
    }

    disconnected() {
        this.peers.clear();
    }

    _handlePeerStatusEvent(event) {
        this.logger.debug("handle  PeerStatusEvent peer: %j,(%s),%j", event.peer, event.peerstatus, event.address);

        var peer = this.peers.get(event.peer);
        if (!peer) {
            this.logger.error('discarding peerstatus: peer not found: "' + event.peer + '"');
        }
        peer.handleStatus(event.dateReceived, event.peerstatus, event.address);
    }

    /**
     * Add a new peer to the manager.
     *
     * @param {AsteriskPeer} peer peer to add.
     */
    _addPeer(peer) {
        if (this.server.managers.device.enabled) {
            var device = this.server.managers.device.devices.get(peer.id);
            if (device) {
                peer.device = device;
            }
        }

        this.peers.add(peer);
    }

    toJSON() {
        var obj = super.toJSON();
        obj.collection = this.peers.toJSON();


        return obj;
    }
    _removeOldHistory(){
        
        this.peers.forEach(function (peer) {
            peer._removeOldHistory()
        });
    }

    gc(){
        this._removeOldHistory()
    }

}

module.exports = PeerManager;