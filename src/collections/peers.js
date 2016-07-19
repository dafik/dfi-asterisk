"use strict";
const 
    AsteriskCollection = require('../internal/asteriskCollection'),
    AsteriskPeer = require('../models/peers/asteriskPeer'),
    _ = require('lodash');


class PeersCollection extends AsteriskCollection {
    constructor() {
        super();

        this._byTech = {};

        this.on('add', this.onPeerAdd, this);
        this.on('remove', this.onPeerRemove, this);
    }

    onPeerAdd(peer) {
        var objectName = peer.get('objectname'),
            technology = peer.get('technology');

        if (!_.has(this._byTech, technology)) {
            this._byTech[technology] = {};
        }
        this._byTech[technology] [objectName] = peer;

    }

    onPeerRemove(peer) {
        var objectName = peer.get('objectname'),
            technology = peer.get('technology');
        delete this._byTech[technology] [objectName];
        if (_.keys(this._byTech[technology]).length == 0) {
            delete this._byTech[technology];
        }
    }
}
PeersCollection.prototype._model = AsteriskPeer;
PeersCollection.prototype._idField = 'id';


module.exports = PeersCollection;