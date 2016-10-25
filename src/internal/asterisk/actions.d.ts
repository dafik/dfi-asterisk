export interface  IAstAction {
    ActionID?: string;
    Action: string;
    serialize?: boolean;
}
/**
 * @property BridgeType Optional type for filtering the resulting list of bridges.
 */
export interface IAstActionBridgeList extends IAstAction {
    BridgeType?: string;
}
export interface IAstActionParkedCalls extends IAstAction {
    ParkingLot: string;
}
export interface IAstActionQueueReload extends IAstAction {
    Queue: string;
    Members: string;
    Rules: string;
    Parameters: string;
}
export interface IAstActionIAXpeers extends IAstAction {
}
export interface IAstActionUnpauseMonitor extends IAstAction {
    Channel: string;
}
export interface IAstActionAtxfer extends IAstAction {
    Channel: string;
    Exten: string;
    Context: string;
}
export interface IAstActionMailboxCount extends IAstAction {
    Mailbox: string;
}
export interface IAstActionMonitor extends IAstAction {
    Channel: string;
    File: string;
    Format: string;
    Mix: string;
}
export interface IAstActionAOCMessage extends IAstAction {
    Channel: string;
    ChannelPrefix: string;
    MsgType: string;
    ChargeType: string;
    UnitAmount: string;
    UnitType: string;
    CurrencyName: string;
    CurrencyAmount: string;
    CurrencyMultiplier: string;
    TotalType: string;
    AOCBillingId: string;
    ChargingAssociationId: string;
    ChargingAssociationNumber: string;
    ChargingAssociationPlan: string;
}
export interface IAstActionFAXSession extends IAstAction {
    SessionNumber: string;
}
export interface IAstActionModuleCheck extends IAstAction {
    Module: string;
}
export interface IAstActionQueueRemove extends IAstAction {
    Queue: string;
    Interface: string;
}
export interface IAstActionHangup extends IAstAction {
    Channel: string;
    Cause?: string;
}
export interface IAstActionMWIUpdate extends IAstAction {
    Mailbox: string;
    OldMessages: string;
    NewMessages: string;
}
export interface IAstActionSIPqualifypeer extends IAstAction {
    Peer: string;
}
export interface IAstActionDataGet extends IAstAction {
    Path: string;
    Search: string;
    Filter: string;
}
export interface IAstActionSendText extends IAstAction {
    Channel: string;
    Message: string;
}
export interface IAstActionOriginate extends IAstAction {
    Channel: string;
    Context?: string;
    Exten?: string;
    Priority?: string;
    Application?: string;
    Data?: string;
    Timeout?: string;
    CallerID?: string;
    Variable?: string |  string[];
    Account?: string;
    EarlyMedia?: string;
    Async?: string;
    Codecs?: string;
    ChannelId?: string;
    OtherChannelId?: string;
}
export interface IAstActionShowDialPlan extends IAstAction {
    Context?: string;
    Extension?: string;

}
export interface IAstActionSKINNYlines extends IAstAction {
}
export interface IAstActionSIPpeers extends IAstAction {
}
export interface IAstActionFilter extends IAstAction {
    Operation: string;
    Filter: string;
}
export interface IAstActionMeetmeUnmute extends IAstAction {
    Meetme: string;
    Usernum: string;
}
export interface IAstActionPJSIPShowEndpoint extends IAstAction {
    Endpoint: string;
}
export interface IAstActionMixMonitorMute extends IAstAction {
    Channel: string;
    Direction: string;
    State: string;
}
export interface IAstActionxmpp extends IAstAction {
    Jabber: string;
    JID: string;
    Message: string;
}
export interface IAstActionConfbridgeLock extends IAstAction {
    Conference: string;
}
export interface IAstActionStopMonitor extends IAstAction {
    Channel: string;
}
export interface IAstActionBridgeInfo extends IAstAction {
    BridgeUniqueid: string;
}
export interface IAstActionDAHDIDNDoff extends IAstAction {
    DAHDIChannel: string;
}
export interface IAstActionPJSIPRegister extends IAstAction {
    Registration: string;
}
export interface IAstActionReload extends IAstAction {
    Module: string;
}
export interface IAstActionConfbridgeMute extends IAstAction {
    Conference: string;
    Channel: string;
}
export interface IAstActionRedirect extends IAstAction {
    Channel: string;
    ExtraChannel?: string;
    Exten: string;
    ExtraExten?: string;
    Context: string;
    ExtraContext?: string;
    Priority: string;
    ExtraPriority?: string;
}
export interface IAstActionQueueReset extends IAstAction {
    Queue: string;
}
export interface IAstActionDialplanExtensionAdd extends IAstAction {
    Context: string;
    Extension: string;
    Priority: string;
    Application: string;
    ApplicationData?: string;
    Replace?: string;
}
export interface IAstActionPJSIPUnregister extends IAstAction {
    Registration: string;
}
export interface IAstActionListCategories extends IAstAction {
    Filename: string;
}
export interface IAstActionQueueSummary extends IAstAction {
    Queue: string;
}
export interface IAstActionCommand extends IAstAction {
    Command: string;
}
export interface IAstActionPJSIPShowRegistrationsOutbound extends IAstAction {
}
export interface IAstActionPJSIPShowEndpoints extends IAstAction {
}
export interface IAstActionQueuePause extends IAstAction {
    Interface: string;
    Paused: string;
    Queue?: string;
    Reason?: string;
}
export interface IAstActionConfbridgeUnlock extends IAstAction {
    Conference: string;
}
export interface IAstActionAGI extends IAstAction {
    Channel: string;
    Command: string;
    CommandID: string;
}
export interface IAstActionPlayDTMF extends IAstAction {
    Channel: string;
    Digit: string;
    Duration?: string;
}
export interface IAstActionMeetmeList extends IAstAction {
    Conference: string;
}
export interface IAstActionBridgeDestroy extends IAstAction {
    BridgeUniqueid: string;
}
export interface IAstActionPJSIPShowSubscriptionsOutbound extends IAstAction {
}
export interface IAstActionSKINNYshowdevice extends IAstAction {
    Device: string;
}
export interface IAstActionDAHDIShowChannels extends IAstAction {
    DAHDIChannel: number; // 0 for all
}
export interface IAstActionMailboxStatus extends IAstAction {
    Mailbox: string;
}
export interface IAstActionDAHDIHangup extends IAstAction {
    DAHDIChannel: string;
}
export interface IAstActionDBDelTree extends IAstAction {
    Family: string;
    Key: string;
}
export interface IAstActionLocalOptimizeAway extends IAstAction {
    Channel: string;
}
export interface IAstActionSorceryMemoryCacheStale extends IAstAction {
    Cache: string;
}
export interface IAstActionDBGet extends IAstAction {
    Family: string;
    Key: string;
}
export interface IAstActionAgents extends IAstAction {
}
export interface IAstActionStopMixMonitor extends IAstAction {
    Channel: string;
    MixMonitorID: string;
}
export interface IAstActionVoicemailUsersList extends IAstAction {
}
export interface IAstActionMeetmeMute extends IAstAction {
    Meetme: string;
    Usernum: string;
}
export interface IAstActionPJSIPShowRegistrationsInbound extends IAstAction {
}
export interface IAstActionConfbridgeStopRecord extends IAstAction {
    Conference: string;
}
export interface IAstActionGetConfig extends IAstAction {
    Filename: string;
    Category?: string;
    Filter?: string;
}
export interface IAstActionDAHDIRestart extends IAstAction {
}
export interface IAstActionParkinglots extends IAstAction {
}
export interface IAstActionPresenceState extends IAstAction {
    Provider: string;
}
export interface IAstActionChangeMonitor extends IAstAction {
    Channel: string;
    File: string;
}
export interface IAstActionVoicemailRefresh extends IAstAction {
    Context: string;
    Mailbox: string;
}
export interface IAstActionQueueMemberRingInUse extends IAstAction {
    Interface: string;
    RingInUse: string;
    Queue: string;
}
export interface IAstActionDialplanExtensionRemove extends IAstAction {
    Context: string;
    Extension: string;
    Priority: string;
}
export interface IAstActionPresenceStateList extends IAstAction {
}
export interface IAstActionAgentLogoff extends IAstAction {
    Agent: string;
    Soft: string;
}
export interface IAstActionSorceryMemoryCacheExpire extends IAstAction {
    Cache: string;
}
export interface IAstActionLogin extends IAstAction {
    Username: string;
    Secret: string;
}
export interface IAstActionDAHDIDNDon extends IAstAction {
    DAHDIChannel: string;
}
export interface IAstActionGetvar extends IAstAction {
    /**
     * If a channel name is not provided then the variable is considered global.
     */
    Channel?: string;
    Variable: string;
}
export interface IAstActionMixMonitor extends IAstAction {
    Channel: string;
    File: string;
    options: string;
    Command: string;
}
export interface IAstActionDeviceStateList extends IAstAction {
}
export interface IAstActionConfbridgeListRooms extends IAstAction {
}
export interface IAstActionModuleLoad extends IAstAction {
    Module: string;
    LoadType: string;
}
export interface IAstActionConfbridgeList extends IAstAction {
    Conference: string;
}
export interface IAstActionPRIDebugFileUnset extends IAstAction {
}
export interface IAstActionConfbridgeStartRecord extends IAstAction {
    Conference: string;
    RecordFile: string;
}
export interface IAstActionQueueRule extends IAstAction {
    Rule: string;
}
export interface IAstActionIAXnetstats extends IAstAction {
}
export interface IAstActionQueuePenalty extends IAstAction {
    Interface: string;
    Penalty: string;
    Queue: string;
}
export interface IAstActionIAXregistry extends IAstAction {
}
export interface IAstActionMuteAudio extends IAstAction {
    Channel: string;
    Direction: string;
    State: string;
}
export interface IAstActionPJSIPNotify extends IAstAction {
    Endpoint: string;
    URI: string;
    Variable: string;
}
export interface IAstActionPJSIPQualify extends IAstAction {
    Endpoint: string;
}
export interface IAstActionSKINNYdevices extends IAstAction {
}
export interface IAstActionBridge extends IAstAction {
    Channel1: string;
    Channel: string;
    Tone: string;
}
export interface IAstActionPing extends IAstAction {
}
export interface IAstActionMWIDelete extends IAstAction {
    Mailbox: string;
}
export interface IAstActionSIPnotify extends IAstAction {
    Channel: string;
    Variable: string;
}
export interface IAstActionDBDel extends IAstAction {
    Family: string;
    Key: string;
}
export interface IAstActionMWIGet extends IAstAction {
    Mailbox: string;
}
export interface IAstActionSetvar extends IAstAction {
    /**
     * If a channel name is not provided then the variable is considered global.
     */
    Channel?: string;
    Variable: string;
    Value: string;
}
export interface IAstActionConfbridgeKick extends IAstAction {
    Conference: string;
    Channel: string;
}
export interface IAstActionAbsoluteTimeout extends IAstAction {
    Channel: string;
    Timeout: string;
}
export interface IAstActionSorceryMemoryCacheStaleObject extends IAstAction {
    Cache: string;
    Object: string;
}
export interface IAstActionSKINNYshowline extends IAstAction {
    Line: string;
}
export interface IAstActionLoggerRotate extends IAstAction {
}
export interface IAstActionMeetmeListRooms extends IAstAction {
}
export interface IAstActionSorceryMemoryCachePopulate extends IAstAction {
    Cache: string;
}
export interface IAstActionConfbridgeUnmute extends IAstAction {
    Conference: string;
    Channel: string;
}
export interface IAstActionSIPshowpeer extends IAstAction {
    Peer: string;
}
export interface IAstActionQueueStatus extends IAstAction {
    Queue?: string;
    Member?: string;
}
export interface IAstActionSorceryMemoryCacheExpireObject extends IAstAction {
    Cache: string;
    Object: string;
}
export interface IAstActionBridgeTechnologyList extends IAstAction {
}
export interface IAstActionCoreSettings extends IAstAction {
}
export interface IAstActionPJSIPShowResourceLists extends IAstAction {
}
export interface IAstActionControlPlayback extends IAstAction {
    Channel: string;
    Control: string;
}
export interface IAstActionIAXpeerlist extends IAstAction {
}
export interface IAstActionCoreShowChannels extends IAstAction {
}
export interface IAstActionPauseMonitor extends IAstAction {
    Channel: string;
}
export interface IAstActionDBPut extends IAstAction {
    Family: string;
    Key: string;
    Val: string;
}
export interface IAstActionBridgeTechnologyUnsuspend extends IAstAction {
    BridgeTechnology: string;
}
export interface IAstActionFAXStats extends IAstAction {
}
export interface IAstActionPRIShowSpans extends IAstAction {
    Span: string;
}
export interface IAstActionBridgeTechnologySuspend extends IAstAction {
    BridgeTechnology: string;
}
export interface IAstActionCreateConfig extends IAstAction {
    Filename: string;
}
export interface IAstActionUserEvent extends IAstAction {
    UserEvent: string;
    Header1: string;
    HeaderN: string;
}
export interface IAstActionPJSIPShowSubscriptionsInbound extends IAstAction {
}
export interface IAstActionExtensionState extends IAstAction {
    Exten: string;
    Context: string;
}
export interface IAstActionPRIDebugSet extends IAstAction {
    Span: string;
    Level: string;
}
export interface IAstActionSIPpeerstatus extends IAstAction {
    Peer: string;
}
export interface IAstActionListCommands extends IAstAction {
}
export interface IAstActionConfbridgeSetSingleVideoSrc extends IAstAction {
    Conference: string;
    Channel: string;
}
export interface IAstActionFilterList extends IAstAction {
}
export interface IAstActionQueueLog extends IAstAction {
    Queue: string;
    Event: string;
    Uniqueid: string;
    Interface: string;
    Message: string;
}
export interface IAstActionExtensionStateList extends IAstAction {
}
export interface IAstActionQueues extends IAstAction {
}
export interface IAstActionStatus extends IAstAction {
    Channel: string;
    Variables: string;
}
export interface IAstActionPark extends IAstAction {
    Channel: string;
    TimeoutChannel: string;
    AnnounceChannel: string;
    Timeout: string;
    Parkinglot: string;
}
export interface IAstActionBridgeKick extends IAstAction {
    BridgeUniqueid: string;
    Channel: string;
}
export interface IAstActionChallenge extends IAstAction {
    AuthType: string;
}
export interface IAstActionPRIDebugFileSet extends IAstAction {
    File: string;
}
export interface IAstActionSIPshowregistry extends IAstAction {
}
export interface IAstActionFAXSessions extends IAstAction {
}
export interface IAstActionCoreStatus extends IAstAction {
}
export interface IAstActionDAHDITransfer extends IAstAction {
    DAHDIChannel: string;
}
export interface IAstActionUpdateConfig extends IAstAction {
    SrcFilename: string;
    DstFilename: string;
    Reload: string;
    PreserveEffectiveContext: string;
    Action_000000;
    Cat_000000;
    Var_000000;
    Value_000000;
    Match_000000;
    Line_000000;
    Options_000000;
}
export interface IAstActionLogoff extends IAstAction {
}
export interface IAstActionGetConfigJSON extends IAstAction {
    Filename: string;
    Category: string;
    Filter: string;
}
export interface IAstActionMessageSend extends IAstAction {
    To: string;
    From: string;
    Body: string;
    Base64Body: string;
    Variable: string;
}
export interface IAstActionQueueAdd extends IAstAction {
    Queue: string;
    Interface: string;
    Penalty: string;
    Paused: string;
    MemberName: string;
    StateInterface: string;
}
export interface IAstActionEvents extends IAstAction {
    EventMask: string;
}
export interface IAstActionDAHDIDialOffhook extends IAstAction {
    DAHDIChannel: string;
    Number: string;
}
export interface IAstActionWaitEvent extends IAstAction {
    Timeout: string;
}
export interface IAstActionBlindTransfer extends IAstAction {
    Context: string;
    Exten: string;
}
