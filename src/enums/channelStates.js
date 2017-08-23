"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChannelStates;
(function (ChannelStates) {
    /*Channel is down and available */
    ChannelStates[ChannelStates["DOWN"] = 0] = "DOWN";
    /*Channel is down, but reserved */
    ChannelStates[ChannelStates["RESERVED"] = 1] = "RESERVED";
    /*Channel is off hook */
    ChannelStates[ChannelStates["OFFHOOK"] = 2] = "OFFHOOK";
    /*Digits (or equivalent) have been dialed */
    ChannelStates[ChannelStates["DIALING"] = 3] = "DIALING";
    /*Line is ringing */
    ChannelStates[ChannelStates["RING"] = 4] = "RING";
    /*Remote end is ringing */
    ChannelStates[ChannelStates["RINGING"] = 5] = "RINGING";
    /*Line is up */
    ChannelStates[ChannelStates["UP"] = 6] = "UP";
    /*Line is busy */
    ChannelStates[ChannelStates["BUSY"] = 7] = "BUSY";
    /*Digits (or equivalent) have been dialed while offhook */
    ChannelStates[ChannelStates["DIALING_OFFHOOK"] = 8] = "DIALING_OFFHOOK";
    /*Channel has detected an incoming call and is waiting for ring */
    ChannelStates[ChannelStates["PRERING"] = 9] = "PRERING";
    /*Do not transmit voice data */
    ChannelStates[ChannelStates["MUTE"] = 65536] = "MUTE";
    /**
     * The channel has been hung up and is not longer available on the Asterisk server.
     */
    ChannelStates[ChannelStates["HANGUP"] = -1] = "HANGUP";
})(ChannelStates || (ChannelStates = {}));
exports.default = ChannelStates;
//# sourceMappingURL=channelStates.js.map