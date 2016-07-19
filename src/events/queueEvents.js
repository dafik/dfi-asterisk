"use strict";
var util = require('util');

/**
 * @extends AsteriskEvent
 * @class
 * @param {String} eventName
 * @constructor
 * @abstract
 * @property {String} queueName
 */
class QueueEvent {
    /**
     * @param {string} eventName
     */
    constructor(eventName) {
        this.event = eventName;
    }
}

/**
 * @extends QueueEvent
 * @class
 * @param {AsteriskQueueEntry} entry
 * @constructor
 * @property {AsteriskQueueEntry} entry
 */
class QueueNewEntryEvent extends QueueEvent {
    constructor(entry) {
        super();
        this.entry = entry;
        this.queueName = entry.get('queue').get('name');
    }
}

/**
 * @extends QueueEvent
 * @class
 * @param {AsteriskQueueEntry} entry
 * @constructor
 * @property {AsteriskQueueEntry} entry
 */
class QueueEntryLeaveEvent extends QueueEvent {
    constructor(entry) {
        super();

        this.entry = entry;
        this.queueName = entry.get('queue').get('name');
    }
}

/**
 * @extends QueueEvent
 * @class
 * @param {AsteriskQueueMember} member
 * @constructor
 * @property {AsteriskQueueMember} member
 */
class QueueMemberAddedEvent extends QueueEvent {
    constructor(member) {
        super();

        this.member = member;
        this.queueName = member.get('queue');
    }
}

/**
 * @extends QueueEvent
 * @class
 * @param {AsteriskQueueMember} member
 * @constructor
 * @property {AsteriskQueueMember} member
 */
class QueueMemberRemovedEvent extends QueueEvent {
    constructor(member) {
        super();

        this.member = member;
        this.queueName = member.get('queue');
    }
}

/**
 * @extends QueueEvent
 * @class
 * @param {AsteriskQueueMember} member
 * @constructor
 * @property {AsteriskQueueMember} member
 */
class QueueMemberStateChangedEvent extends QueueEvent {
    constructor(member) {
        super();

        this.member = member;
        this.queueName = member.get('queue');
    }
}
/**
 * @extends QueueEvent
 * @class
 * @param {AsteriskQueueEntry} entry
 * @constructor
 * @property {AsteriskQueueEntry} entry
 */
class QueueServiceLevelExceededEvent extends QueueEvent {
    constructor(entry) {
        super();

        this.entry = entry;
        this.queueName = entry.getQueue().getName();
    }
}
module.exports.QueueNewEntryEvent = QueueNewEntryEvent;
module.exports.QueueEntryLeaveEvent = QueueEntryLeaveEvent;

module.exports.QueueMemberAddedEvent = QueueMemberAddedEvent;
module.exports.QueueMemberRemovedEvent = QueueMemberRemovedEvent;
module.exports.QueueMemberStateChangedEvent = QueueMemberStateChangedEvent;
module.exports.QueueServiceLevelExceededEvent = QueueServiceLevelExceededEvent;