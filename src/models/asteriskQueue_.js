"use strict";
const AsteriskModel = require('../internal/asteriskModel'),
    _ = require('lodash'),

    events = require('../events/queueEvents'),
    AsteriskQueueEntry = require('./asteriskQueueEntry'),
    ServiceLevelTimerTask = require('../objects/serviceLeverTimerTask');


class AsteriskQueue extends AsteriskModel {

    initialize() {

        this.id = this.get('name');
        this.set('entries', new Set());
        this.set('members', new Map());

        this.setProp('serviceLevelTimerTasks', new Map());
    }

    /**
     *
     * @returns {Map}
     */
    get serviceLevelTimerTasks() {
        return this.getProp('serviceLevelTimerTasks')
    }

    /**
     * Creates a new AsteriskQueueEntry, adds it to this queue.<p>
     * Fires:
     * <ul>
     * <li>PCE on channel</li>
     * <li>NewEntry on this queue</li>
     * <li>PCE on other queue entries if shifted (never happens)</li>
     * <li>NewQueueEntry on server</li>
     * </ul>
     *
     * @param {AsteriskChannel} channel          the channel that joined the queue
     * @param {number} reportedPosition the position as given by Asterisk (currently not used)
     * @param {Moment} dateReceived     the date the channel joined the queue
     */
    createNewEntry(channel, reportedPosition, dateReceived) {
        /**
         * @type {AsteriskQueueEntry}
         */
        var attrs = {
            queue: this,
            channel: channel,
            datejoined: dateReceived,
            reportedPosition: reportedPosition
        }

        var qe = new AsteriskQueueEntry(attrs, {server: this.server});
        /**
         * @type {long}
         */
        var delay = this.get('servicelevel') * 1000;
        if (delay > 0) {
            /**
             * @type {ServiceLevelTimerTask}
             */
            var timerTask = new ServiceLevelTimerTask(this, qe);
            timerTask.schedule(timerTask, delay);
            this.serviceLevelTimerTasks.set(qe, timerTask);
        }
        this.get('entries').add(qe); // at the end of the list
        // Keep the lock !
        // This will fire PCE on the newly created queue entry
        // but hopefully this one has no listeners yet
        this._shift();
        // Set the channel property ony here as queue entries and channels
        // maintain a reciprocal reference.
        // That way property change on channel and new entry event on queue will be
        // launched when BOTH channel and queue are correctly set.
        channel.setQueueEntry(qe);


        //this.fireNewEntry(qe);
        //this.server.events.fireNewQueueEntry(qe);
    }

    /**
     * Removes the given queue entry from the queue.<p>
     * Fires if needed:
     * <ul>
     * <li>PCE on channel</li>
     * <li>EntryLeave on this queue</li>
     * <li>PCE on other queue entries if shifted</li>
     * </ul>
     *
     * @param {AsteriskQueueEntry} entry        an existing entry object.
     * @param {Moment} dateReceived the remove event was received.
     */
    removeEntry(entry, dateReceived) {
        if (this.serviceLevelTimerTasks.size > 0) {
            if (this.serviceLevelTimerTasks.containsKey(entry)) {
                var timerTask = this.serviceLevelTimerTasks.get(entry);
                //timerTask.cancel();
                this.serviceLevelTimerTasks.remove(entry);
            }
        }
        /**
         * @type {boolean}
         */
        var changed;
        changed = this.get('entries').delete(entry);
        if (changed) {
            // Keep the lock !
            this._shift();
        }
        // Fire outside lock
        if (changed) {
            entry.get('channel').setQueueEntry(null);
            entry.left(dateReceived);

            //this.fireEntryLeave(entry);
            this.emit('entry:leave', this, entry);
        }

        entry.destroy();
    }

    /**
     * @param {string|number} channelNameOrPosition
     */
    getEntry(channelNameOrPosition) {
        var tmp = parseInt(channelNameOrPosition).toString();
        if (tmp.toLocaleLowerCase() == channelNameOrPosition.toLowerCase()) {
            return this.getEntryByPosition(channelNameOrPosition)
        } else {
            return this.getEntryByChannelName(channelNameOrPosition)
        }
    }

