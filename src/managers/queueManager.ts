import AsteriskManager = require("../internal/server/Manager");
import Queues = require("../collections/QueuesCollection");
import {IDfiAstEventsQueueManager} from "../definitions/events";
import {IAstActionQueueStatus} from "../internal/asterisk/actions";
import {         AST_EVENT} from "../internal/asterisk/eventNames";
import {
    IAstEventQueueCallerAbandon,
    IAstEventQueueCallerJoin,
    IAstEventQueueCallerLeave,
    IAstEventQueueEntry,
    IAstEventQueueMember,
    IAstEventQueueMemberAdded,
    IAstEventQueueMemberPause,
    IAstEventQueueMemberPenalty,
    IAstEventQueueMemberRemoved,
    IAstEventQueueMemberStatus,
    IAstEventQueueParams
} from "../internal/asterisk/events";

import ChannelManager = require("./channelManager");
import Queue = require("../models/queues/QueueModel");
import QueueMember = require("../models/queues/QueueMemberModel");
import QueueMemberState = require("../states/queueMemberState");
import AstUtil = require("../internal/astUtil");
import {AST_ACTION} from "../internal/asterisk/actionNames";

const PROP_CHANNEL_MANAGER = "channelManager";

/**
 * Manages queue events on behalf of an AsteriskServer.
 */
class QueueManager extends AsteriskManager<Queue, Queues> {

    constructor(options, state) {
        super(options, state, new Queues());

        this.server.once(this.serverEvents.BEFORE_INIT, () => {
            this.setProp(PROP_CHANNEL_MANAGER, this.server.managers.channel);
        }, this);
    }

    get queues(): Queues {
        return this._collection;
    }

    private get _channelManager(): ChannelManager {
        return this.getProp(PROP_CHANNEL_MANAGER);
    }

    static get events(): IDfiAstEventsQueueManager {
        return EVENTS;
    }

