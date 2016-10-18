import DeviceStates = require("./deviceStates");
enum QueueMemberStates  {
    DEVICE_UNKNOWN = (DeviceStates.UNKNOWN as number),
        /**
         * Queue member is available, eg. Agent is logged in but idle.
         */
    DEVICE_NOT_INUSE = DeviceStates.NOT_INUSE,
    DEVICE_INUSE = DeviceStates.INUSE,
        /**
         * Busy means, phone is in action, eg. is ringing, in call.
         */
    DEVICE_BUSY = DeviceStates.BUSY,
    DEVICE_INVALID = DeviceStates.INVALID,
        /**
         * Device is not available for call, eg. Agent is logged off.
         */
    DEVICE_UNAVAILABLE = DeviceStates.UNAVAILABLE,
    DEVICE_RINGING = DeviceStates.RINGING,
    DEVICE_RINGINUSE = DeviceStates.RINGINUSE,
    DEVICE_ONHOLD = DeviceStates.ONHOLD
}

export = QueueMemberStates;
