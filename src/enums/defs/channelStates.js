"use strict"

var ChannelStates = {
    DOWN: 0, /*!< Channel is down and available */
    RESERVED: 1, /*!< Channel is down, but reserved */
    OFFHOOK: 2, /*!< Channel is off hook */
    DIALING: 3, /*!< Digits (or equivalent) have been dialed */
    RING: 4, /*!< Line is ringing */
    RINGING: 5, /*!< Remote end is ringing */
    UP: 6, /*!< Line is up */
    BUSY: 7, /*!< Line is busy */
    DIALING_OFFHOOK: 8, /*!< Digits (or equivalent) have been dialed while offhook */
    PRERING: 9, /*!< Channel has detected an incoming call and is waiting for ring */
    MUTE: 65536, /*!< Do not transmit voice data */

    /**
     * The channel has been hung up and is not longer available on the Asterisk server.
     */
    HANGUP: -1

};

module.exports = ChannelStates;