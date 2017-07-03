"use strict";
const AsteriskModel = require("../../internal/asteriskModel");
const QueueEntry = require("./QueueEntryModel");
const ServiceLevelTimerTask = require("../../internal/serviceLeverTimerTask");
const PROP_NAME = "name";
const PROP_MAX = "max";
const PROP_STRATEGY = "strategy";
const PROP_CALLS = "calls";
const PROP_HOLD_TIME = "holdtime";
const PROP_TALK_TIME = "talkTime";
const PROP_COMPLETED = "completed";
const PROP_ABANDONED = "abandoned";
const PROP_SERVICE_LEVEL = "serviceLevel";
const PROP_SERVICE_LEVEL_PERF = "serviceLevelPerf";
const PROP_WEIGHT = "weight";
const P_PROP_ENTRIES = "entries";
const P_PROP_MEMBERS = "members";
const P_PROP_SERVICE_LEVEL_TIMER_TASKS = "serviceLevelTimerTasks";
class Queue extends AsteriskModel {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_NAME;
        attributes.Abandoned = parseInt(attributes.Abandoned.toString(), 10);
        attributes.ServiceLevel = parseInt(attributes.ServiceLevel.toString(), 10);
        super(attributes, options);
        this.setProp(P_PROP_ENTRIES, []);
        this.setProp(P_PROP_MEMBERS, new Map());
        this.setProp(P_PROP_SERVICE_LEVEL_TIMER_TASKS, new Map());
    }
    get _entries() {
        return this.getProp(P_PROP_ENTRIES);
    }
    get _members() {
        return this.getProp(P_PROP_MEMBERS);
    }
    get _serviceLevelTimerTasks() {
        return this.getProp(P_PROP_SERVICE_LEVEL_TIMER_TASKS);
    }
    get max() {
        return this.get(PROP_MAX);
    }
    get strategy() {
        return this.get(PROP_STRATEGY);
    }
    get calls() {
        return this.get(PROP_STRATEGY);
    }
    get holdTime() {
        return this.get(PROP_HOLD_TIME);
    }
    get talkTime() {
        return this.get(PROP_TALK_TIME);
    }
    get completed() {
        return this.get(PROP_COMPLETED);
    }
    get abandoned() {
        return this.get(PROP_ABANDONED);
    }
    set abandoned(abadoned) {
        this.set(PROP_ABANDONED, abadoned);
    }
    get serviceLevel() {
        return this.get(PROP_SERVICE_LEVEL);
    }
    get serviceLevelPerf() {
        return this.get(PROP_SERVICE_LEVEL_PERF);
    }
    get weight() {
        return this.get(PROP_WEIGHT);
    }
    static get events() {
        return EVENTS;
    }
    /**
     * Creates a new AsteriskQueueEntry, adds it to this queue.<p>
     *
     * @param channel          the channel that joined the queue
     * @param reportedPosition the position as given by Asterisk (currently not used)
     * @param dateReceived     the date the hannel joined the queue
     * @param [source]
     */
    createNewEntry(channel, reportedPosition, dateReceived, source) {
        const attribs = {
            Event: source ? source : "QueueModel:createNewEntry",
            ReportedPosition: reportedPosition,
            channel,
            dateJoined: dateReceived,
            queue: this
        };
        const qe = new QueueEntry(attribs);
        const delay = this.serviceLevel * 1000;
        if (delay > 0) {
            const timerTask = new ServiceLevelTimerTask(this, qe);
            timerTask.schedule(delay);
            this._serviceLevelTimerTasks.set(qe, timerTask);
        }
        this._entries.push(qe); // at the end of the list
        // Keep the lock !
        // This will fire PCE on the newly created queue entry
        // but hopefully this one has no listeners yet
        this._shift();
        // Set the channel property ony here as queue entries and channels
        // maintain a reciprocal reference.
        // That way property change on channel and new entry event on queue will be
        // launched when BOTH channel and queue are correctly set.
        channel.queueEntry = qe;
        this.emit(Queue.events.ENTRY_ADD, this, qe);
    }
    /**
     * Removes the given queue entry from the queue.
     */
    removeEntry(entry, dateReceived) {
        if (this._serviceLevelTimerTasks.has(entry)) {
            const timerTask = this._serviceLevelTimerTasks.get(entry);
            timerTask.cancel();
            this._serviceLevelTimerTasks.delete(entry);
        }
        const index = this._entries.indexOf(entry);
        if (-1 !== index) {
            const changed = this._entries.splice(index, 1);
            if (changed) {
                // Keep the lock !
                this._shift();
                entry.channel.queueEntry = null;
                entry.left(dateReceived);
                this.emit(Queue.events.ENTRY_LEAVE, this, entry);
            }
        }
    }
    getEntry(channelNameOrPosition) {
        const tmp = parseInt(channelNameOrPosition, 10);
        if (tmp === channelNameOrPosition) {
            return this._getEntryByPosition(channelNameOrPosition);
        }
        else {
            return this._getEntryByChannelName(channelNameOrPosition);
        }
    }
    /**
     * Returns a collection of members of this queue.
     */
    getMembers() {
        return new Map([...this._members.entries()]);
    }
    /**
     * Returns a member by its location.
     *
     * @param location ot the member
     * @return AsteriskQueueMember the member by its location.
     */
    getMember(location) {
        if (this._members.has(location)) {
            return this._members.get(location);
        }
        return null;
    }
    /**
     * Add a new member to this queue.
     */
    addMember(member) {
        // Check if member already exists
        if (this._members.has(member.id)) {
            this.logger.warn("member %s exist", member.id);
            return;
        }
        // If not, add the new member.
        this.logger.info("Adding new member to the queue %s %s", this.id, member.id);
        this._members.set(member.id, member);
        this.emit(Queue.events.MEMBER_ADD, this, member);
    }
    /**
     * Removes a member from this queue.
     * @param member the member to remove.
     */
    removeMember(member) {
        // Check if member exists
        if (!this._members.has(member.id)) {
            return;
        }
        // If so, remove the member.
        this.logger.info("Remove member from the queue %s %s", this.id, member.id);
        this._members.delete(member.id);
        this.emit(Queue.events.MEMBER_LEAVE, this, member);
    }
    fireServiceLevelExceeded(entry) {
        this.emit(Queue.events.SERVICE_LEVEL_EXCEEDED, this, entry);
    }
    /**
     * Gets an entry of the queue by its channel name.
     *
     * @param channelName The entry's channel name.
     * @return AsteriskQueueEntry the queue entry if found, null otherwise.
     */
    _getEntryByChannelName(channelName) {
        let entry;
        for (let index = 0; index < this._entries.length; index++) {
            entry = this._entries[index];
            if (entry.channelName === channelName) {
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
    _getEntryByPosition(position) {
        // positions in asterisk start at 1, but list starts at 0
        position--;
        let foundEntry = null;
        this._entries.forEach((entry) => {
            if (entry.position === position) {
                foundEntry = entry;
            }
        });
        return foundEntry;
    }
    /**
     * Shifts the position of the queue entries if needed
     * (and fire PCE on queue entries if appropriate).
     */
    _shift() {
        let currentPos = 1;
        this._entries.forEach((entry) => {
            // Only set (and fire PCE on qe) if necessary
            if (entry.position !== currentPos) {
                entry.position = currentPos;
            }
            currentPos++;
        });
    }
}
Queue.map = new Map([
    ["Queue", PROP_NAME],
    ["Max", PROP_MAX],
    ["Strategy", PROP_STRATEGY],
    ["Calls", PROP_CALLS],
    ["Holdtime", PROP_HOLD_TIME],
    ["TalkTime", PROP_TALK_TIME],
    ["Completed", PROP_COMPLETED],
    ["Abandoned", PROP_ABANDONED],
    ["ServiceLevel", PROP_SERVICE_LEVEL],
    ["ServicelevelPerf", PROP_SERVICE_LEVEL_PERF],
    ["Weight", PROP_WEIGHT]
]);
const EVENTS = Object.assign({}, AsteriskModel.events, { ENTRY_ADD: Symbol("entry:add"), ENTRY_LEAVE: Symbol("entry:leave"), MEMBER_ADD: Symbol("member:add"), MEMBER_LEAVE: Symbol("member:leave"), SERVICE_LEVEL_EXCEEDED: Symbol("entry:ServiceLevelExceeded") });
module.exports = Queue;
//# sourceMappingURL=QueueModel.js.map