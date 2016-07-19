"use strict";
const
    dAmiLib = require("../../../examples/dfi-asterisk-ami/src/dAmi"),
    SipPeers = dAmiLib.Actions.SIPpeers;

class AsteriskActionPeers {
    constructor(server) {
        this.server = server;
    }


    /**
     * @param {function((ManagerError|null),AsteriskEvent[])} [callback]
     * @param thisp
     */
    getEntries(callback, thisp) {
        this._initializeIfNeeded(onInitialized, this);
        function onInitialized(err) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            /**
             * @type {SipPeers}
             */
            var action = new SipPeers();
            this.sendEventGeneratingAction(action, onResponse);
        }

        function onResponse(err, response) {
            if (err) {
                callback.call(thisp, err);
            }
            /**
             * @type {AsteriskEvent[]}
             */
            var peerEntries = [];

            response.events.forEach(function (event) {
                if (event.event == 'peerentry') {
                    peerEntries.push(event);
                }
            });
            if (typeof callback == "function") {
                callback.call(thisp, null, peerEntries)
            }

        }
    }

}
module.exports = AsteriskActionPeers;