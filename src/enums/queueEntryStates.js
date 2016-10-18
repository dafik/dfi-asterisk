"use strict";
var QueueEntryStates;
(function (QueueEntryStates) {
    /**
     * The user joined the queue.
     */
    QueueEntryStates[QueueEntryStates["JOINED"] = 1] = "JOINED";
    /**
     * The user left the queue.
     */
    QueueEntryStates[QueueEntryStates["LEFT"] = 0] = "LEFT";
})(QueueEntryStates || (QueueEntryStates = {}));
module.exports = QueueEntryStates;
//# sourceMappingURL=queueEntryStates.js.map