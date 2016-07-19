"use strict";
const AsteriskPeer = require('./asteriskPeer');


class AsteriskSIPPeer extends AsteriskPeer {
    initialize() {
        this.set('technology', 'SIP');
        super.initialize();
    }
}


module.exports = AsteriskSIPPeer;