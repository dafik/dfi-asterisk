"use strict";
const AsteriskPeer = require('./asteriskPeer');


class AsteriskIAXPeer extends AsteriskPeer {

    initialize() {

        this.set('technology', 'IAX2');
        this.set('ipport', this.get('port'));
        this.unset('port');

        super.initialize();
    }
}
module.exports = AsteriskIAXPeer;