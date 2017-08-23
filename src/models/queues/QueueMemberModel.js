"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskModel_1 = require("../../internal/asteriskModel");
const queueMemberState_1 = require("../../states/queueMemberState");
const astUtil_1 = require("../../internal/astUtil");
const ManagerError_1 = require("../../errors/ManagerError");
const IllegalArgument_1 = require("../../errors/IllegalArgument");
const InvalidPenatly_1 = require("../../errors/InvalidPenatly");
const queueMemberStates_1 = require("../../enums/queueMemberStates");
const NoSuchInterface_1 = require("../../errors/NoSuchInterface");
const actionNames_1 = require("../../internal/asterisk/actionNames");
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
class QueueMember extends asteriskModel_1.default {
    constructor(attributes, options) {
        options = options || {};
        options.idAttribute = PROP_INTERFACE;
        attributes.state = queueMemberState_1.default.byValue(parseInt(attributes.Status, 10));
        attributes.CallsTaken = parseInt(attributes.CallsTaken.toString(), 10);
        attributes.LastCall = parseInt(attributes.LastCall.toString(), 10);
        attributes.Penalty = parseInt(attributes.Penalty.toString(), 10);
        attributes.InCall = astUtil_1.default.isTrue(attributes.InCall.toString());
        attributes.Paused = astUtil_1.default.isTrue(attributes.Paused.toString());
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
        this.set(PROP_IN_CALL, astUtil_1.default.isTrue(event.InCall));
        this.set(PROP_STATE, queueMemberState_1.default.byValue(parseInt(event.Status, 10)));
        this.set(PROP_PAUSED, astUtil_1.default.isTrue(event.Paused));
        this.set(PROP_PAUSED_REASON, event.PausedReason);
        this.set(PROP_RING_IN_USE, astUtil_1.default.isTrue(event.Ringinuse));
    }
    setPaused(paused) {
        const action = {
            Action: actionNames_1.default.QUEUE_PAUSE,
            Interface: this.interface,
            Paused: paused.toString(),
            Queue: this.queue
        };
        this._sendPauseAction(action);
    }
    setPausedAll(paused) {
        const action = {
            Action: actionNames_1.default.QUEUE_PAUSE,
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
            throw new IllegalArgument_1.default("Penalty must not be negative");
        }
        const action = {
            Action: actionNames_1.default.QUEUE_PENALTY,
            Interface: this.interface,
            Penalty: penalty.toString(),
            Queue: this.queue
        };
        this._server.sendAction(action, (err, response) => {
            if (response instanceof ManagerError_1.default) {
                const msg = "Unable to set penalty for '" + this.interface +
                    "' on '" + this.queue + "': " + response.message;
                throw new InvalidPenatly_1.default(msg);
            }
        }, this);
    }
    isAvailable() {
        return ((this.state.status === queueMemberStates_1.default.DEVICE_NOT_INUSE) && !this.paused);
    }
    _sendPauseAction(action) {
        this._server.sendAction(action, (err, response) => {
            if (response instanceof ManagerError_1.default) {
                if (action.Queue != null) {
                    const msg = "Unable to change paused state for '" + action.Interface +
                        "' on '" + action.Queue + "' : " + response.message;
                    throw new NoSuchInterface_1.default(msg, this);
                }
                else {
                    const msg = "Unable to change paused state for '" + action.Interface +
                        "' on all queues: " + response.message;
                    throw new NoSuchInterface_1.default(msg, this);
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
    ["state", PROP_STATE],
    ["Paused", PROP_PAUSED],
    ["PausedReason", PROP_PAUSED_REASON],
    ["ringInUse", PROP_RING_IN_USE]
]);
exports.default = QueueMember;
//# sourceMappingURL=QueueMemberModel.js.map