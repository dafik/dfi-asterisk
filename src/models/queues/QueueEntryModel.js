"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskModel_1 = require("../../internal/asteriskModel");
const queueEntryState_1 = require("../../states/queueEntryState");
const queueEntryStates_1 = require("../../enums/queueEntryStates");
const POSITION_UNDETERMINED = -1;
const PROP_REPORTED_POSITION = "reportedPosition";
const PROP_POSITION = "position";
const PROP_QUEUE = "queue";
const PROP_CHANNEL = "channel";
const PROP_DATE_JOINED = "dateJoined";
const PROP_DATE_LEFT = "dateLeft";
const PROP_STATE = "state";
const PROP_ABANDONED = "abandoned";
class QueueEntry extends asteriskModel_1.default {
    constructor(attributes, options) {
        options = options || {};
        attributes.state = queueEntryState_1.default.byValue(queueEntryStates_1.default.JOINED);
        attributes.id = attributes.channel.id;
        attributes.abandoned = false;
        attributes.ReportedPosition = attributes.ReportedPosition ?
            parseInt(attributes.ReportedPosition, 10) :
            attributes.ReportedPosition;
        super(attributes, options);
    }
    /**
     *
     * Gets the position as reported by Asterisk when the entry was created.
     * Currently we don't update this property as the entry shifts through the queue,
     * see getPosition() instead.
     *
     * @returns {number} the position of the entry in the respective queue, starting at 1
     */
    get reportedPosition() {
        return this.get(PROP_REPORTED_POSITION);
    }
    set reportedPosition(reportedPosition) {
        this.set(PROP_REPORTED_POSITION, reportedPosition);
    }
    /**
     *
     * Gets the position in the queue based on the queue's internal list
     * <p/>
     * As Asterisk doesn't send events when it shifts entries in the queue
     * we'll base our positions on our internal queue entries ordered list.
     * It should be coherent as entries are always added at the end of the queue
     * and we don't mind if it is different from asterisk's view as long as the
     * relative order stays the same. Most of the time the position will be the same
     * but right after asterisk removes an entry it could differ as the shift occurs
     * asynchronously in asterisk queues. As a consequence we might have temporary holes
     * in the asterisk numbering.
     *
     * @returns the position of the entry in the respective queue, starting at 1
     */
    get position() {
        return this.get(PROP_POSITION);
    }
    set position(position) {
        this.set(PROP_POSITION, position);
    }
    get queue() {
        return this.get(PROP_QUEUE);
    }
    get channel() {
        return this.get(PROP_CHANNEL);
    }
    get channelName() {
        return this.channel.name;
    }
    get dateJoined() {
        return this.get(PROP_DATE_JOINED);
    }
    get dateLeft() {
        return this.get(PROP_DATE_LEFT);
    }
    get abandoned() {
        return this.get(PROP_ABANDONED);
    }
    set abandoned(abandoned) {
        this.set(PROP_ABANDONED, abandoned);
    }
    /**
     *
     * Sets the status to {@link QueueEntryStates#LEFT} and dateLeft to the given date.
     */
    left(dateLeft) {
        this.set(PROP_DATE_LEFT, dateLeft);
        this.set(PROP_STATE, queueEntryState_1.default.byValue(queueEntryStates_1.default.LEFT));
    }
    get state() {
        return this.get(PROP_STATE);
    }
}
QueueEntry.map = new Map([
    ["ReportedPosition", PROP_REPORTED_POSITION],
    ["Position", PROP_POSITION],
    ["queue", PROP_QUEUE],
    ["channel", PROP_CHANNEL],
    ["dateJoined", PROP_DATE_JOINED],
    ["dateLeft", PROP_DATE_LEFT],
    ["state", PROP_STATE]
]);
exports.default = QueueEntry;
//# sourceMappingURL=QueueEntryModel.js.map