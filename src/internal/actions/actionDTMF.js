"use strict";
const
    dAmiLib = require("../../../examples/dfi-asterisk-ami/src/dAmi"),
    PlayDTMF = dAmiLib.Actions.PlayDTMF;


class AsteriskActionDTMF {
    constructor(server) {
        this.server = server;
    }

    /**
     * @param {AsteriskChannel|string} channel
     * @param {number} digit
     * @param {function(ManagerError|null,ManagerResponse|undefined)} callback
     * @param thisp
     */
    send(channel, digit, callback, thisp) {

        if (channel instanceof AsteriskChannel) {
            channel = channel.getName();
        }

        /**
         * @type {PlayDTMF}
         */
        var action = new PlayDTMF(channel, digit, '1000');
        this.sendAction(action, onResponse, thisp);
        /**
         * @param err
         * @param {ManagerResponse} response
         */
        function onResponse(err, response) {
            if (err) {
                callback.call(thisp, err);
                return;
            }
            var dbgre;
            if (response.events.length > 0) {
                /**
                 * @type {AsteriskEvent}
                 */
                dbgre = response.events[0];
            } else {
                dbgre = response
            }


            if (typeof callback == "function") {
                callback.call(thisp, null, dbgre);
            }
        }
    }


}
module.exports = AsteriskActionDTMF;