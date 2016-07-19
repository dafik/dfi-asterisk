"use strict";
const
    AsteriskManager = require('../internal/asteriskManager'),

    dAmiLib = require("../../examples/dfi-asterisk-ami/src/dAmi"),
    actions = dAmiLib.Actions,
    events = dAmiLib.Events,


    QueuesCollection = require('../collections/queues'),
    AsteriskServerEvents = require('../events/def/asteriskServerEvents'),

    AsteriskQueue = require('../models/asteriskQueue'),
    AsteriskQueueMember = require('../models/asteriskQueueMember'),

    QueueMemberState = require('../enums/queueMemberState'),
    astUtil = require('../objects/astUtil')
    ;

/**
 * Manages queue events on behalf of an AsteriskServer.
 */
class QueueManager extends AsteriskManager {

    constructor(options, state) {
        super(options, state);

        this.queues = new QueuesCollection();

        this.server.once(AsteriskServerEvents.BeforeInitialized, function () {
            this.channelManager = this.server.getManager('channel');
        }, this)
    }

    start(callback, thisp) {

        function finish() {
            if (typeof callback == "function") {
                this.server.loggers.logger.info('manager "QueueManager" started');
                callback.call(thisp, null, 'queueManager');
            }
        }

        function onResponse(err, response) {
            if (err) {
                callback.call(thisp, err);
                return
            }
            response.getEvents().forEach(onForeach, this);

            finish.call(this);
        }

        function onForeach(event) {
            if (event.event == 'queueparams') {
                handleQueueParamsEvent.call(this, event);
            } else if (event.event == 'queuemember') {
                handleQueueMemberEvent.call(this, event);
            } else if (event.event == 'queueentry') {
                handleQueueEntryEvent.call(this, event);
            }
        }

        /**
         * Called during initialization to populate the list of queues.
         * @param {AsteriskEvent} event the event received
         * @this QueueManager
         */
        function handleQueueParamsEvent(event) {
            var queue = this.queues.get(event.queue);

            if (queue == null) {
                queue = new AsteriskQueue(event, {server: this.server});

                let action = new actions.QueueSummary(queue.id);
                this.server.sendAction(action, function (err, resp) {
                    let q = queue;
                    var x = 1;
                });

                action = new actions.QueueStatus(queue.id);
                this.server.sendAction(action, function (err, resp) {
                    let q = queue;
                    var x = 1;
                });


                this.logger.debug('Adding new queue: "' + queue.get('name') + '"');
                this._addQueue(queue);
            } else {
                // We should never reach that code as this method is only called for initialization
                // So the queue should never be in the queues list
                queue.set('max', attr.max);
                queue.set('serviceLevel', attr.serviceLevel);
                queue.set('weight', attr.weight);
            }
        }

        /**
         * Called during initialization to populate the members of the queues.
         *
         * @param event the QueueMemberEvent received
         */
        function handleQueueMemberEvent(event) {
            var queue = this.queues.get(event.queue);
            if (queue == null) {
                this.logger.error("Ignored QueueEntryEvent for unknown queue " + event.queue);
                return;
            }
            var member = queue.getMember(event.name);
            if (member == null) {
                member = new AsteriskQueueMember(event, {server: this.server});
            }
            queue.addMember(member);
            this.emit(QueueManager.Events.memberAdd, member, queue);
        }

        /**
         * Called during initialization to populate entries of the queues.
         * Currently does the same as handleJoinEvent()
         * @param {AsteriskEvent} event  the QueueEntryEvent received
         * @private
         */
        function handleQueueEntryEvent(event) {
            var queue = this.getQueueByName(event.queue);
            var channel = this.channelManager.getChannelByName(event.channel);
            if (queue == null) {
                this.logger.error("Ignored QueueEntryEvent for unknown queue " + event.queue);
                return;
            }
            if (channel == null) {
                this.logger.error("Ignored QueueEntryEvent for unknown channel " + event.channel);
                return;
            }
            if (queue.getEntry(event.channel) != null) {
                this.logger.error("Ignored duplicate queue entry during population in queue " + event.queue + " for channel " + event.channel);
                return;
            }
            // Asterisk gives us an initial position but doesn't tell us when he shifts the others
            // We won't use this data for ordering until there is a appropriate event in AMI.
            // (and refreshing the whole queue is too intensive and suffers incoherencies
            // due to asynchronous shift that leaves holes if requested too fast)
            var reportedPosition = event.position;
            queue.createNewEntry(channel, reportedPosition, event.dateReceived);
        }


        this.server.loggers.logger.info('starting manager "QueueManager"');

        if (!this.enabled) {
            finish.call(this);
            return
        }


        this.channelManager = this.server.managers.channel;
        var map = {

            //status
            'queuememberstatus': this._handleQueueMemberStatusEvent,
            //status
            'queuememberpenalty': this._handleQueueMemberPenaltyEvent,
            //status

            'queuememberadded': this._handleQueueMemberAddedEvent,
            //status
            'queuememberremoved': this._handleQueueMemberRemovedEvent,
            //channelState
            ////status
            'queuememberpaused': this._handleQueueMemberPausedEvent,
            //channelState
            ////status
            'queuememberpause': this._handleQueueMemberPausedEvent,
        };
        if (this.server.getManager('channel').isEnabled()) {
            //channelState
            map['queuecallerjoin'] = this._handleJoinEvent;
            //channelState
            map['queuecallerleave'] = this._handleLeaveEvent;

            //channelState
            map['queuecallerabandon'] = this._handleAbandonEvent;

        }


        this._mapEvents(map);

        var action = new actions.QueueStatus();
        this.server.sendEventGeneratingAction(action, onResponse, this);
    }

