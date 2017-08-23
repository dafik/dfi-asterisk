"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceStates;
(function (DeviceStates) {
    /* Device is valid but channel didn't know state */
    DeviceStates[DeviceStates["UNKNOWN"] = 0] = "UNKNOWN";
    /* Device is not used */
    DeviceStates[DeviceStates["NOT_INUSE"] = 1] = "NOT_INUSE";
    /* Device is in use */
    DeviceStates[DeviceStates["INUSE"] = 2] = "INUSE";
    /* Device is busy */
    DeviceStates[DeviceStates["BUSY"] = 3] = "BUSY";
    /* Device is invalid */
    DeviceStates[DeviceStates["INVALID"] = 4] = "INVALID";
    /* Device is unavailable */
    DeviceStates[DeviceStates["UNAVAILABLE"] = 5] = "UNAVAILABLE";
    /* Device is ringing */
    DeviceStates[DeviceStates["RINGING"] = 6] = "RINGING";
    /* Device is ringing *and* in use */
    DeviceStates[DeviceStates["RINGINUSE"] = 7] = "RINGINUSE";
    /* Device is on hold */
    DeviceStates[DeviceStates["ONHOLD"] = 8] = "ONHOLD";
    /* Total num of device states, used for testing */
    DeviceStates[DeviceStates["TOTAL"] = 9] = "TOTAL";
})(DeviceStates || (DeviceStates = {}));
exports.default = DeviceStates;
//# sourceMappingURL=deviceStates.js.map