"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../internal/asteriskCollection");
const PeerModel_1 = require("../models/peers/PeerModel");
const P_PROP_PEERS_BY_TECH = "byTech";
class Peers extends asteriskCollection_1.default {
    constructor() {
        super({
            model: PeerModel_1.default
        });
        this.setProp(P_PROP_PEERS_BY_TECH, new Map());
        this.on(asteriskCollection_1.default.events.ADD, this._onPeerAdd, this);
        this.on(asteriskCollection_1.default.events.REMOVE, this._onPeerRemove, this);
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
        const technology = peer.technology;
        if (!this.getProp(P_PROP_PEERS_BY_TECH).has(technology)) {
            this.getProp(P_PROP_PEERS_BY_TECH).set(technology, new Map());
        }
        this.getProp(P_PROP_PEERS_BY_TECH).get(technology).set(peer.objectName, peer);
    }
    _onPeerRemove(peer) {
        const technology = peer.technology;
        this.getProp(P_PROP_PEERS_BY_TECH).get(technology).delete(peer.objectName);
        if (this.getProp(P_PROP_PEERS_BY_TECH).get(technology).size === 0) {
            this.getProp(P_PROP_PEERS_BY_TECH).delete(technology);
        }
    }
}
exports.default = Peers;
//# sourceMappingURL=PeersCollection.js.map