    disconnected() {
        this.queues.forEach(onForeach);
        function onForeach(queue) {
            queue.cancelServiceLevelTimer();
        }

        this.queues.clear();
    }


    /**
     * Gets (a copy of) the list of the queues.
     * @returns {AsteriskQueue[]} of the list of the queues.
     */
    getQueuesArray() {
        return this.queues.toArray();
    }

    /**
     * Adds a queue to the internal map, keyed by name.
     * @param {AsteriskQueue} queue queue the AsteriskQueue to be added
     * @private
     */
    _addQueue(queue) {
        this.queues.add(queue);

    }


    /**
     * Called from AsteriskServer whenever a new entry appears in a queue.
     * @param {AsteriskEvent}  event the JoinEvent received
     */
    _handleJoinEvent(event) {
        this.logger.debug("handle Join queue: %s, pos: %s, %j", event.queue, event.position, event.channel);

        var queue = this.getQueueByName(event.queue);
        var channel = this.channelManager.getChannelByName(event.channel);
        if (queue == null) {
            this.logger.error("Ignored JoinEvent for unknown queue " + event.queue);
            return;
        }
        if (channel == null) {
            this.logger.error("Ignored JoinEvent for unknown channel " + event.channel);
            return;
        }
        if (queue.getEntry(event.channel) != null) {
            this.logger.error("Ignored duplicate queue entry in queue " + event.queue + " for channel " + event.channel);
            return;
        }
        // Asterisk gives us an initial position but doesn't tell us when he shifts the others
        // We won't use this data for ordering until there is a appropriate event in AMI.
        // (and refreshing the whole queue is too intensive and suffers incoherencies
        // due to asynchronous shift that leaves holes if requested too fast)
        var reportedPosition = event.position;
        queue.createNewEntry(channel, reportedPosition, event.dateReceived);
    }


    /**
     * Called from AsteriskServer whenever an entry leaves a queue.
     * @param {AsteriskEvent} event - the LeaveEvent received
     */
    _handleLeaveEvent(event) {

        //TODO moze byc member      'queuecallerleave' || 'queuecallerabandon'

        this.logger.debug("handle Leave queue: %s, pos: %s, %j", event.queue, event.position, event.channel);

        var queue = this.getQueueByName(event.queue);
        var channel = this.channelManager.getChannelByName(event.channel);
        if (queue == null) {
            this.logger.error("Ignored LeaveEvent for unknown queue " + event.queue);
            return;
        }
        if (channel == null) {
            this.logger.error("Ignored LeaveEvent for unknown channel " + event.channel);
            return;
        }
        var existingQueueEntry = queue.getEntry(event.channel);
        if (existingQueueEntry == null) {
            this.logger.error("Ignored leave event for non existing queue entry in queue " + event.queue + " for channel " + event.channel);
            return;
        }
        queue.removeEntry(existingQueueEntry, event.dateReceived, event.event == 'queuecallerabandon' ? 'abadon' : 'normal');
    }

