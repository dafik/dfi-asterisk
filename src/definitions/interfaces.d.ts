import {IAstAction, IAstActionCommand, IAstActionDBGet, IAstActionGetvar, IAstActionOriginate, IAstActionShowDialPlan} from "../internal/asterisk/actions";
import {IAstEvent} from "../internal/asterisk/events";
import AsteriskVersion from "../internal/server/Version";
import Channel from "../models/ChannelModel";
import DialplanContext from "../models/dialplans/DialplanContextModel";
import QueueEntry from "../models/queues/QueueEntryModel";
import QueueMember from "../models/queues/QueueMemberModel";

export type AsteriskActionType1 = IAstAction | IAstActionGetvar | IAstActionCommand;
export type AsteriskActionType2 = IAstAction | IAstActionCommand;

export interface IDfiCallbackError<Er extends Error> extends Function {
    (error?: Er): void;

    fired?: boolean;
}

export interface IDfiCallbackResult<Er extends Error, R> extends IDfiCallbackError<Er> {
    (error?: Er, result?: R): void;

    fired?: boolean;
}

export interface IDfiAMIResponseError<A extends IAstAction> extends Error {
    action: A;
}

export interface IDfiAMICallbackError<A extends IAstAction> extends Function {
    (error?: IDfiAMIResponseError<A>): void;

    fired?: boolean;
}

/*export interface IDfiAMICallbackResult<A extends IAstAction> extends IDfiCallbackError {
    (error?: IDfiAMIResponseError, result?): void;

    fired?: boolean;
}*/

export interface IDfiActionCallback<R extends IDfiAMIResponse, A extends IAstAction> extends Function {
    (error?: IDfiAMIResponseError<IAstAction | IAstActionGetvar | IAstActionCommand>, result?: R): void;

    fired?: boolean;
}

export interface IDfiAMIMultiCallback<Ev extends IAstEvent, A extends IAstAction, Er extends Error, R> extends Function {
    (error?: IDfiAMIResponseError<IAstAction | IAstActionCommand>, result?: IDfiAMIResponseMessageMulti<Ev, Er, R>): void;

    fired?: boolean;
}

export interface IDfiGetAsteriskVersionCallback extends Function {
    (error?: IDfiAMIResponseError<IAstActionCommand>, result?: AsteriskVersion): void;

    fired?: boolean;
}

export interface IDfiDBGetCallback extends Function {
    (error?: IDfiAMIResponseError<IAstActionDBGet>, result?: { Family: string; Key: string; Val: string; }): void;

    fired?: boolean;
}

export interface IDfiGetDialplansCallback extends Function {
    (error?: IDfiAMIResponseError<IAstActionShowDialPlan>, result?: Map<string, DialplanContext>): void;

    fired?: boolean;
}

export interface IDfiGetDialplanCallback extends Function {
    (error?: IDfiAMIResponseError<IAstActionShowDialPlan>, result?: DialplanContext): void;

    fired?: boolean;
}

export interface IDfiGetFileVersionCallback extends Function {
    (error?: IDfiAMIResponseError<IAstActionCommand>, result?: string[]): void;

    fired?: boolean;
}

export interface IDfiVariableCallback<Er extends Error, R> extends Object {
    fn: IDfiCallbackResult<Er, R>;
    context?;
}

type IEventHandle = (event: IAstEvent) => void;

export interface IDfiAstOriginateCallbackData {
    action: IAstActionOriginate;
    date: number;
    callbackFn: IDfiAsOriginateCallback;
    channel?: Channel;
    channel2?: Channel;
    channel1?: Channel ;
}

export interface IDfiAsOriginateCallback {
    /**
     * Called if the originate was unsuccessful because the called party was
     * busy.
     *
     * @param channel the channel created.
     */
    onBusy(channel: Channel): void;

    /**
     * Called when the channel has been created and before it starts ringing.
     *
     * @param channel the channel created.
     */
    onDialing(channel: Channel): void;

    /**
     * Called if the originate failed for example due to an invalid channel name
     * or an originate to an unregistered SIP or IAX peer.
     *
     * @param cause the exception that caused the failure.
     */
    onFailure<T extends Error>(cause: T): void;

    /**
     * Called if the originate was unsuccessful because the called party did not
     * answer the call.
     *
     * @param channel the channel created.
     */
    onNoAnswer(channel: Channel): void;

    /**
     * Called if the originate was successful and the called party answered the
     * call.
     *
     * @param channel the channel created.
     */
    onSuccess(channel: Channel): void;
}

interface IDfiAstQueueListener {
    /**
     * Called whenever an entry appears in the queue.
     *
     * @param entry the new entry.
     */
    onNewEntry(entry: QueueEntry);

    /**
     * Called whenever an entry leaves the queue.
     * @param entry the entry that leaves the queue.
     */
    onEntryLeave(entry: QueueEntry) ;

    /**
     * Called whenever a member changes his state.
     * @param member the member that changes his state.
     */
    onMemberStateChange(member: QueueMember) ;

    /**
     * @param entry
     */
    onEntryServiceLevelExceeded(entry: QueueMember) ;

    /**
     * Called whenever a new member is added to the queue.
     * @param member the new member.
     */
    onMemberAdded(member: QueueMember) ;

    /**
     * Called whenever a member is removed from this queue.
     * @param member the member that has been removed from the queue.
     */
    onMemberRemoved(member: QueueMember) ;
}

// TODO check fn
export interface IDfiAMIResponseMessageMulti<Ev extends IAstEvent, Er extends Error, R> extends IAstEvent {
    Response: string;
    EventList: string;
    Message: string;
    events: Ev[];
    fn: IDfiCallbackResult<Er, R>;
    ctx?: any;
}

export interface IDfiAstResponseMessageMulti<Ev extends IAstEvent, Er extends Error, R> {
    events: Ev[];
    fn: IDfiCallbackResult<Er, R>;
    ctx?: any;
}

export interface IDfiAMIResponse {
    Response: string; // Error, Follows
    ActionID?: string;
    Message?: string;
    $content?: string;
    $time: number;
}

export interface IDfiAMIResponseMessage extends IDfiAMIResponse {
    Message: string;

    $content?: string;
    Privilege?: string;
}

export interface IDfiAMIResponseSuccess extends IDfiAMIResponseMessage {
    Privilege: string;
}

export interface IDfiAMIResponseCommand extends IDfiAMIResponseSuccess {
    $content: string;
}

export interface IDfiAMIResponseMailboxCount extends IDfiAMIResponseSuccess {
    Mailbox: string;
    UrgMessages: string;
    NewMessages: string;
    OldMessages: string;
}

export interface IDfiAMIResponseGetvar extends IDfiAMIResponse {
    Variable: string;
    Value: string;
}

export interface IDfiAMIResponseOriginate extends IDfiAMIResponse {
    Uniqueid: string;
    Event: string;
}

export interface IEventHandlersMap {
    [key: string]: IEventHandle;
}

export interface AsyncResultArrayCallback<T, E> { (err?: E, results?: (T | undefined)[]): void; }