    /**
     * Gets an entry of the queue by its channel name.
     * @param {String} channelName The entry's channel name.
     * @returns {AsteriskQueueEntry} the queue entry if found, null otherwise.
     */
    getEntryByChannelName(channelName) {


        var qEntry = null;


        /**
         * @param {AsteriskQueueEntry} entry
         */
        function onForeach(entry) {
            if (entry.get('channel').get('name') == channelName) {
                qEntry = entry;
            }
        }

        if (this.get('entries').size == 0) {
            return qEntry;
        }

        this.get('entries').forEach(onForeach);

        return qEntry;
    }

    /**
     * Gets an entry by its (estimated) position in the queue.
     *
     * @param {number} position the position, starting at 1.
     * @returns {AsteriskQueueEntry} the queue entry if exiting at this position, null otherwise.
     */
    getEntryByPosition(position) {
        // positions in asterisk start at 1, but list starts at 0
        position--;
        /**
         * @type {AsteriskQueueEntry}
         */
        var foundEntry = null;
        try {
            foundEntry = this.get('entries').enumerate()[position];
        } catch (e) {
            //IndexOutOfBoundsException
            // For consistency with the above method,
            // swallow. We might indeed request the 1st one from time to time
        }
        return foundEntry;
    }

    /**
     * @returns {List.<AsteriskQueueEntry>}
     */
    getEntries() {
        return this.get('entries');
    }

    /**
     * Add a new member to this queue.
     * @param {AsteriskQueueMember} member to add
     */
    addMember(member) {
        // Check if member already exists
        if (this.get('members').has(member.get('interface'))) {
            return;
        }
        // If not, add the new member.
        this.logger.info("Adding new member to the queue: %s, %s (%s)", this.get('name'), member.get('id'), member.get('state').name);
        this.logger.trace("Adding new member to the queue: %s,%s", this.get('name'), member.toString());
        this.get('members').set(member.get('interface'), member);

        this.emit('member:add', member);

    }

    /**
     * Removes a member from this queue.
     * @param {AsteriskQueueMember} member the member to remove.
     */
    removeMember(member) {
        // Check if member exists
        if (!this.get('members').has(member.id)) {
            this.logger.warn("Unable Remove not existent member from the queue " + this.id + ": " + member.id);
            return;
        }
        // If so, remove the member.
        this.logger.info("Remove member from the queue " + this.get('name') + ": " + member.get('interface'));
        this.get('members').delete(member.get('interface'));

        this.emit('removed:member', this, member);
    }

    /**
     * Returns a member by its interface
     *
     * @param {String} interface_ ot the member
     * @return AsteriskQueueMember the member by its interface.
     */
    getMember(iface) {
        if (this.get('members').has(iface)) {
            return this.get('members').get(iface);
        }
        return null;
    }

    /**
     * Returns a collection of members of this queue.
     *
     * @returns {Map.<String, AsteriskQueueMember>}
     */
    getMembers() {
        return this.get('members')
    }

    /**
     * Retrieves a member by its interface.
     * @param {String} interface_ interface of the member
     * @return {AsteriskQueueMember} the requested member.
     */
    getMemberByInterface(interface_) {
        /**
         * @type {AsteriskQueueMember}
         */
        var member;
        member = this.get('members').get(interface_);
        if (member == null) {
            this.logger.error("Requested member at interface " + interface_ + " not found!");
        }
        return member;
    }

    cancelServiceLevelTimer() {
        this.timer.cancel();
    }

    /**
     * Shifts the position of the queue entries if needed
     * (and fire PCE on queue entries if appropriate).
     */
    _shift() {
        /**
         * @type {int}
         */
        var currentPos = 1; // Asterisk starts at 1
        this.get('entries').forEach(onForeach);
        /**
         * @param {AsteriskQueueEntry} qe
         */
        function onForeach(qe) {

            // Only set (and fire PCE on qe) if necessary
            if (qe.get('position') != currentPos) {
                qe.setPosition(currentPos);
            }
            currentPos++;
        }
    }


    fireServiceLevelExceeded(entry) {
        this.emit(events.QueueServiceLevelExceededEvent.name, new events.QueueServiceLevelExceededEvent(entry));
    }

}


module.exports = AsteriskQueue;