    /**
     * Called from AsteriskServer whenever an entry Abandon a queue.
     * @param {AsteriskEvent} event - the AbandonEvent received
     */
    _handleAbandonEvent(event) {

        //TODO moze byc member      'queuecallerleave' || 'queuecallerabandon'

        this.logger.debug("handle Abandon queue: %s, pos: %s, %j", event.queue, event.position, event.channel);

        var queue = this.getQueueByName(event.queue);
        var channel = this.channelManager.getChannelByName(event.channel);
        if (queue == null) {
            this.logger.error("Ignored AbandonEvent for unknown queue " + event.queue);
            return;
        }
        if (channel == null) {
            this.logger.error("Ignored AbandonEvent for unknown channel " + event.channel);
            return;
        }
        var existingQueueEntry = queue.getEntry(event.channel);
        if (existingQueueEntry == null) {
            this.logger.error("Ignored Abandon event for non existing queue entry in queue " + event.queue + " for channel " + event.channel);
            return;
        }
        existingQueueEntry.set('abandoned', true);

        queue.abandoned = parseInt(queue.get('abandoned')) + 1;
    }

    /**
     * Challenge a QueueMemberStatusEvent.
     * Called from AsteriskServer whenever a member state changes.
     * @param {AsteriskEvent} event that was triggered by Asterisk server.
     */
    _handleQueueMemberStatusEvent(event) {
        this.logger.debug("handle QueueMemberStatus queue: %s member: %s ,(%s)", event.queue, event.interface, QueueMemberState.byValue(event.status).name);

        var queue = this.getQueueByName(event.queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown queue " + event.queue);
            return;
        }
        var member = queue.getMember(event.interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown member " + event.interface);
            return;
        }
        member.update(event);


        member.stateChanged(QueueMemberState.byValue(event.status));
        member.penaltyChanged(event.penalty);
    }

    _handleQueueMemberPausedEvent(event) {
        this.logger.debug("handle QueueMemberPaused queue: %s, pos: %s, %j", event.queue, event.position, event.channel);

        var queue = this.getQueueByName(event.queue);

        if (queue == null) {
            this.logger.error("Ignored QueueMemberPausedEvent for unknown queue " + event.queue);
            return;
        }
        var member = queue.getMemberByInterface(event.interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberPausedEvent for unknown member " + event.interface);
            return;
        }
        member.pausedChanged(event.paused);
    }

    _handleQueueMemberPenaltyEvent(event) {
        this.logger.debug("handle QueueMemberPenalty queue: %s, pos: %s, %j", event.queue, event.position, event.channel);

        var queue = this.getQueueByName(event.queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown queue " + event.queue);
            return;
        }
        var member = queue.getMemberByInterface(event.interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown member " + event.interface);
            return;
        }
        member.penaltyChanged(event.penalty);
    }

    /**
     * Challenge a QueueMemberAddedEvent.
     * @param event - the generated QueueMemberAddedEvent.
     */
    _handleQueueMemberAddedEvent(event) {
        this.logger.debug('handle QueueMemberAdded queue: %j, %j (%s)', event.queue, event.interface, QueueMemberState.byValue(event.status).name);

        var queue = this.queues.get(event.queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberAddedEvent for unknown queue " + event.queue);
            return;
        }
        var member = queue.getMember(event.interface);
        if (member == null) {
            member = new AsteriskQueueMember(event, {server: this.server});
        }
        queue.addMember(member);
        this.emit(QueueManager.Events.memberAdd, member, queue);
    }

    /**
     * Challenge a QueueMemberRemovedEvent.
     * @param event - the generated QueueMemberRemovedEvent.
     */
    _handleQueueMemberRemovedEvent(event) {
        this.logger.debug("handle queueMemberRemoved queue: %s, %s", event.queue, event.interface);

        var queue = this.queues.get(event.queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberRemovedEvent for unknown queue " + event.queue);
            return;
        }
        var member = queue.getMember(event.interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberRemovedEvent for unknown agent name: " + event.membername + " interface: " + event.interface + " queue: " + event.queue);
            return;
        }
        queue.removeMember(member);
        this.emit(QueueManager.Events.memberRemove, member, queue);
    }

    /**
     *
     * @param queueName
     * @returns {AsteriskQueue|null}
     */
    getQueueByName(queueName) {
        var queue;
        queue = this.queues.get(queueName);
        if (queue == null) {
            this.logger.error("Requested queue '" + queueName + "' not found!");
        }
        return queue;
    }

    toJSON() {
        var obj = super.toJSON();
        obj.collection = this.queues.toJSON();


        return obj;
    }
}
QueueManager.Events = {
    memberAdd: 'member:add',
    memberRemove: 'member:remove',
}

module.exports = QueueManager;