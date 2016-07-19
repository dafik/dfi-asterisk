"use strict";
var DeviceState = require('./deviceStates');
var QueueMemberStates = {
    DEVICE_UNKNOWN: DeviceState.UNKNOWN,
    /**
     * Queue member is available, eg. Agent is logged in but idle.
     */
    DEVICE_NOT_INUSE: DeviceState.NOT_INUSE,
    DEVICE_INUSE: DeviceState.INUSE,
    /**
     * Busy means, phone is in action, eg. is ringing, in call.
     */
    DEVICE_BUSY: DeviceState.BUSY,
    DEVICE_INVALID: DeviceState.INVALID,
    /**
     * Device is not available for call, eg. Agent is logged off.
     */
    DEVICE_UNAVAILABLE: DeviceState.UNAVAILABLE,
    DEVICE_RINGING: DeviceState.RINGING,
    DEVICE_RINGINUSE: DeviceState.RINGINUSE,
    DEVICE_ONHOLD: DeviceState.ONHOLD
};
Object.freeze(QueueMemberStates);
module.exports = QueueMemberStates;