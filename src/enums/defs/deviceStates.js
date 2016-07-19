"use strict";
/**
 * @memberOf enums
 * @class
 */
var DeviceStates = {
    UNKNOWN: 0, /*!< Device is valid but channel didn't know state */
    NOT_INUSE: 1, /*!< Device is not used */
    INUSE: 2, /*!< Device is in use */
    BUSY: 3, /*!< Device is busy */
    INVALID: 4, /*!< Device is invalid */
    UNAVAILABLE: 5, /*!< Device is unavailable */
    RINGING: 6, /*!< Device is ringing */
    RINGINUSE: 7, /*!< Device is ringing *and* in use */
    ONHOLD: 8, /*!< Device is on hold */
    TOTAL: 9        /*!< Total num of device states, used for testing */
};
Object.freeze(DeviceStates);
module.exports = DeviceStates;

