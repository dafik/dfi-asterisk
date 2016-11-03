"use strict";
const AsteriskCollection = require("../internal/asteriskCollection");
const Peer = require("../models/peers/PeerModel");
const P_PROP_PEERS_BY_TECH = "byTech";
class Peers extends AsteriskCollection {
    constructor() {
        super({
            model: Peer
        });
        this.setProp(P_PROP_PEERS_BY_TECH, new Map());
        this.on(AsteriskCollection.events.ADD, this._onPeerAdd, this);
        this.on(AsteriskCollection.events.REMOVE, this._onPeerRemove, this);
    }
    get(id) {
        return super.get(id);
    }
    add(element) {
        return super.add(element);
    }
    clear() {
        return super.clear();
    }
    forEach(fn, thisArg) {
        super.forEach(fn, thisArg);
    }
    get peerTechs() {
        return new Set([...this.getProp(P_PROP_PEERS_BY_TECH).keys()]);
    }
    getPeersByTech(tech) {
        if (this.peerTechs.has(tech)) {
            return new Map([...this.getProp(P_PROP_PEERS_BY_TECH).get(tech).entries()]);
        }
        else {
            return new Map();
        }
    }
    _onPeerAdd(peer) {
        let technology = peer.technology;
        if (!this.getProp(P_PROP_PEERS_BY_TECH).has(technology)) {
            this.getProp(P_PROP_PEERS_BY_TECH).set(technology, new Map());
        }
        this.getProp(P_PROP_PEERS_BY_TECH).get(technology).set(peer.objectName, peer);
    }
    _onPeerRemove(peer) {
        let technology = peer.technology;
        delete this.getProp(P_PROP_PEERS_BY_TECH).get(technology).delete(peer.objectName);
        if (this.getProp(P_PROP_PEERS_BY_TECH).get(technology).size === 0) {
            this.getProp(P_PROP_PEERS_BY_TECH).delete(technology);
        }
    }
}
module.exports = Peers;
//# sourceMappingURL=PeersCollection.js.map