    public start(callback, thisp) {

        function finish() {
            if (typeof callback === "function") {
                this.server.logger.info('manager "QueueManager" started');
                callback.call(thisp, null, "queueManager");
            }
        }

        function onResponse(err, response) {

            if (err) {
                callback.call(thisp, err);
                return;
            }
            response.getEvents().forEach((event) => {
                if (event.Event === AST_EVENT.QUEUE_PARAMS) {
                    handleQueueParamsEvent.call(this, event);
                } else if (event.Event === AST_EVENT.QUEUE_MEMBER) {
                    handleQueueMemberEvent.call(this, event);
                } else if (event.Event === AST_EVENT.QUEUE_ENTRY) {
                    handleQueueEntryEvent.call(this, event);
                }
            }, this);

            finish.call(this);
        }

        /**
         * Called during initialization to populate the list of queues.
         */
        function handleQueueParamsEvent(event: IAstEventQueueParams) {

            let queue = new Queue(event);
            this.logger.debug("Adding new queue: %s", queue.id);
            this.queues.add(queue);

        }

        /**
         * Called during initialization to populate the members of the queues.
         * @param event the QueueMemberEvent received
         */
        function handleQueueMemberEvent(event: IAstEventQueueMember) {

            let queue = this.queues.get(event.Queue);
            if (queue == null) {
                this.logger.error("Ignored QueueEntryEvent for unknown queue " + event.Queue);
                return;
            }
            let member = queue.getMember(event.Name);
            if (member == null) {
                member = new QueueMember(event);
            }
            queue.addMember(member);
            this.emit(QueueManager.events.MEMBER_ADD, member, queue);
        }

        /**
         * Called during initialization to populate entries of the queues.
         * Currently does the same as handleJoinEvent()
         */
        function handleQueueEntryEvent(event: IAstEventQueueEntry) {
            let queue = this.getQueueByName(event.Queue);
            let channel = this._channelManager.getChannelByName(event.Channel);
            if (queue == null) {
                this.logger.error("Ignored QueueEntryEvent for unknown queue " + event.Queue);
                return;
            }
            if (channel == null) {
                this.logger.error("Ignored QueueEntryEvent for unknown channel " + event.Channel);
                return;
            }
            if (queue.getEntry(event.Channel) != null) {
                this.logger.error("Ignored duplicate queue entry during population in queue "
                    + event.Queue + " for channel " + event.Channel);
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

        let map = {};
        map[AST_EVENT.QUEUE_MEMBER_ADDED] = this._handleMemberAddedEvent;
        map[AST_EVENT.QUEUE_MEMBER_PAUSE] = this._handleMemberPauseEvent;
        map[AST_EVENT.QUEUE_MEMBER_PAUSE] = this._handleMemberPauseEvent;
        map[AST_EVENT.QUEUE_MEMBER_PENALTY] = this._handleMemberPenaltyEvent;
        map[AST_EVENT.QUEUE_MEMBER_REMOVED] = this._handleMemberRemovedEvent;
        map[AST_EVENT.QUEUE_MEMBER_STATUS] = this._handleMemberStatusEvent;

        if (this.server.managers.channel.enabled) {

            map[AST_EVENT.QUEUE_CALLER_ABANDON] = this._handleAbandonEvent;
            map[AST_EVENT.QUEUE_CALLER_JOIN] = this._handleCallerJoinEvent;
            map[AST_EVENT.QUEUE_CALLER_LEAVE] = this._handleLeaveEvent;
        }

        this._mapEvents(map);

        let action: IAstActionQueueStatus = {Action: AST_ACTION.QUEUE_STATUS};
        this.server.sendEventGeneratingAction(action, onResponse, this);
    }

    public disconnected() {
        this.queues.forEach(onForeach);
        function onForeach(queue) {
            queue.cancelServiceLevelTimer();
        }

        this.queues.clear();
    }

    /**
     * Gets (a copy of) the list of the queues.
     */
    public getQueuesArray() {
        return this.queues.toArray();
    }

    public getQueueByName(queueName: string): Queue {
        let queue = this.queues.get(queueName);
        if (queue == null) {
            this.logger.error("Requested queue '" + queueName + "' not found!");
        }
        return queue;
    }

    /**
     * Called from AsteriskServer whenever a new entry appears in a queue.
     * @param   event the JoinEvent received
     */
    private _handleCallerJoinEvent(event: IAstEventQueueCallerJoin) {
        this.logger.debug("handle Join queue: %s, pos: %s, %j", event.Queue, event.Position, event.Channel);

        let queue = this.getQueueByName(event.Queue);
        let channel = this._channelManager.getChannelByName(event.Channel);
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
    private _handleLeaveEvent(event: IAstEventQueueCallerLeave) {

        this.logger.debug("handle Leave queue: %s, pos: %s, %j", event.Queue, event.Position, event.Channel);

        let queue = this.getQueueByName(event.Queue);
        let channel = this._channelManager.getChannelByName(event.Channel);
        if (queue == null) {
            this.logger.error("Ignored LeaveEvent for unknown queue " + event.Queue);
            return;
        }
        if (channel == null) {
            this.logger.error("Ignored LeaveEvent for unknown channel " + event.Channel);
            return;
        }
        let existingQueueEntry = queue.getEntry(event.Channel);
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
    private _handleAbandonEvent(event: IAstEventQueueCallerAbandon) {

        this.logger.debug("handle Abandon queue: %s, pos: %s, %j", event.Queue, event.Position, event.Channel);

        let queue = this.getQueueByName(event.Queue);
        let channel = this._channelManager.getChannelByName(event.Channel);
        if (queue == null) {
            this.logger.error("Ignored AbandonEvent for unknown queue " + event.Queue);
            return;
        }
        if (channel == null) {
            this.logger.error("Ignored AbandonEvent for unknown channel " + event.Channel);
            return;
        }
        let existingQueueEntry = queue.getEntry(event.Channel);
        if (existingQueueEntry == null) {
            this.logger.error("Ignored Abandon event for non existing queue entry in queue " + event.Queue + " for channel " + event.Channel);
            return;
        }
        existingQueueEntry.abandoned = true;
        queue.abandoned = queue.abandoned + 1;
    }

    private _handleMemberStatusEvent(event: IAstEventQueueMemberStatus) {
        this.logger.debug("handle QueueMemberStatus queue: %s member: %s ,(%s)", event.Queue, event.Interface, QueueMemberState.byValue(parseInt(event.Status, 10)).name);

        let queue = this.getQueueByName(event.Queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown queue " + event.Queue);
            return;
        }
        let member = queue.getMember(event.Interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown member " + event.Interface);
            return;
        }
        member.update(event);
    }

    private _handleMemberPauseEvent(event: IAstEventQueueMemberPause) {
        this.logger.debug("handle QueueMemberPaused queue: %s, pause: %s ,%s", event.Queue, AstUtil.isTrue(event.Paused).toString(), event.MemberName);

        let queue = this.getQueueByName(event.Queue);

        if (queue == null) {
            this.logger.error("Ignored QueueMemberPausedEvent for unknown queue " + event.Queue);
            return;
        }
        let member = queue.getMember(event.Interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberPausedEvent for unknown member " + event.Interface);
            return;
        }
        member.paused = AstUtil.isTrue(event.Paused);
    }

    private _handleMemberPenaltyEvent(event: IAstEventQueueMemberPenalty) {
        this.logger.debug("handle QueueMemberPenalty queue: %s, pen: %s ,%s", event.Queue, event.Penalty, event.MemberName);

        let queue = this.getQueueByName(event.Queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown queue " + event.Queue);
            return;
        }
        let member = queue.getMember(event.Interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberStatusEvent for unknown member " + event.Interface);
            return;
        }
        member.penalty = parseInt(event.Penalty, 10);
    }

    private _handleMemberAddedEvent(event: IAstEventQueueMemberAdded) {
        this.logger.debug("handle QueueMemberAdded queue: %s, %s (%s)", event.Queue, event.Interface, QueueMemberState.byValue(parseInt(event.Status, 10)).name);

        let queue = this.queues.get(event.Queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberAddedEvent for unknown queue " + event.Queue);
            return;
        }
        let member = queue.getMember(event.Interface);
        if (member == null) {
            member = new QueueMember(event);
        }
        queue.addMember(member);
        this.emit(QueueManager.events.MEMBER_ADD, member, queue);
    }

    private _handleMemberRemovedEvent(event: IAstEventQueueMemberRemoved) {
        this.logger.debug("handle queueMemberRemoved queue: %s, %s", event.Queue, event.Interface);

        let queue = this.queues.get(event.Queue);
        if (queue == null) {
            this.logger.error("Ignored QueueMemberRemovedEvent for unknown queue " + event.Queue);
            return;
        }
        let member = queue.getMember(event.Interface);
        if (member == null) {
            this.logger.error("Ignored QueueMemberRemovedEvent for unknown agent name: " + event.MemberName +
                " interface: " + event.Interface + " queue: " + event.Queue);
            return;
        }
        queue.removeMember(member);
        this.emit(QueueManager.events.MEMBER_REMOVE, member, queue);
    }
}

const EVENTS: IDfiAstEventsQueueManager = Object.assign(
    Object.assign({}, AsteriskManager.events),
    {
        MEMBER_ADD: Symbol("member:add"),
        MEMBER_REMOVE: Symbol("member:remove")
    }
);

export = QueueManager;
