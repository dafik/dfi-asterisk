"use strict";
const AsteriskPeer = require('./asteriskPeer');

class AsteriskPJSIPPeer extends AsteriskPeer {
    initialize() {
        this.set('technology', 'PJSIP');
        if (this.get('devicestate')) {
            this.set('status', this.get('devicestate'))
        }
        super.initialize();
    }


}
module.exports = AsteriskPJSIPPeer;