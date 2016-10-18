"use strict";
const DeviceStates = require("./deviceStates");
var QueueMemberStates;
(function (QueueMemberStates) {
    QueueMemberStates[QueueMemberStates["DEVICE_UNKNOWN"] = DeviceStates.UNKNOWN] = "DEVICE_UNKNOWN";
    /**
     * Queue member is available, eg. Agent is logged in but idle.
     */
    QueueMemberStates[QueueMemberStates["DEVICE_NOT_INUSE"] = 1] = "DEVICE_NOT_INUSE";
    QueueMemberStates[QueueMemberStates["DEVICE_INUSE"] = 2] = "DEVICE_INUSE";
    /**
     * Busy means, phone is in action, eg. is ringing, in call.
     */
    QueueMemberStates[QueueMemberStates["DEVICE_BUSY"] = 3] = "DEVICE_BUSY";
    QueueMemberStates[QueueMemberStates["DEVICE_INVALID"] = 4] = "DEVICE_INVALID";
    /**
     * Device is not available for call, eg. Agent is logged off.
     */
    QueueMemberStates[QueueMemberStates["DEVICE_UNAVAILABLE"] = 5] = "DEVICE_UNAVAILABLE";
    QueueMemberStates[QueueMemberStates["DEVICE_RINGING"] = 6] = "DEVICE_RINGING";
    QueueMemberStates[QueueMemberStates["DEVICE_RINGINUSE"] = 7] = "DEVICE_RINGINUSE";
    QueueMemberStates[QueueMemberStates["DEVICE_ONHOLD"] = 8] = "DEVICE_ONHOLD";
})(QueueMemberStates || (QueueMemberStates = {}));
module.exports = QueueMemberStates;
//# sourceMappingURL=queueMemberStates.js.map