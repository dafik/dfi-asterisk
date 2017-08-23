"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("../internal/server/Manager");
const QueuesCollection_1 = require("../collections/QueuesCollection");
const QueueModel_1 = require("../models/queues/QueueModel");
const QueueMemberModel_1 = require("../models/queues/QueueMemberModel");
const queueMemberState_1 = require("../states/queueMemberState");
const astUtil_1 = require("../internal/astUtil");
const eventNames_1 = require("../internal/asterisk/eventNames");
const actionNames_1 = require("../internal/asterisk/actionNames");
const PROP_CHANNEL_MANAGER = "channelManager";
/**
 * Manages queue events on behalf of an AsteriskServer.
 */
class QueueManager extends Manager_1.default {
    constructor(options, state) {
        super(options, state, new QueuesCollection_1.default());
        this.server.once(this.serverEvents.BEFORE_INIT, () => {
            this.setProp(PROP_CHANNEL_MANAGER, this.server.managers.channel);
        }, this);
        if (!this.enabled) {
            return;
        }
        const map = {};
        map[eventNames_1.default.QUEUE_MEMBER_ADDED] = this._handleMemberAddedEvent;
        map[eventNames_1.default.QUEUE_MEMBER_PAUSE] = this._handleMemberPauseEvent;
        map[eventNames_1.default.QUEUE_MEMBER_PAUSE] = this._handleMemberPauseEvent;
        map[eventNames_1.default.QUEUE_MEMBER_PENALTY] = this._handleMemberPenaltyEvent;
        map[eventNames_1.default.QUEUE_MEMBER_REMOVED] = this._handleMemberRemovedEvent;
        map[eventNames_1.default.QUEUE_MEMBER_STATUS] = this._handleMemberStatusEvent;
        if (this._managers.channel.enabled) {
            map[eventNames_1.default.QUEUE_CALLER_ABANDON] = this._handleAbandonEvent;
            map[eventNames_1.default.QUEUE_CALLER_JOIN] = this._handleCallerJoinEvent;
            map[eventNames_1.default.QUEUE_CALLER_LEAVE] = this._handleLeaveEvent;
        }
        this._mapEvents(map);
    }
    get queues() {
        return this._collection;
    }
    get _channelManager() {
        return this.getProp(PROP_CHANNEL_MANAGER);
    }
    static get events() {
        return EVENTS;
    }
    start(callback, thisp) {
        function finish() {
            if (typeof callback === "function") {
                this.server.logger.info('manager "QueueManager" started');
                callback.call(thisp, null, "queueManager");
            }
        }
        function handleQueueParamsEvent(event) {
            const queue = new QueueModel_1.default(event);
            this.logger.debug("Adding new queue: %s", queue.id);
            this.queues.add(queue);
        }
        function handleQueueMemberEvent(event) {
            const queue = this.queues.get(event.Queue);
            if (queue == null) {
                this.logger.error("Ignored QueueEntryEvent for unknown queue " + event.Queue);
                return;
            }
            let member = queue.getMember(event.Name);
            if (member == null) {
                member = new QueueMemberModel_1.default(event);
            }
            queue.addMember(member);
            if (this.server.managers.peer.enabled) {
                const peer = this.server.managers.peer.peers.get(member.interface);
                if (peer) {
                    peer.addQueue(queue.id);
                }
            }
            this.emit(QueueManager.events.MEMBER_ADD, member, queue);
        }
        function handleQueueEntryEvent(event) {
            const queue = this.getQueueByName(event.Queue);
            const channel = this._channelManager.getChannelByName(event.Channel);
            if (queue == null) {
                this.logger.error("Ignored QueueEntryEvent for unknown queue " + event.Queue);
                return;
            }
            if (channel == null) {
                this.logger.error("Ignored QueueEntryEvent for unknown channel " + event.Channel);
                return;
            }
            if (queue.getEntry(event.Channel) != null) {
                this.logger.error("Ignored duplicate queue entry during population in queue %s for channel %s , %j", event.Channel, event.Queue, event);
                return;
            }
            // Asterisk gives us an initial position but doesn't tell us when he shifts the others
            // We won't use this data for ordering until there is a appropriate event in AMI.
            // (and refreshing the whole queue is too intensive and suffers incoherencies
            // due to asynchronous shift that leaves holes if requested too fast)
            queue.createNewEntry(channel, event.Position, event.$time, event.Event);
        }
        this.server.logger.info('starting manager "QueueManager"');
        if (!this.enabled) {
            finish.call(this);
            return;
        }
        const action = { Action: actionNames_1.default.QUEUE_STATUS };
        this.server.sendEventGeneratingAction(action, (err, response) => {
            if (err) {
                callback.call(thisp, err);
                return;
            }
            response.events.forEach((event) => {
                if (event.Event === eventNames_1.default.QUEUE_PARAMS) {
                    handleQueueParamsEvent.call(this, event);
                }
                else if (event.Event === eventNames_1.default.QUEUE_MEMBER) {
                    handleQueueMemberEvent.call(this, event);
                }
                else if (event.Event === eventNames_1.default.QUEUE_ENTRY) {
                    handleQueueEntryEvent.call(this, event);
                }
            }, this);
            finish.call(this);
        }, this);
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
     */
    getQueuesArray() {
        return this.queues.toArray();
    }
    getQueueByName(queueName) {
        const queue = this.queues.get(queueName);
        if (queue == null) {
            this.logger.error("Requested queue '" + queueName + "' not found!");
        }
        return queue;
    }
    /**
     * Called from AsteriskServer whenever a new entry appears in a queue.
     * @param   event the JoinEvent received
     */
    _handleCallerJoinEvent(event) {
        this.logger.debug("handle Join queue: %s, pos: %s, %j", event.Queue, event.Position, event.Channel);
        const queue = this.getQueueByName(event.Queue);
        const channel = this._channelManager.getChannelByName(event.Channel);
        if (queue == null) {
            this.logger.error("Ignored JoinEvent for unknown queue " + event.Queue);
            return;
        }
        if (channel == null) {
            this.logger.error("Ignored JoinEvent for unknown channel " + event.Channel);
            return;
        }
        if (queue.getEntry(event.Channel) != null) {
            this.logger.error("Ignored duplicate queue entry in queue " + event.Queue +
                " for channel " + event.Channel);
            return;
        }
        // Asterisk gives us an initial position but doesn't tell us when he shifts the others
        // We won't use this data for ordering until there is a appropriate event in AMI.
        // (and refreshing the whole queue is too intensive and suffers incoherencies
        // due to asynchronous shift that leaves holes if requested too fast)
        queue.createNewEntry(channel, parseInt(event.Position, 10), event.$time, event.Event);
    }
    /**
     * Called from AsteriskServer whenever an entry leaves a queue.
     * @param  event - the LeaveEvent received
     */
    _handleLeaveEvent(event) {
        this.logger.debug("handle Leave queue: %s, pos: %s, %j", event.Queue, event.Position, event.Channel);
        const queue = this.getQueueByName(event.Queue);
        const channel = this._channelManager.getChannelByName(event.Channel);
        if (queue == null) {
            this.logger.error("Ignored LeaveEvent for unknown queue " + event.Queue);
            return;
        }
        if (channel == null) {
            this.logger.error("Ignored LeaveEvent for unknown channel " + event.Channel);
            return;
        }
        const existingQueueEntry = queue.getEntry(event.Channel);
        if (existingQueueEntry == null) {
            this.logger.error("Ignored leave event for non existing queue entry in queue " + event.Queue + " for channel " + event.Channel);
            return;
        }
        queue.removeEntry(existingQueueEntry, event.$time);
    }
    /**
     * Called from AsteriskServer whenever an entry Abandon a queue.
     * @param  event - the AbandonEvent received
     */
    _handleAbandonEvent(event) {
        this.logger.debug("handle Abandon queue: %s, pos: %s, %j", event.Queue, event.Position, event.Channel);
        const queue = this.getQueueByName(event.Queue);
        const channel = this._channelManager.getChannelByName(event.Channel);
        if (queue == null) {
            this.logger.error("Ignored AbandonEvent for unknown queue " + event.Queue);
            return;
        }
        if (channel == null) {
            this.logger.error("Ignored AbandonEvent for unknown channel " + event.Channel);
            return;
        }
        const existingQueueEntry = queue.getEntry(event.Channel);
        if (existingQueueEntry == null) {
            this.logger.error("Ignored Abandon event for non existing queue entry in queue " + event.Queue + " for channel " + event.Channel);
            return;
        }
        existingQueueEntry.abandoned = true;
        queue.abandoned = queue.abandoned + 1;
    }
    _handleMemberStatusEvent(event) {
        this.logger.debug("handle QueueMemberStatus queue: %s member: %s ,(%s)", event.Queue, event.Interface, queueMemberState_1.default.byValue(parseInt(event.Status, 10)).name);
        const queue = this.getQueueByName(event.Queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown queue " + event.Queue);
            return;
        }
        const member = queue.getMember(event.Interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown member " + event.Interface);
            return;
        }
        member.update(event);
    }
    _handleMemberPauseEvent(event) {
        this.logger.debug("handle QueueMemberPaused queue: %s, pause: %s ,%s", event.Queue, astUtil_1.default.isTrue(event.Paused).toString(), event.MemberName);
        const queue = this.getQueueByName(event.Queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberPausedEvent for unknown queue " + event.Queue);
            return;
        }
        const member = queue.getMember(event.Interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberPausedEvent for unknown member " + event.Interface);
            return;
        }
        member.paused = astUtil_1.default.isTrue(event.Paused);
    }
    _handleMemberPenaltyEvent(event) {
        this.logger.debug("handle QueueMemberPenalty queue: %s, pen: %s ,%s", event.Queue, event.Penalty, event.MemberName);
        const queue = this.getQueueByName(event.Queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown queue " + event.Queue);
            return;
        }
        const member = queue.getMember(event.Interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown member " + event.Interface);
            return;
        }
        member.penalty = parseInt(event.Penalty, 10);
    }
    _handleMemberAddedEvent(event) {
        this.logger.debug("handle QueueMemberAdded queue: %s, %s (%s)", event.Queue, event.Interface, queueMemberState_1.default.byValue(parseInt(event.Status, 10)).name);
        const queue = this.queues.get(event.Queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberAddedEvent for unknown queue " + event.Queue);
            return;
        }
        let member = queue.getMember(event.Interface);
        if (member == null) {
            member = new QueueMemberModel_1.default(event);
        }
        queue.addMember(member);
        if (this.server.managers.peer.enabled) {
            const peer = this.server.managers.peer.peers.get(member.interface);
            if (peer) {
                peer.addQueue(queue.id);
            }
        }
        this.emit(QueueManager.events.MEMBER_ADD, member, queue);
    }
    _handleMemberRemovedEvent(event) {
        this.logger.debug("handle queueMemberRemoved queue: %s, %s", event.Queue, event.Interface);
        const queue = this.queues.get(event.Queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberRemovedEvent for unknown queue " + event.Queue);
            return;
        }
        const member = queue.getMember(event.Interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberRemovedEvent for unknown agent name: " + event.MemberName +
                " interface: " + event.Interface + " queue: " + event.Queue);
            return;
        }
        queue.removeMember(member);
        if (this.server.managers.peer.enabled) {
            const peer = this.server.managers.peer.peers.get(member.interface);
            if (peer) {
                peer.removeQueue(queue.id);
            }
        }
        this.emit(QueueManager.events.MEMBER_REMOVE, member, queue);
    }
}
const EVENTS = Object.assign({}, Manager_1.default.events, { MEMBER_ADD: Symbol("member:add"), MEMBER_REMOVE: Symbol("member:remove") });
exports.default = QueueManager;
//# sourceMappingURL=QueueManager.js.map