import AsteriskCollection = require("../internal/asteriskCollection");
import Peer = require("../models/peers/PeerModel");

const P_PROP_PEERS_BY_TECH = "byTech";

class Peers extends AsteriskCollection<Peer> {

    constructor() {
        super({
            model: Peer
        });

        this.setProp(P_PROP_PEERS_BY_TECH, new Map());

        this.on(AsteriskCollection.events.ADD, this._onPeerAdd, this);
        this.on(AsteriskCollection.events.REMOVE, this._onPeerRemove, this);
    }

    public get(id: any): Peer {
        return super.get(id);
    }

    public add(element: Peer): this {
        return super.add(element);
    }

    public clear(): this {
        return super.clear();
    }

    public forEach(fn: (value: Peer, index: string, map: Map<string, Peer>)=>void, thisArg?: any): void {
        super.forEach(fn, thisArg);
    }

    public get peerTechs() {
        return new Set([...this.getProp(P_PROP_PEERS_BY_TECH).keys()]);
    }

    public getPeersByTech(tech) {
        if (this.peerTechs.has(tech)) {
            return new Map([...this.getProp(P_PROP_PEERS_BY_TECH).get(tech).entries()]);
        } else {
            return new Map();
        }
    }

    private _onPeerAdd<T extends Peer>(peer: Peer) {
        let technology = peer.technology;

        if (!this.getProp(P_PROP_PEERS_BY_TECH).has(technology)) {
            this.getProp(P_PROP_PEERS_BY_TECH).set(technology, new Map());
        }
        this.getProp(P_PROP_PEERS_BY_TECH).get(technology).set(peer.objectName, peer);
    }

    private _onPeerRemove<T extends Peer>(peer: T) {
        let technology = peer.technology;

        delete this.getProp(P_PROP_PEERS_BY_TECH).get(technology).delete(peer.objectName);
        if (this.getProp(P_PROP_PEERS_BY_TECH).get(technology).size === 0) {
            this.getProp(P_PROP_PEERS_BY_TECH).delete(technology);
        }
    }
}

export = Peers;
