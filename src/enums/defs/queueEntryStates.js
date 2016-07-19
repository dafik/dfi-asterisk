"use strict";
/**
 * The lifecycle status of a {@link AsteriskQueueEntry}.
 * @memberOf enums
 * @class
 */
var QueueEntryState = {
    /**
     * The user joined the queue.
     */
    JOINED: 1,
    /**
     * The user left the queue.
     */
    LEFT: 0
};
Object.freeze(QueueEntryState);
module.exports = QueueEntryState;