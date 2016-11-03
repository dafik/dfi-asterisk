"use strict";
const AsteriskModel = require("../../internal/asteriskModel");
const QueueMemberState = require("../../states/queueMemberState");
const AstUtil = require("../../internal/astUtil");
const ManagerError = require("../../errors/ManagerError");
const IllegalArgumentError = require("../../errors/IllegalArgument");
const InvalidPenalty = require("../../errors/InvalidPenatly");
const QueueMemberStates = require("../../enums/queueMemberStates");
const NoSuchInterface = require("../../errors/NoSuchInterface");
const AST_ACTION = require("../../internal/asterisk/actionNames");
const PROP_QUEUE = "queue";
const PROP_NAME = "name";
const PROP_INTERFACE = "interface";
const PROP_STATE_INTERFACE = "stateInterface";
const PROP_MEMBERSHIP = "membership";
const PROP_PENALTY = "penalty";
const PROP_CALLS_TAKEN = "callsTaken";
const PROP_LAST_CALL = "lastCall";
const PROP_IN_CALL = "inCall";
const PROP_STATE = "state";
const PROP_PAUSED = "paused";
const PROP_PAUSED_REASON = "pausedReason";
const PROP_RING_IN_USE = "ringInUse";
const P_PROP_AGENT = "agent";
const MEMBERSHIP_STATIC = "static";
const MEMBERSHIP_DYNAMIC = "dynamic";
class QueueMember extends AsteriskModel {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_INTERFACE;
        attributes.state = QueueMemberState.byValue(parseInt(attributes.Status, 10));
        attributes.CallsTaken = parseInt(attributes.CallsTaken.toString(), 10);
        attributes.LastCall = parseInt(attributes.LastCall.toString(), 10);
        attributes.Penalty = parseInt(attributes.Penalty.toString(), 10);
        attributes.InCall = AstUtil.isTrue(attributes.InCall.toString());
        attributes.Paused = AstUtil.isTrue(attributes.Paused.toString());
        attributes.ringInUse = false;
        super(attributes, options);
    }
    get queue() {
        return this.get(PROP_QUEUE);
    }
    get name() {
        return this.get(PROP_NAME);
    }
    get interface() {
        return this.get(PROP_INTERFACE);
    }
    get stateInterface() {
        return this.get(PROP_STATE_INTERFACE);
    }
    get membership() {
        return this.get(PROP_MEMBERSHIP);
    }
    get penalty() {
        return this.get(PROP_PENALTY);
    }
    set penalty(penalty) {
        this.set(PROP_PENALTY, penalty);
    }
    get callsTaken() {
        return this.get(PROP_CALLS_TAKEN);
    }
    get lastCall() {
        return this.get(PROP_LAST_CALL);
    }
    get inCall() {
        return this.get(PROP_IN_CALL);
    }
    get paused() {
        return this.get(PROP_PAUSED);
    }
    set paused(paused) {
        this.set(PROP_PAUSED, paused);
    }
    get pausedReason() {
        return this.get(PROP_PAUSED_REASON);
    }
    get ringInUse() {
        return this.get(PROP_RING_IN_USE);
    }
    get state() {
        return this.get(PROP_STATE);
    }
    set state(state) {
        this.set(PROP_STATE, state);
    }
    get agent() {
        return this.get(P_PROP_AGENT);
    }
    set agent(state) {
        this.set(P_PROP_AGENT, state);
    }
    update(event) {
        /*
         Queue: string;
         MemberName: string;
         Interface: string;
         StateInterface: string;
         Membership: string;
         */
        this.set(PROP_PENALTY, parseInt(event.Penalty, 10));
        this.set(PROP_CALLS_TAKEN, parseInt(event.CallsTaken, 10));
        this.set(PROP_LAST_CALL, parseInt(event.LastCall, 10));
        this.set(PROP_IN_CALL, AstUtil.isTrue(event.InCall));
        this.set(PROP_STATE, QueueMemberState.byValue(parseInt(event.Status, 10)));
        this.set(PROP_PAUSED, AstUtil.isTrue(event.Paused));
        this.set(PROP_PAUSED_REASON, event.PausedReason);
        this.set(PROP_RING_IN_USE, AstUtil.isTrue(event.Ringinuse));
    }
    setPaused(paused) {
        let action = {
            Action: AST_ACTION.QUEUE_PAUSE,
            Interface: this.interface,
            Paused: paused.toString(),
            Queue: this.queue
        };
        this._sendPauseAction(action);
    }
    setPausedAll(paused) {
        let action = {
            Action: AST_ACTION.QUEUE_PAUSE,
            Interface: this.interface,
            Paused: paused.toString()
        };
        this._sendPauseAction(action);
    }
    isStatic() {
        return MEMBERSHIP_STATIC === this.membership;
    }
    isDynamic() {
        return MEMBERSHIP_DYNAMIC === this.membership;
    }
    setPenalty(penalty) {
        if (penalty < 0) {
            throw new IllegalArgumentError("Penalty must not be negative");
        }
        let action = {
            Action: AST_ACTION.QUEUE_PENALTY,
            Interface: this.interface,
            Penalty: penalty.toString(),
            Queue: this.queue
        };
        this._server.sendAction(action, (err, response) => {
            if (response instanceof ManagerError) {
                let msg = "Unable to set penalty for '" + this.interface +
                    "' on '" + this.queue + "': " + response.message;
                throw new InvalidPenalty(msg);
            }
        }, this);
    }
    isAvailable() {
        return ((this.state.status === QueueMemberStates.DEVICE_NOT_INUSE) && !this.paused);
    }
    _sendPauseAction(action) {
        this._server.sendAction(action, (err, response) => {
            if (response instanceof ManagerError) {
                if (action.Queue != null) {
                    let msg = "Unable to change paused state for '" + action.Interface +
                        "' on '" + action.Queue + "' : " + response.message;
                    throw new NoSuchInterface(msg, this);
                }
                else {
                    let msg = "Unable to change paused state for '" + action.Interface +
                        "' on all queues: " + response.message;
                    throw new NoSuchInterface(msg, this);
                }
            }
        }, this);
    }
}
QueueMember.map = new Map([
    ["Queue", PROP_QUEUE],
    ["Name", PROP_NAME],
    ["MemberName", PROP_NAME],
    ["Location", PROP_INTERFACE],
    ["Interface", PROP_INTERFACE],
    ["StateInterface", PROP_STATE_INTERFACE],
    ["Membership", PROP_MEMBERSHIP],
    ["Penalty", PROP_PENALTY],
    ["CallsTaken", PROP_CALLS_TAKEN],
    ["LastCall", PROP_LAST_CALL],
    ["InCall", PROP_IN_CALL],
    // ["Status", "status"],
    ["Paused", PROP_PAUSED],
    ["PausedReason", PROP_PAUSED_REASON],
    ["ringInUse", PROP_RING_IN_USE]
]);
module.exports = QueueMember;
//# sourceMappingURL=QueueMemberModel.js.map