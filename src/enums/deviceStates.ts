enum DeviceStates  {
    /* Device is valid but channel didn't know state */
    UNKNOWN = 0,
        /* Device is not used */
    NOT_INUSE = 1,
        /* Device is in use */
    INUSE = 2,
        /* Device is busy */
    BUSY = 3,
        /* Device is invalid */
    INVALID = 4,
        /* Device is unavailable */
    UNAVAILABLE = 5,
        /* Device is ringing */
    RINGING = 6,
        /* Device is ringing *and* in use */
    RINGINUSE = 7,
        /* Device is on hold */
    ONHOLD = 8,
        /* Total num of device states, used for testing */
    TOTAL = 9
}
export default DeviceStates;
