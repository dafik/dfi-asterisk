enum ChannelStates  {
    /*Channel is down and available */
    DOWN = 0,
        /*Channel is down, but reserved */
    RESERVED = 1,
        /*Channel is off hook */
    OFFHOOK = 2,
        /*Digits (or equivalent) have been dialed */
    DIALING = 3,
        /*Line is ringing */
    RING = 4,
        /*Remote end is ringing */
    RINGING = 5,
        /*Line is up */
    UP = 6,
        /*Line is busy */
    BUSY = 7,
        /*Digits (or equivalent) have been dialed while offhook */
    DIALING_OFFHOOK = 8,
        /*Channel has detected an incoming call and is waiting for ring */
    PRERING = 9,
        /*Do not transmit voice data */
    MUTE = 65536,

        /**
         * The channel has been hung up and is not longer available on the Asterisk server.
         */
    HANGUP = -1

}
export default ChannelStates;
