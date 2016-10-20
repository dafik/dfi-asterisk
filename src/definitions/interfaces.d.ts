import {IAstActionOriginate} from "../internal/asterisk/actions";
import {IAstEvent, IAstEventDBGetResponse} from "../internal/asterisk/events";
import Channel = require("../models/ChannelModel");
import AsteriskVersion = require("../internal/server/Version");

export interface IDfiCallback extends Function {
    (error?, result?): void;
    fired?: boolean;
}
export interface IDfiActionCallback extends Function {
    (error?, result?: IDfiAMIResponse): void;
    fired?: boolean;
}
export interface IDfiAMIMultiCallback<E extends IAstEvent> extends Function {
    (error?, result?: IDfiAMIResponseMessageMulti<E>): void;
    fired?: boolean;
}

export interface IDfiGetAsteriskVersionCallback extends Function {
    (error?, result?: AsteriskVersion): void;
    fired?: boolean;
}

export interface IDfiDBGetCallback extends Function {
    (error?, result?: IAstEventDBGetResponse): void;
    fired?: boolean;
}

export interface IDfiGetFileVersionCallback extends Function {
    (error?, result?: string[]): void;
    fired?: boolean;
}



export interface IDfiVariableCallback extends Object {
    fn: IDfiCallback;
    context?;
}


export interface IEventHandle extends Function {
    (event: IAstEvent): void;
}

export interface IDfiAstOriginateCallbackData {
    action: IAstActionOriginate;
    date: number;
    callbackFn: IDfiAsOriginateCallback;
    context?;
    channel: string;
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

export interface IDfiAstResponse extends IAstEvent {
    Response: string;
    EventList: string;
    Message: string;
}

export interface IDfiAMIResponseMessageMulti<E extends IAstEvent> extends IAstEvent {
    Response: string;
    EventList: string;
    Message: string;
    events: E[];
    fn: IDfiCallback;
    ctx?: any;
}
export interface IDfiAstResponseMessageMulti<E extends IAstEvent> {
    events: E[];
    fn: IDfiCallback;
    ctx?: any;
}

export interface IDfiAMIResponse {
    Response: string; // Error, Follows
    ActionID: string;
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
export interface IDfiAMIResponseError extends IDfiAMIResponseMessage {

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
