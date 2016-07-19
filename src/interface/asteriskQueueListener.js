"use strict";
var util = require('util');
var EventEmitter = require('events').EventEmitter;
/**
 * You can register an AsteriskQueueListener with an
 * {@link AsteriskQueue} to be notified about new calls in
 * and out of the queue, member state changes and exceeding service levels.
 * @interface
 * @memberOf interface
 */
function AsteriskQueueListener() {
    AsteriskQueueListener.super_.call(this);
}
util.inherits(AsteriskQueueListener, EventEmitter);
/**
 * Called whenever an entry appears in the queue.
 *
 * @param {AsteriskQueueEntry} entry the new entry.
 */
AsteriskQueueListener.prototype.onNewEntry = function (entry) {
};

/**
 * Called whenever an entry leaves the queue.
 * @param {AsteriskQueueEntry} entry the entry that leaves the queue.
 */
AsteriskQueueListener.prototype.onEntryLeave = function (entry) {
};

/**
 * Called whenever a member changes his state.
 * @param {AsteriskQueueMember} member the member that changes his state.
 */
AsteriskQueueListener.prototype.onMemberStateChange = function (member) {
};
/**
 * @param {AsteriskQueueEntry} entry
 */
AsteriskQueueListener.prototype.onEntryServiceLevelExceeded = function (entry) {
};
/**
 * Called whenever a new member is added to the queue.
 * @param {AsteriskQueueMember} member the new member.
 */
AsteriskQueueListener.prototype.onMemberAdded = function (member) {
};
/**
 * Called whenever a member is removed from this queue.
 * @param {AsteriskQueueMember} member the member that has been removed from the queue.
 */
AsteriskQueueListener.prototype.onMemberRemoved = function (member) {
};

module.exports = AsteriskQueueListener;
