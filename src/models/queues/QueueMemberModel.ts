import AsteriskModel = require("../../internal/asteriskModel");
import {IDfiAstModelAttribsQueueMember, IDfiAstModelOptions} from "../../definitions/models";
import {IAstActionQueuePause, IAstActionQueuePenalty} from "../../internal/asterisk/actions";
import {IAstEventQueueMemberStatus} from "../../internal/asterisk/events";
import QueueMemberState = require("../../states/queueMemberState");
import AstUtil = require("../../internal/astUtil");
import ManagerError = require("../../errors/ManagerError");
import IllegalArgumentError = require("../../errors/IllegalArgument");
import InvalidPenalty = require("../../errors/InvalidPenatly");
import QueueMemberStates = require("../../enums/queueMemberStates");
import NoSuchInterface = require("../../errors/NoSuchInterface");
import Agent = require("../AgentModel");
import AST_ACTION = require("../../internal/asterisk/actionNames");

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

    protected static map = new Map([

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

    constructor(attributes: IDfiAstModelAttribsQueueMember, options?: IDfiAstModelOptions) {
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

    get queue(): string {
        return this.get(PROP_QUEUE);
    }

    get name(): string {
        return this.get(PROP_NAME);
    }

    get interface(): string {
        return this.get(PROP_INTERFACE);
    }

    get stateInterface(): string {
        return this.get(PROP_STATE_INTERFACE);
    }

    get membership(): string {
        return this.get(PROP_MEMBERSHIP);
    }

    get penalty(): number {
        return this.get(PROP_PENALTY);
    }

    set penalty(penalty: number) {
        this.set(PROP_PENALTY, penalty)
        ;
    }

    get callsTaken(): number {
        return this.get(PROP_CALLS_TAKEN);
    }

    get lastCall(): number {
        return this.get(PROP_LAST_CALL);
    }

    get inCall(): boolean {
        return this.get(PROP_IN_CALL);
    }

    get paused(): boolean {
        return this.get(PROP_PAUSED);
    }

    set paused(paused: boolean) {
        this.set(PROP_PAUSED, paused);
    }

    get pausedReason(): string {
        return this.get(PROP_PAUSED_REASON);
    }

    get ringInUse(): boolean {
        return this.get(PROP_RING_IN_USE);
    }

    get state(): QueueMemberState {
        return this.get(PROP_STATE);
    }

    set state(state: QueueMemberState) {
        this.set(PROP_STATE, state);
    }

    get agent(): Agent {
        return this.get(P_PROP_AGENT);
    }

    set agent(state: Agent) {
        this.set(P_PROP_AGENT, state);
    }

    public update(event: IAstEventQueueMemberStatus) {

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

    public setPaused(paused: boolean) {
        let action: IAstActionQueuePause = {
            Action: AST_ACTION.QUEUE_PAUSE,
            Interface: this.interface,
            Paused: paused.toString(),
            Queue: this.queue
        };
        this._sendPauseAction(action);
    }

    public setPausedAll(paused: boolean) {
        let action: IAstActionQueuePause = {
            Action: AST_ACTION.QUEUE_PAUSE,
            Interface: this.interface,
            Paused: paused.toString()
        };
        this._sendPauseAction(action);
    }

    public isStatic(): boolean {
        return MEMBERSHIP_STATIC === this.membership;
    }

    public isDynamic(): boolean {
        return MEMBERSHIP_DYNAMIC === this.membership;
    }

    public setPenalty(penalty: number) {
        if (penalty < 0) {
            throw new IllegalArgumentError("Penalty must not be negative");
        }
        let action: IAstActionQueuePenalty = {
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

    public isAvailable() {
        return ((this.state.status === QueueMemberStates.DEVICE_NOT_INUSE) && !this.paused );
    }

    private _sendPauseAction(action: IAstActionQueuePause) {
        this._server.sendAction(action, (err, response) => {
            if (response instanceof ManagerError) {
                if (action.Queue != null) {
                    let msg = "Unable to change paused state for '" + action.Interface +
                        "' on '" + action.Queue + "' : " + response.message;
                    throw new NoSuchInterface(msg, this);
                } else {
                    let msg = "Unable to change paused state for '" + action.Interface +
                        "' on all queues: " + response.message;
                    throw new NoSuchInterface(msg, this);
                }
            }
        }, this);
    }
}

export = QueueMember;
