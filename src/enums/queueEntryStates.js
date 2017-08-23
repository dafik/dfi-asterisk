"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = QueueEntryStates;
//# sourceMappingURL=queueEntryStates.js.map