"use strict";
const AsteriskModel = require('../internal/asteriskModel'),
    _ = require('lodash'),

    events = require('../events/queueEvents'),
    AsteriskQueueEntry = require('./asteriskQueueEntry'),
    ServiceLevelTimerTask = require('../objects/serviceLeverTimerTask'),
    AstUtil = require('../objects/astUtil');


class AsteriskQueue extends AsteriskModel {


    initialize() {

        this.set('name', this.get('queue'));
        this.id = this.get('name');
        this.set('entries', []);
        this.set('members', new Map());

        this.setProp('serviceLevelTimerTasks', new Map());
    }

    /**
     *
     * @returns {Array.<AsteriskQueueEntry>}
     */
    get entries() {
        return this.get('entries');
    }

    /**
     *
     * @returns {Map.<string,AsteriskQueueMember>}
     */
    get members() {
        return this.get('members');
    }

    /**
     *
     * @returns {Map.<AsteriskQueueEntry,ServiceLevelTimerTask>}
     */
    get serviceLevelTimerTasks() {
        return this.getProp('serviceLevelTimerTasks')
    }


    /**
     *
     * @param max
     */
    set max(max) {
        if (!AstUtil.isEqual(this.get('max'), max)) {
            this.set('max', max);
            this.stampLastUpdate();
            return true;
        }
        return false;
    }


    /**
     *
     * @param serviceLevel
     */
    set servicelevel(serviceLevel) {
        if (!AstUtil.isEqual(this.get('servicelevel'), serviceLevel)) {
            this.set('servicelevel', serviceLevel);
            this.stampLastUpdate();
            return true;
        }
        return false;

    }


    /**
     *
     * @param calls
     */
    set calls(calls) {
        if (!AstUtil.isEqual(this.get('calls'), calls)) {
            this.set('calls', calls);
            this.stampLastUpdate();
            return true;
        }
        return false;
    }


    /**
     *
     * @param holdTime
     */
    set holdtime(holdTime) {
        if (!AstUtil.isEqual(this.get('holdTime'), holdTime)) {
            this.set('holdtime', holdTime);
            this.stampLastUpdate();
            return true;
        }
        return false;
    }


    /**
     *
     * @param talkTime
     */
    set talktime(talkTime) {
        if (!AstUtil.isEqual(this.get('talktime'), talkTime)) {
            this.set('talktime', talkTime);
            this.stampLastUpdate();
            return true;
        }
        return false;
    }


    /**
     *
     * @param completed
     */
    set completed(completed) {
        if (!AstUtil.isEqual(this.set('completed'), completed)) {
            this.set('completed', completed);
            this.stampLastUpdate();
            return true;
        }
        return false;
    }


    /**
     *
     * @param abandoned
     */
    set abandoned(abandoned) {
        if (!AstUtil.isEqual(this.get('abandoned'), abandoned)) {
            this.set('abandoned', abandoned);
            this.stampLastUpdate();
            return true;
        }

        return false;
    }


    set servicelevelperf(serviceLevelPerf) {
        if (!AstUtil.isEqual(this.get('servicelevelperf'), serviceLevelPerf)) {
            this.set('servicelevelperf', serviceLevelPerf);
            this.stampLastUpdate();
            return true;
        }
        return false;
    }


    /**
     *
     * @param weight
     */
    set weight(weight) {
        if (!AstUtil.isEqual(this.get('weight'), weight)) {
            this.set('weight', weight);
            this.stampLastUpdate();
            return true;
        }
        return false;
    }


