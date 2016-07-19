"use strict";
const AsteriskModel = require('../internal/asteriskModel'),
    QueueEntryState = require('../enums/queueEntryState'),
    QueueEntryStates = require('../enums/defs/queueEntryStates'),

    PROPERTY_STATE = "state",
    PROPERTY_POSITION = "position",
    PROPERTY_REPORTED_POSITION = "reportedPosition",
    POSITION_UNDETERMINED = -1;


class AsteriskQueueEntry extends AsteriskModel {

    initialize() {


        this.set('state', QueueEntryState.byValue(QueueEntryStates.JOINED));

        if (this.get('reportedPosition')) {
            this.set('position', parseInt(this.get('reportedPosition')));
        } else {
            this.set('position', POSITION_UNDETERMINED);
        }
    }


    toJSON() {
        var tmp = {
            queue: this.get('queue').id,
            channel: this.get('channel').get('name'),
            dateJoined: this.get('datejoined'),
            dateLeft: this.get('dateleft'),
            state: this.get('state').name,
            reportedPosition: this.get('reportedPosition'),
            position: this.get('position')
        }
        return tmp;
    }

    /**
     *
     * @returns {String}
     */
    getChannelName() {
        return this.get('channel').getName();
    }

    /**
     *
     * @returns {AsteriskQueue}
     */
    getQueue() {
        return this.get('queue');
    }

    /**
     *
     * @returns {AsteriskChannel}
     */
    getChannel() {
        return this.get('channel');
    }

    /**
     *
     * @returns {Moment}
     */
    getDateJoined() {
        return this.get('dateJoined');
    }

    /**
     *
     * @returns {Moment}
     */
    getDateLeft() {
        return this.get('dateLeft');
    }

    /**
     *
     * Sets the status to {@link QueueEntryStates#LEFT} and dateLeft to the given date.
     */
    left(dateLeft) {
        var oldState = this.get('state');
        this.set('dateLeft', dateLeft);
        this.set('state', QueueEntryState.byValue(QueueEntryStates.LEFT));
        this.emit(Events.PROPERTY_STATE, {old: oldState, new: this.get('state')});
    }

    /**
     *
     * @returns {QueueEntryStates}
     */
    getState() {
        return this.get('state');
    }

    /**
     *
     * Gets the position as reported by Asterisk when the entry was created.
     * Currently we don't update this property as the entry shifts through the queue,
     * see getPosition() instead.
     *
     * @returns {number} the position of the entry in the respective queue, starting at 1
     */
    getReportedPosition() {
        return this.get('reportedPosition');
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
     * @returns {number} the position of the entry in the respective queue, starting at 1
     */
    getPosition() {
        return this.get('position');
    }

    /**
     * @fires AsteriskQueueEntry#PROPERTY_POSITION
     * @param {number} position
     */
    setPosition(position) {
        var oldPosition = this.get('position');
        this.set('position', position);
        this.emit(Events.PROPERTY_POSITION, {old: oldPosition, new: position});
    }

    setReportedPosition(reportedPosition) {
        var oldPosition = this.get('reportedPosition');
        this.set('reportedPosition', reportedPosition);

        this.emit(Events.PROPERTY_REPORTED_POSITION, {old: oldPosition, new: reportedPosition});
    }

}
var Events = {
    PROPERTY_STATE: 'queueEntry' + PROPERTY_STATE,
    PROPERTY_POSITION: 'queueEntry' + PROPERTY_POSITION,
    PROPERTY_REPORTED_POSITION: 'queueEntry' + PROPERTY_REPORTED_POSITION
};

module.exports = AsteriskQueueEntry;