    /**
     * Shifts the position of the queue entries if needed
     * (and fire PCE on queue entries if appropriate).
     */
    shift() {
        let qe, index, currentPos = 1, entries = this.entries;

        for (index in entries) {
            qe = entries[index];
            // Only set (and fire PCE on qe) if necessary
            if (qe.getPosition() != currentPos) {
                qe.setPosition(currentPos);
            }
            currentPos++;
        }

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
     * @param channel          the channel that joined the queue
     * @param reportedPosition the position as given by Asterisk (currently not used)
     * @param dateReceived     the date the hannel joined the queue
     */
    createNewEntry(channel, reportedPosition, dateReceived) {
        let attrs = {
            queue: this,
            channel: channel,
            datejoined: dateReceived,
            reportedPosition: reportedPosition
        };

        let qe = new AsteriskQueueEntry(attrs, {server: this.server});


        let delay = this.get('servicelevel') * 1000;
        if (delay > 0) {

            let timerTask = new ServiceLevelTimerTask(this, qe);
            timerTask.schedule(timerTask, delay);
            this.serviceLevelTimerTasks.set(qe, timerTask);
        }


        this.entries.push(qe); // at the end of the list

        // Keep the lock !
        // This will fire PCE on the newly created queue entry
        // but hopefully this one has no listeners yet
        this.shift();


        // Set the channel property ony here as queue entries and channels
        // maintain a reciprocal reference.
        // That way property change on channel and new entry event on queue will be
        // launched when BOTH channel and queue are correctly set.
        channel.setQueueEntry(qe);

        this.emit('add', this, qe);
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
     * @param entry        an existing entry object.
     * @param dateReceived the remove event was received.
     */
    removeEntry(entry, dateReceived) {

        if (this.serviceLevelTimerTasks.has(entry)) {
            let timerTask = this.serviceLevelTimerTasks.get(entry);
            timerTask.cancel();
            this.serviceLevelTimerTasks.delete(entry);
        }

        let index = this.entries.indexOf(entry);
        if (-1 !== index) {
            let changed = this.entries.splice(index, 1);

            if (changed) {
                // Keep the lock !
                this.shift();

                entry.getChannel().setQueueEntry(null);
                entry.left(dateReceived);

                this.emit('entry:leave', this, entry);
            }
        }
    }

    /**
     * @param {string|number} channelNameOrPosition
     */
    getEntry(channelNameOrPosition) {
        var tmp = parseInt(channelNameOrPosition);
        if (tmp == channelNameOrPosition) {
            return this.getEntryByPosition(channelNameOrPosition)
        } else {
            return this.getEntryByChannelName(channelNameOrPosition)
        }
    }


    /**
     * Gets an entry of the queue by its channel name.
     *
     * @param channelName The entry's channel name.
     * @return AsteriskQueueEntry the queue entry if found, null otherwise.
     */
    getEntryByChannelName(channelName) {
        /**
         * @type AsteriskQueueEntry
         */
        let entry;

        for (let index = 0; index < this.entries.length; index++) {
            entry = this.entries[index];
            if (entry.getChannel().get('name') == channelName) {
                return entry;
            }
        }

        return null;
    }

    /**
     * Gets an entry by its (estimated) position in the queue.
     *
     * @param position the position, starting at 1.
     * @return the queue entry if exiting at this position, null otherwise.
     */
    getEntryByPosition(position) {
        // positions in asterisk start at 1, but list starts at 0
        position--;
        let foundEntry = null;

        /**
         * @type AsteriskQueueEntry
         */
        let entry;

        for (let index = 0; index < this.entries.length; index++) {
            entry = this.entries[i];
            if (entry.getPosition() == position) {
                return entry;
            }
        }


        return foundEntry;
    }


    /**
     * Returns a collection of members of this queue.
     *
     */
    getMembers() {
        return [...this.members];
    }

    /**
     * Returns a member by its location.
     *
     * @param location ot the member
     * @return AsteriskQueueMember the member by its location.
     */
    getMember(location) {

        if (this.members.has(location)) {
            return this.members.get(location);
        }

        return null;
    }

    /**
     * Add a new member to this queue.
     *
     * @param {AsteriskQueueMember} member to add
     */
    addMember(member) {

        // Check if member already exists
        if (this.members.has(member.id)) {
            this.logger.warn("member %s exist", member.id);
            return;
        }
        // If not, add the new member.
        this.logger.info("Adding new member to the queue %s %s", this.id, member.id);
        this.members.set(member.id, member);

        this.emit('member:add', this, member);

    }


    /**
     * Removes a member from this queue.
     *
     * @param member the member to remove.
     */
    removeMember(member) {

        // Check if member exists
        if (!this.members.has(member.id)) {
            return;
        }
        // If so, remove the member.
        this.logger.info("Remove member from the queue %s %s", this.id, member.id);
        this.members.delete(member.id);

        this.emit('member:removed', this, member);
    }

    fireServiceLevelExceeded(entry) {

        this.emit('entry:ServiceLevelExceeded', this, entry)

    }


}


module.exports = AsteriskQueue;