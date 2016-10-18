import {IDfiAstDAHDIOnChannel} from "../../definitions/models";
export interface IAstEvent {
    Event: string;
    ActionID?: string;
    $time?: number;
}

export declare type uuid = string;

/**
 * AgentCalled Event - Raised when an queue member is notified of a caller in the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentCalled }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 */
export interface IAstEventAgentCalled extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    Queue: string;
    MemberName: string;
    Interface: string;
}

/**
 * AgentComplete Event - Raised when a queue member has finished servicing a caller in the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentComplete }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} HoldTime - The time the channel was in the queue, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} TalkTime - The time the queue member talked with the caller in the queue, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} Reason -  * caller * agent * transfer
 */
export interface IAstEventAgentComplete extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    Queue: string;
    MemberName: string;
    Interface: string;
    HoldTime: string;
    TalkTime: string;
    Reason: string;
}
/**
 * AgentConnect Event - Raised when a queue member answers and is bridged to a caller in the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentConnect }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} RingTime - The time the queue member was rung, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} HoldTime - The time the channel was in the queue, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 */
export interface IAstEventAgentConnect extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    Queue: string;
    MemberName: string;
    Interface: string;
    RingTime: string;
    HoldTime: string;
}
/**
 * AgentDump Event - Raised when a queue member hangs up on a caller in the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentDump }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 */
export interface IAstEventAgentDump extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    Queue: string;
    MemberName: string;
    Interface: string;
}
/**
 * AgentLogin Event - Raised when an Agent has logged in.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentLogin }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Agent - Agent ID of the agent.
 */
export interface IAstEventAgentLogin extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Agent: string;
}
/**
 * AgentLogoff Event - Raised when an Agent has logged off.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentLogoff }
 *
 * @property {string} Agent - Agent ID of the agent.
 * @property {string} Logintime - The number of seconds the agent was logged in.
 */
export interface IAstEventAgentLogoff extends IAstEvent {
    Agent: string;
    Logintime: string;
}
/**
 * AgentRingNoAnswer Event - Raised when a queue member is notified of a caller in the queue and fails to answer.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentRingNoAnswer }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} RingTime - The time the queue member was rung, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 */
export interface IAstEventAgentRingNoAnswer extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    Queue: string;
    MemberName: string;
    Interface: string;
    RingTime: string;
}
/**
 * AgentsComplete Event - Final response event in a series of events to the Agents AMI action.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentsComplete }
 *
 */
export interface IAstEventAgentsComplete extends IAstEvent {
    ActionID: string;
}
/**
 * Agents Event - Response event in a series to the Agents AMI action containing information about a defined agent.
 *
 * @description The channel snapshot is present if the Status value is AGENT_IDLE or AGENT_ONCALL.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Agents }
 *
 * @property {string} Agent - Agent ID of the agent.
 * @property {string} Name - User friendly name of the agent.
 * @property {string} Status -  * - * Current * status * of * the * agent. * The * valid * values * are: * AGENT_LOGGEDOFF * AGENT_IDLE * AGENT_ONCALL
 * @property {string} TalkingToChan -  * - * BRIDGEPEER * value * on * agent * channel. * Present * if * Status * value * is * AGENT_ONCALL.
 * @property {string} CallStarted -  * - * Epoche * time * when * the * agent * started * talking * with * the * caller. * Present * if * Status * value * is * AGENT_ONCALL.
 * @property {string} LoggedInTime -  * - * Epoche * time * when * the * agent * logged * in. * Present * if * Status * value * is * AGENT_IDLE * or * AGENT_ONCALL.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventAgents extends IAstEvent {
    Agent: string;
    Name: string;
    Status: string;
    TalkingToChan: string;
    CallStarted: string;
    LoggedInTime: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    ActionID: string;
}
/**
 * AGIExecEnd Event - Raised when a received AGI command completes processing.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AGIExecEnd }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Command - The AGI command as received from the external source.
 * @property {string} CommandId - Random identification number assigned to the execution of this command.
 * @property {string} ResultCode - The numeric result code from AGI
 * @property {string} Result - The text result reason from AGI
 */
export interface IAstEventAGIExecEnd extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Command: string;
    CommandId: string;
    ResultCode: string;
    Result: string;
}
/**
 * AGIExecStart Event - Raised when a received AGI command starts processing.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AGIExecStart }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Command - The AGI command as received from the external source.
 * @property {string} CommandId - Random identification number assigned to the execution of this command.
 */
export interface IAstEventAGIExecStart extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Command: string;
    CommandId: string;
}
/**
 * AlarmClear Event - Raised when an alarm is cleared on a DAHDI channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AlarmClear }
 *
 * @property {string} DAHDIChannel -  * - * The * DAHDI * channel * on * which * the * alarm * was * cleared. * Note * Icon * This * is * not * an * Asterisk * channel * identifier.
 */
export interface IAstEventAlarmClear extends IAstEvent {
    DAHDIChannel: string;
}
/**
 * Alarm Event - Raised when an alarm is set on a DAHDI channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Alarm }
 *
 * @property {string} DAHDIChannel -  * - * The * channel * on * which * the * alarm * occurred. * Note * Icon * This * is * not * an * Asterisk * channel * identifier.
 * @property {string} Alarm - A textual description of the alarm that occurred.
 */
export interface IAstEventAlarm extends IAstEvent {
    DAHDIChannel: string;
    Alarm: string;
}
/**
 * AOC_D Event - Raised when an Advice of Charge message is sent during a call.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AOC-D }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Charge
 * @property {string} Type -  * NotAvailable * Free * Currency * Units
 * @property {string} BillingID -  * Normal * Reverse * CreditCard * CallForwardingUnconditional * CallForwardingBusy * CallForwardingNoReply * CallDeflection * CallTransfer * NotAvailable
 * @property {string} TotalType -  * SubTotal * Total
 * @property {string} Currency
 * @property {string} Name
 * @property {string} Cost
 * @property {string} Multiplier -  * 1/1000 * 1/100 * 1/10 * 1 * 10 * 100 * 1000
 * @property {string} Units
 * @property {string} NumberOf
 * @property {string} TypeOf
 */
export interface IAstEventAOC_D extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Charge: string;
    Type: string;
    BillingID: string;
    TotalType: string;
    Currency: string;
    Name: string;
    Cost: string;
    Multiplier: string;
    Units: string;
    NumberOf: string;
    TypeOf: string;
}
/**
 * AOC_E Event - Raised when an Advice of Charge message is sent during a call.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AOC-E }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Charge
 * @property {string} Type -  * NotAvailable * Free * Currency * Units
 * @property {string} BillingID -  * Normal * Reverse * CreditCard * CallForwardingUnconditional * CallForwardingBusy * CallForwardingNoReply * CallDeflection * CallTransfer * NotAvailable
 * @property {string} TotalType -  * SubTotal * Total
 * @property {string} Currency
 * @property {string} Name
 * @property {string} Cost
 * @property {string} Multiplier -  * 1/1000 * 1/100 * 1/10 * 1 * 10 * 100 * 1000
 * @property {string} Units
 * @property {string} NumberOf
 * @property {string} TypeOf
 */
export interface IAstEventAOC_E extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Charge: string;
    Type: string;
    BillingID: string;
    TotalType: string;
    Currency: string;
    Name: string;
    Cost: string;
    Multiplier: string;
    Units: string;
    NumberOf: string;
    TypeOf: string;
}
/**
 * AOC_S Event - Raised when an Advice of Charge message is sent during a call.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AOC-S }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Charge
 * @property {string} Type -  * NotAvailable * Free * Currency * Units
 * @property {string} BillingID -  * Normal * Reverse * CreditCard * CallForwardingUnconditional * CallForwardingBusy * CallForwardingNoReply * CallDeflection * CallTransfer * NotAvailable
 * @property {string} TotalType -  * SubTotal * Total
 * @property {string} Currency
 * @property {string} Name
 * @property {string} Cost
 * @property {string} Multiplier -  * 1/1000 * 1/100 * 1/10 * 1 * 10 * 100 * 1000
 * @property {string} Units
 * @property {string} NumberOf
 * @property {string} TypeOf
 */
export interface IAstEventAOC_S extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Charge: string;
    Type: string;
    BillingID: string;
    TotalType: string;
    Currency: string;
    Name: string;
    Cost: string;
    Multiplier: string;
    Units: string;
    NumberOf: string;
    TypeOf: string;
}
/**
 * AorDetail Event - Provide details about an Address of Record (AoR) section.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AorDetail }
 *
 * @property {string} ObjectType - The object's type. This will always be "aor".
 * @property {string} ObjectName - The name of this object.
 * @property {string} MinimumExpiration - Minimum keep alive time for an AoR
 * @property {string} MaximumExpiration - Maximum time to keep an AoR
 * @property {string} DefaultExpiration - Default expiration time in seconds for contacts that are dynamically bound to an AoR.
 * @property {string} QualifyFrequency - Interval at which to qualify an AoR
 * @property {string} AuthenticateQualify - Authenticates a qualify request if needed
 * @property {string} MaxContacts - Maximum number of contacts that can bind to an AoR
 * @property {string} RemoveExisting - Determines whether new contacts replace existing ones.
 * @property {string} Mailboxes - Allow subscriptions for the specified mailbox(es)
 * @property {string} OutboundProxy - Outbound proxy used when sending OPTIONS request
 * @property {string} SupportPath - Enables Path support for REGISTER requests and Route support for other requests.
 * @property {string} TotalContacts - The total number of contacts associated with this AoR.
 * @property {string} ContactsRegistered - The number of non-permanent contacts associated with this AoR.
 * @property {string} EndpointName - The name of the endpoint associated with this information.
 */
export interface IAstEventAorDetail extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    MinimumExpiration: string;
    MaximumExpiration: string;
    DefaultExpiration: string;
    QualifyFrequency: string;
    AuthenticateQualify: string;
    MaxContacts: string;
    RemoveExisting: string;
    Mailboxes: string;
    OutboundProxy: string;
    SupportPath: string;
    TotalContacts: string;
    ContactsRegistered: string;
    EndpointName: string;
}
/**
 * AsyncAGIEnd Event - Raised when a channel stops AsyncAGI command processing.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AsyncAGIEnd }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventAsyncAGIEnd extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * AsyncAGIExec Event - Raised when AsyncAGI completes an AGI command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AsyncAGIExec }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Result - URL encoded result string from the executed AGI command.
 * @property {string} [commandId] - URL encoded result string from the executed AGI command.
 */
export interface IAstEventAsyncAGIExec extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Result: string;
    commandId?: string;
}
/**
 * AsyncAGIStart Event - Raised when a channel starts AsyncAGI command processing.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AsyncAGIStart }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Env - URL encoded string read from the AsyncAGI server.
 */
export interface IAstEventAsyncAGIStart extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Env: string;
}
/**
 * AttendedTransfer Event - Raised when an attended transfer is complete.
 *
 * @description The headers in this event attempt to describe all the major details of the attended transfer.
 * The two transferer channels and the two bridges are determined based on their chronological establishment.
 * So consider that Alice calls Bob, and then Alice transfers the call to Voicemail. The transferer and bridge headers would be arranged as follows:
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AttendedTransfer }
 *
 * @property {string} Result - - Indicates if the transfer was successful or if it failed. Fail - An internal error occurred.
 * Invalid - Invalid configuration for transfer (e.g. Not bridged)
 * Not Permitted - Bridge does not permit transfers
 * Success - Transfer completed successfully
 * Note -A result of Success does not necessarily mean that a target was succesfully contacted. It means that a party was succesfully placed into the dialplan at the expected location.
 * @property {string} OrigTransfererChannel
 * @property {string} OrigTransfererChannelState - A numeric code for the channel's current state, related to OrigTransfererChannelStateDesc
 * @property {string} OrigTransfererChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} OrigTransfererCallerIDNum
 * @property {string} OrigTransfererCallerIDName
 * @property {string} OrigTransfererConnectedLineNum
 * @property {string} OrigTransfererConnectedLineName
 * @property {string} OrigTransfererAccountCode
 * @property {string} OrigTransfererContext
 * @property {string} OrigTransfererExten
 * @property {string} OrigTransfererPriority
 * @property {string} OrigTransfererUniqueid
 * @property {string} OrigTransfererLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} OrigBridgeUniqueid
 * @property {string} OrigBridgeType - The type of bridge
 * @property {string} OrigBridgeTechnology - Technology in use by the bridge
 * @property {string} OrigBridgeCreator - Entity that created the bridge if applicable
 * @property {string} OrigBridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} OrigBridgeNumChannels - Number of channels in the bridge
 * @property {string} SecondTransfererChannel
 * @property {string} SecondTransfererChannelState - A numeric code for the channel's current state, related to SecondTransfererChannelStateDesc
 * @property {string} SecondTransfererChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SecondTransfererCallerIDNum
 * @property {string} SecondTransfererCallerIDName
 * @property {string} SecondTransfererConnectedLineNum
 * @property {string} SecondTransfererConnectedLineName
 * @property {string} SecondTransfererAccountCode
 * @property {string} SecondTransfererContext
 * @property {string} SecondTransfererExten
 * @property {string} SecondTransfererPriority
 * @property {string} SecondTransfererUniqueid
 * @property {string} SecondTransfererLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SecondBridgeUniqueid
 * @property {string} SecondBridgeType - The type of bridge
 * @property {string} SecondBridgeTechnology - Technology in use by the bridge
 * @property {string} SecondBridgeCreator - Entity that created the bridge if applicable
 * @property {string} SecondBridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} SecondBridgeNumChannels - Number of channels in the bridge
 * @property {string} DestType -   -  Indicates  the  method  by  which  the  attended  transfer  completed.
 * Bridge  -  The  transfer  was  accomplished  by  merging  two  bridges  into  one.
 * App  -  The  transfer  was  accomplished  by  having  a  channel  or  bridge  run  a  dialplan  application.
 * Link  -  The  transfer  was  accomplished  by  linking  two  bridges  together  using  a  local  channel  pair.
 * Threeway  -  The  transfer  was  accomplished  by  placing  all  parties  into  a  threeway  call.
 * Fail  -  The  transfer  failed.
 * @property {string} DestBridgeUniqueid -   -  Indicates  the  surviving  bridge  when  bridges  were  merged  to  complete  the  transfer
 * Note - This  header  is  only  present  when  DestType  is  Bridge  or  Threeway
 * @property {string} DestApp -   -  Indicates  the  application  that  is  running  when  the  transfer  completes  Note  Icon  This  header  is  only  present  when  DestType  is  App
 * @property {string} LocalOneChannel
 * @property {string} LocalOneChannelState - A numeric code for the channel's current state, related to LocalOneChannelStateDesc
 * @property {string} LocalOneChannelStateDesc -   Down  Rsrvd  OffHook  Dialing  Ring  Ringing  Up  Busy  Dialing  Offhook  Pre-ring  Unknown
 * @property {string} LocalOneCallerIDNum
 * @property {string} LocalOneCallerIDName
 * @property {string} LocalOneConnectedLineNum
 * @property {string} LocalOneConnectedLineName
 * @property {string} LocalOneAccountCode
 * @property {string} LocalOneContext
 * @property {string} LocalOneExten
 * @property {string} LocalOnePriority
 * @property {string} LocalOneUniqueid
 * @property {string} LocalOneLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalTwoChannel
 * @property {string} LocalTwoChannelState - A numeric code for the channel's current state, related to LocalTwoChannelStateDesc
 * @property {string} LocalTwoChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalTwoCallerIDNum
 * @property {string} LocalTwoCallerIDName
 * @property {string} LocalTwoConnectedLineNum
 * @property {string} LocalTwoConnectedLineName
 * @property {string} LocalTwoAccountCode
 * @property {string} LocalTwoContext
 * @property {string} LocalTwoExten
 * @property {string} LocalTwoPriority
 * @property {string} LocalTwoUniqueid
 * @property {string} LocalTwoLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestTransfererChannel -   -  The  name  of  the  surviving  transferer  channel  when  a  transfer  results  in  a  threeway  call
 * Note  Icon  This  header  is  only  present  when  DestType  is  Threeway
 * @property {string} TransfereeChannel
 * @property {string} TransfereeChannelState - A numeric code for the channel's current state, related to TransfereeChannelStateDesc
 * @property {string} TransfereeChannelStateDesc -   Down  Rsrvd  OffHook  Dialing  Ring  Ringing  Up  Busy  Dialing  Offhook  Pre-ring  Unknown
 * @property {string} TransfereeCallerIDNum
 * @property {string} TransfereeCallerIDName
 * @property {string} TransfereeConnectedLineNum
 * @property {string} TransfereeConnectedLineName
 * @property {string} TransfereeAccountCode
 * @property {string} TransfereeContext
 * @property {string} TransfereeExten
 * @property {string} TransfereePriority
 * @property {string} TransfereeUniqueid
 * @property {string} TransfereeLinkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventAttendedTransfer extends IAstEvent {
    Result: string;
    OrigTransfererChannel: string;
    OrigTransfererChannelState: string;
    OrigTransfererChannelStateDesc: string;
    OrigTransfererCallerIDNum: string;
    OrigTransfererCallerIDName: string;
    OrigTransfererConnectedLineNum: string;
    OrigTransfererConnectedLineName: string;
    OrigTransfererAccountCode: string;
    OrigTransfererContext: string;
    OrigTransfererExten: string;
    OrigTransfererPriority: string;
    OrigTransfererUniqueid: string;
    OrigTransfererLinkedid: string;
    OrigBridgeUniqueid: string;
    OrigBridgeType: string;
    OrigBridgeTechnology: string;
    OrigBridgeCreator: string;
    OrigBridgeName: string;
    OrigBridgeNumChannels: string;
    SecondTransfererChannel: string;
    SecondTransfererChannelState: string;
    SecondTransfererChannelStateDesc: string;
    SecondTransfererCallerIDNum: string;
    SecondTransfererCallerIDName: string;
    SecondTransfererConnectedLineNum: string;
    SecondTransfererConnectedLineName: string;
    SecondTransfererAccountCode: string;
    SecondTransfererContext: string;
    SecondTransfererExten: string;
    SecondTransfererPriority: string;
    SecondTransfererUniqueid: string;
    SecondTransfererLinkedid: string;
    SecondBridgeUniqueid: string;
    SecondBridgeType: string;
    SecondBridgeTechnology: string;
    SecondBridgeCreator: string;
    SecondBridgeName: string;
    SecondBridgeNumChannels: string;
    DestType: string;
    DestBridgeUniqueid: string;
    DestApp: string;
    LocalOneChannel: string;
    LocalOneChannelState: string;
    LocalOneChannelStateDesc: string;
    LocalOneCallerIDNum: string;
    LocalOneCallerIDName: string;
    LocalOneConnectedLineNum: string;
    LocalOneConnectedLineName: string;
    LocalOneAccountCode: string;
    LocalOneContext: string;
    LocalOneExten: string;
    LocalOnePriority: string;
    LocalOneUniqueid: string;
    LocalOneLinkedid: string;
    LocalTwoChannel: string;
    LocalTwoChannelState: string;
    LocalTwoChannelStateDesc: string;
    LocalTwoCallerIDNum: string;
    LocalTwoCallerIDName: string;
    LocalTwoConnectedLineNum: string;
    LocalTwoConnectedLineName: string;
    LocalTwoAccountCode: string;
    LocalTwoContext: string;
    LocalTwoExten: string;
    LocalTwoPriority: string;
    LocalTwoUniqueid: string;
    LocalTwoLinkedid: string;
    DestTransfererChannel: string;
    TransfereeChannel: string;
    TransfereeChannelState: string;
    TransfereeChannelStateDesc: string;
    TransfereeCallerIDNum: string;
    TransfereeCallerIDName: string;
    TransfereeConnectedLineNum: string;
    TransfereeConnectedLineName: string;
    TransfereeAccountCode: string;
    TransfereeContext: string;
    TransfereeExten: string;
    TransfereePriority: string;
    TransfereeUniqueid: string;
    TransfereeLinkedid: string;
}
/**
 * AuthDetail Event - Provide details about an authentication section.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AuthDetail }
 *
 * @property {string} ObjectType - The object's type. This will always be "auth".
 * @property {string} ObjectName - The name of this object.
 * @property {string} Username - Username to use for account
 * @property {string} Password - Username to use for account
 * @property {string} Md5Cred - MD5 Hash used for authentication.
 * @property {string} Realm - SIP realm for endpoint
 * @property {string} NonceLifetime - Lifetime of a nonce associated with this authentication config.
 * @property {string} AuthType - Authentication type
 * @property {string} EndpointName - The name of the endpoint associated with this information.
 */
export interface IAstEventAuthDetail extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    Username: string;
    Password: string;
    Md5Cred: string;
    Realm: string;
    NonceLifetime: string;
    AuthType: string;
    EndpointName: string;
}
/**
 * AuthMethodNotAllowed Event - Raised when a request used an authentication method not allowed by the service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AuthMethodNotAllowed }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} AuthMethod - The authentication method attempted.
 * @property {string} [module] - The authentication method attempted.
 * @property {string} [sessionTV] - The authentication method attempted.
 */
export interface IAstEventAuthMethodNotAllowed extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    AuthMethod: string;
    module?: string;
    sessionTV?: string;
}
/**
 * BlindTransfer Event - Raised when a blind transfer is complete.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BlindTransfer }
 *
 * @property {string} Result -   -  Indicates  if  the  transfer  was  successful  or  if  it  failed.
 * Fail  -  An  internal  error  occurred.
 * Invalid  -  Invalid  configuration  for  transfer  (e.g.  Not  bridged)
 * Not  Permitted  -  Bridge  does  not  permit  transfers
 * Success  -  Transfer  completed  successfully
 * Note - A  result  of  Success  does  not  necessarily  mean  that  a  target  was  succesfully  contacted.
 * It  means  that  a  party  was  succesfully  placed  into  the  dialplan  at  the  expected  location.
 * @property {string} TransfererChannel
 * @property {string} TransfererChannelState - A numeric code for the channel's current state, related to TransfererChannelStateDesc
 * @property {string} TransfererChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} TransfererCallerIDNum
 * @property {string} TransfererCallerIDName
 * @property {string} TransfererConnectedLineNum
 * @property {string} TransfererConnectedLineName
 * @property {string} TransfererAccountCode
 * @property {string} TransfererContext
 * @property {string} TransfererExten
 * @property {string} TransfererPriority
 * @property {string} TransfererUniqueid
 * @property {string} TransfererLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} TransfereeChannel
 * @property {string} TransfereeChannelState - A numeric code for the channel's current state, related to TransfereeChannelStateDesc
 * @property {string} TransfereeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} TransfereeCallerIDNum
 * @property {string} TransfereeCallerIDName
 * @property {string} TransfereeConnectedLineNum
 * @property {string} TransfereeConnectedLineName
 * @property {string} TransfereeAccountCode
 * @property {string} TransfereeContext
 * @property {string} TransfereeExten
 * @property {string} TransfereePriority
 * @property {string} TransfereeUniqueid
 * @property {string} TransfereeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} IsExternal -   -  Indicates  if  the  transfer  was  performed  outside  of  Asterisk.  For  instance,  a  channel  protocol  native  transfer  is  external.
 * A  DTMF  transfer  is  internal.  Yes  No
 * @property {string} Context - Destination context for the blind transfer.
 * @property {string} Extension - Destination extension for the blind transfer.
 */
export interface IAstEventBlindTransfer extends IAstEvent {
    Result: string;
    TransfererChannel: string;
    TransfererChannelState: string;
    TransfererChannelStateDesc: string;
    TransfererCallerIDNum: string;
    TransfererCallerIDName: string;
    TransfererConnectedLineNum: string;
    TransfererConnectedLineName: string;
    TransfererAccountCode: string;
    TransfererContext: string;
    TransfererExten: string;
    TransfererPriority: string;
    TransfererUniqueid: string;
    TransfererLinkedid: string;
    TransfereeChannel: string;
    TransfereeChannelState: string;
    TransfereeChannelStateDesc: string;
    TransfereeCallerIDNum: string;
    TransfereeCallerIDName: string;
    TransfereeConnectedLineNum: string;
    TransfereeConnectedLineName: string;
    TransfereeAccountCode: string;
    TransfereeContext: string;
    TransfereeExten: string;
    TransfereePriority: string;
    TransfereeUniqueid: string;
    TransfereeLinkedid: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    IsExternal: string;
    Context: string;
    Extension: string;
}
/**
 * BridgeCreate Event - Raised when a bridge is created.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeCreate }
 *
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventBridgeCreate extends IAstEvent {
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * BridgeDestroy Event - Raised when a bridge is destroyed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeDestroy }
 *
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventBridgeDestroy extends IAstEvent {
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * BridgeEnter Event - Raised when a channel enters a bridge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeEnter }
 *
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SwapUniqueid - The uniqueid of the channel being swapped out of the bridge
 */
export interface IAstEventBridgeEnter extends IAstEvent {
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    SwapUniqueid: string;
}
/**
 * BridgeInfoChannel Event - Information about a channel in a bridge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeInfoChannel }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventBridgeInfoChannel extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * BridgeInfoComplete Event - Information about a bridge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeInfoComplete }
 *
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventBridgeInfoComplete extends IAstEvent {
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * BridgeLeave Event - Raised when a channel leaves a bridge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeLeave }
 *
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventBridgeLeave extends IAstEvent {
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * BridgeMerge Event - Raised when two bridges are merged.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeMerge }
 *
 * @property {string} ToBridgeUniqueid
 * @property {string} ToBridgeType - The type of bridge
 * @property {string} ToBridgeTechnology - Technology in use by the bridge
 * @property {string} ToBridgeCreator - Entity that created the bridge if applicable
 * @property {string} ToBridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} ToBridgeNumChannels - Number of channels in the bridge
 * @property {string} FromBridgeUniqueid
 * @property {string} FromBridgeType - The type of bridge
 * @property {string} FromBridgeTechnology - Technology in use by the bridge
 * @property {string} FromBridgeCreator - Entity that created the bridge if applicable
 * @property {string} FromBridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} FromBridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventBridgeMerge extends IAstEvent {
    ToBridgeUniqueid: string;
    ToBridgeType: string;
    ToBridgeTechnology: string;
    ToBridgeCreator: string;
    ToBridgeName: string;
    ToBridgeNumChannels: string;
    FromBridgeUniqueid: string;
    FromBridgeType: string;
    FromBridgeTechnology: string;
    FromBridgeCreator: string;
    FromBridgeName: string;
    FromBridgeNumChannels: string;
}
/**
 * Cdr Event - Raised when a CDR is generated.
 *
 * @description The Cdr event is only raised when the cdr_manager backend is loaded and registered with the CDR engine.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Cdr }
 *
 * @property {string} AccountCode - The account code of the Party A channel.
 * @property {string} Source - The Caller ID number associated with the Party A in the CDR.
 * @property {string} Destination - The dialplan extension the Party A was executing.
 * @property {string} DestinationContext - The dialplan context the Party A was executing.
 * @property {string} CallerID - The Caller ID name associated with the Party A in the CDR.
 * @property {string} Channel - The channel name of the Party A.
 * @property {string} DestinationChannel - The channel name of the Party B.
 * @property {string} LastApplication - The last dialplan application the Party A executed.
 * @property {string} LastData - The parameters passed to the last dialplan application the Party A executed.
 * @property {string} StartTime - The time the CDR was created.
 * @property {string} AnswerTime - The earliest of either the time when Party A answered, or the start time of this CDR.
 * @property {string} EndTime - The time when the CDR was finished. This occurs when the Party A hangs up or when the bridge between Party A and Party B is broken.
 * @property {string} Duration - The time, in seconds, of EndTime
 * @property {string} BillableSeconds - The time, in seconds, of AnswerTime
 * @property {string} Disposition -   -  The  final  known  disposition  of  the  CDR.
 * NO  ANSWER  -  The  channel  was  not  answered.  This  is  the  default  disposition.
 * FAILED  -  The  channel  attempted  to  dial  but  the  call  failed.
 * Note -  The  congestion  setting  in  cdr.conf  can  result  in  the  AST_CAUSE_CONGESTION  hang  up  cause  or  the  CONGESTION  dial  status  to  map  to  this  disposition.
 * BUSY  -  The  channel  attempted  to  dial  but  the  remote  party  was  busy.
 * ANSWERED  -  The  channel  was  answered.  The  hang  up  cause  will  no  longer  impact  the  disposition  of  the  CDR.
 * CONGESTION  -  The  channel  attempted  to  dial  but  the  remote  party  was  congested.
 * @property {string} AMAFlags -   -  A  flag  that  informs  a  billing  system  how  to  treat  the  CDR.
 * OMIT  -  This  CDR  should  be  ignored.
 * BILLING  -  This  CDR  contains  valid  billing  data.
 * DOCUMENTATION  -  This  CDR  is  for  documentation  purposes.
 * @property {string} UniqueID - A unique identifier for the Party A channel.
 * @property {string} UserField - A user defined field set on the channels. If set on both the Party A and Party B channel, the userfields of both are concatenated and separated by a ;.
 */
export interface IAstEventCdr extends IAstEvent {
    AccountCode: string;
    Source: string;
    Destination: string;
    DestinationContext: string;
    CallerID: string;
    Channel: string;
    DestinationChannel: string;
    LastApplication: string;
    LastData: string;
    StartTime: string;
    AnswerTime: string;
    EndTime: string;
    Duration: string;
    BillableSeconds: string;
    Disposition: string;
    AMAFlags: string;
    UniqueID: string;
    UserField: string;
}
/**
 * CEL Event - Raised when a Channel Event Log is generated for a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_CEL }
 *
 * @property {string} AccountCode - The channel's account code.
 * @property {string} CallerIDnum - The Caller ID number.
 * @property {string} CallerIDname - The Caller ID name.
 * @property {string} CallerIDani - The Caller ID Automatic Number Identification.
 * @property {string} CallerIDrdnis - The Caller ID Redirected Dialed Number Identification Service.
 * @property {string} CallerIDdnid - The Caller ID Dialed Number Identifier.
 * @property {string} Exten - The dialplan extension the channel is currently executing in.
 * @property {string} Context - The dialplan context the channel is currently executing in.
 * @property {string} Application - The dialplan application the channel is currently executing.
 * @property {string} AppData - The arguments passed to the dialplan Application.
 * @property {string} AMAFlags -   -  A  flag  that  informs  a  billing  system  how  to  treat  the  CEL.
 * OMIT  -  This  event  should  be  ignored.
 * BILLING  -  This  event  contains  valid  billing  data.
 * DOCUMENTATION  -  This  event  is  for  documentation  purposes.
 * @property {string} UniqueID - The unique ID of the channel.
 * @property {string} LinkedID - The linked ID of the channel, which ties this event to other related channel's events.
 * @property {string} UserField - A user defined field set on a channel, containing arbitrary application specific data.
 * @property {string} Peer - If this channel is in a bridge, the channel that it is in a bridge with.
 * @property {string} PeerAccount - If this channel is in a bridge, the accountcode of the channel it is in a bridge with.
 * @property {string} Extra - Some events will have event specific data that accompanies the CEL record. This extra data is JSON encoded, and is dependent on the event in question.
 */
export interface IAstEventCEL extends IAstEvent {
    AccountCode: string;
    CallerIDnum: string;
    CallerIDname: string;
    CallerIDani: string;
    CallerIDrdnis: string;
    CallerIDdnid: string;
    Exten: string;
    Context: string;
    Application: string;
    AppData: string;
    AMAFlags: string;
    UniqueID: string;
    LinkedID: string;
    UserField: string;
    Peer: string;
    PeerAccount: string;
    Extra: string;
}
/**
 * ChallengeResponseFailed Event - Raised when a request's attempt to authenticate has been challenged, and the request failed the authentication challenge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChallengeResponseFailed }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} Challenge - The challenge that was sent.
 * @property {string} Response - The response that was received.
 * @property {string} ExpectedResponse - The expected response to the challenge.
 * @property {string} [module] - The expected response to the challenge.
 * @property {string} [sessionTV] - The expected response to the challenge.
 */
export interface IAstEventChallengeResponseFailed extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    Challenge: string;
    Response: string;
    ExpectedResponse: string;
    module?: string;
    sessionTV?: string;
}
/**
 * ChallengeSent Event - Raised when an Asterisk service sends an authentication challenge to a request.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChallengeSent }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} Challenge - The challenge that was sent.
 * @property {string} [module] - The challenge that was sent.
 * @property {string} [sessionTV] - The challenge that was sent.
 */
export interface IAstEventChallengeSent extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    Challenge: string;
    module?: string;
    sessionTV?: string;
}
/**
 * ChannelTalkingStart Event - Raised when talking is detected on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChannelTalkingStart }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventChannelTalkingStart extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * ChannelTalkingStop Event - Raised when talking is no longer detected on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChannelTalkingStop }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Duration - The length in time, in milliseconds, that talking was detected on the channel.
 */
export interface IAstEventChannelTalkingStop extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Duration: string;
}
/**
 * ChanSpyStart Event - Raised when one channel begins spying on another channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChanSpyStart }
 *
 * @property {string} SpyerChannel
 * @property {string} SpyerChannelState - A numeric code for the channel's current state, related to SpyerChannelStateDesc
 * @property {string} SpyerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SpyerCallerIDNum
 * @property {string} SpyerCallerIDName
 * @property {string} SpyerConnectedLineNum
 * @property {string} SpyerConnectedLineName
 * @property {string} SpyerAccountCode
 * @property {string} SpyerContext
 * @property {string} SpyerExten
 * @property {string} SpyerPriority
 * @property {string} SpyerUniqueid
 * @property {string} SpyerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SpyeeChannel
 * @property {string} SpyeeChannelState - A numeric code for the channel's current state, related to SpyeeChannelStateDesc
 * @property {string} SpyeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SpyeeCallerIDNum
 * @property {string} SpyeeCallerIDName
 * @property {string} SpyeeConnectedLineNum
 * @property {string} SpyeeConnectedLineName
 * @property {string} SpyeeAccountCode
 * @property {string} SpyeeContext
 * @property {string} SpyeeExten
 * @property {string} SpyeePriority
 * @property {string} SpyeeUniqueid
 * @property {string} SpyeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventChanSpyStart extends IAstEvent {
    SpyerChannel: string;
    SpyerChannelState: string;
    SpyerChannelStateDesc: string;
    SpyerCallerIDNum: string;
    SpyerCallerIDName: string;
    SpyerConnectedLineNum: string;
    SpyerConnectedLineName: string;
    SpyerAccountCode: string;
    SpyerContext: string;
    SpyerExten: string;
    SpyerPriority: string;
    SpyerUniqueid: string;
    SpyerLinkedid: string;
    SpyeeChannel: string;
    SpyeeChannelState: string;
    SpyeeChannelStateDesc: string;
    SpyeeCallerIDNum: string;
    SpyeeCallerIDName: string;
    SpyeeConnectedLineNum: string;
    SpyeeConnectedLineName: string;
    SpyeeAccountCode: string;
    SpyeeContext: string;
    SpyeeExten: string;
    SpyeePriority: string;
    SpyeeUniqueid: string;
    SpyeeLinkedid: string;
}
/**
 * ChanSpyStop Event - Raised when a channel has stopped spying.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChanSpyStop }
 *
 * @property {string} SpyerChannel
 * @property {string} SpyerChannelState - A numeric code for the channel's current state, related to SpyerChannelStateDesc
 * @property {string} SpyerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SpyerCallerIDNum
 * @property {string} SpyerCallerIDName
 * @property {string} SpyerConnectedLineNum
 * @property {string} SpyerConnectedLineName
 * @property {string} SpyerAccountCode
 * @property {string} SpyerContext
 * @property {string} SpyerExten
 * @property {string} SpyerPriority
 * @property {string} SpyerUniqueid
 * @property {string} SpyerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SpyeeChannel
 * @property {string} SpyeeChannelState - A numeric code for the channel's current state, related to SpyeeChannelStateDesc
 * @property {string} SpyeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SpyeeCallerIDNum
 * @property {string} SpyeeCallerIDName
 * @property {string} SpyeeConnectedLineNum
 * @property {string} SpyeeConnectedLineName
 * @property {string} SpyeeAccountCode
 * @property {string} SpyeeContext
 * @property {string} SpyeeExten
 * @property {string} SpyeePriority
 * @property {string} SpyeeUniqueid
 * @property {string} SpyeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventChanSpyStop extends IAstEvent {
    SpyerChannel: string;
    SpyerChannelState: string;
    SpyerChannelStateDesc: string;
    SpyerCallerIDNum: string;
    SpyerCallerIDName: string;
    SpyerConnectedLineNum: string;
    SpyerConnectedLineName: string;
    SpyerAccountCode: string;
    SpyerContext: string;
    SpyerExten: string;
    SpyerPriority: string;
    SpyerUniqueid: string;
    SpyerLinkedid: string;
    SpyeeChannel: string;
    SpyeeChannelState: string;
    SpyeeChannelStateDesc: string;
    SpyeeCallerIDNum: string;
    SpyeeCallerIDName: string;
    SpyeeConnectedLineNum: string;
    SpyeeConnectedLineName: string;
    SpyeeAccountCode: string;
    SpyeeContext: string;
    SpyeeExten: string;
    SpyeePriority: string;
    SpyeeUniqueid: string;
    SpyeeLinkedid: string;
}
/**
 * ConfbridgeEnd Event - Raised when a conference ends.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeEnd }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventConfbridgeEnd extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * ConfbridgeJoin Event - Raised when a channel joins a Confbridge conference.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeJoin }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Admin -  * - * Identifies * this * user * as * an * admin * user. * Yes * No
 */
export interface IAstEventConfbridgeJoin extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Admin: string;
}
/**
 * ConfbridgeLeave Event - Raised when a channel leaves a Confbridge conference.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeLeave }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Admin -  * - * Identifies * this * user * as * an * admin * user. * Yes * No
 */
export interface IAstEventConfbridgeLeave extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Admin: string;
}
/**
 * ConfbridgeMute Event - Raised when a Confbridge participant mutes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeMute }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Admin -  * - * Identifies * this * user * as * an * admin * user. * Yes * No
 */
export interface IAstEventConfbridgeMute extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Admin: string;
}
/**
 * ConfbridgeRecord Event - Raised when a conference starts recording.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeRecord }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventConfbridgeRecord extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * ConfbridgeStart Event - Raised when a conference starts.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeStart }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventConfbridgeStart extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * ConfbridgeStopRecord Event - Raised when a conference that was recording stops recording.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeStopRecord }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventConfbridgeStopRecord extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * ConfbridgeTalking Event - Raised when a confbridge participant unmutes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeTalking }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} TalkingStatus -  * on * off
 * @property {string} Admin -  * - * Identifies * this * user * as * an * admin * user. * Yes * No
 */
export interface IAstEventConfbridgeTalking extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    TalkingStatus: string;
    Admin: string;
}
/**
 * ConfbridgeUnmute Event - Raised when a confbridge participant unmutes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeUnmute }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Admin -  * - * Identifies * this * user * as * an * admin * user. * Yes * No
 */
export interface IAstEventConfbridgeUnmute extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Admin: string;
}
/**
 * ContactStatusDetail Event - Provide details about a contact's status.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ContactStatusDetail }
 *
 * @property {string} AOR - The AoR that owns this contact.
 * @property {string} URI - This contact's URI.
 * @property {string} Status -  * - * This * contact's * status. * Reachable * Unreachable
 * @property {string} RoundtripUsec - The round trip time in microseconds.
 * @property {string} EndpointName - The name of the endpoint associated with this information.
 * @property {string} UserAgent - Content of the User-Agent header in REGISTER request
 * @property {string} RegExpire - Absolute time that this contact is no longer valid after
 * @property {string} ViaAddress - IP address:port of the last Via header in REGISTER request
 * @property {string} CallID - Content of the Call-ID header in REGISTER request
 */
export interface IAstEventContactStatusDetail extends IAstEvent {
    AOR: string;
    URI: string;
    Status: string;
    RoundtripUsec: string;
    EndpointName: string;
    UserAgent: string;
    RegExpire: string;
    ViaAddress: string;
    CallID: string;
}
/**
 * ContactStatus Event - Raised when the state of a contact changes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ContactStatus }
 *
 * @property {string} URI - This contact's URI.
 * @property {string} ContactStatus -  * - * New * status * of * the * contact. * Unknown * Unreachable * Reachable * Created * Removed * Updated
 * @property {string} AOR - The name of the associated aor.
 * @property {string} EndpointName - The name of the associated endpoint.
 * @property {string} RoundtripUsec - The RTT measured during the last qualify.
 * @property {string} UserAgent - Content of the User-Agent header in REGISTER request
 * @property {string} RegExpire - Absolute time that this contact is no longer valid after
 * @property {string} ViaAddress - IP address:port of the last Via header in REGISTER request
 * @property {string} CallID - Content of the Call-ID header in REGISTER request
 */
export interface IAstEventContactStatus extends IAstEvent {
    URI: string;
    ContactStatus: string;
    AOR: string;
    EndpointName: string;
    RoundtripUsec: string;
    UserAgent: string;
    RegExpire: string;
    ViaAddress: string;
    CallID: string;
}
/**
 * CoreShowChannel Event - Raised in response to a CoreShowChannels command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_CoreShowChannel }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} BridgeId - Identifier of the bridge the channel is in, may be empty if not in one
 * @property {string} Application - Application currently executing on the channel
 * @property {string} ApplicationData - Data given to the currently executing application
 * @property {string} Duration - The amount of time the channel has existed
 */
export interface IAstEventCoreShowChannel extends IAstEvent {
    ActionID: string;
    Channel: string;

    ChannelState: string;
    ChannelStateDesc: string;

    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;

    AccountCode: string;

    Context: string;
    Exten: string;
    Priority: string;
    Application: string;
    ApplicationData: string;

    Uniqueid: string;
    Linkedid: string;
    BridgeId: string;

    Duration: string;

    // omp
    dateOfCreation?: number;
}
/**
 * CoreShowChannelsComplete Event - Raised at the end of the CoreShowChannel list produced by the CoreShowChannels command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_CoreShowChannelsComplete }
 *
 * @property {string} ListItems - The total number of list items produced
 */
export interface IAstEventCoreShowChannelsComplete extends IAstEvent {
    ActionID: string;
    ListItems: string;
}
/**
 * DAHDIChannel Event - Raised when a DAHDI channel is created or an underlying technology is associated with a DAHDI channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DAHDIChannel }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DAHDISpan - The DAHDI span associated with this channel.
 * @property {string} DAHDIChannel - The DAHDI channel associated with this channel.
 */
export interface IAstEventDAHDIChannel extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DAHDISpan: string;
    DAHDIChannel: string;
}

export interface IAstEventDAHDIShowChannels extends IAstEvent {
    DAHDIChannel: string;
    Signalling: string;
    SignallingCode: string;
    Context: string;
    DND: string;
    Alarm: string;
    Description: string;

    Channel?: string;
    Uniqueid?: string;
    AccountCode?: string;

    channel?: IDfiAstDAHDIOnChannel;
}

/**
 * DeviceStateChange Event - Raised when a device state changes
 *
 * @description This differs from the ExtensionStatus event because this event is raised for all device state changes, not only for changes that affect dialplan hints.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DeviceStateChange }
 *
 * @property {string} Device - The device whose state has changed
 * @property {string} State - The new state of the device
 */
export interface IAstEventDeviceStateChange extends IAstEvent {
    Device: string;
    State: string;
}
/**
 * DeviceStateListComplete Event - Indicates the end of the list the current known extension states.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DeviceStateListComplete }
 *
 * @property {string} ListItems - Conveys the number of statuses reported.
 */
export interface IAstEventDeviceStateListComplete extends IAstEvent {
    ListItems: string;
}
/**
 * DialBegin Event - Raised when a dial action has started.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DialBegin }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DialString - The non-technology specific device being dialed.
 */
export interface IAstEventDialBegin extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    DialString: string;
}
/**
 * DialEnd Event - Raised when a dial action has completed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DialEnd }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DialStatus -   -  The  result  of  the  dial  operation.
 * ABORT  -  The  call  was  aborted.
 * ANSWER  -  The  caller  answered.
 * BUSY  -  The  caller  was  busy.
 * CANCEL  -  The  caller  cancelled  the  call.
 * CHANUNAVAIL  -  The  requested  channel  is  unavailable.
 * CONGESTION  -  The  called  party  is  congested.
 * CONTINUE  -  The  dial  completed,  but  the  caller  elected  to  continue  in  the  dialplan.
 * GOTO  -  The  dial  completed,  but  the  caller  jumped  to  a  dialplan  location.
 * If  known,  the  location  the  caller  is  jumping  to  will  be  appended  to  the  result  following  a  ":".
 * NOANSWER  -  The  called  party  failed  to  answer.
 * @property {string} [forward] -   -  The  result  of  the  dial  operation.
 * ABORT  -  The  call  was  aborted.
 * ANSWER  -  The  caller  answered.
 * BUSY  -  The  caller  was  busy.
 * CANCEL  -  The  caller  cancelled  the  call.
 * CHANUNAVAIL  -  The  requested  channel  is  unavailable.
 * CONGESTION  -  The  called  party  is  congested.
 * CONTINUE  -  The  dial  completed,  but  the  caller  elected  to  continue  in  the  dialplan.
 * GOTO  -  The  dial  completed,  but  the  caller  jumped  to  a  dialplan  location.
 * If  known,  the  location  the  caller  is  jumping  to  will  be  appended  to  the  result  following  a  ":".
 * NOANSWER  -  The  called  party  failed  to  answer.
 */
export interface IAstEventDialEnd extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    DialStatus: string;
    forward?: string;
}

/**
 * DNDState Event - Raised when the Do Not Disturb state is changed on a DAHDI channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DNDState }
 *
 * @property {string} DAHDIChannel -  * - * The * DAHDI * channel * on * which * DND * status * changed. * Note * Icon * This * is * not * an * Asterisk * channel * identifier.
 * @property {string} Status -  * enabled * disabled
 */
export interface IAstEventDNDState extends IAstEvent {
    DAHDIChannel: string;
    Status: string;
}
/**
 * DTMFBegin Event - Raised when a DTMF digit has started on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DTMFBegin }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Digit - DTMF digit received or transmitted (0-9, A-E, # or *
 * @property {string} Direction -  * Received * Sent
 */
export interface IAstEventDTMFBegin extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Digit: string;
    Direction: string;
}
/**
 * DTMFEnd Event - Raised when a DTMF digit has ended on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DTMFEnd }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Digit - DTMF digit received or transmitted (0-9, A-E, # or *
 * @property {string} DurationMs - Duration (in milliseconds) DTMF was sent/received
 * @property {string} Direction -  * Received * Sent
 */
export interface IAstEventDTMFEnd extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Digit: string;
    DurationMs: string;
    Direction: string;
}
/**
 * EndpointDetailComplete Event - Provide final information about endpoint details.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_EndpointDetailComplete }
 *
 * @property {string} ListItems
 */
export interface IAstEventEndpointDetailComplete extends IAstEvent {
    ListItems: string;
}
/**
 * EndpointDetail Event - Provide details about an endpoint section.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_EndpointDetail }
 *
 * @property {string} ObjectType - The object's type. This will always be "endpoint".
 * @property {string} ObjectName - The name of this object.
 * @property {string} Context - Dialplan context for inbound sessions
 * @property {string} Disallow - Media Codec(s) to disallow
 * @property {string} Allow - Media Codec(s) to allow
 * @property {string} DtmfMode - DTMF mode
 * @property {string} RtpIpv6 - Allow use of IPv6 for RTP traffic
 * @property {string} RtpSymmetric - Enforce that RTP must be symmetric
 * @property {string} IceSupport - Enable the ICE mechanism to help traverse NAT
 * @property {string} UsePtime - Use Endpoint's requested packetisation interval
 * @property {string} ForceRport - Force use of return port
 * @property {string} RewriteContact - Allow Contact header to be rewritten with the source IP address-port
 * @property {string} Transport - Desired transport configuration
 * @property {string} OutboundProxy - Proxy through which to send requests, a full SIP URI must be provided
 * @property {string} MohSuggest - Default Music On Hold class
 * @property {string} 100rel - Allow support for RFC3262 provisional ACK tags
 * @property {string} Timers - Session timers for SIP packets
 * @property {string} TimersMinSe - Minimum session timers expiration period
 * @property {string} TimersSessExpires - Maximum session timer expiration period
 * @property {string} Auth - Authentication Object(s) associated with the endpoint
 * @property {string} OutboundAuth - Authentication object used for outbound requests
 * @property {string} Aors - AoR(s) to be used with the endpoint
 * @property {string} MediaAddress - IP address used in SDP for media handling
 * @property {string} IdentifyBy - Way(s) for Endpoint to be identified
 * @property {string} DirectMedia - Determines whether media may flow directly between endpoints.
 * @property {string} DirectMediaMethod - Direct Media method type
 * @property {string} ConnectedLineMethod - Connected line method type
 * @property {string} DirectMediaGlareMitigation - Mitigation of direct media (re)INVITE glare
 * @property {string} DisableDirectMediaOnNat - Disable direct media session refreshes when NAT obstructs the media session
 * @property {string} Callerid - CallerID information for the endpoint
 * @property {string} CalleridPrivacy - Default privacy level
 * @property {string} CalleridTag - Internal id_tag for the endpoint
 * @property {string} TrustIdInbound - Accept identification information received from this endpoint
 * @property {string} TrustIdOutbound - Send private identification details to the endpoint.
 * @property {string} SendPai - Send the P-Asserted-Identity header
 * @property {string} SendRpid - Send the Remote-Party-ID header
 * @property {string} SendDiversion - Send the Diversion header, conveying the diversion information to the called user agent
 * @property {string} Mailboxes - NOTIFY the endpoint when state changes for any of the specified mailboxes
 * @property {string} AggregateMwi - Condense MWI notifications into a single NOTIFY.
 * @property {string} MediaEncryption - Determines whether res_pjsip will use and enforce usage of media encryption for this endpoint.
 * @property {string} MediaEncryptionOptimistic - Determines whether encryption should be used if possible but does not terminate the session if not achieved.
 * @property {string} UseAvpf - Determines whether res_pjsip will use and enforce usage of AVPF for this endpoint.
 * @property {string} ForceAvp - Determines whether res_pjsip will use and enforce usage of AVP, regardless of the RTP profile in use for this endpoint.
 * @property {string} MediaUseReceivedTransport - Determines whether res_pjsip will use the media transport received in the offer SDP in the corresponding answer SDP.
 * @property {string} OneTouchRecording - Determines whether one-touch recording is allowed for this endpoint.
 * @property {string} InbandProgress - Determines whether chan_pjsip will indicate ringing using inband progress.
 * @property {string} CallGroup - The numeric pickup groups for a channel.
 * @property {string} PickupGroup - The numeric pickup groups that a channel can pickup.
 * @property {string} NamedCallGroup - The named pickup groups for a channel.
 * @property {string} NamedPickupGroup - The named pickup groups that a channel can pickup.
 * @property {string} DeviceStateBusyAt - The number of in-use channels which will cause busy to be returned as device state
 * @property {string} T38Udptl - Whether T.38 UDPTL support is enabled or not
 * @property {string} T38UdptlEc - T.38 UDPTL error correction method
 * @property {string} T38UdptlMaxdatagram - T.38 UDPTL maximum datagram size
 * @property {string} FaxDetect - Whether CNG tone detection is enabled
 * @property {string} T38UdptlNat - Whether NAT support is enabled on UDPTL sessions
 * @property {string} T38UdptlIpv6 - Whether IPv6 is used for UDPTL Sessions
 * @property {string} ToneZone - Set which country's indications to use for channels created for this endpoint.
 * @property {string} Language - Set the default language to use for channels created for this endpoint.
 * @property {string} RecordOnFeature - The feature to enact when one-touch recording is turned on.
 * @property {string} RecordOffFeature - The feature to enact when one-touch recording is turned off.
 * @property {string} AllowTransfer - Determines whether SIP REFER transfers are allowed for this endpoint
 * @property {string} UserEqPhone - Determines whether a user=phone parameter is placed into the request URI if the user is determined to be a phone number
 * @property {string} SdpOwner - String placed as the username portion of an SDP origin (o=) line.
 * @property {string} SdpSession - String used for the SDP session (s=) line.
 * @property {string} TosAudio - DSCP TOS bits for audio streams
 * @property {string} TosVideo - DSCP TOS bits for video streams
 * @property {string} CosAudio - Priority for audio streams
 * @property {string} CosVideo - Priority for video streams
 * @property {string} AllowSubscribe - Determines if endpoint is allowed to initiate subscriptions with Asterisk.
 * @property {string} SubMinExpiry - The minimum allowed expiry time for subscriptions initiated by the endpoint.
 * @property {string} FromUser - Username to use in From header for requests to this endpoint.
 * @property {string} FromDomain - Domain to user in From header for requests to this endpoint.
 * @property {string} MwiFromUser - Username to use in From header for unsolicited MWI NOTIFYs to this endpoint.
 * @property {string} RtpEngine - Name of the RTP engine to use for channels created for this endpoint
 * @property {string} DtlsVerify - Verify that the provided peer certificate is valid
 * @property {string} DtlsRekey - Interval at which to renegotiate the TLS session and rekey the SRTP session
 * @property {string} DtlsCertFile - Path to certificate file to present to peer
 * @property {string} DtlsPrivateKey - Path to private key for certificate file
 * @property {string} DtlsCipher - Cipher to use for DTLS negotiation
 * @property {string} DtlsCaFile - Path to certificate authority certificate
 * @property {string} DtlsCaPath - Path to a directory containing certificate authority certificates
 * @property {string} DtlsSetup - Whether we are willing to accept connections, connect to the other party, or both.
 * @property {string} SrtpTag32 - Determines whether 32 byte tags should be used instead of 80 byte tags.
 * @property {string} RedirectMethod - How redirects received from an endpoint are handled
 * @property {string} SetVar - Variable set on a channel involving the endpoint.
 * @property {string} MessageContext - Context to route incoming MESSAGE requests to.
 * @property {string} Accountcode - An accountcode to set automatically on any channels created for this endpoint.
 * @property {string} DeviceState - The aggregate device state for this endpoint.
 * @property {string} ActiveChannels - The number of active channels associated with this endpoint.
 * @property {string} SubscribeContext - Context for incoming MESSAGE requests.
 */
export interface IAstEventEndpointDetail extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    Context: string;
    Disallow: string;
    Allow: string;
    DtmfMode: string;
    RtpIpv6: string;
    RtpSymmetric: string;
    IceSupport: string;
    UsePtime: string;
    ForceRport: string;
    RewriteContact: string;
    Transport: string;
    OutboundProxy: string;
    MohSuggest: string;
    "100rel": string;
    Timers: string;
    TimersMinSe: string;
    TimersSessExpires: string;
    Auth: string;
    OutboundAuth: string;
    Aors: string;
    MediaAddress: string;
    IdentifyBy: string;
    DirectMedia: string;
    DirectMediaMethod: string;
    ConnectedLineMethod: string;
    DirectMediaGlareMitigation: string;
    DisableDirectMediaOnNat: string;
    Callerid: string;
    CalleridPrivacy: string;
    CalleridTag: string;
    TrustIdInbound: string;
    TrustIdOutbound: string;
    SendPai: string;
    SendRpid: string;
    SendDiversion: string;
    Mailboxes: string;
    AggregateMwi: string;
    MediaEncryption: string;
    MediaEncryptionOptimistic: string;
    UseAvpf: string;
    ForceAvp: string;
    MediaUseReceivedTransport: string;
    OneTouchRecording: string;
    InbandProgress: string;
    CallGroup: string;
    PickupGroup: string;
    NamedCallGroup: string;
    NamedPickupGroup: string;
    DeviceStateBusyAt: string;
    T38Udptl: string;
    T38UdptlEc: string;
    T38UdptlMaxdatagram: string;
    FaxDetect: string;
    T38UdptlNat: string;
    T38UdptlIpv6: string;
    ToneZone: string;
    Language: string;
    RecordOnFeature: string;
    RecordOffFeature: string;
    AllowTransfer: string;
    UserEqPhone: string;
    SdpOwner: string;
    SdpSession: string;
    TosAudio: string;
    TosVideo: string;
    CosAudio: string;
    CosVideo: string;
    AllowSubscribe: string;
    SubMinExpiry: string;
    FromUser: string;
    FromDomain: string;
    MwiFromUser: string;
    RtpEngine: string;
    DtlsVerify: string;
    DtlsRekey: string;
    DtlsCertFile: string;
    DtlsPrivateKey: string;
    DtlsCipher: string;
    DtlsCaFile: string;
    DtlsCaPath: string;
    DtlsSetup: string;
    SrtpTag32: string;
    RedirectMethod: string;
    SetVar: string;
    MessageContext: string;
    Accountcode: string;
    DeviceState: string;
    ActiveChannels: string;
    SubscribeContext: string;
}
/**
 * EndpointListComplete Event - Provide final information about an endpoint list.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_EndpointListComplete }
 *
 * @property {string} ListItems
 */
export interface IAstEventEndpointListComplete extends IAstEvent {
    ListItems: string;
}
/**
 * EndpointList Event - Provide details about a contact's status.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_EndpointList }
 *
 * @property {string} ObjectType - The object's type. This will always be "endpoint".
 * @property {string} ObjectName - The name of this object.
 * @property {string} Transport - The transport configurations associated with this endpoint.
 * @property {string} Aor - The aor configurations associated with this endpoint.
 * @property {string} Auths - The inbound authentication configurations associated with this endpoint.
 * @property {string} OutboundAuths - The outbound authentication configurations associated with this endpoint.
 * @property {string} DeviceState - The aggregate device state for this endpoint.
 * @property {string} ActiveChannels - The number of active channels associated with this endpoint.
 */
export interface IAstEventEndpointList extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    Transport: string;
    Aor: string;
    Auths: string;
    OutboundAuths: string;
    DeviceState: string;
    ActiveChannels: string;
}
/**
 * ExtensionStateListComplete Event - Indicates the end of the list the current known extension states.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ExtensionStateListComplete }
 *
 * @property {string} ListItems - Conveys the number of statuses reported.
 */
export interface IAstEventExtensionStateListComplete extends IAstEvent {
    ListItems: string;
}
/**
 * ExtensionStatus Event - Raised when a hint changes due to a device state change.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ExtensionStatus }
 *
 * @property {string} Exten - Name of the extension.
 * @property {string} Context - Context that owns the extension.
 * @property {string} Hint - Hint set for the extension
 * @property {string} Status -   -  Numerical  value  of  the  extension  status.  Extension  status  is  determined  by  the  combined  device  state  of  all  items  contained  in  the  hint.
 * -2  -  The  extension  was  removed  from  the  dialplan.
 * -1  -  The  extension's  hint  was  removed  from  the  dialplan.
 * 0  -  Idle  -  Related  device(s)  are  in  an  idle  state.
 * 1  -  InUse  -  Related  device(s)  are  in  active  calls  but  may  take  more  calls.
 * 2  -  Busy  -  Related  device(s)  are  in  active  calls  and  may  not  take  any  more  calls.
 * 4  -  Unavailable  -  Related  device(s)  are  not  reachable.
 * 8  -  Ringing  -  Related  device(s)  are  currently  ringing.
 * 9  -  InUse&Ringing  -  Related  device(s)  are  currently  ringing  and  in  active  calls.
 * 16  -  Hold  -  Related  device(s)  are  currently  on  hold.
 * 17  -  InUse&Hold  -  Related  device(s)  are  currently  on  hold  and  in  active  calls.
 * @property {string} StatusText -   -  Text  representation  of  Status.
 * Idle
 * InUse
 * Busy
 * Unavailable
 * Ringing
 * InUse&Ringing
 * Hold
 * InUse&Hold
 * Unknown  -  Status  does  not  match  any  of  the  above  values.
 */
export interface IAstEventExtensionStatus extends IAstEvent {
    Exten: string;
    Context: string;
    Hint: string;
    Status: string;
    StatusText: string;
}
/**
 * FailedACL Event - Raised when a request violates an ACL check.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FailedACL }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [aCLName] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventFailedACL extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    aCLName?: string;
    sessionTV?: string;
}
/**
 * FAXSession Event - Raised in response to FAXSession manager command
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FAXSession }
 *
 * @property {string} SessionNumber - The numerical identifier for this particular session
 * @property {string} Operation -  * - * FAX * session * operation * type * gateway * V.21 * send * receive * none
 * @property {string} State -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [actionId] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [errorCorrectionMode] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [dataRate] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [imageResolution] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [pageNumber] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [fileName] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [pagesTransmitted] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [pagesReceived] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [totalBadLines] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 */
export interface IAstEventFAXSession extends IAstEvent {
    SessionNumber: string;
    Operation: string;
    State: string;
    actionId?: string;
    errorCorrectionMode?: string;
    dataRate?: string;
    imageResolution?: string;
    pageNumber?: string;
    fileName?: string;
    pagesTransmitted?: string;
    pagesReceived?: string;
    totalBadLines?: string;
}
/**
 * FAXSessionsComplete Event - Raised when all FAXSession events are completed for a FAXSessions command
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FAXSessionsComplete }
 *
 * @property {string} Total - Count of FAXSession events sent in response to FAXSessions action
 * @property {string} [actionId] - Count of FAXSession events sent in response to FAXSessions action
 */
export interface IAstEventFAXSessionsComplete extends IAstEvent {
    Total: string;
    actionId?: string;
}
/**
 * FAXSessionsEntry Event - A single list item for the FAXSessions AMI command
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FAXSessionsEntry }
 *
 * @property {string} Channel - Name of the channel responsible for the FAX session
 * @property {string} Technology - The FAX technology that the FAX session is using
 * @property {string} SessionNumber - The numerical identifier for this particular session
 * @property {string} SessionType -  * - * FAX * session * passthru/relay * type * G.711 * T.38
 * @property {string} Operation -  * - * FAX * session * operation * type * gateway * V.21 * send * receive * none
 * @property {string} State -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} Files - File or list of files associated with this FAX session
 * @property {string} [actionId] - File or list of files associated with this FAX session
 */
export interface IAstEventFAXSessionsEntry extends IAstEvent {
    Channel: string;
    Technology: string;
    SessionNumber: string;
    SessionType: string;
    Operation: string;
    State: string;
    Files: string;
    actionId?: string;
}
/**
 * FAXStats Event - Raised in response to FAXStats manager command
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FAXStats }
 *
 * @property {string} CurrentSessions - Number of active FAX sessions
 * @property {string} ReservedSessions - Number of reserved FAX sessions
 * @property {string} TransmitAttempts - Total FAX sessions for which Asterisk is/was the transmitter
 * @property {string} ReceiveAttempts - Total FAX sessions for which Asterisk is/was the recipient
 * @property {string} CompletedFAXes - Total FAX sessions which have been completed successfully
 * @property {string} FailedFAXes - Total FAX sessions which failed to complete successfully
 * @property {string} [actionId] - Total FAX sessions which failed to complete successfully
 */
export interface IAstEventFAXStats extends IAstEvent {
    CurrentSessions: string;
    ReservedSessions: string;
    TransmitAttempts: string;
    ReceiveAttempts: string;
    CompletedFAXes: string;
    FailedFAXes: string;
    actionId?: string;
}
/**
 * FAXStatus Event - Raised periodically during a fax transmission.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FAXStatus }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Operation -  * gateway * receive * send
 * @property {string} Status - A text message describing the current status of the fax
 * @property {string} LocalStationID - The value of the LOCALSTATIONID channel variable
 * @property {string} FileName - The files being affected by the fax operation
 */
export interface IAstEventFAXStatus extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Operation: string;
    Status: string;
    LocalStationID: string;
    FileName: string;
}
/**
 * FullyBooted Event - Raised when all Asterisk initialization procedures have finished.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FullyBooted }
 *
 * @property {string} Status - Informational message
 */
export interface IAstEventFullyBooted extends IAstEvent {
    Status: string;
}
/**
 * HangupHandlerPop Event - Raised when a hangup handler is removed from the handler stack by the CHANNEL() function.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_HangupHandlerPop }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Handler - Hangup handler parameter string passed to the Gosub application.
 */
export interface IAstEventHangupHandlerPop extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Handler: string;
}
/**
 * HangupHandlerPush Event - Raised when a hangup handler is added to the handler stack by the CHANNEL() function.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_HangupHandlerPush }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Handler - Hangup handler parameter string passed to the Gosub application.
 */
export interface IAstEventHangupHandlerPush extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Handler: string;
}
/**
 * HangupHandlerRun Event - Raised when a hangup handler is about to be called.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_HangupHandlerRun }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Handler - Hangup handler parameter string passed to the Gosub application.
 */
export interface IAstEventHangupHandlerRun extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Handler: string;
}
/**
 * Hangup Event - Raised when a channel is hung up.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Hangup }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Cause - A numeric cause code for why the channel was hung up.
 * @property {string} Cause-txt - A description of why the channel was hung up.
 */
export interface IAstEventHangup extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Cause: string;
    "Cause-txt": string;
}
/**
 * HangupRequest Event - Raised when a hangup is requested.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_HangupRequest }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Cause - A numeric cause code for why the channel was hung up.
 */
export interface IAstEventHangupRequest extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Cause: string;
}
/**
 * Hold Event - Raised when a channel goes on hold.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Hold }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} MusicClass - The suggested MusicClass, if provided.
 */
export interface IAstEventHold extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    MusicClass: string;
}
/**
 * IdentifyDetail Event - Provide details about an identify section.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_IdentifyDetail }
 *
 * @property {string} ObjectType - The object's type. This will always be "identify".
 * @property {string} ObjectName - The name of this object.
 * @property {string} Endpoint - Name of Endpoint
 * @property {string} Match - IP addresses or networks to match against
 * @property {string} EndpointName - The name of the endpoint associated with this information.
 */
export interface IAstEventIdentifyDetail extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    Endpoint: string;
    Match: string;
    EndpointName: string;
}
/**
 * InvalidAccountID Event - Raised when a request fails an authentication check due to an invalid account ID.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_InvalidAccountID }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventInvalidAccountID extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    sessionTV?: string;
}
/**
 * InvalidPassword Event - Raised when a request provides an invalid password during an authentication attempt.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_InvalidPassword }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [challenge] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [receivedChallenge] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [recievedHash] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventInvalidPassword extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    sessionTV?: string;
    challenge?: string;
    receivedChallenge?: string;
    recievedHash?: string;
}
/**
 * InvalidTransport Event - Raised when a request attempts to use a transport not allowed by the Asterisk service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_InvalidTransport }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} AttemptedTransport - The transport type that the request attempted to use.
 * @property {string} [module] - The transport type that the request attempted to use.
 * @property {string} [sessionTV] - The transport type that the request attempted to use.
 */
export interface IAstEventInvalidTransport extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    AttemptedTransport: string;
    module?: string;
    sessionTV?: string;
}
/**
 * LoadAverageLimit Event - Raised when a request fails because a configured load average limit has been reached.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_LoadAverageLimit }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventLoadAverageLimit extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    sessionTV?: string;
}
/**
 * LocalBridge Event - Raised when two halves of a Local Channel form a bridge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_LocalBridge }
 *
 * @property {string} LocalOneChannel
 * @property {string} LocalOneChannelState - A numeric code for the channel's current state, related to LocalOneChannelStateDesc
 * @property {string} LocalOneChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalOneCallerIDNum
 * @property {string} LocalOneCallerIDName
 * @property {string} LocalOneConnectedLineNum
 * @property {string} LocalOneConnectedLineName
 * @property {string} LocalOneAccountCode
 * @property {string} LocalOneContext
 * @property {string} LocalOneExten
 * @property {string} LocalOnePriority
 * @property {string} LocalOneUniqueid
 * @property {string} LocalOneLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalTwoChannel
 * @property {string} LocalTwoChannelState - A numeric code for the channel's current state, related to LocalTwoChannelStateDesc
 * @property {string} LocalTwoChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalTwoCallerIDNum
 * @property {string} LocalTwoCallerIDName
 * @property {string} LocalTwoConnectedLineNum
 * @property {string} LocalTwoConnectedLineName
 * @property {string} LocalTwoAccountCode
 * @property {string} LocalTwoContext
 * @property {string} LocalTwoExten
 * @property {string} LocalTwoPriority
 * @property {string} LocalTwoUniqueid
 * @property {string} LocalTwoLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Context - The context in the dialplan that Channel2 starts in.
 * @property {string} Exten - The extension in the dialplan that Channel2 starts in.
 * @property {string} LocalOptimization -  * Yes * No
 */
export interface IAstEventLocalBridge extends IAstEvent {
    LocalOneChannel: string;
    LocalOneChannelState: string;
    LocalOneChannelStateDesc: string;
    LocalOneCallerIDNum: string;
    LocalOneCallerIDName: string;
    LocalOneConnectedLineNum: string;
    LocalOneConnectedLineName: string;
    LocalOneAccountCode: string;
    LocalOneContext: string;
    LocalOneExten: string;
    LocalOnePriority: string;
    LocalOneUniqueid: string;
    LocalOneLinkedid: string;
    LocalTwoChannel: string;
    LocalTwoChannelState: string;
    LocalTwoChannelStateDesc: string;
    LocalTwoCallerIDNum: string;
    LocalTwoCallerIDName: string;
    LocalTwoConnectedLineNum: string;
    LocalTwoConnectedLineName: string;
    LocalTwoAccountCode: string;
    LocalTwoContext: string;
    LocalTwoExten: string;
    LocalTwoPriority: string;
    LocalTwoUniqueid: string;
    LocalTwoLinkedid: string;
    Context: string;
    Exten: string;
    LocalOptimization: string;
}
/**
 * LocalOptimizationBegin Event - Raised when two halves of a Local Channel begin to optimize themselves out of the media path.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_LocalOptimizationBegin }
 *
 * @property {string} LocalOneChannel
 * @property {string} LocalOneChannelState - A numeric code for the channel's current state, related to LocalOneChannelStateDesc
 * @property {string} LocalOneChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalOneCallerIDNum
 * @property {string} LocalOneCallerIDName
 * @property {string} LocalOneConnectedLineNum
 * @property {string} LocalOneConnectedLineName
 * @property {string} LocalOneAccountCode
 * @property {string} LocalOneContext
 * @property {string} LocalOneExten
 * @property {string} LocalOnePriority
 * @property {string} LocalOneUniqueid
 * @property {string} LocalOneLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalTwoChannel
 * @property {string} LocalTwoChannelState - A numeric code for the channel's current state, related to LocalTwoChannelStateDesc
 * @property {string} LocalTwoChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalTwoCallerIDNum
 * @property {string} LocalTwoCallerIDName
 * @property {string} LocalTwoConnectedLineNum
 * @property {string} LocalTwoConnectedLineName
 * @property {string} LocalTwoAccountCode
 * @property {string} LocalTwoContext
 * @property {string} LocalTwoExten
 * @property {string} LocalTwoPriority
 * @property {string} LocalTwoUniqueid
 * @property {string} LocalTwoLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SourceChannel
 * @property {string} SourceChannelState - A numeric code for the channel's current state, related to SourceChannelStateDesc
 * @property {string} SourceChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SourceCallerIDNum
 * @property {string} SourceCallerIDName
 * @property {string} SourceConnectedLineNum
 * @property {string} SourceConnectedLineName
 * @property {string} SourceAccountCode
 * @property {string} SourceContext
 * @property {string} SourceExten
 * @property {string} SourcePriority
 * @property {string} SourceUniqueid
 * @property {string} SourceLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestUniqueId - The unique ID of the bridge into which the local channel is optimizing.
 * @property {string} Id - Identification for the optimization operation.
 */
export interface IAstEventLocalOptimizationBegin extends IAstEvent {
    LocalOneChannel: string;
    LocalOneChannelState: string;
    LocalOneChannelStateDesc: string;
    LocalOneCallerIDNum: string;
    LocalOneCallerIDName: string;
    LocalOneConnectedLineNum: string;
    LocalOneConnectedLineName: string;
    LocalOneAccountCode: string;
    LocalOneContext: string;
    LocalOneExten: string;
    LocalOnePriority: string;
    LocalOneUniqueid: string;
    LocalOneLinkedid: string;
    LocalTwoChannel: string;
    LocalTwoChannelState: string;
    LocalTwoChannelStateDesc: string;
    LocalTwoCallerIDNum: string;
    LocalTwoCallerIDName: string;
    LocalTwoConnectedLineNum: string;
    LocalTwoConnectedLineName: string;
    LocalTwoAccountCode: string;
    LocalTwoContext: string;
    LocalTwoExten: string;
    LocalTwoPriority: string;
    LocalTwoUniqueid: string;
    LocalTwoLinkedid: string;
    SourceChannel: string;
    SourceChannelState: string;
    SourceChannelStateDesc: string;
    SourceCallerIDNum: string;
    SourceCallerIDName: string;
    SourceConnectedLineNum: string;
    SourceConnectedLineName: string;
    SourceAccountCode: string;
    SourceContext: string;
    SourceExten: string;
    SourcePriority: string;
    SourceUniqueid: string;
    SourceLinkedid: string;
    DestUniqueId: string;
    Id: string;
}
/**
 * LocalOptimizationEnd Event - Raised when two halves of a Local Channel have finished optimizing themselves out of the media path.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_LocalOptimizationEnd }
 *
 * @property {string} LocalOneChannel
 * @property {string} LocalOneChannelState - A numeric code for the channel's current state, related to LocalOneChannelStateDesc
 * @property {string} LocalOneChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalOneCallerIDNum
 * @property {string} LocalOneCallerIDName
 * @property {string} LocalOneConnectedLineNum
 * @property {string} LocalOneConnectedLineName
 * @property {string} LocalOneAccountCode
 * @property {string} LocalOneContext
 * @property {string} LocalOneExten
 * @property {string} LocalOnePriority
 * @property {string} LocalOneUniqueid
 * @property {string} LocalOneLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalTwoChannel
 * @property {string} LocalTwoChannelState - A numeric code for the channel's current state, related to LocalTwoChannelStateDesc
 * @property {string} LocalTwoChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalTwoCallerIDNum
 * @property {string} LocalTwoCallerIDName
 * @property {string} LocalTwoConnectedLineNum
 * @property {string} LocalTwoConnectedLineName
 * @property {string} LocalTwoAccountCode
 * @property {string} LocalTwoContext
 * @property {string} LocalTwoExten
 * @property {string} LocalTwoPriority
 * @property {string} LocalTwoUniqueid
 * @property {string} LocalTwoLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Success - Indicates whether the local optimization succeeded.
 * @property {string} Id - Identification for the optimization operation. Matches the Id from a previous LocalOptimizationBegin
 */
export interface IAstEventLocalOptimizationEnd extends IAstEvent {
    LocalOneChannel: string;
    LocalOneChannelState: string;
    LocalOneChannelStateDesc: string;
    LocalOneCallerIDNum: string;
    LocalOneCallerIDName: string;
    LocalOneConnectedLineNum: string;
    LocalOneConnectedLineName: string;
    LocalOneAccountCode: string;
    LocalOneContext: string;
    LocalOneExten: string;
    LocalOnePriority: string;
    LocalOneUniqueid: string;
    LocalOneLinkedid: string;
    LocalTwoChannel: string;
    LocalTwoChannelState: string;
    LocalTwoChannelStateDesc: string;
    LocalTwoCallerIDNum: string;
    LocalTwoCallerIDName: string;
    LocalTwoConnectedLineNum: string;
    LocalTwoConnectedLineName: string;
    LocalTwoAccountCode: string;
    LocalTwoContext: string;
    LocalTwoExten: string;
    LocalTwoPriority: string;
    LocalTwoUniqueid: string;
    LocalTwoLinkedid: string;
    Success: string;
    Id: string;
}
/**
 * LogChannel Event - Raised when a logging channel is re-enabled after a reload operation.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_LogChannel }
 *
 * @property {string} Channel - The name of the logging channel.
 * @property {string} Enabled
 */
export interface IAstEventLogChannel extends IAstEvent {
    Channel: string;
    Enabled: string;
}
/**
 * MCID Event - Published when a malicious call ID request arrives.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MCID }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} MCallerIDNumValid
 * @property {string} MCallerIDNum
 * @property {string} MCallerIDton
 * @property {string} MCallerIDNumPlan
 * @property {string} MCallerIDNumPres
 * @property {string} MCallerIDNameValid
 * @property {string} MCallerIDName
 * @property {string} MCallerIDNameCharSet
 * @property {string} MCallerIDNamePres
 * @property {string} MCallerIDSubaddr
 * @property {string} MCallerIDSubaddrType
 * @property {string} MCallerIDSubaddrOdd
 * @property {string} MCallerIDPres
 * @property {string} MConnectedIDNumValid
 * @property {string} MConnectedIDNum
 * @property {string} MConnectedIDton
 * @property {string} MConnectedIDNumPlan
 * @property {string} MConnectedIDNumPres
 * @property {string} MConnectedIDNameValid
 * @property {string} MConnectedIDName
 * @property {string} MConnectedIDNameCharSet
 * @property {string} MConnectedIDNamePres
 * @property {string} MConnectedIDSubaddr
 * @property {string} MConnectedIDSubaddrType
 * @property {string} MConnectedIDSubaddrOdd
 * @property {string} MConnectedIDPres
 */
export interface IAstEventMCID extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    MCallerIDNumValid: string;
    MCallerIDNum: string;
    MCallerIDton: string;
    MCallerIDNumPlan: string;
    MCallerIDNumPres: string;
    MCallerIDNameValid: string;
    MCallerIDName: string;
    MCallerIDNameCharSet: string;
    MCallerIDNamePres: string;
    MCallerIDSubaddr: string;
    MCallerIDSubaddrType: string;
    MCallerIDSubaddrOdd: string;
    MCallerIDPres: string;
    MConnectedIDNumValid: string;
    MConnectedIDNum: string;
    MConnectedIDton: string;
    MConnectedIDNumPlan: string;
    MConnectedIDNumPres: string;
    MConnectedIDNameValid: string;
    MConnectedIDName: string;
    MConnectedIDNameCharSet: string;
    MConnectedIDNamePres: string;
    MConnectedIDSubaddr: string;
    MConnectedIDSubaddrType: string;
    MConnectedIDSubaddrOdd: string;
    MConnectedIDPres: string;
}
/**
 * MeetmeEnd Event - Raised when a MeetMe conference ends.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeEnd }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 */
export interface IAstEventMeetmeEnd extends IAstEvent {
    Meetme: string;
}
/**
 * MeetmeJoin Event - Raised when a user joins a MeetMe conference.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeJoin }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 * @property {string} Usernum - The identifier of the MeetMe user who joined.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventMeetmeJoin extends IAstEvent {
    Meetme: string;
    Usernum: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * MeetmeLeave Event - Raised when a user leaves a MeetMe conference.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeLeave }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 * @property {string} Usernum - The identifier of the MeetMe user who joined.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Duration - The length of time in seconds that the Meetme user was in the conference.
 */
export interface IAstEventMeetmeLeave extends IAstEvent {
    Meetme: string;
    Usernum: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Duration: string;
}
/**
 * MeetmeMute Event - Raised when a MeetMe user is muted or unmuted.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeMute }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 * @property {string} Usernum - The identifier of the MeetMe user who joined.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Duration - The length of time in seconds that the Meetme user has been in the conference at the time of this event.
 * @property {string} Status -  * on * off
 */
export interface IAstEventMeetmeMute extends IAstEvent {
    Meetme: string;
    Usernum: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Duration: string;
    Status: string;
}
/**
 * MeetmeTalking Event - Raised when a MeetMe user begins or ends talking.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeTalking }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 * @property {string} Usernum - The identifier of the MeetMe user who joined.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Duration - The length of time in seconds that the Meetme user has been in the conference at the time of this event.
 * @property {string} Status -  * on * off
 */
export interface IAstEventMeetmeTalking extends IAstEvent {
    Meetme: string;
    Usernum: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Duration: string;
    Status: string;
}
/**
 * MeetmeTalkRequest Event - Raised when a MeetMe user has started talking.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeTalkRequest }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 * @property {string} Usernum - The identifier of the MeetMe user who joined.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Duration - The length of time in seconds that the Meetme user has been in the conference at the time of this event.
 * @property {string} Status -  * on * off
 */
export interface IAstEventMeetmeTalkRequest extends IAstEvent {
    Meetme: string;
    Usernum: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Duration: string;
    Status: string;
}
/**
 * MemoryLimit Event - Raised when a request fails due to an internal memory allocation failure.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MemoryLimit }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventMemoryLimit extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    sessionTV?: string;
}
/**
 * MessageWaiting Event - Raised when the state of messages in a voicemail mailbox has changed or when a channel has finished interacting with a mailbox.
 *
 * @description Note -The Channel related parameters are only present if a channel was involved in the manipulation of a mailbox.
 * If no channel is involved, the parameters are not included with the event.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MessageWaiting }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Mailbox - The mailbox with the new message, specified as mailbox@context
 * @property {string} Waiting - Whether or not the mailbox has messages waiting for it.
 * @property {string} New - The number of new messages.
 * @property {string} Old - The number of old messages.
 */
export interface IAstEventMessageWaiting extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Mailbox: string;
    Waiting: string;
    New: string;
    Old: string;
}
/**
 * MiniVoiceMail Event - Raised when a notification is sent out by a MiniVoiceMail application
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MiniVoiceMail }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Action - What action was taken. Currently, this will always be SentNotification
 * @property {string} Mailbox - The mailbox that the notification was about, specified as mailbox@context
 * @property {string} Counter - A message counter derived from the MVM_COUNTER channel variable.
 */
export interface IAstEventMiniVoiceMail extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Action: string;
    Mailbox: string;
    Counter: string;
}
/**
 * MonitorStart Event - Raised when monitoring has started on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MonitorStart }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventMonitorStart extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * MonitorStop Event - Raised when monitoring has stopped on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MonitorStop }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventMonitorStop extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * MusicOnHoldStart Event - Raised when music on hold has started on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MusicOnHoldStart }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Class - The class of music being played on the channel
 */
export interface IAstEventMusicOnHoldStart extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Class: string;
}
/**
 * MusicOnHoldStop Event - Raised when music on hold has stopped on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MusicOnHoldStop }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventMusicOnHoldStop extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * MWIGetComplete Event - Raised in response to a MWIGet command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MWIGetComplete }
 *
 * @property {string} ListItems - The number of mailboxes reported.
 * @property {string} [actionId] - The number of mailboxes reported.
 */
export interface IAstEventMWIGetComplete extends IAstEvent {
    ListItems: string;
    actionId?: string;
}
/**
 * MWIGet Event - Raised in response to a MWIGet command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MWIGet }
 *
 * @property {string} Mailbox - Specific mailbox ID.
 * @property {string} OldMessages - The number of old messages in the mailbox.
 * @property {string} NewMessages - The number of new messages in the mailbox.
 * @property {string} [actionId] - The number of new messages in the mailbox.
 */
export interface IAstEventMWIGet extends IAstEvent {
    Mailbox: string;
    OldMessages: string;
    NewMessages: string;
    actionId?: string;
}
/**
 * NewAccountCode Event - Raised when a Channel's AccountCode is changed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_NewAccountCode }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} OldAccountCode - The channel's previous account code
 */
export interface IAstEventNewAccountCode extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    OldAccountCode: string;
}
/**
 * NewCallerid Event - Raised when a channel receives new Caller ID information.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_NewCallerid }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} CID-CallingPres - A description of the Caller ID presentation.
 */
export interface IAstEventNewCallerid extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    "CID-CallingPres": string;
}
/**
 * Newchannel Event - Raised when a new channel is created.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Newchannel }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventNewchannel extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * NewExten Event - Raised when a channel enters a new context, extension, priority.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_NewExten }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Extension - Deprecated in 12, but kept for backward compatability. Please use "Exten" instead.
 * @property {string} Application - The application about to be executed.
 * @property {string} AppData - The data to be passed to the application.
 */
export interface IAstEventNewExten extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Extension: string;
    Application: string;
    AppData: string;
}
/**
 * Newstate Event - Raised when a channel's state changes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Newstate }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventNewstate extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * OriginateResponse Event - Raised in response to an Originate command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_OriginateResponse }
 *
 * @property {string} Response -  * Failure * Success
 * @property {string} Channel
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Application
 * @property {string} Data
 * @property {string} Reason
 * @property {string} Uniqueid
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} [actionId]
 */
export interface IAstEventOriginateResponse extends IAstEvent {
    Response: string;
    Channel: string;
    Context: string;
    Exten: string;
    Application: string;
    Data: string;
    Reason: string;
    Uniqueid: string;
    CallerIDNum: string;
    CallerIDName: string;

    actionId?: string;
}
/**
 * AuthMethodNotAllowed Event - Raised when a request used an authentication method not allowed by the service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AuthMethodNotAllowed }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} AuthMethod - The authentication method attempted.
 * @property {string} [module] - The authentication method attempted.
 * @property {string} [sessionTV] - The authentication method attempted.
 */
export interface IAstEventAuthMethodNotAllowed extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    AuthMethod: string;
    module?: string;
    sessionTV?: string;
}
/**
 * Rename Event - Raised when the name of a channel is changed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Rename }
 *
 * @property {string} Channel
 * @property {string} Newname
 * @property {string} Uniqueid
 */
export interface IAstEventRename extends IAstEvent {
    Channel: string;
    Newname: string;
    Uniqueid: string;
}
/**
 * AorDetail Event - Provide details about an Address of Record (AoR) section.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AorDetail }
 *
 * @property {string} ObjectType - The object's type. This will always be "aor".
 * @property {string} ObjectName - The name of this object.
 * @property {string} MinimumExpiration - Minimum keep alive time for an AoR
 * @property {string} MaximumExpiration - Maximum time to keep an AoR
 * @property {string} DefaultExpiration - Default expiration time in seconds for contacts that are dynamically bound to an AoR.
 * @property {string} QualifyFrequency - Interval at which to qualify an AoR
 * @property {string} AuthenticateQualify - Authenticates a qualify request if needed
 * @property {string} MaxContacts - Maximum number of contacts that can bind to an AoR
 * @property {string} RemoveExisting - Determines whether new contacts replace existing ones.
 * @property {string} Mailboxes - Allow subscriptions for the specified mailbox(es)
 * @property {string} OutboundProxy - Outbound proxy used when sending OPTIONS request
 * @property {string} SupportPath - Enables Path support for REGISTER requests and Route support for other requests.
 * @property {string} TotalContacts - The total number of contacts associated with this AoR.
 * @property {string} ContactsRegistered - The number of non-permanent contacts associated with this AoR.
 * @property {string} EndpointName - The name of the endpoint associated with this information.
 */
export interface IAstEventAorDetail extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    MinimumExpiration: string;
    MaximumExpiration: string;
    DefaultExpiration: string;
    QualifyFrequency: string;
    AuthenticateQualify: string;
    MaxContacts: string;
    RemoveExisting: string;
    Mailboxes: string;
    OutboundProxy: string;
    SupportPath: string;
    TotalContacts: string;
    ContactsRegistered: string;
    EndpointName: string;
}
/**
 * AgentRingNoAnswer Event - Raised when a queue member is notified of a caller in the queue and fails to answer.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentRingNoAnswer }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} RingTime - The time the queue member was rung, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 */
export interface IAstEventAgentRingNoAnswer extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    Queue: string;
    MemberName: string;
    Interface: string;
    RingTime: string;
}
/**
 * ParkedCall Event - Raised when a channel is parked.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ParkedCall }
 *
 * @property {string} ParkeeChannel
 * @property {string} ParkeeChannelState - A numeric code for the channel's current state, related to ParkeeChannelStateDesc
 * @property {string} ParkeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkeeCallerIDNum
 * @property {string} ParkeeCallerIDName
 * @property {string} ParkeeConnectedLineNum
 * @property {string} ParkeeConnectedLineName
 * @property {string} ParkeeAccountCode
 * @property {string} ParkeeContext
 * @property {string} ParkeeExten
 * @property {string} ParkeePriority
 * @property {string} ParkeeUniqueid
 * @property {string} ParkeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerDialString - Dial String that can be used to call back the parker on ParkingTimeout.
 * @property {string} Parkinglot - Name of the parking lot that the parkee is parked in
 * @property {string} ParkingSpace - Parking Space that the parkee is parked in
 * @property {string} ParkingTimeout - Time remaining until the parkee is forcefully removed from parking in seconds
 * @property {string} ParkingDuration - Time the parkee has been in the parking bridge (in seconds)
 */
export interface IAstEventParkedCall extends IAstEvent {
    ParkeeChannel: string;
    ParkeeChannelState: string;
    ParkeeChannelStateDesc: string;
    ParkeeCallerIDNum: string;
    ParkeeCallerIDName: string;
    ParkeeConnectedLineNum: string;
    ParkeeConnectedLineName: string;
    ParkeeAccountCode: string;
    ParkeeContext: string;
    ParkeeExten: string;
    ParkeePriority: string;
    ParkeeUniqueid: string;
    ParkeeLinkedid: string;
    ParkerDialString: string;
    Parkinglot: string;
    ParkingSpace: string;
    ParkingTimeout: string;
    ParkingDuration: string;
}
/**
 * Shutdown Event - Raised when Asterisk is shutdown or restarted.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Shutdown }
 *
 * @property {string} Shutdown -   -  Whether  the  shutdown  is  proceeding  cleanly  (all  channels  were  hungup  successfully)  or  uncleanly  (channels  will  be  terminated)  
 * Uncleanly  
 * Cleanly
 * @property {string} Restart -   -  Whether  or  not  a  restart  will  occur.  
 * True  
 * False
 */
export interface IAstEventShutdown extends IAstEvent {
    Shutdown: string;
    Restart: string;
}
/**
 * AGIExecStart Event - Raised when a received AGI command starts processing.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AGIExecStart }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Command - The AGI command as received from the external source.
 * @property {string} CommandId - Random identification number assigned to the execution of this command.
 */
export interface IAstEventAGIExecStart extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Command: string;
    CommandId: string;
}
/**
 * FAXSession Event - Raised in response to FAXSession manager command
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FAXSession }
 *
 * @property {string} SessionNumber - The numerical identifier for this particular session
 * @property {string} Operation -  * - * FAX * session * operation * type * gateway * V.21 * send * receive * none
 * @property {string} State -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [actionId] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [errorCorrectionMode] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [dataRate] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [imageResolution] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [pageNumber] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [fileName] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [pagesTransmitted] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [pagesReceived] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} [totalBadLines] -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 */
export interface IAstEventFAXSession extends IAstEvent {
    SessionNumber: string;
    Operation: string;
    State: string;
    actionId?: string;
    errorCorrectionMode?: string;
    dataRate?: string;
    imageResolution?: string;
    pageNumber?: string;
    fileName?: string;
    pagesTransmitted?: string;
    pagesReceived?: string;
    totalBadLines?: string;
}
/**
 * MonitorStart Event - Raised when monitoring has started on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MonitorStart }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventMonitorStart extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * Hangup Event - Raised when a channel is hung up.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Hangup }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Cause - A numeric cause code for why the channel was hung up.
 * @property {string} Cause-txt - A description of why the channel was hung up.
 */
export interface IAstEventHangup extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Cause: string;
    "Cause-txt": string;
}
/**
 * VarSet Event - Raised when a variable local to the gosub stack frame is set due to a subroutine call.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_VarSet }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Variable -  * - * The * LOCAL * variable * being * set. * Note * Icon * The * variable * name * will * always * be * enclosed * with * LOCAL()
 * @property {string} Value - The new value of the variable.
 */
export interface IAstEventVarSet extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Variable: string;
    Value: string;
}
/**
 * AsyncAGIExec Event - Raised when AsyncAGI completes an AGI command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AsyncAGIExec }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Result - URL encoded result string from the executed AGI command.
 * @property {string} [commandId] - URL encoded result string from the executed AGI command.
 */
export interface IAstEventAsyncAGIExec extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Result: string;
    commandId?: string;
}
/**
 * Hold Event - Raised when a channel goes on hold.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Hold }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} MusicClass - The suggested MusicClass, if provided.
 */
export interface IAstEventHold extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    MusicClass: string;
}
/**
 * SuccessfulAuth Event - Raised when a request successfully authenticates with a service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SuccessfulAuth }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} UsingPassword - Whether or not the authentication attempt included a password.
 * @property {string} [module] - Whether or not the authentication attempt included a password.
 * @property {string} [sessionTV] - Whether or not the authentication attempt included a password.
 */
export interface IAstEventSuccessfulAuth extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    UsingPassword: string;
    module?: string;
    sessionTV?: string;
}
/**
 * ParkedCallSwap Event - Raised when a channel takes the place of a previously parked channel
 *
 * @description This event is raised when a channel initially parked in the parking lot is swapped out with a different channel. 
 * The most common case for this is when an attended transfer to a parking lot occurs. The Parkee information in the event will indicate the party that was swapped into the parking lot.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ParkedCallSwap }
 *
 * @property {string} ParkeeChannel
 * @property {string} ParkeeChannelState - A numeric code for the channel's current state, related to ParkeeChannelStateDesc
 * @property {string} ParkeeChannelStateDesc -   Down  Rsrvd  OffHook  Dialing  Ring  Ringing  Up  Busy  Dialing  Offhook  Pre-ring  Unknown
 * @property {string} ParkeeCallerIDNum
 * @property {string} ParkeeCallerIDName
 * @property {string} ParkeeConnectedLineNum
 * @property {string} ParkeeConnectedLineName
 * @property {string} ParkeeAccountCode
 * @property {string} ParkeeContext
 * @property {string} ParkeeExten
 * @property {string} ParkeePriority
 * @property {string} ParkeeUniqueid
 * @property {string} ParkeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerChannel
 * @property {string} ParkerChannelState - A numeric code for the channel's current state, related to ParkerChannelStateDesc
 * @property {string} ParkerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkerCallerIDNum
 * @property {string} ParkerCallerIDName
 * @property {string} ParkerConnectedLineNum
 * @property {string} ParkerConnectedLineName
 * @property {string} ParkerAccountCode
 * @property {string} ParkerContext
 * @property {string} ParkerExten
 * @property {string} ParkerPriority
 * @property {string} ParkerUniqueid
 * @property {string} ParkerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerDialString - Dial String that can be used to call back the parker on ParkingTimeout.
 * @property {string} Parkinglot - Name of the parking lot that the parkee is parked in
 * @property {string} ParkingSpace - Parking Space that the parkee is parked in
 * @property {string} ParkingTimeout - Time remaining until the parkee is forcefully removed from parking in seconds
 * @property {string} ParkingDuration - Time the parkee has been in the parking bridge (in seconds)
 */
export interface IAstEventParkedCallSwap extends IAstEvent {
    ParkeeChannel: string;
    ParkeeChannelState: string;
    ParkeeChannelStateDesc: string;
    ParkeeCallerIDNum: string;
    ParkeeCallerIDName: string;
    ParkeeConnectedLineNum: string;
    ParkeeConnectedLineName: string;
    ParkeeAccountCode: string;
    ParkeeContext: string;
    ParkeeExten: string;
    ParkeePriority: string;
    ParkeeUniqueid: string;
    ParkeeLinkedid: string;
    ParkerChannel: string;
    ParkerChannelState: string;
    ParkerChannelStateDesc: string;
    ParkerCallerIDNum: string;
    ParkerCallerIDName: string;
    ParkerConnectedLineNum: string;
    ParkerConnectedLineName: string;
    ParkerAccountCode: string;
    ParkerContext: string;
    ParkerExten: string;
    ParkerPriority: string;
    ParkerUniqueid: string;
    ParkerLinkedid: string;
    ParkerDialString: string;
    Parkinglot: string;
    ParkingSpace: string;
    ParkingTimeout: string;
    ParkingDuration: string;
}
/**
 * LoadAverageLimit Event - Raised when a request fails because a configured load average limit has been reached.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_LoadAverageLimit }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventLoadAverageLimit extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    sessionTV?: string;
}
/**
 * AgentCalled Event - Raised when an queue member is notified of a caller in the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentCalled }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 */
export interface IAstEventAgentCalled extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    Queue: string;
    MemberName: string;
    Interface: string;
}
/**
 * CoreShowChannel Event - Raised in response to a CoreShowChannels command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_CoreShowChannel }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} BridgeId - Identifier of the bridge the channel is in, may be empty if not in one
 * @property {string} Application - Application currently executing on the channel
 * @property {string} ApplicationData - Data given to the currently executing application
 * @property {string} Duration - The amount of time the channel has existed
 */
export interface IAstEventCoreShowChannel extends IAstEvent {
    ActionID: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    BridgeId: string;
    Application: string;
    ApplicationData: string;
    Duration: string;
}
/**
 * AlarmClear Event - Raised when an alarm is cleared on a DAHDI channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AlarmClear }
 *
 * @property {string} DAHDIChannel -  * - * The * DAHDI * channel * on * which * the * alarm * was * cleared. * Note * Icon * This * is * not * an * Asterisk * channel * identifier.
 */
export interface IAstEventAlarmClear extends IAstEvent {
    DAHDIChannel: string;
}
/**
 * MeetmeJoin Event - Raised when a user joins a MeetMe conference.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeJoin }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 * @property {string} Usernum - The identifier of the MeetMe user who joined.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventMeetmeJoin extends IAstEvent {
    Meetme: string;
    Usernum: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * StatusComplete Event - Raised in response to a Status command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_StatusComplete }
 *
 * @property {string} Items - Number of Status events returned
 */
export interface IAstEventStatusComplete extends IAstEvent {
    Items: string;
}
/**
 * QueueCallerAbandon Event - Raised when a caller abandons the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueCallerAbandon }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} Position - This channel's current position in the queue.
 * @property {string} OriginalPosition - The channel's original position in the queue.
 * @property {string} HoldTime - The time the channel was in the queue, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 */
export interface IAstEventQueueCallerAbandon extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Queue: string;
    Position: string;
    OriginalPosition: string;
    HoldTime: string;
}
/**
 * AOC_S Event - Raised when an Advice of Charge message is sent during a call.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AOC-S }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Charge
 * @property {string} Type -  * NotAvailable * Free * Currency * Units
 * @property {string} BillingID -  * Normal * Reverse * CreditCard * CallForwardingUnconditional * CallForwardingBusy * CallForwardingNoReply * CallDeflection * CallTransfer * NotAvailable
 * @property {string} TotalType -  * SubTotal * Total
 * @property {string} Currency
 * @property {string} Name
 * @property {string} Cost
 * @property {string} Multiplier -  * 1/1000 * 1/100 * 1/10 * 1 * 10 * 100 * 1000
 * @property {string} Units
 * @property {string} NumberOf
 * @property {string} TypeOf
 */
export interface IAstEventAOC_S extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Charge: string;
    Type: string;
    BillingID: string;
    TotalType: string;
    Currency: string;
    Name: string;
    Cost: string;
    Multiplier: string;
    Units: string;
    NumberOf: string;
    TypeOf: string;
}
/**
 * HangupHandlerPush Event - Raised when a hangup handler is added to the handler stack by the CHANNEL() function.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_HangupHandlerPush }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Handler - Hangup handler parameter string passed to the Gosub application.
 */
export interface IAstEventHangupHandlerPush extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Handler: string;
}
/**
 * QueueMemberPenalty Event - Raised when a member's penalty is changed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberPenalty }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -   -  Set  to  1  if  member  is  in  call.  Set  to  0  after  LastCall  time  is  updated.  0  1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  0  -  AST_DEVICE_UNKNOWN  1  -  AST_DEVICE_NOT_INUSE  2  -  AST_DEVICE_INUSE
 * 3  -  AST_DEVICE_BUSY  4  -  AST_DEVICE_INVALID  5  -  AST_DEVICE_UNAVAILABLE  6  -  AST_DEVICE_RINGING  7  -  AST_DEVICE_RINGINUSE  8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 */
export interface IAstEventQueueMemberPenalty extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
}
/**
 * BridgeCreate Event - Raised when a bridge is created.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeCreate }
 *
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventBridgeCreate extends IAstEvent {
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * ParkedCallTimeOut Event - Raised when a channel leaves a parking lot due to reaching the time limit of being parked.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ParkedCallTimeOut }
 *
 * @property {string} ParkeeChannel
 * @property {string} ParkeeChannelState - A numeric code for the channel's current state, related to ParkeeChannelStateDesc
 * @property {string} ParkeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkeeCallerIDNum
 * @property {string} ParkeeCallerIDName
 * @property {string} ParkeeConnectedLineNum
 * @property {string} ParkeeConnectedLineName
 * @property {string} ParkeeAccountCode
 * @property {string} ParkeeContext
 * @property {string} ParkeeExten
 * @property {string} ParkeePriority
 * @property {string} ParkeeUniqueid
 * @property {string} ParkeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerChannel
 * @property {string} ParkerChannelState - A numeric code for the channel's current state, related to ParkerChannelStateDesc
 * @property {string} ParkerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkerCallerIDNum
 * @property {string} ParkerCallerIDName
 * @property {string} ParkerConnectedLineNum
 * @property {string} ParkerConnectedLineName
 * @property {string} ParkerAccountCode
 * @property {string} ParkerContext
 * @property {string} ParkerExten
 * @property {string} ParkerPriority
 * @property {string} ParkerUniqueid
 * @property {string} ParkerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerDialString - Dial String that can be used to call back the parker on ParkingTimeout.
 * @property {string} Parkinglot - Name of the parking lot that the parkee is parked in
 * @property {string} ParkingSpace - Parking Space that the parkee is parked in
 * @property {string} ParkingTimeout - Time remaining until the parkee is forcefully removed from parking in seconds
 * @property {string} ParkingDuration - Time the parkee has been in the parking bridge (in seconds)
 */
export interface IAstEventParkedCallTimeOut extends IAstEvent {
    ParkeeChannel: string;
    ParkeeChannelState: string;
    ParkeeChannelStateDesc: string;
    ParkeeCallerIDNum: string;
    ParkeeCallerIDName: string;
    ParkeeConnectedLineNum: string;
    ParkeeConnectedLineName: string;
    ParkeeAccountCode: string;
    ParkeeContext: string;
    ParkeeExten: string;
    ParkeePriority: string;
    ParkeeUniqueid: string;
    ParkeeLinkedid: string;
    ParkerChannel: string;
    ParkerChannelState: string;
    ParkerChannelStateDesc: string;
    ParkerCallerIDNum: string;
    ParkerCallerIDName: string;
    ParkerConnectedLineNum: string;
    ParkerConnectedLineName: string;
    ParkerAccountCode: string;
    ParkerContext: string;
    ParkerExten: string;
    ParkerPriority: string;
    ParkerUniqueid: string;
    ParkerLinkedid: string;
    ParkerDialString: string;
    Parkinglot: string;
    ParkingSpace: string;
    ParkingTimeout: string;
    ParkingDuration: string;
}
/**
 * AsyncAGIEnd Event - Raised when a channel stops AsyncAGI command processing.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AsyncAGIEnd }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventAsyncAGIEnd extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * TransportDetail Event - Provide details about an authentication section.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_TransportDetail }
 *
 * @property {string} ObjectType - The object's type. This will always be "transport".
 * @property {string} ObjectName - The name of this object.
 * @property {string} Protocol - Protocol to use for SIP traffic
 * @property {string} Bind - IP Address and optional port to bind to for this transport
 * @property {string} AsycOperations - Number of simultaneous Asynchronous Operations
 * @property {string} CaListFile - File containing a list of certificates to read (TLS ONLY)
 * @property {string} CaListPath - Path to directory containing a list of certificates to read (TLS ONLY)
 * @property {string} CertFile - Certificate file for endpoint (TLS ONLY)
 * @property {string} PrivKeyFile - Private key file (TLS ONLY)
 * @property {string} Password - Password required for transport
 * @property {string} ExternalSignalingAddress - External address for SIP signalling
 * @property {string} ExternalSignalingPort - External port for SIP signalling
 * @property {string} ExternalMediaAddress - External IP address to use in RTP handling
 * @property {string} Domain - Domain the transport comes from
 * @property {string} VerifyServer - Require verification of server certificate (TLS ONLY)
 * @property {string} VerifyClient - Require verification of client certificate (TLS ONLY)
 * @property {string} RequireClientCert - Require client certificate (TLS ONLY)
 * @property {string} Method - Method of SSL transport (TLS ONLY)
 * @property {string} Cipher - Preferred cryptography cipher names (TLS ONLY)
 * @property {string} LocalNet - Network to consider local (used for NAT purposes).
 * @property {string} Tos - Enable TOS for the signalling sent over this transport
 * @property {string} Cos - Enable COS for the signalling sent over this transport
 * @property {string} WebsocketWriteTimeout - The timeout (in milliseconds) to set on WebSocket connections.
 * @property {string} EndpointName - The name of the endpoint associated with this information.
 */
export interface IAstEventTransportDetail extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    Protocol: string;
    Bind: string;
    AsycOperations: string;
    CaListFile: string;
    CaListPath: string;
    CertFile: string;
    PrivKeyFile: string;
    Password: string;
    ExternalSignalingAddress: string;
    ExternalSignalingPort: string;
    ExternalMediaAddress: string;
    Domain: string;
    VerifyServer: string;
    VerifyClient: string;
    RequireClientCert: string;
    Method: string;
    Cipher: string;
    LocalNet: string;
    Tos: string;
    Cos: string;
    WebsocketWriteTimeout: string;
    EndpointName: string;
}
/**
 * ContactStatusDetail Event - Provide details about a contact's status.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ContactStatusDetail }
 *
 * @property {string} AOR - The AoR that owns this contact.
 * @property {string} URI - This contact's URI.
 * @property {string} Status -  * - * This * contact's * status. * Reachable * Unreachable
 * @property {string} RoundtripUsec - The round trip time in microseconds.
 * @property {string} EndpointName - The name of the endpoint associated with this information.
 * @property {string} UserAgent - Content of the User-Agent header in REGISTER request
 * @property {string} RegExpire - Absolute time that this contact is no longer valid after
 * @property {string} ViaAddress - IP address:port of the last Via header in REGISTER request
 * @property {string} CallID - Content of the Call-ID header in REGISTER request
 */
export interface IAstEventContactStatusDetail extends IAstEvent {
    AOR: string;
    URI: string;
    Status: string;
    RoundtripUsec: string;
    EndpointName: string;
    UserAgent: string;
    RegExpire: string;
    ViaAddress: string;
    CallID: string;
}
/**
 * CoreShowChannelsComplete Event - Raised at the end of the CoreShowChannel list produced by the CoreShowChannels command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_CoreShowChannelsComplete }
 *
 * @property {string} ListItems - The total number of list items produced
 */
export interface IAstEventCoreShowChannelsComplete extends IAstEvent {
    ActionID: string;
    ListItems: string;
}
/**
 * LocalOptimizationEnd Event - Raised when two halves of a Local Channel have finished optimizing themselves out of the media path.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_LocalOptimizationEnd }
 *
 * @property {string} LocalOneChannel
 * @property {string} LocalOneChannelState - A numeric code for the channel's current state, related to LocalOneChannelStateDesc
 * @property {string} LocalOneChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalOneCallerIDNum
 * @property {string} LocalOneCallerIDName
 * @property {string} LocalOneConnectedLineNum
 * @property {string} LocalOneConnectedLineName
 * @property {string} LocalOneAccountCode
 * @property {string} LocalOneContext
 * @property {string} LocalOneExten
 * @property {string} LocalOnePriority
 * @property {string} LocalOneUniqueid
 * @property {string} LocalOneLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalTwoChannel
 * @property {string} LocalTwoChannelState - A numeric code for the channel's current state, related to LocalTwoChannelStateDesc
 * @property {string} LocalTwoChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalTwoCallerIDNum
 * @property {string} LocalTwoCallerIDName
 * @property {string} LocalTwoConnectedLineNum
 * @property {string} LocalTwoConnectedLineName
 * @property {string} LocalTwoAccountCode
 * @property {string} LocalTwoContext
 * @property {string} LocalTwoExten
 * @property {string} LocalTwoPriority
 * @property {string} LocalTwoUniqueid
 * @property {string} LocalTwoLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Success - Indicates whether the local optimization succeeded.
 * @property {string} Id - Identification for the optimization operation. Matches the Id from a previous LocalOptimizationBegin
 */
export interface IAstEventLocalOptimizationEnd extends IAstEvent {
    LocalOneChannel: string;
    LocalOneChannelState: string;
    LocalOneChannelStateDesc: string;
    LocalOneCallerIDNum: string;
    LocalOneCallerIDName: string;
    LocalOneConnectedLineNum: string;
    LocalOneConnectedLineName: string;
    LocalOneAccountCode: string;
    LocalOneContext: string;
    LocalOneExten: string;
    LocalOnePriority: string;
    LocalOneUniqueid: string;
    LocalOneLinkedid: string;
    LocalTwoChannel: string;
    LocalTwoChannelState: string;
    LocalTwoChannelStateDesc: string;
    LocalTwoCallerIDNum: string;
    LocalTwoCallerIDName: string;
    LocalTwoConnectedLineNum: string;
    LocalTwoConnectedLineName: string;
    LocalTwoAccountCode: string;
    LocalTwoContext: string;
    LocalTwoExten: string;
    LocalTwoPriority: string;
    LocalTwoUniqueid: string;
    LocalTwoLinkedid: string;
    Success: string;
    Id: string;
}
/**
 * MeetmeTalkRequest Event - Raised when a MeetMe user has started talking.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeTalkRequest }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 * @property {string} Usernum - The identifier of the MeetMe user who joined.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Duration - The length of time in seconds that the Meetme user has been in the conference at the time of this event.
 * @property {string} Status -  * on * off
 */
export interface IAstEventMeetmeTalkRequest extends IAstEvent {
    Meetme: string;
    Usernum: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Duration: string;
    Status: string;
}
/**
 * LocalBridge Event - Raised when two halves of a Local Channel form a bridge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_LocalBridge }
 *
 * @property {string} LocalOneChannel
 * @property {string} LocalOneChannelState - A numeric code for the channel's current state, related to LocalOneChannelStateDesc
 * @property {string} LocalOneChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalOneCallerIDNum
 * @property {string} LocalOneCallerIDName
 * @property {string} LocalOneConnectedLineNum
 * @property {string} LocalOneConnectedLineName
 * @property {string} LocalOneAccountCode
 * @property {string} LocalOneContext
 * @property {string} LocalOneExten
 * @property {string} LocalOnePriority
 * @property {string} LocalOneUniqueid
 * @property {string} LocalOneLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalTwoChannel
 * @property {string} LocalTwoChannelState - A numeric code for the channel's current state, related to LocalTwoChannelStateDesc
 * @property {string} LocalTwoChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalTwoCallerIDNum
 * @property {string} LocalTwoCallerIDName
 * @property {string} LocalTwoConnectedLineNum
 * @property {string} LocalTwoConnectedLineName
 * @property {string} LocalTwoAccountCode
 * @property {string} LocalTwoContext
 * @property {string} LocalTwoExten
 * @property {string} LocalTwoPriority
 * @property {string} LocalTwoUniqueid
 * @property {string} LocalTwoLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Context - The context in the dialplan that Channel2 starts in.
 * @property {string} Exten - The extension in the dialplan that Channel2 starts in.
 * @property {string} LocalOptimization -  * Yes * No
 */
export interface IAstEventLocalBridge extends IAstEvent {
    LocalOneChannel: string;
    LocalOneChannelState: string;
    LocalOneChannelStateDesc: string;
    LocalOneCallerIDNum: string;
    LocalOneCallerIDName: string;
    LocalOneConnectedLineNum: string;
    LocalOneConnectedLineName: string;
    LocalOneAccountCode: string;
    LocalOneContext: string;
    LocalOneExten: string;
    LocalOnePriority: string;
    LocalOneUniqueid: string;
    LocalOneLinkedid: string;
    LocalTwoChannel: string;
    LocalTwoChannelState: string;
    LocalTwoChannelStateDesc: string;
    LocalTwoCallerIDNum: string;
    LocalTwoCallerIDName: string;
    LocalTwoConnectedLineNum: string;
    LocalTwoConnectedLineName: string;
    LocalTwoAccountCode: string;
    LocalTwoContext: string;
    LocalTwoExten: string;
    LocalTwoPriority: string;
    LocalTwoUniqueid: string;
    LocalTwoLinkedid: string;
    Context: string;
    Exten: string;
    LocalOptimization: string;
}
/**
 * RequestBadFormat Event - Raised when a request is received with bad formatting.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_RequestBadFormat }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The account ID associated with the rejected request.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} RequestType - The type of request attempted.
 * @property {string} [module] - The type of request attempted.
 * @property {string} [sessionTV] - The type of request attempted.
 * @property {string} [accountId] - The type of request attempted.
 * @property {string} [requestParams] - The type of request attempted.
 */
export interface IAstEventRequestBadFormat extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    RequestType: string;
    module?: string;
    sessionTV?: string;
    accountId?: string;
    requestParams?: string;
}
/**
 * DialEnd Event - Raised when a dial action has completed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DialEnd }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DialStatus -   -  The  result  of  the  dial  operation.
 * ABORT  -  The  call  was  aborted.
 * ANSWER  -  The  caller  answered.
 * BUSY  -  The  caller  was  busy.
 * CANCEL  -  The  caller  cancelled  the  call.
 * CHANUNAVAIL  -  The  requested  channel  is  unavailable.
 * CONGESTION  -  The  called  party  is  congested.
 * CONTINUE  -  The  dial  completed,  but  the  caller  elected  to  continue  in  the  dialplan.
 * GOTO  -  The  dial  completed,  but  the  caller  jumped  to  a  dialplan  location.
 * If  known,  the  location  the  caller  is  jumping  to  will  be  appended  to  the  result  following  a  ":".
 * NOANSWER  -  The  called  party  failed  to  answer.
 * @property {string} [forward] -   -  The  result  of  the  dial  operation.
 * ABORT  -  The  call  was  aborted.
 * ANSWER  -  The  caller  answered.  BUSY  -  The  caller  was  busy.
 * CANCEL  -  The  caller  cancelled  the  call.
 * CHANUNAVAIL  -  The  requested  channel  is  unavailable.
 * CONGESTION  -  The  called  party  is  congested.
 * CONTINUE  -  The  dial  completed,  but  the  caller  elected  to  continue  in  the  dialplan.
 * GOTO  -  The  dial  completed,  but  the  caller  jumped  to  a  dialplan  location.
 * If  known,  the  location  the  caller  is  jumping  to  will  be  appended  to  the  result  following  a  ":".
 * NOANSWER  -  The  called  party  failed  to  answer.
 */
export interface IAstEventDialEnd extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    DialStatus: string;
    forward?: string;
}
/**
 * ConfbridgeTalking Event - Raised when a confbridge participant unmutes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeTalking }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} TalkingStatus -  * on * off
 * @property {string} Admin -  * - * Identifies * this * user * as * an * admin * user. * Yes * No
 */
export interface IAstEventConfbridgeTalking extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    TalkingStatus: string;
    Admin: string;
}
/**
 * Unhold Event - Raised when a channel goes off hold.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Unhold }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventUnhold extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * Reload Event - Raised when a module has been reloaded in Asterisk.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Reload }
 *
 * @property {string} Module - The name of the module that was reloaded, or All if all modules were reloaded
 * @property {string} Status -   -  The  numeric  status  code  denoting  the  success  or  failure  of  the  reload  request. 
 * 0  -  Success  
 * 1  -  Request  queued  
 * 2  -  Module  not  found  
 * 3  -  Error  
 * 4  -  Reload  already  in  progress  
 * 5  -  Module  uninitialized  
 * 6  -  Reload  not  supported
 */
export interface IAstEventReload extends IAstEvent {
    Module: string;
    Status: string;
}
/**
 * FAXStatus Event - Raised periodically during a fax transmission.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FAXStatus }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Operation -  * gateway * receive * send
 * @property {string} Status - A text message describing the current status of the fax
 * @property {string} LocalStationID - The value of the LOCALSTATIONID channel variable
 * @property {string} FileName - The files being affected by the fax operation
 */
export interface IAstEventFAXStatus extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Operation: string;
    Status: string;
    LocalStationID: string;
    FileName: string;
}
/**
 * ConfbridgeMute Event - Raised when a Confbridge participant mutes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeMute }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Admin -  * - * Identifies * this * user * as * an * admin * user. * Yes * No
 */
export interface IAstEventConfbridgeMute extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Admin: string;
}
/**
 * FullyBooted Event - Raised when all Asterisk initialization procedures have finished.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FullyBooted }
 *
 * @property {string} Status - Informational message
 */
export interface IAstEventFullyBooted extends IAstEvent {
    Status: string;
}
/**
 * UnexpectedAddress Event - Raised when a request has a different source address then what is expected for a session already in progress with a service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_UnexpectedAddress }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} ExpectedAddress - The address that the request was expected to use.
 * @property {string} [module] - The address that the request was expected to use.
 * @property {string} [sessionTV] - The address that the request was expected to use.
 */
export interface IAstEventUnexpectedAddress extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    ExpectedAddress: string;
    module?: string;
    sessionTV?: string;
}
/**
 * ConfbridgeEnd Event - Raised when a conference ends.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeEnd }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventConfbridgeEnd extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * InvalidTransport Event - Raised when a request attempts to use a transport not allowed by the Asterisk service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_InvalidTransport }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} AttemptedTransport - The transport type that the request attempted to use.
 * @property {string} [module] - The transport type that the request attempted to use.
 * @property {string} [sessionTV] - The transport type that the request attempted to use.
 */
export interface IAstEventInvalidTransport extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    AttemptedTransport: string;
    module?: string;
    sessionTV?: string;
}
/**
 * HangupHandlerPop Event - Raised when a hangup handler is removed from the handler stack by the CHANNEL() function.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_HangupHandlerPop }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Handler - Hangup handler parameter string passed to the Gosub application.
 */
export interface IAstEventHangupHandlerPop extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Handler: string;
}
/**
 * ChanSpyStop Event - Raised when a channel has stopped spying.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChanSpyStop }
 *
 * @property {string} SpyerChannel
 * @property {string} SpyerChannelState - A numeric code for the channel's current state, related to SpyerChannelStateDesc
 * @property {string} SpyerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SpyerCallerIDNum
 * @property {string} SpyerCallerIDName
 * @property {string} SpyerConnectedLineNum
 * @property {string} SpyerConnectedLineName
 * @property {string} SpyerAccountCode
 * @property {string} SpyerContext
 * @property {string} SpyerExten
 * @property {string} SpyerPriority
 * @property {string} SpyerUniqueid
 * @property {string} SpyerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SpyeeChannel
 * @property {string} SpyeeChannelState - A numeric code for the channel's current state, related to SpyeeChannelStateDesc
 * @property {string} SpyeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SpyeeCallerIDNum
 * @property {string} SpyeeCallerIDName
 * @property {string} SpyeeConnectedLineNum
 * @property {string} SpyeeConnectedLineName
 * @property {string} SpyeeAccountCode
 * @property {string} SpyeeContext
 * @property {string} SpyeeExten
 * @property {string} SpyeePriority
 * @property {string} SpyeeUniqueid
 * @property {string} SpyeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventChanSpyStop extends IAstEvent {
    SpyerChannel: string;
    SpyerChannelState: string;
    SpyerChannelStateDesc: string;
    SpyerCallerIDNum: string;
    SpyerCallerIDName: string;
    SpyerConnectedLineNum: string;
    SpyerConnectedLineName: string;
    SpyerAccountCode: string;
    SpyerContext: string;
    SpyerExten: string;
    SpyerPriority: string;
    SpyerUniqueid: string;
    SpyerLinkedid: string;
    SpyeeChannel: string;
    SpyeeChannelState: string;
    SpyeeChannelStateDesc: string;
    SpyeeCallerIDNum: string;
    SpyeeCallerIDName: string;
    SpyeeConnectedLineNum: string;
    SpyeeConnectedLineName: string;
    SpyeeAccountCode: string;
    SpyeeContext: string;
    SpyeeExten: string;
    SpyeePriority: string;
    SpyeeUniqueid: string;
    SpyeeLinkedid: string;
}
/**
 * DAHDIChannel Event - Raised when a DAHDI channel is created or an underlying technology is associated with a DAHDI channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DAHDIChannel }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DAHDISpan - The DAHDI span associated with this channel.
 * @property {string} DAHDIChannel - The DAHDI channel associated with this channel.
 */
export interface IAstEventDAHDIChannel extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DAHDISpan: string;
    DAHDIChannel: string;
}
/**
 * HangupHandlerRun Event - Raised when a hangup handler is about to be called.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_HangupHandlerRun }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Handler - Hangup handler parameter string passed to the Gosub application.
 */
export interface IAstEventHangupHandlerRun extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Handler: string;
}
/**
 * ReceiveFAX Event - Raised when a receive fax operation has completed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ReceiveFAX }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalStationID - The value of the LOCALSTATIONID channel variable
 * @property {string} RemoteStationID - The value of the REMOTESTATIONID channel variable
 * @property {string} PagesTransferred - The number of pages that have been transferred
 * @property {string} Resolution - The negotiated resolution
 * @property {string} TransferRate - The negotiated transfer rate
 * @property {string} FileName - The files being affected by the fax operation
 */
export interface IAstEventReceiveFAX extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    LocalStationID: string;
    RemoteStationID: string;
    PagesTransferred: string;
    Resolution: string;
    TransferRate: string;
    FileName: string;
}
/**
 * MeetmeTalking Event - Raised when a MeetMe user begins or ends talking.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeTalking }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 * @property {string} Usernum - The identifier of the MeetMe user who joined.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Duration - The length of time in seconds that the Meetme user has been in the conference at the time of this event.
 * @property {string} Status -  * on * off
 */
export interface IAstEventMeetmeTalking extends IAstEvent {
    Meetme: string;
    Usernum: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Duration: string;
    Status: string;
}
/**
 * ChanSpyStart Event - Raised when one channel begins spying on another channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChanSpyStart }
 *
 * @property {string} SpyerChannel
 * @property {string} SpyerChannelState - A numeric code for the channel's current state, related to SpyerChannelStateDesc
 * @property {string} SpyerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SpyerCallerIDNum
 * @property {string} SpyerCallerIDName
 * @property {string} SpyerConnectedLineNum
 * @property {string} SpyerConnectedLineName
 * @property {string} SpyerAccountCode
 * @property {string} SpyerContext
 * @property {string} SpyerExten
 * @property {string} SpyerPriority
 * @property {string} SpyerUniqueid
 * @property {string} SpyerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SpyeeChannel
 * @property {string} SpyeeChannelState - A numeric code for the channel's current state, related to SpyeeChannelStateDesc
 * @property {string} SpyeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SpyeeCallerIDNum
 * @property {string} SpyeeCallerIDName
 * @property {string} SpyeeConnectedLineNum
 * @property {string} SpyeeConnectedLineName
 * @property {string} SpyeeAccountCode
 * @property {string} SpyeeContext
 * @property {string} SpyeeExten
 * @property {string} SpyeePriority
 * @property {string} SpyeeUniqueid
 * @property {string} SpyeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventChanSpyStart extends IAstEvent {
    SpyerChannel: string;
    SpyerChannelState: string;
    SpyerChannelStateDesc: string;
    SpyerCallerIDNum: string;
    SpyerCallerIDName: string;
    SpyerConnectedLineNum: string;
    SpyerConnectedLineName: string;
    SpyerAccountCode: string;
    SpyerContext: string;
    SpyerExten: string;
    SpyerPriority: string;
    SpyerUniqueid: string;
    SpyerLinkedid: string;
    SpyeeChannel: string;
    SpyeeChannelState: string;
    SpyeeChannelStateDesc: string;
    SpyeeCallerIDNum: string;
    SpyeeCallerIDName: string;
    SpyeeConnectedLineNum: string;
    SpyeeConnectedLineName: string;
    SpyeeAccountCode: string;
    SpyeeContext: string;
    SpyeeExten: string;
    SpyeePriority: string;
    SpyeeUniqueid: string;
    SpyeeLinkedid: string;
}
/**
 * AOC_D Event - Raised when an Advice of Charge message is sent during a call.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AOC-D }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Charge
 * @property {string} Type -  * NotAvailable * Free * Currency * Units
 * @property {string} BillingID -  * Normal * Reverse * CreditCard * CallForwardingUnconditional * CallForwardingBusy * CallForwardingNoReply * CallDeflection * CallTransfer * NotAvailable
 * @property {string} TotalType -  * SubTotal * Total
 * @property {string} Currency
 * @property {string} Name
 * @property {string} Cost
 * @property {string} Multiplier -  * 1/1000 * 1/100 * 1/10 * 1 * 10 * 100 * 1000
 * @property {string} Units
 * @property {string} NumberOf
 * @property {string} TypeOf
 */
export interface IAstEventAOC_D extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Charge: string;
    Type: string;
    BillingID: string;
    TotalType: string;
    Currency: string;
    Name: string;
    Cost: string;
    Multiplier: string;
    Units: string;
    NumberOf: string;
    TypeOf: string;
}
/**
 * BridgeDestroy Event - Raised when a bridge is destroyed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeDestroy }
 *
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventBridgeDestroy extends IAstEvent {
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * BridgeEnter Event - Raised when a channel enters a bridge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeEnter }
 *
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SwapUniqueid - The uniqueid of the channel being swapped out of the bridge
 */
export interface IAstEventBridgeEnter extends IAstEvent {
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    SwapUniqueid: string;
}
/**
 * ParkedCallGiveUp Event - Raised when a channel leaves a parking lot because it hung up without being answered.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ParkedCallGiveUp }
 *
 * @property {string} ParkeeChannel
 * @property {string} ParkeeChannelState - A numeric code for the channel's current state, related to ParkeeChannelStateDesc
 * @property {string} ParkeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkeeCallerIDNum
 * @property {string} ParkeeCallerIDName
 * @property {string} ParkeeConnectedLineNum
 * @property {string} ParkeeConnectedLineName
 * @property {string} ParkeeAccountCode
 * @property {string} ParkeeContext
 * @property {string} ParkeeExten
 * @property {string} ParkeePriority
 * @property {string} ParkeeUniqueid
 * @property {string} ParkeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerChannel
 * @property {string} ParkerChannelState - A numeric code for the channel's current state, related to ParkerChannelStateDesc
 * @property {string} ParkerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkerCallerIDNum
 * @property {string} ParkerCallerIDName
 * @property {string} ParkerConnectedLineNum
 * @property {string} ParkerConnectedLineName
 * @property {string} ParkerAccountCode
 * @property {string} ParkerContext
 * @property {string} ParkerExten
 * @property {string} ParkerPriority
 * @property {string} ParkerUniqueid
 * @property {string} ParkerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerDialString - Dial String that can be used to call back the parker on ParkingTimeout.
 * @property {string} Parkinglot - Name of the parking lot that the parkee is parked in
 * @property {string} ParkingSpace - Parking Space that the parkee is parked in
 * @property {string} ParkingTimeout - Time remaining until the parkee is forcefully removed from parking in seconds
 * @property {string} ParkingDuration - Time the parkee has been in the parking bridge (in seconds)
 */
export interface IAstEventParkedCallGiveUp extends IAstEvent {
    ParkeeChannel: string;
    ParkeeChannelState: string;
    ParkeeChannelStateDesc: string;
    ParkeeCallerIDNum: string;
    ParkeeCallerIDName: string;
    ParkeeConnectedLineNum: string;
    ParkeeConnectedLineName: string;
    ParkeeAccountCode: string;
    ParkeeContext: string;
    ParkeeExten: string;
    ParkeePriority: string;
    ParkeeUniqueid: string;
    ParkeeLinkedid: string;
    ParkerChannel: string;
    ParkerChannelState: string;
    ParkerChannelStateDesc: string;
    ParkerCallerIDNum: string;
    ParkerCallerIDName: string;
    ParkerConnectedLineNum: string;
    ParkerConnectedLineName: string;
    ParkerAccountCode: string;
    ParkerContext: string;
    ParkerExten: string;
    ParkerPriority: string;
    ParkerUniqueid: string;
    ParkerLinkedid: string;
    ParkerDialString: string;
    Parkinglot: string;
    ParkingSpace: string;
    ParkingTimeout: string;
    ParkingDuration: string;
}
/**
 * DNDState Event - Raised when the Do Not Disturb state is changed on a DAHDI channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DNDState }
 *
 * @property {string} DAHDIChannel -  * - * The * DAHDI * channel * on * which * DND * status * changed. * Note * Icon * This * is * not * an * Asterisk * channel * identifier.
 * @property {string} Status -  * enabled * disabled
 */
export interface IAstEventDNDState extends IAstEvent {
    DAHDIChannel: string;
    Status: string;
}
/**
 * QueueMemberPause Event - Raised when a member is paused/unpaused in the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberPause }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  
 * 0  -  AST_DEVICE_UNKNOWN  
 * 1  -  AST_DEVICE_NOT_INUSE 
 * 2  -  AST_DEVICE_INUSE  
 * 3  -  AST_DEVICE_BUSY  
 * 4  -  AST_DEVICE_INVALID  
 * 5  -  AST_DEVICE_UNAVAILABLE  
 * 6  -  AST_DEVICE_RINGING  
 * 7  -  AST_DEVICE_RINGINUSE  
 * 8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 * @property {string} Reason - The reason a member was paused.
 */
export interface IAstEventQueueMemberPause extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
    Reason: string;
}
/**
 * InvalidAccountID Event - Raised when a request fails an authentication check due to an invalid account ID.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_InvalidAccountID }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventInvalidAccountID extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    sessionTV?: string;
}
/**
 * NewCallerid Event - Raised when a channel receives new Caller ID information.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_NewCallerid }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} CID-CallingPres - A description of the Caller ID presentation.
 */
export interface IAstEventNewCallerid extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    "CID-CallingPres": string;
}
/**
 * MemoryLimit Event - Raised when a request fails due to an internal memory allocation failure.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MemoryLimit }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventMemoryLimit extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    sessionTV?: string;
}
/**
 * Agents Event - Response event in a series to the Agents AMI action containing information about a defined agent.
 *
 * @description The channel snapshot is present if the Status value is AGENT_IDLE or AGENT_ONCALL.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Agents }
 *
 * @property {string} Agent - Agent ID of the agent.
 * @property {string} Name - User friendly name of the agent.
 * @property {string} Status -  * - * Current * status * of * the * agent. * The * valid * values * are: * AGENT_LOGGEDOFF * AGENT_IDLE * AGENT_ONCALL
 * @property {string} TalkingToChan -  * - * BRIDGEPEER * value * on * agent * channel. * Present * if * Status * value * is * AGENT_ONCALL.
 * @property {string} CallStarted -  * - * Epoche * time * when * the * agent * started * talking * with * the * caller. * Present * if * Status * value * is * AGENT_ONCALL.
 * @property {string} LoggedInTime -  * - * Epoche * time * when * the * agent * logged * in. * Present * if * Status * value * is * AGENT_IDLE * or * AGENT_ONCALL.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventAgents extends IAstEvent {
    Agent: string;
    Name: string;
    Status: string;
    TalkingToChan: string;
    CallStarted: string;
    LoggedInTime: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    ActionID: string;
}
/**
 * MeetmeLeave Event - Raised when a user leaves a MeetMe conference.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeLeave }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 * @property {string} Usernum - The identifier of the MeetMe user who joined.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Duration - The length of time in seconds that the Meetme user was in the conference.
 */
export interface IAstEventMeetmeLeave extends IAstEvent {
    Meetme: string;
    Usernum: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Duration: string;
}
/**
 * BridgeLeave Event - Raised when a channel leaves a bridge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeLeave }
 *
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventBridgeLeave extends IAstEvent {
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}

export interface IAstEventBridgeListItem extends IAstEvent {

    BridgeUniqueid: string | uuid;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string | number;
}

/**
 * EndpointDetailComplete Event - Provide final information about endpoint details.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_EndpointDetailComplete }
 *
 * @property {string} ListItems
 */
export interface IAstEventEndpointDetailComplete extends IAstEvent {
    ListItems: string;
}
/**
 * DTMFBegin Event - Raised when a DTMF digit has started on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DTMFBegin }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Digit - DTMF digit received or transmitted (0-9, A-E, # or *
 * @property {string} Direction -  * Received * Sent
 */
export interface IAstEventDTMFBegin extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Digit: string;
    Direction: string;
}
/**
 * Newchannel Event - Raised when a new channel is created.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Newchannel }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventNewchannel extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * AgentsComplete Event - Final response event in a series of events to the Agents AMI action.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentsComplete }
 *
 */
export interface IAstEventAgentsComplete extends IAstEvent {
    ActionID: string;
}
/**
 * MeetmeMute Event - Raised when a MeetMe user is muted or unmuted.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeMute }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 * @property {string} Usernum - The identifier of the MeetMe user who joined.
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Duration - The length of time in seconds that the Meetme user has been in the conference at the time of this event.
 * @property {string} Status -  * on * off
 */
export interface IAstEventMeetmeMute extends IAstEvent {
    Meetme: string;
    Usernum: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Duration: string;
    Status: string;
}
/**
 * ConfbridgeStopRecord Event - Raised when a conference that was recording stops recording.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeStopRecord }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventConfbridgeStopRecord extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * EndpointDetail Event - Provide details about an endpoint section.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_EndpointDetail }
 *
 * @property {string} ObjectType - The object's type. This will always be "endpoint".
 * @property {string} ObjectName - The name of this object.
 * @property {string} Context - Dialplan context for inbound sessions
 * @property {string} Disallow - Media Codec(s) to disallow
 * @property {string} Allow - Media Codec(s) to allow
 * @property {string} DtmfMode - DTMF mode
 * @property {string} RtpIpv6 - Allow use of IPv6 for RTP traffic
 * @property {string} RtpSymmetric - Enforce that RTP must be symmetric
 * @property {string} IceSupport - Enable the ICE mechanism to help traverse NAT
 * @property {string} UsePtime - Use Endpoint's requested packetisation interval
 * @property {string} ForceRport - Force use of return port
 * @property {string} RewriteContact - Allow Contact header to be rewritten with the source IP address-port
 * @property {string} Transport - Desired transport configuration
 * @property {string} OutboundProxy - Proxy through which to send requests, a full SIP URI must be provided
 * @property {string} MohSuggest - Default Music On Hold class
 * @property {string} 100rel - Allow support for RFC3262 provisional ACK tags
 * @property {string} Timers - Session timers for SIP packets
 * @property {string} TimersMinSe - Minimum session timers expiration period
 * @property {string} TimersSessExpires - Maximum session timer expiration period
 * @property {string} Auth - Authentication Object(s) associated with the endpoint
 * @property {string} OutboundAuth - Authentication object used for outbound requests
 * @property {string} Aors - AoR(s) to be used with the endpoint
 * @property {string} MediaAddress - IP address used in SDP for media handling
 * @property {string} IdentifyBy - Way(s) for Endpoint to be identified
 * @property {string} DirectMedia - Determines whether media may flow directly between endpoints.
 * @property {string} DirectMediaMethod - Direct Media method type
 * @property {string} ConnectedLineMethod - Connected line method type
 * @property {string} DirectMediaGlareMitigation - Mitigation of direct media (re)INVITE glare
 * @property {string} DisableDirectMediaOnNat - Disable direct media session refreshes when NAT obstructs the media session
 * @property {string} Callerid - CallerID information for the endpoint
 * @property {string} CalleridPrivacy - Default privacy level
 * @property {string} CalleridTag - Internal id_tag for the endpoint
 * @property {string} TrustIdInbound - Accept identification information received from this endpoint
 * @property {string} TrustIdOutbound - Send private identification details to the endpoint.
 * @property {string} SendPai - Send the P-Asserted-Identity header
 * @property {string} SendRpid - Send the Remote-Party-ID header
 * @property {string} SendDiversion - Send the Diversion header, conveying the diversion information to the called user agent
 * @property {string} Mailboxes - NOTIFY the endpoint when state changes for any of the specified mailboxes
 * @property {string} AggregateMwi - Condense MWI notifications into a single NOTIFY.
 * @property {string} MediaEncryption - Determines whether res_pjsip will use and enforce usage of media encryption for this endpoint.
 * @property {string} MediaEncryptionOptimistic - Determines whether encryption should be used if possible but does not terminate the session if not achieved.
 * @property {string} UseAvpf - Determines whether res_pjsip will use and enforce usage of AVPF for this endpoint.
 * @property {string} ForceAvp - Determines whether res_pjsip will use and enforce usage of AVP, regardless of the RTP profile in use for this endpoint.
 * @property {string} MediaUseReceivedTransport - Determines whether res_pjsip will use the media transport received in the offer SDP in the corresponding answer SDP.
 * @property {string} OneTouchRecording - Determines whether one-touch recording is allowed for this endpoint.
 * @property {string} InbandProgress - Determines whether chan_pjsip will indicate ringing using inband progress.
 * @property {string} CallGroup - The numeric pickup groups for a channel.
 * @property {string} PickupGroup - The numeric pickup groups that a channel can pickup.
 * @property {string} NamedCallGroup - The named pickup groups for a channel.
 * @property {string} NamedPickupGroup - The named pickup groups that a channel can pickup.
 * @property {string} DeviceStateBusyAt - The number of in-use channels which will cause busy to be returned as device state
 * @property {string} T38Udptl - Whether T.38 UDPTL support is enabled or not
 * @property {string} T38UdptlEc - T.38 UDPTL error correction method
 * @property {string} T38UdptlMaxdatagram - T.38 UDPTL maximum datagram size
 * @property {string} FaxDetect - Whether CNG tone detection is enabled
 * @property {string} T38UdptlNat - Whether NAT support is enabled on UDPTL sessions
 * @property {string} T38UdptlIpv6 - Whether IPv6 is used for UDPTL Sessions
 * @property {string} ToneZone - Set which country's indications to use for channels created for this endpoint.
 * @property {string} Language - Set the default language to use for channels created for this endpoint.
 * @property {string} RecordOnFeature - The feature to enact when one-touch recording is turned on.
 * @property {string} RecordOffFeature - The feature to enact when one-touch recording is turned off.
 * @property {string} AllowTransfer - Determines whether SIP REFER transfers are allowed for this endpoint
 * @property {string} UserEqPhone - Determines whether a user=phone parameter is placed into the request URI if the user is determined to be a phone number
 * @property {string} SdpOwner - String placed as the username portion of an SDP origin (o=) line.
 * @property {string} SdpSession - String used for the SDP session (s=) line.
 * @property {string} TosAudio - DSCP TOS bits for audio streams
 * @property {string} TosVideo - DSCP TOS bits for video streams
 * @property {string} CosAudio - Priority for audio streams
 * @property {string} CosVideo - Priority for video streams
 * @property {string} AllowSubscribe - Determines if endpoint is allowed to initiate subscriptions with Asterisk.
 * @property {string} SubMinExpiry - The minimum allowed expiry time for subscriptions initiated by the endpoint.
 * @property {string} FromUser - Username to use in From header for requests to this endpoint.
 * @property {string} FromDomain - Domain to user in From header for requests to this endpoint.
 * @property {string} MwiFromUser - Username to use in From header for unsolicited MWI NOTIFYs to this endpoint.
 * @property {string} RtpEngine - Name of the RTP engine to use for channels created for this endpoint
 * @property {string} DtlsVerify - Verify that the provided peer certificate is valid
 * @property {string} DtlsRekey - Interval at which to renegotiate the TLS session and rekey the SRTP session
 * @property {string} DtlsCertFile - Path to certificate file to present to peer
 * @property {string} DtlsPrivateKey - Path to private key for certificate file
 * @property {string} DtlsCipher - Cipher to use for DTLS negotiation
 * @property {string} DtlsCaFile - Path to certificate authority certificate
 * @property {string} DtlsCaPath - Path to a directory containing certificate authority certificates
 * @property {string} DtlsSetup - Whether we are willing to accept connections, connect to the other party, or both.
 * @property {string} SrtpTag32 - Determines whether 32 byte tags should be used instead of 80 byte tags.
 * @property {string} RedirectMethod - How redirects received from an endpoint are handled
 * @property {string} SetVar - Variable set on a channel involving the endpoint.
 * @property {string} MessageContext - Context to route incoming MESSAGE requests to.
 * @property {string} Accountcode - An accountcode to set automatically on any channels created for this endpoint.
 * @property {string} DeviceState - The aggregate device state for this endpoint.
 * @property {string} ActiveChannels - The number of active channels associated with this endpoint.
 * @property {string} SubscribeContext - Context for incoming MESSAGE requests.
 */
export interface IAstEventEndpointDetail extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    Context: string;
    Disallow: string;
    Allow: string;
    DtmfMode: string;
    RtpIpv6: string;
    RtpSymmetric: string;
    IceSupport: string;
    UsePtime: string;
    ForceRport: string;
    RewriteContact: string;
    Transport: string;
    OutboundProxy: string;
    MohSuggest: string;
    "100rel": string;
    Timers: string;
    TimersMinSe: string;
    TimersSessExpires: string;
    Auth: string;
    OutboundAuth: string;
    Aors: string;
    MediaAddress: string;
    IdentifyBy: string;
    DirectMedia: string;
    DirectMediaMethod: string;
    ConnectedLineMethod: string;
    DirectMediaGlareMitigation: string;
    DisableDirectMediaOnNat: string;
    Callerid: string;
    CalleridPrivacy: string;
    CalleridTag: string;
    TrustIdInbound: string;
    TrustIdOutbound: string;
    SendPai: string;
    SendRpid: string;
    SendDiversion: string;
    Mailboxes: string;
    AggregateMwi: string;
    MediaEncryption: string;
    MediaEncryptionOptimistic: string;
    UseAvpf: string;
    ForceAvp: string;
    MediaUseReceivedTransport: string;
    OneTouchRecording: string;
    InbandProgress: string;
    CallGroup: string;
    PickupGroup: string;
    NamedCallGroup: string;
    NamedPickupGroup: string;
    DeviceStateBusyAt: string;
    T38Udptl: string;
    T38UdptlEc: string;
    T38UdptlMaxdatagram: string;
    FaxDetect: string;
    T38UdptlNat: string;
    T38UdptlIpv6: string;
    ToneZone: string;
    Language: string;
    RecordOnFeature: string;
    RecordOffFeature: string;
    AllowTransfer: string;
    UserEqPhone: string;
    SdpOwner: string;
    SdpSession: string;
    TosAudio: string;
    TosVideo: string;
    CosAudio: string;
    CosVideo: string;
    AllowSubscribe: string;
    SubMinExpiry: string;
    FromUser: string;
    FromDomain: string;
    MwiFromUser: string;
    RtpEngine: string;
    DtlsVerify: string;
    DtlsRekey: string;
    DtlsCertFile: string;
    DtlsPrivateKey: string;
    DtlsCipher: string;
    DtlsCaFile: string;
    DtlsCaPath: string;
    DtlsSetup: string;
    SrtpTag32: string;
    RedirectMethod: string;
    SetVar: string;
    MessageContext: string;
    Accountcode: string;
    DeviceState: string;
    ActiveChannels: string;
    SubscribeContext: string;
}
/**
 * ConfbridgeLeave Event - Raised when a channel leaves a Confbridge conference.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeLeave }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Admin -  * - * Identifies * this * user * as * an * admin * user. * Yes * No
 */
export interface IAstEventConfbridgeLeave extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Admin: string;
}
/**
 * CEL Event - Raised when a Channel Event Log is generated for a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_CEL }
 *
 * @property {string} AccountCode - The channel's account code.
 * @property {string} CallerIDnum - The Caller ID number.
 * @property {string} CallerIDname - The Caller ID name.
 * @property {string} CallerIDani - The Caller ID Automatic Number Identification.
 * @property {string} CallerIDrdnis - The Caller ID Redirected Dialed Number Identification Service.
 * @property {string} CallerIDdnid - The Caller ID Dialed Number Identifier.
 * @property {string} Exten - The dialplan extension the channel is currently executing in.
 * @property {string} Context - The dialplan context the channel is currently executing in.
 * @property {string} Application - The dialplan application the channel is currently executing.
 * @property {string} AppData - The arguments passed to the dialplan Application.
 * @property {string} AMAFlags -   -  A  flag  that  informs  a  billing  system  how  to  treat  the  CEL.  
 * OMIT  -  This  event  should  be  ignored.  
 * BILLING  -  This  event  contains  valid  billing  data.  
 * DOCUMENTATION  -  This  event  is  for  documentation  purposes.
 * @property {string} UniqueID - The unique ID of the channel.
 * @property {string} LinkedID - The linked ID of the channel, which ties this event to other related channel's events.
 * @property {string} UserField - A user defined field set on a channel, containing arbitrary application specific data.
 * @property {string} Peer - If this channel is in a bridge, the channel that it is in a bridge with.
 * @property {string} PeerAccount - If this channel is in a bridge, the accountcode of the channel it is in a bridge with.
 * @property {string} Extra - Some events will have event specific data that accompanies the CEL record. This extra data is JSON encoded, and is dependent on the event in question.
 */
export interface IAstEventCEL extends IAstEvent {
    AccountCode: string;
    CallerIDnum: string;
    CallerIDname: string;
    CallerIDani: string;
    CallerIDrdnis: string;
    CallerIDdnid: string;
    Exten: string;
    Context: string;
    Application: string;
    AppData: string;
    AMAFlags: string;
    UniqueID: string;
    LinkedID: string;
    UserField: string;
    Peer: string;
    PeerAccount: string;
    Extra: string;
}
/**
 * SessionTimeout Event - Raised when a SIP session times out.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SessionTimeout }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Source -  * - * The * source * of * the * session * timeout. * RTPTimeout * SIPSessionTimer
 */
export interface IAstEventSessionTimeout extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Source: string;
}
/**
 * MiniVoiceMail Event - Raised when a notification is sent out by a MiniVoiceMail application
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MiniVoiceMail }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Action - What action was taken. Currently, this will always be SentNotification
 * @property {string} Mailbox - The mailbox that the notification was about, specified as mailbox@context
 * @property {string} Counter - A message counter derived from the MVM_COUNTER channel variable.
 */
export interface IAstEventMiniVoiceMail extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Action: string;
    Mailbox: string;
    Counter: string;
}
/**
 * AttendedTransfer Event - Raised when an attended transfer is complete.
 *
 * @description The headers in this event attempt to describe all the major details of the attended transfer. 
 * The two transferer channels and the two bridges are determined based on their chronological establishment. 
 * So consider that Alice calls Bob, and then Alice transfers the call to Voicemail. 
 * The transferer and bridge headers would be arranged as follows:
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AttendedTransfer }
 *
 * @property {string} Result -   -  Indicates  if  the  transfer  was  successful  or  if  it  failed.  
 * Fail  -  An  internal  error  occurred.  
 * Invalid  -  Invalid  configuration  for  transfer  (e.g.  Not  bridged)  
 * Not  Permitted  -  Bridge  does  not  permit  transfers  
 * Success  -  Transfer  completed  successfully  
 * Note -  A  result  of  Success  does  not  necessarily  mean  that  a  target  was  succesfully  contacted.  
 * It  means  that  a  party  was  succesfully  placed  into  the  dialplan  at  the  expected  location.
 * @property {string} OrigTransfererChannel
 * @property {string} OrigTransfererChannelState - A numeric code for the channel's current state, related to OrigTransfererChannelStateDesc
 * @property {string} OrigTransfererChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} OrigTransfererCallerIDNum
 * @property {string} OrigTransfererCallerIDName
 * @property {string} OrigTransfererConnectedLineNum
 * @property {string} OrigTransfererConnectedLineName
 * @property {string} OrigTransfererAccountCode
 * @property {string} OrigTransfererContext
 * @property {string} OrigTransfererExten
 * @property {string} OrigTransfererPriority
 * @property {string} OrigTransfererUniqueid
 * @property {string} OrigTransfererLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} OrigBridgeUniqueid
 * @property {string} OrigBridgeType - The type of bridge
 * @property {string} OrigBridgeTechnology - Technology in use by the bridge
 * @property {string} OrigBridgeCreator - Entity that created the bridge if applicable
 * @property {string} OrigBridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} OrigBridgeNumChannels - Number of channels in the bridge
 * @property {string} SecondTransfererChannel
 * @property {string} SecondTransfererChannelState - A numeric code for the channel's current state, related to SecondTransfererChannelStateDesc
 * @property {string} SecondTransfererChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SecondTransfererCallerIDNum
 * @property {string} SecondTransfererCallerIDName
 * @property {string} SecondTransfererConnectedLineNum
 * @property {string} SecondTransfererConnectedLineName
 * @property {string} SecondTransfererAccountCode
 * @property {string} SecondTransfererContext
 * @property {string} SecondTransfererExten
 * @property {string} SecondTransfererPriority
 * @property {string} SecondTransfererUniqueid
 * @property {string} SecondTransfererLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SecondBridgeUniqueid
 * @property {string} SecondBridgeType - The type of bridge
 * @property {string} SecondBridgeTechnology - Technology in use by the bridge
 * @property {string} SecondBridgeCreator - Entity that created the bridge if applicable
 * @property {string} SecondBridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} SecondBridgeNumChannels - Number of channels in the bridge
 * @property {string} DestType -   -  Indicates  the  method  by  which  the  attended  transfer  completed.  
 * Bridge  -  The  transfer  was  accomplished  by  merging  two  bridges  into  one.  
 * App  -  The  transfer  was  accomplished  by  having  a  channel  or  bridge  run  a  dialplan  application.  
 * Link  -  The  transfer  was  accomplished  by  linking  two  bridges  together  using  a  local  channel  pair.  
 * Threeway  -  The  transfer  was  accomplished  by  placing  all  parties  into  a  threeway  call.  Fail  -  The  transfer  failed.
 * @property {string} DestBridgeUniqueid -   -  Indicates  the  surviving  bridge  when  bridges  were  merged  to  complete  the  transfer  
 * Note  Icon  This  header  is  only  present  when  DestType  is  Bridge  or  Threeway
 * @property {string} DestApp -   -  Indicates  the  application  that  is  running  when  the  transfer  completes  Note  Icon  This  header  is  only  present  when  DestType  is  App
 * @property {string} LocalOneChannel
 * @property {string} LocalOneChannelState - A numeric code for the channel's current state, related to LocalOneChannelStateDesc
 * @property {string} LocalOneChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalOneCallerIDNum
 * @property {string} LocalOneCallerIDName
 * @property {string} LocalOneConnectedLineNum
 * @property {string} LocalOneConnectedLineName
 * @property {string} LocalOneAccountCode
 * @property {string} LocalOneContext
 * @property {string} LocalOneExten
 * @property {string} LocalOnePriority
 * @property {string} LocalOneUniqueid
 * @property {string} LocalOneLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalTwoChannel
 * @property {string} LocalTwoChannelState - A numeric code for the channel's current state, related to LocalTwoChannelStateDesc
 * @property {string} LocalTwoChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalTwoCallerIDNum
 * @property {string} LocalTwoCallerIDName
 * @property {string} LocalTwoConnectedLineNum
 * @property {string} LocalTwoConnectedLineName
 * @property {string} LocalTwoAccountCode
 * @property {string} LocalTwoContext
 * @property {string} LocalTwoExten
 * @property {string} LocalTwoPriority
 * @property {string} LocalTwoUniqueid
 * @property {string} LocalTwoLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestTransfererChannel -   -  The  name  of  the  surviving  transferer  channel  when  a  transfer  results  in  a  threeway  call  
 * Note  Icon  This  header  is  only  present  when  DestType  is  Threeway
 * @property {string} TransfereeChannel
 * @property {string} TransfereeChannelState - A numeric code for the channel's current state, related to TransfereeChannelStateDesc
 * @property {string} TransfereeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} TransfereeCallerIDNum
 * @property {string} TransfereeCallerIDName
 * @property {string} TransfereeConnectedLineNum
 * @property {string} TransfereeConnectedLineName
 * @property {string} TransfereeAccountCode
 * @property {string} TransfereeContext
 * @property {string} TransfereeExten
 * @property {string} TransfereePriority
 * @property {string} TransfereeUniqueid
 * @property {string} TransfereeLinkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventAttendedTransfer extends IAstEvent {
    Result: string;
    OrigTransfererChannel: string;
    OrigTransfererChannelState: string;
    OrigTransfererChannelStateDesc: string;
    OrigTransfererCallerIDNum: string;
    OrigTransfererCallerIDName: string;
    OrigTransfererConnectedLineNum: string;
    OrigTransfererConnectedLineName: string;
    OrigTransfererAccountCode: string;
    OrigTransfererContext: string;
    OrigTransfererExten: string;
    OrigTransfererPriority: string;
    OrigTransfererUniqueid: string;
    OrigTransfererLinkedid: string;
    OrigBridgeUniqueid: string;
    OrigBridgeType: string;
    OrigBridgeTechnology: string;
    OrigBridgeCreator: string;
    OrigBridgeName: string;
    OrigBridgeNumChannels: string;
    SecondTransfererChannel: string;
    SecondTransfererChannelState: string;
    SecondTransfererChannelStateDesc: string;
    SecondTransfererCallerIDNum: string;
    SecondTransfererCallerIDName: string;
    SecondTransfererConnectedLineNum: string;
    SecondTransfererConnectedLineName: string;
    SecondTransfererAccountCode: string;
    SecondTransfererContext: string;
    SecondTransfererExten: string;
    SecondTransfererPriority: string;
    SecondTransfererUniqueid: string;
    SecondTransfererLinkedid: string;
    SecondBridgeUniqueid: string;
    SecondBridgeType: string;
    SecondBridgeTechnology: string;
    SecondBridgeCreator: string;
    SecondBridgeName: string;
    SecondBridgeNumChannels: string;
    DestType: string;
    DestBridgeUniqueid: string;
    DestApp: string;
    LocalOneChannel: string;
    LocalOneChannelState: string;
    LocalOneChannelStateDesc: string;
    LocalOneCallerIDNum: string;
    LocalOneCallerIDName: string;
    LocalOneConnectedLineNum: string;
    LocalOneConnectedLineName: string;
    LocalOneAccountCode: string;
    LocalOneContext: string;
    LocalOneExten: string;
    LocalOnePriority: string;
    LocalOneUniqueid: string;
    LocalOneLinkedid: string;
    LocalTwoChannel: string;
    LocalTwoChannelState: string;
    LocalTwoChannelStateDesc: string;
    LocalTwoCallerIDNum: string;
    LocalTwoCallerIDName: string;
    LocalTwoConnectedLineNum: string;
    LocalTwoConnectedLineName: string;
    LocalTwoAccountCode: string;
    LocalTwoContext: string;
    LocalTwoExten: string;
    LocalTwoPriority: string;
    LocalTwoUniqueid: string;
    LocalTwoLinkedid: string;
    DestTransfererChannel: string;
    TransfereeChannel: string;
    TransfereeChannelState: string;
    TransfereeChannelStateDesc: string;
    TransfereeCallerIDNum: string;
    TransfereeCallerIDName: string;
    TransfereeConnectedLineNum: string;
    TransfereeConnectedLineName: string;
    TransfereeAccountCode: string;
    TransfereeContext: string;
    TransfereeExten: string;
    TransfereePriority: string;
    TransfereeUniqueid: string;
    TransfereeLinkedid: string;
}
/**
 * RequestNotAllowed Event - Raised when a request is not allowed by the service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_RequestNotAllowed }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} RequestType - The type of request attempted.
 * @property {string} [module] - The type of request attempted.
 * @property {string} [sessionTV] - The type of request attempted.
 * @property {string} [requestParams] - The type of request attempted.
 */
export interface IAstEventRequestNotAllowed extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    RequestType: string;
    module?: string;
    sessionTV?: string;
    requestParams?: string;
}
/**
 * AgentLogoff Event - Raised when an Agent has logged off.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentLogoff }
 *
 * @property {string} Agent - Agent ID of the agent.
 * @property {string} Logintime - The number of seconds the agent was logged in.
 */
export interface IAstEventAgentLogoff extends IAstEvent {
    Agent: string;
    Logintime: string;
}
/**
 * NewAccountCode Event - Raised when a Channel's AccountCode is changed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_NewAccountCode }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} OldAccountCode - The channel's previous account code
 */
export interface IAstEventNewAccountCode extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    OldAccountCode: string;
}
/**
 * QueueMemberAdded Event - Raised when a member is added to the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberAdded }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  
 * 0  -  AST_DEVICE_UNKNOWN  
 * 1  -  AST_DEVICE_NOT_INUSE  
 * 2  -  AST_DEVICE_INUSE  
 * 3  -  AST_DEVICE_BUSY  
 * 4  -  AST_DEVICE_INVALID  
 * 5  -  AST_DEVICE_UNAVAILABLE  
 * 6  -  AST_DEVICE_RINGING  
 * 7  -  AST_DEVICE_RINGINUSE  
 * 8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 */
export interface IAstEventQueueMemberAdded extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
}
/**
 * AgentDump Event - Raised when a queue member hangs up on a caller in the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentDump }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 */
export interface IAstEventAgentDump extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    Queue: string;
    MemberName: string;
    Interface: string;
}
/**
 * ExtensionStatus Event - Raised when a hint changes due to a device state change.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ExtensionStatus }
 *
 * @property {string} Exten - Name of the extension.
 * @property {string} Context - Context that owns the extension.
 * @property {string} Hint - Hint set for the extension
 * @property {string} Status -   -  Numerical  value  of  the  extension  status.  Extension  status  is  determined  by  the  combined  device  state  of  all  items  contained  in  the  hint. 
 * -2  -  The  extension  was  removed  from  the  dialplan.  
 * -1  -  The  extension's  hint  was  removed  from  the  dialplan.  
 *  0  -  Idle  -  Related  device(s)  are  in  an  idle  state.  
 *  1  -  InUse  -  Related  device(s)  are  in  active  calls  but  may  take  more  calls.  
 *  2  -  Busy  -  Related  device(s)  are  in  active  calls  and  may  not  take  any  more  calls.  
 *  4  -  Unavailable  -  Related  device(s)  are  not  reachable.  
 *  8  -  Ringing  -  Related  device(s)  are  currently  ringing.  
 *  9  -  InUse&Ringing  -  Related  device(s)  are  currently  ringing  and  in  active  calls.  
 *  16 -  Hold  -  Related  device(s)  are  currently  on  hold.  
 *  17 -  InUse&Hold  -  Related  device(s)  are  currently  on  hold  and  in  active  calls.
 * @property {string} StatusText -   -  Text  representation  of  Status.  
 * Idle 
 * InUse  
 * Busy  
 * Unavailable  
 * Ringing  
 * InUse&Ringing  
 * Hold  
 * InUse&Hold  
 * Unknown  -  Status  does  not  match  any  of  the  above  values.
 */
export interface IAstEventExtensionStatus extends IAstEvent {
    Exten: string;
    Context: string;
    Hint: string;
    Status: string;
    StatusText: string;
}
/**
 * AgentConnect Event - Raised when a queue member answers and is bridged to a caller in the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentConnect }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} RingTime - The time the queue member was rung, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} HoldTime - The time the channel was in the queue, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 */
export interface IAstEventAgentConnect extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    Queue: string;
    MemberName: string;
    Interface: string;
    RingTime: string;
    HoldTime: string;
}
/**
 * RTCPSent Event - Raised when an RTCP packet is sent.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_RTCPSent }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SSRC - The SSRC identifier for our stream
 * @property {string} PT -  * - * The * type * of * packet * for * this * RTCP * report. * 200(SR) * 201(RR)
 * @property {string} To - The address the report is sent to.
 * @property {string} ReportCount -   -  The  number  of  reports  that  were  sent.  The  report  count  determines  the  number  of  ReportX  headers  in  the  message.  
 * The  X  for  each  set  of  report  headers  will  range  from  0  to  ReportCount  -  1.
 * @property {string} ReportXSourceSSRC - The SSRC for the source of this report block.
 * @property {string} ReportXFractionLost - The fraction of RTP data packets from ReportXSourceSSRC lost since the previous SR or RR report was sent.
 * @property {string} ReportXCumulativeLost - The total number of RTP data packets from ReportXSourceSSRC lost since the beginning of reception.
 * @property {string} ReportXHighestSequence - The highest sequence number received in an RTP data packet from ReportXSourceSSRC.
 * @property {string} ReportXSequenceNumberCycles - The number of sequence number cycles seen for the RTP data received from ReportXSourceSSRC.
 * @property {string} ReportXIAJitter - An estimate of the statistical variance of the RTP data packet interarrival time, measured in timestamp units.
 * @property {string} ReportXLSR - The last SR timestamp received from ReportXSourceSSRC. If no SR has been received from ReportXSourceSSRC, then 0.
 * @property {string} ReportXDLSR - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentNTP] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentRTP] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentPackets] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentOctets] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 */
export interface IAstEventRTCPSent extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    SSRC: string;
    PT: string;
    To: string;
    ReportCount: string;
    ReportXSourceSSRC: string;
    ReportXFractionLost: string;
    ReportXCumulativeLost: string;
    ReportXHighestSequence: string;
    ReportXSequenceNumberCycles: string;
    ReportXIAJitter: string;
    ReportXLSR: string;
    ReportXDLSR: string;
    sentNTP?: string;
    sentRTP?: string;
    sentPackets?: string;
    sentOctets?: string;
}
/**
 * QueueMemberStatus Event - Raised when a Queue member's status has changed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberStatus }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  0  -  AST_DEVICE_UNKNOWN  1  -  AST_DEVICE_NOT_INUSE  
 * 2  -  AST_DEVICE_INUSE  3  -  AST_DEVICE_BUSY  
 * 4  -  AST_DEVICE_INVALID  5  -  AST_DEVICE_UNAVAILABLE  6  -  AST_DEVICE_RINGING  7  -  AST_DEVICE_RINGINUSE  8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 */
export interface IAstEventQueueMemberStatus extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
}
/**
 * UnParkedCall Event - Raised when a channel leaves a parking lot because it was retrieved from the parking lot and reconnected.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_UnParkedCall }
 *
 * @property {string} ParkeeChannel
 * @property {string} ParkeeChannelState - A numeric code for the channel's current state, related to ParkeeChannelStateDesc
 * @property {string} ParkeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkeeCallerIDNum
 * @property {string} ParkeeCallerIDName
 * @property {string} ParkeeConnectedLineNum
 * @property {string} ParkeeConnectedLineName
 * @property {string} ParkeeAccountCode
 * @property {string} ParkeeContext
 * @property {string} ParkeeExten
 * @property {string} ParkeePriority
 * @property {string} ParkeeUniqueid
 * @property {string} ParkeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerChannel
 * @property {string} ParkerChannelState - A numeric code for the channel's current state, related to ParkerChannelStateDesc
 * @property {string} ParkerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkerCallerIDNum
 * @property {string} ParkerCallerIDName
 * @property {string} ParkerConnectedLineNum
 * @property {string} ParkerConnectedLineName
 * @property {string} ParkerAccountCode
 * @property {string} ParkerContext
 * @property {string} ParkerExten
 * @property {string} ParkerPriority
 * @property {string} ParkerUniqueid
 * @property {string} ParkerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerDialString - Dial String that can be used to call back the parker on ParkingTimeout.
 * @property {string} Parkinglot - Name of the parking lot that the parkee is parked in
 * @property {string} ParkingSpace - Parking Space that the parkee is parked in
 * @property {string} ParkingTimeout - Time remaining until the parkee is forcefully removed from parking in seconds
 * @property {string} ParkingDuration - Time the parkee has been in the parking bridge (in seconds)
 * @property {string} RetrieverChannel
 * @property {string} RetrieverChannelState - A numeric code for the channel's current state, related to RetrieverChannelStateDesc
 * @property {string} RetrieverChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} RetrieverCallerIDNum
 * @property {string} RetrieverCallerIDName
 * @property {string} RetrieverConnectedLineNum
 * @property {string} RetrieverConnectedLineName
 * @property {string} RetrieverAccountCode
 * @property {string} RetrieverContext
 * @property {string} RetrieverExten
 * @property {string} RetrieverPriority
 * @property {string} RetrieverUniqueid
 * @property {string} RetrieverLinkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventUnParkedCall extends IAstEvent {
    ParkeeChannel: string;
    ParkeeChannelState: string;
    ParkeeChannelStateDesc: string;
    ParkeeCallerIDNum: string;
    ParkeeCallerIDName: string;
    ParkeeConnectedLineNum: string;
    ParkeeConnectedLineName: string;
    ParkeeAccountCode: string;
    ParkeeContext: string;
    ParkeeExten: string;
    ParkeePriority: string;
    ParkeeUniqueid: string;
    ParkeeLinkedid: string;
    ParkerChannel: string;
    ParkerChannelState: string;
    ParkerChannelStateDesc: string;
    ParkerCallerIDNum: string;
    ParkerCallerIDName: string;
    ParkerConnectedLineNum: string;
    ParkerConnectedLineName: string;
    ParkerAccountCode: string;
    ParkerContext: string;
    ParkerExten: string;
    ParkerPriority: string;
    ParkerUniqueid: string;
    ParkerLinkedid: string;
    ParkerDialString: string;
    Parkinglot: string;
    ParkingSpace: string;
    ParkingTimeout: string;
    ParkingDuration: string;
    RetrieverChannel: string;
    RetrieverChannelState: string;
    RetrieverChannelStateDesc: string;
    RetrieverCallerIDNum: string;
    RetrieverCallerIDName: string;
    RetrieverConnectedLineNum: string;
    RetrieverConnectedLineName: string;
    RetrieverAccountCode: string;
    RetrieverContext: string;
    RetrieverExten: string;
    RetrieverPriority: string;
    RetrieverUniqueid: string;
    RetrieverLinkedid: string;
}
/**
 * Cdr Event - Raised when a CDR is generated.
 *
 * @description The Cdr event is only raised when the cdr_manager backend is loaded and registered with the CDR engine.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Cdr }
 *
 * @property {string} AccountCode - The account code of the Party A channel.
 * @property {string} Source - The Caller ID number associated with the Party A in the CDR.
 * @property {string} Destination - The dialplan extension the Party A was executing.
 * @property {string} DestinationContext - The dialplan context the Party A was executing.
 * @property {string} CallerID - The Caller ID name associated with the Party A in the CDR.
 * @property {string} Channel - The channel name of the Party A.
 * @property {string} DestinationChannel - The channel name of the Party B.
 * @property {string} LastApplication - The last dialplan application the Party A executed.
 * @property {string} LastData - The parameters passed to the last dialplan application the Party A executed.
 * @property {string} StartTime - The time the CDR was created.
 * @property {string} AnswerTime - The earliest of either the time when Party A answered, or the start time of this CDR.
 * @property {string} EndTime - The time when the CDR was finished. This occurs when the Party A hangs up or when the bridge between Party A and Party B is broken.
 * @property {string} Duration - The time, in seconds, of EndTime
 * @property {string} BillableSeconds - The time, in seconds, of AnswerTime
 * @property {string} Disposition -   -  The  final  known  disposition  of  the  CDR.  NO  ANSWER  -  The  channel  was  not  answered.  This  is  the  default  disposition.  
 * FAILED  -  The  channel  attempted  to  dial  but  the  call  failed.  
 * Note  Icon  The  congestion  setting  in  cdr.conf  can  result  in  the  AST_CAUSE_CONGESTION  hang  up  cause  or  the  CONGESTION  dial  status  to  map  to  this  disposition.  
 * BUSY  -  The  channel  attempted  to  dial  but  the  remote  party  was  busy.  
 * ANSWERED  -  The  channel  was  answered.  The  hang  up  cause  will  no  longer  impact  the  disposition  of  the  CDR.  
 * CONGESTION  -  The  channel  attempted  to  dial  but  the  remote  party  was  congested.
 * @property {string} AMAFlags -   -  A  flag  that  informs  a  billing  system  how  to  treat  the  CDR.  
 * OMIT  -  This  CDR  should  be  ignored.  
 * BILLING  -  This  CDR  contains  valid  billing  data.  
 * DOCUMENTATION  -  This  CDR  is  for  documentation  purposes.
 * @property {string} UniqueID - A unique identifier for the Party A channel.
 * @property {string} UserField - A user defined field set on the channels. If set on both the Party A and Party B channel, the userfields of both are concatenated and separated by a ;.
 */
export interface IAstEventCdr extends IAstEvent {
    AccountCode: string;
    Source: string;
    Destination: string;
    DestinationContext: string;
    CallerID: string;
    Channel: string;
    DestinationChannel: string;
    LastApplication: string;
    LastData: string;
    StartTime: string;
    AnswerTime: string;
    EndTime: string;
    Duration: string;
    BillableSeconds: string;
    Disposition: string;
    AMAFlags: string;
    UniqueID: string;
    UserField: string;
}
/**
 * HangupRequest Event - Raised when a hangup is requested.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_HangupRequest }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Cause - A numeric cause code for why the channel was hung up.
 */
export interface IAstEventHangupRequest extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Cause: string;
}
/**
 * Registry Event - Raised when an outbound registration completes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Registry }
 *
 * @property {string} ChannelType - The type of channel that was registered (or not).
 * @property {string} Username - The username portion of the registration.
 * @property {string} Domain - The address portion of the registration.
 * @property {string} Status -  * - * The * status * of * the * registration * request. * Registered * Unregistered * Rejected * Failed
 * @property {string} Cause - What caused the rejection of the request, if available.
 */
export interface IAstEventRegistry extends IAstEvent {
    ChannelType: string;
    Username: string;
    Domain: string;
    Status: string;
    Cause: string;
}
/**
 * ChallengeResponseFailed Event - Raised when a request's attempt to authenticate has been challenged, and the request failed the authentication challenge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChallengeResponseFailed }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} Challenge - The challenge that was sent.
 * @property {string} Response - The response that was received.
 * @property {string} ExpectedResponse - The expected response to the challenge.
 * @property {string} [module] - The expected response to the challenge.
 * @property {string} [sessionTV] - The expected response to the challenge.
 */
export interface IAstEventChallengeResponseFailed extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    Challenge: string;
    Response: string;
    ExpectedResponse: string;
    module?: string;
    sessionTV?: string;
}
/**
 * ChannelTalkingStart Event - Raised when talking is detected on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChannelTalkingStart }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventChannelTalkingStart extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * MonitorStop Event - Raised when monitoring has stopped on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MonitorStop }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventMonitorStop extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * RequestNotSupported Event - Raised when a request fails due to some aspect of the requested item not being supported by the service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_RequestNotSupported }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} RequestType - The type of request attempted.
 * @property {string} [module] - The type of request attempted.
 * @property {string} [sessionTV] - The type of request attempted.
 */
export interface IAstEventRequestNotSupported extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    RequestType: string;
    module?: string;
    sessionTV?: string;
}
/**
 * SIPQualifyPeerDone Event - Raised when SIPQualifyPeer has finished qualifying the specified peer.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SIPQualifyPeerDone }
 *
 * @property {string} Peer - The name of the peer.
 */
export interface IAstEventSIPQualifyPeerDone extends IAstEvent {
    Peer: string;
    ActionID: string;
}
/**
 * Newstate Event - Raised when a channel's state changes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Newstate }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventNewstate extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * PresenceStateListComplete Event - Indicates the end of the list the current known extension states.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_PresenceStateListComplete }
 *
 * @property {string} ListItems - Conveys the number of statuses reported.
 */
export interface IAstEventPresenceStateListComplete extends IAstEvent {
    ListItems: string;
}
/**
 * QueueCallerLeave Event - Raised when a caller leaves a Queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueCallerLeave }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} Count - The total number of channels in the queue.
 * @property {string} Position - This channel's current position in the queue.
 */
export interface IAstEventQueueCallerLeave extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Queue: string;
    Count: string;
    Position: string;
}
/**
 * ContactStatus Event - Raised when the state of a contact changes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ContactStatus }
 *
 * @property {string} URI - This contact's URI.
 * @property {string} ContactStatus -  * - * New * status * of * the * contact. * Unknown * Unreachable * Reachable * Created * Removed * Updated
 * @property {string} AOR - The name of the associated aor.
 * @property {string} EndpointName - The name of the associated endpoint.
 * @property {string} RoundtripUsec - The RTT measured during the last qualify.
 * @property {string} UserAgent - Content of the User-Agent header in REGISTER request
 * @property {string} RegExpire - Absolute time that this contact is no longer valid after
 * @property {string} ViaAddress - IP address:port of the last Via header in REGISTER request
 * @property {string} CallID - Content of the Call-ID header in REGISTER request
 */
export interface IAstEventContactStatus extends IAstEvent {
    URI: string;
    ContactStatus: string;
    AOR: string;
    EndpointName: string;
    RoundtripUsec: string;
    UserAgent: string;
    RegExpire: string;
    ViaAddress: string;
    CallID: string;
}
/**
 * MWIGetComplete Event - Raised in response to a MWIGet command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MWIGetComplete }
 *
 * @property {string} ListItems - The number of mailboxes reported.
 * @property {string} [actionId] - The number of mailboxes reported.
 */
export interface IAstEventMWIGetComplete extends IAstEvent {
    ListItems: string;
    actionId?: string;
}
/**
 * AGIExecEnd Event - Raised when a received AGI command completes processing.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AGIExecEnd }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Command - The AGI command as received from the external source.
 * @property {string} CommandId - Random identification number assigned to the execution of this command.
 * @property {string} ResultCode - The numeric result code from AGI
 * @property {string} Result - The text result reason from AGI
 */
export interface IAstEventAGIExecEnd extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Command: string;
    CommandId: string;
    ResultCode: string;
    Result: string;
}
/**
 * QueueCallerJoin Event - Raised when a caller joins a Queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueCallerJoin }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} Position - This channel's current position in the queue.
 * @property {string} Count - The total number of channels in the queue.
 */
export interface IAstEventQueueCallerJoin extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Queue: string;
    Position: string;
    Count: string;
}
/**
 * DTMFEnd Event - Raised when a DTMF digit has ended on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DTMFEnd }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Digit - DTMF digit received or transmitted (0-9, A-E, # or *
 * @property {string} DurationMs - Duration (in milliseconds) DTMF was sent/received
 * @property {string} Direction -  * Received * Sent
 */
export interface IAstEventDTMFEnd extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Digit: string;
    DurationMs: string;
    Direction: string;
}
/**
 * SpanAlarmClear Event - Raised when an alarm is cleared on a DAHDI span.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SpanAlarmClear }
 *
 * @property {string} Span - The span on which the alarm was cleared.
 */
export interface IAstEventSpanAlarmClear extends IAstEvent {
    Span: string;
}
/**
 * DeviceStateListComplete Event - Indicates the end of the list the current known extension states.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DeviceStateListComplete }
 *
 * @property {string} ListItems - Conveys the number of statuses reported.
 */
export interface IAstEventDeviceStateListComplete extends IAstEvent {
    ListItems: string;
}
/**
 * ChallengeSent Event - Raised when an Asterisk service sends an authentication challenge to a request.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChallengeSent }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} Challenge - The challenge that was sent.
 * @property {string} [module] - The challenge that was sent.
 * @property {string} [sessionTV] - The challenge that was sent.
 */
export interface IAstEventChallengeSent extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    Challenge: string;
    module?: string;
    sessionTV?: string;
}
/**
 * RTCPReceived Event - Raised when an RTCP packet is received.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_RTCPReceived }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SSRC - The SSRC identifier for the remote system
 * @property {string} PT -  * - * The * type * of * packet * for * this * RTCP * report. * 200(SR) * 201(RR)
 * @property {string} From - The address the report was received from.
 * @property {string} RTT - Calculated Round-Trip Time in seconds
 * @property {string} ReportCount -   -  The  number  of  reports  that  were  received.  The  report  count  determines  the  number  of  ReportX  headers  in  the  message. 
 * The  X  for  each  set  of  report  headers  will  range  from  0  to  ReportCount  -  1.
 * @property {string} ReportXSourceSSRC - The SSRC for the source of this report block.
 * @property {string} ReportXFractionLost - The fraction of RTP data packets from ReportXSourceSSRC lost since the previous SR or RR report was sent.
 * @property {string} ReportXCumulativeLost - The total number of RTP data packets from ReportXSourceSSRC lost since the beginning of reception.
 * @property {string} ReportXHighestSequence - The highest sequence number received in an RTP data packet from ReportXSourceSSRC.
 * @property {string} ReportXSequenceNumberCycles - The number of sequence number cycles seen for the RTP data received from ReportXSourceSSRC.
 * @property {string} ReportXIAJitter - An estimate of the statistical variance of the RTP data packet interarrival time, measured in timestamp units.
 * @property {string} ReportXLSR - The last SR timestamp received from ReportXSourceSSRC. If no SR has been received from ReportXSourceSSRC, then 0.
 * @property {string} ReportXDLSR - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentNTP] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentRTP] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentPackets] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentOctets] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 */
export interface IAstEventRTCPReceived extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    SSRC: string;
    PT: string;
    From: string;
    RTT: string;
    ReportCount: string;
    ReportXSourceSSRC: string;
    ReportXFractionLost: string;
    ReportXCumulativeLost: string;
    ReportXHighestSequence: string;
    ReportXSequenceNumberCycles: string;
    ReportXIAJitter: string;
    ReportXLSR: string;
    ReportXDLSR: string;
    sentNTP?: string;
    sentRTP?: string;
    sentPackets?: string;
    sentOctets?: string;
}
/**
 * MWIGet Event - Raised in response to a MWIGet command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MWIGet }
 *
 * @property {string} Mailbox - Specific mailbox ID.
 * @property {string} OldMessages - The number of old messages in the mailbox.
 * @property {string} NewMessages - The number of new messages in the mailbox.
 * @property {string} [actionId] - The number of new messages in the mailbox.
 */
export interface IAstEventMWIGet extends IAstEvent {
    Mailbox: string;
    OldMessages: string;
    NewMessages: string;
    actionId?: string;
}
/**
 * QueueMemberRemoved Event - Raised when a member is removed from the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberRemoved }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  
 * 0  -  AST_DEVICE_UNKNOWN  
 * 1  -  AST_DEVICE_NOT_INUSE  
 * 2  -  AST_DEVICE_INUSE  
 * 3  -  AST_DEVICE_BUSY  
 * 4  -  AST_DEVICE_INVALID  
 * 5  -  AST_DEVICE_UNAVAILABLE  
 * 6  -  AST_DEVICE_RINGING  
 * 7  -  AST_DEVICE_RINGINUSE  8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 */
export interface IAstEventQueueMemberRemoved extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
}
/**
 * MusicOnHoldStart Event - Raised when music on hold has started on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MusicOnHoldStart }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Class - The class of music being played on the channel
 */
export interface IAstEventMusicOnHoldStart extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Class: string;
}
/**
 * MeetmeEnd Event - Raised when a MeetMe conference ends.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MeetmeEnd }
 *
 * @property {string} Meetme - The identifier for the MeetMe conference.
 */
export interface IAstEventMeetmeEnd extends IAstEvent {
    Meetme: string;
}
/**
 * DialBegin Event - Raised when a dial action has started.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DialBegin }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DialString - The non-technology specific device being dialed.
 */
export interface IAstEventDialBegin extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    DialString: string;
}
/**
 * AOC_E Event - Raised when an Advice of Charge message is sent during a call.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AOC-E }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Charge
 * @property {string} Type -  * NotAvailable * Free * Currency * Units
 * @property {string} BillingID -  * Normal * Reverse * CreditCard * CallForwardingUnconditional * CallForwardingBusy * CallForwardingNoReply * CallDeflection * CallTransfer * NotAvailable
 * @property {string} TotalType -  * SubTotal * Total
 * @property {string} Currency
 * @property {string} Name
 * @property {string} Cost
 * @property {string} Multiplier -  * 1/1000 * 1/100 * 1/10 * 1 * 10 * 100 * 1000
 * @property {string} Units
 * @property {string} NumberOf
 * @property {string} TypeOf
 */
export interface IAstEventAOC_E extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Charge: string;
    Type: string;
    BillingID: string;
    TotalType: string;
    Currency: string;
    Name: string;
    Cost: string;
    Multiplier: string;
    Units: string;
    NumberOf: string;
    TypeOf: string;
}
/**
 * DeviceStateChange Event - Raised when a device state changes
 *
 * @description This differs from the ExtensionStatus event because this event is raised for all device state changes, not only for changes that affect dialplan hints.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_DeviceStateChange }
 *
 * @property {string} Device - The device whose state has changed
 * @property {string} State - The new state of the device
 */
export interface IAstEventDeviceStateChange extends IAstEvent {
    Device: string;
    State: string;
}
/**
 * ConfbridgeUnmute Event - Raised when a confbridge participant unmutes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeUnmute }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Admin -  * - * Identifies * this * user * as * an * admin * user. * Yes * No
 */
export interface IAstEventConfbridgeUnmute extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Admin: string;
}
/**
 * FAXSessionsEntry Event - A single list item for the FAXSessions AMI command
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FAXSessionsEntry }
 *
 * @property {string} Channel - Name of the channel responsible for the FAX session
 * @property {string} Technology - The FAX technology that the FAX session is using
 * @property {string} SessionNumber - The numerical identifier for this particular session
 * @property {string} SessionType -  * - * FAX * session * passthru/relay * type * G.711 * T.38
 * @property {string} Operation -  * - * FAX * session * operation * type * gateway * V.21 * send * receive * none
 * @property {string} State -  * - * Current * state * of * the * FAX * session * Uninitialized * Initialized * Open * Active * Complete * Reserved * Inactive * Unknown
 * @property {string} Files - File or list of files associated with this FAX session
 * @property {string} [actionId] - File or list of files associated with this FAX session
 */
export interface IAstEventFAXSessionsEntry extends IAstEvent {
    Channel: string;
    Technology: string;
    SessionNumber: string;
    SessionType: string;
    Operation: string;
    State: string;
    Files: string;
    actionId?: string;
}
/**
 * SoftHangupRequest Event - Raised when a soft hangup is requested with a specific cause code.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SoftHangupRequest }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Cause - A numeric cause code for why the channel was hung up.
 */
export interface IAstEventSoftHangupRequest extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Cause: string;
}
/**
 * AgentLogin Event - Raised when an Agent has logged in.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentLogin }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Agent - Agent ID of the agent.
 */
export interface IAstEventAgentLogin extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Agent: string;
}
/**
 * MusicOnHoldStop Event - Raised when music on hold has stopped on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MusicOnHoldStop }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventMusicOnHoldStop extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * LocalOptimizationBegin Event - Raised when two halves of a Local Channel begin to optimize themselves out of the media path.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_LocalOptimizationBegin }
 *
 * @property {string} LocalOneChannel
 * @property {string} LocalOneChannelState - A numeric code for the channel's current state, related to LocalOneChannelStateDesc
 * @property {string} LocalOneChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalOneCallerIDNum
 * @property {string} LocalOneCallerIDName
 * @property {string} LocalOneConnectedLineNum
 * @property {string} LocalOneConnectedLineName
 * @property {string} LocalOneAccountCode
 * @property {string} LocalOneContext
 * @property {string} LocalOneExten
 * @property {string} LocalOnePriority
 * @property {string} LocalOneUniqueid
 * @property {string} LocalOneLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalTwoChannel
 * @property {string} LocalTwoChannelState - A numeric code for the channel's current state, related to LocalTwoChannelStateDesc
 * @property {string} LocalTwoChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} LocalTwoCallerIDNum
 * @property {string} LocalTwoCallerIDName
 * @property {string} LocalTwoConnectedLineNum
 * @property {string} LocalTwoConnectedLineName
 * @property {string} LocalTwoAccountCode
 * @property {string} LocalTwoContext
 * @property {string} LocalTwoExten
 * @property {string} LocalTwoPriority
 * @property {string} LocalTwoUniqueid
 * @property {string} LocalTwoLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SourceChannel
 * @property {string} SourceChannelState - A numeric code for the channel's current state, related to SourceChannelStateDesc
 * @property {string} SourceChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} SourceCallerIDNum
 * @property {string} SourceCallerIDName
 * @property {string} SourceConnectedLineNum
 * @property {string} SourceConnectedLineName
 * @property {string} SourceAccountCode
 * @property {string} SourceContext
 * @property {string} SourceExten
 * @property {string} SourcePriority
 * @property {string} SourceUniqueid
 * @property {string} SourceLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestUniqueId - The unique ID of the bridge into which the local channel is optimizing.
 * @property {string} Id - Identification for the optimization operation.
 */
export interface IAstEventLocalOptimizationBegin extends IAstEvent {
    LocalOneChannel: string;
    LocalOneChannelState: string;
    LocalOneChannelStateDesc: string;
    LocalOneCallerIDNum: string;
    LocalOneCallerIDName: string;
    LocalOneConnectedLineNum: string;
    LocalOneConnectedLineName: string;
    LocalOneAccountCode: string;
    LocalOneContext: string;
    LocalOneExten: string;
    LocalOnePriority: string;
    LocalOneUniqueid: string;
    LocalOneLinkedid: string;
    LocalTwoChannel: string;
    LocalTwoChannelState: string;
    LocalTwoChannelStateDesc: string;
    LocalTwoCallerIDNum: string;
    LocalTwoCallerIDName: string;
    LocalTwoConnectedLineNum: string;
    LocalTwoConnectedLineName: string;
    LocalTwoAccountCode: string;
    LocalTwoContext: string;
    LocalTwoExten: string;
    LocalTwoPriority: string;
    LocalTwoUniqueid: string;
    LocalTwoLinkedid: string;
    SourceChannel: string;
    SourceChannelState: string;
    SourceChannelStateDesc: string;
    SourceCallerIDNum: string;
    SourceCallerIDName: string;
    SourceConnectedLineNum: string;
    SourceConnectedLineName: string;
    SourceAccountCode: string;
    SourceContext: string;
    SourceExten: string;
    SourcePriority: string;
    SourceUniqueid: string;
    SourceLinkedid: string;
    DestUniqueId: string;
    Id: string;
}
/**
 * ConfbridgeRecord Event - Raised when a conference starts recording.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeRecord }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventConfbridgeRecord extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * PresenceStateChange Event - Raised when a presence state changes
 *
 * @description This differs from the PresenceStatus event because this event is raised for all presence state changes, not only for changes that affect dialplan hints.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_PresenceStateChange }
 *
 * @property {string} Presentity - The entity whose presence state has changed
 * @property {string} Status - The new status of the presentity
 * @property {string} Subtype - The new subtype of the presentity
 * @property {string} Message - The new message of the presentity
 */
export interface IAstEventPresenceStateChange extends IAstEvent {
    Presentity: string;
    Status: string;
    Subtype: string;
    Message: string;
}
/**
 * NewExten Event - Raised when a channel enters a new context, extension, priority.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_NewExten }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Extension - Deprecated in 12, but kept for backward compatability. Please use "Exten" instead.
 * @property {string} Application - The application about to be executed.
 * @property {string} AppData - The data to be passed to the application.
 */
export interface IAstEventNewExten extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Extension: string;
    Application: string;
    AppData: string;
}
/**
 * Pickup Event - Raised when a call pickup occurs.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Pickup }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} TargetChannel
 * @property {string} TargetChannelState - A numeric code for the channel's current state, related to TargetChannelStateDesc
 * @property {string} TargetChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} TargetCallerIDNum
 * @property {string} TargetCallerIDName
 * @property {string} TargetConnectedLineNum
 * @property {string} TargetConnectedLineName
 * @property {string} TargetAccountCode
 * @property {string} TargetContext
 * @property {string} TargetExten
 * @property {string} TargetPriority
 * @property {string} TargetUniqueid
 * @property {string} TargetLinkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventPickup extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    TargetChannel: string;
    TargetChannelState: string;
    TargetChannelStateDesc: string;
    TargetCallerIDNum: string;
    TargetCallerIDName: string;
    TargetConnectedLineNum: string;
    TargetConnectedLineName: string;
    TargetAccountCode: string;
    TargetContext: string;
    TargetExten: string;
    TargetPriority: string;
    TargetUniqueid: string;
    TargetLinkedid: string;
}
/**
 * BridgeInfoChannel Event - Information about a channel in a bridge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeInfoChannel }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventBridgeInfoChannel extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * MessageWaiting Event - Raised when the state of messages in a voicemail mailbox has changed or when a channel has finished interacting with a mailbox.
 *
 * @description Note - The Channel related parameters are only present if a channel was involved in the manipulation of a mailbox.
 * If no channel is involved, the parameters are not included with the event.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MessageWaiting }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Mailbox - The mailbox with the new message, specified as mailbox@context
 * @property {string} Waiting - Whether or not the mailbox has messages waiting for it.
 * @property {string} New - The number of new messages.
 * @property {string} Old - The number of old messages.
 */
export interface IAstEventMessageWaiting extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Mailbox: string;
    Waiting: string;
    New: string;
    Old: string;
}
/**
 * Alarm Event - Raised when an alarm is set on a DAHDI channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Alarm }
 *
 * @property {string} DAHDIChannel -  * - * The * channel * on * which * the * alarm * occurred. * Note * Icon * This * is * not * an * Asterisk * channel * identifier.
 * @property {string} Alarm - A textual description of the alarm that occurred.
 */
export interface IAstEventAlarm extends IAstEvent {
    DAHDIChannel: string;
    Alarm: string;
}
/**
 * FAXStats Event - Raised in response to FAXStats manager command
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FAXStats }
 *
 * @property {string} CurrentSessions - Number of active FAX sessions
 * @property {string} ReservedSessions - Number of reserved FAX sessions
 * @property {string} TransmitAttempts - Total FAX sessions for which Asterisk is/was the transmitter
 * @property {string} ReceiveAttempts - Total FAX sessions for which Asterisk is/was the recipient
 * @property {string} CompletedFAXes - Total FAX sessions which have been completed successfully
 * @property {string} FailedFAXes - Total FAX sessions which failed to complete successfully
 * @property {string} [actionId] - Total FAX sessions which failed to complete successfully
 */
export interface IAstEventFAXStats extends IAstEvent {
    CurrentSessions: string;
    ReservedSessions: string;
    TransmitAttempts: string;
    ReceiveAttempts: string;
    CompletedFAXes: string;
    FailedFAXes: string;
    actionId?: string;
}
/**
 * FailedACL Event - Raised when a request violates an ACL check.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FailedACL }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [aCLName] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventFailedACL extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    aCLName?: string;
    sessionTV?: string;
}
/**
 * QueueMemberRinginuse Event - Raised when a member's ringinuse setting is changed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberRinginuse }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  0  -  AST_DEVICE_UNKNOWN  1  -  AST_DEVICE_NOT_INUSE  2  -  AST_DEVICE_INUSE  
 * 3  -  AST_DEVICE_BUSY  4  -  AST_DEVICE_INVALID  5  -  AST_DEVICE_UNAVAILABLE  6  -  AST_DEVICE_RINGING  7  -  AST_DEVICE_RINGINUSE  8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 */
export interface IAstEventQueueMemberRinginuse extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
}
/**
 * UserEvent Event - A user defined event raised from the dialplan.
 *
 * @description Event may contain additional arbitrary parameters in addition to optional bridge and endpoint snapshots. Multiple snapshots of the same type are prefixed with a numeric value.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_UserEvent }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} UserEvent - The event name, as specified in the dialplan.
 */
export interface IAstEventUserEvent extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    UserEvent: string;
}
/**
 * EndpointList Event - Provide details about a contact's status.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_EndpointList }
 *
 * @property {string} ObjectType - The object's type. This will always be "endpoint".
 * @property {string} ObjectName - The name of this object.
 * @property {string} Transport - The transport configurations associated with this endpoint.
 * @property {string} Aor - The aor configurations associated with this endpoint.
 * @property {string} Auths - The inbound authentication configurations associated with this endpoint.
 * @property {string} OutboundAuths - The outbound authentication configurations associated with this endpoint.
 * @property {string} DeviceState - The aggregate device state for this endpoint.
 * @property {string} ActiveChannels - The number of active channels associated with this endpoint.
 */
export interface IAstEventEndpointList extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    Transport: string;
    Aor: string;
    Auths: string;
    OutboundAuths: string;
    DeviceState: string;
    ActiveChannels: string;
}
/**
 * ConfbridgeJoin Event - Raised when a channel joins a Confbridge conference.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeJoin }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Admin -  * - * Identifies * this * user * as * an * admin * user. * Yes * No
 */
export interface IAstEventConfbridgeJoin extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Admin: string;
}
/**
 * AgentComplete Event - Raised when a queue member has finished servicing a caller in the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AgentComplete }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} DestChannel
 * @property {string} DestChannelState - A numeric code for the channel's current state, related to DestChannelStateDesc
 * @property {string} DestChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} DestCallerIDNum
 * @property {string} DestCallerIDName
 * @property {string} DestConnectedLineNum
 * @property {string} DestConnectedLineName
 * @property {string} DestAccountCode
 * @property {string} DestContext
 * @property {string} DestExten
 * @property {string} DestPriority
 * @property {string} DestUniqueid
 * @property {string} DestLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} HoldTime - The time the channel was in the queue, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} TalkTime - The time the queue member talked with the caller in the queue, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} Reason -  * caller * agent * transfer
 */
export interface IAstEventAgentComplete extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    DestChannel: string;
    DestChannelState: string;
    DestChannelStateDesc: string;
    DestCallerIDNum: string;
    DestCallerIDName: string;
    DestConnectedLineNum: string;
    DestConnectedLineName: string;
    DestAccountCode: string;
    DestContext: string;
    DestExten: string;
    DestPriority: string;
    DestUniqueid: string;
    DestLinkedid: string;
    Queue: string;
    MemberName: string;
    Interface: string;
    HoldTime: string;
    TalkTime: string;
    Reason: string;
}
/**
 * SendFAX Event - Raised when a send fax operation has completed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SendFAX }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalStationID - The value of the LOCALSTATIONID channel variable
 * @property {string} RemoteStationID - The value of the REMOTESTATIONID channel variable
 * @property {string} PagesTransferred - The number of pages that have been transferred
 * @property {string} Resolution - The negotiated resolution
 * @property {string} TransferRate - The negotiated transfer rate
 * @property {string} FileName - The files being affected by the fax operation
 */
export interface IAstEventSendFAX extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    LocalStationID: string;
    RemoteStationID: string;
    PagesTransferred: string;
    Resolution: string;
    TransferRate: string;
    FileName: string;
}
/**
 * Status Event - Raised in response to a Status command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Status }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid
 * @property {string} Type - Type of channel
 * @property {string} DNID - Dialed number identifier
 * @property {string} TimeToHangup - Absolute lifetime of the channel
 * @property {string} BridgeID - Identifier of the bridge the channel is in, may be empty if not in one
 * @property {string} Application - Application currently executing on the channel
 * @property {string} Data - Data given to the currently executing channel
 * @property {string} Nativeformats - Media formats the connected party is willing to send or receive
 * @property {string} Readformat - Media formats that frames from the channel are received in
 * @property {string} Readtrans - Translation path for media received in native formats
 * @property {string} Writeformat - Media formats that frames to the channel are accepted in
 * @property {string} Writetrans - Translation path for media sent to the connected party
 * @property {string} Callgroup - Configured call group on the channel
 * @property {string} Pickupgroup - Configured pickup group on the channel
 * @property {string} Seconds - Number of seconds the channel has been active
 * @property {string} [actionId] - Number of seconds the channel has been active
 */
export interface IAstEventStatus extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Type: string;
    DNID: string;
    TimeToHangup: string;
    BridgeID: string;
    Application: string;
    Data: string;
    Nativeformats: string;
    Readformat: string;
    Readtrans: string;
    Writeformat: string;
    Writetrans: string;
    Callgroup: string;
    Pickupgroup: string;
    Seconds: string;
    actionId?: string;
}
/**
 * LogChannel Event - Raised when a logging channel is re-enabled after a reload operation.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_LogChannel }
 *
 * @property {string} Channel - The name of the logging channel.
 * @property {string} Enabled
 */
export interface IAstEventLogChannel extends IAstEvent {
    Channel: string;
    Enabled: string;
}

export interface IAstEventPeerEntry extends IAstEvent {
    Channeltype: string;
    ObjectName: string;
    ChanObjectType: string;
    Dynamic: string|boolean;
    Status: string;
    IPaddress: string;
}
export interface IAstEventPeerSIPEntry extends IAstEventPeerEntry {
    AutoForcerport: string;
    Forcerport: string;
    AutoComedia: string;
    Comedia: string;
    VideoSupport: string;
    TextSupport: string;
    ACL: string;
    RealtimeDevice: string;
    Description: string;
    IPport: string;
}
export interface IAstEventPeerIAXEntry extends IAstEventPeerEntry {
    ObjectUsername: string;
    Trunk: string;
    Encryption: string;
    Mask: string;
    Port: string;
}

/**
 * PeerStatus Event - Raised when the state of a peer changes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_PeerStatus }
 *
 * @property {string} ChannelType - The channel technology of the peer.
 * @property {string} Peer - The name of the peer (including channel technology).
 * @property {string} PeerStatus -  * - * New * status * of * the * peer. * Unknown * Registered * Unregistered * Rejected * Lagged
 * @property {string} Cause - The reason the status has changed.
 * @property {string} Address - New address of the peer.
 * @property {string} Port - New port for the peer.
 * @property {string} Time - Time it takes to reach the peer and receive a response.
 */
export interface IAstEventPeerStatus extends IAstEvent {
    ChannelType: string;
    Peer: string;
    PeerStatus: string;
    Cause: string;
    Address: string;
    Port: string;
    Time: string;
}
/**
 * EndpointListComplete Event - Provide final information about an endpoint list.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_EndpointListComplete }
 *
 * @property {string} ListItems
 */
export interface IAstEventEndpointListComplete extends IAstEvent {
    ListItems: string;
}
/**
 * BridgeInfoComplete Event - Information about a bridge.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeInfoComplete }
 *
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventBridgeInfoComplete extends IAstEvent {
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * SessionLimit Event - Raised when a request fails due to exceeding the number of allowed concurrent sessions for that service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SessionLimit }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventSessionLimit extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    sessionTV?: string;
}
/**
 * AsyncAGIStart Event - Raised when a channel starts AsyncAGI command processing.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AsyncAGIStart }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Env - URL encoded string read from the AsyncAGI server.
 */
export interface IAstEventAsyncAGIStart extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Env: string;
}
/**
 * OriginateResponse Event - Raised in response to an Originate command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_OriginateResponse }
 *
 * @property {string} Response -  * Failure * Success
 * @property {string} Channel
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Application
 * @property {string} Data
 * @property {string} Reason
 * @property {string} Uniqueid
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} [actionId]
 */
export interface IAstEventOriginateResponse extends IAstEvent {
    Response: string;
    Channel: string;
    Context: string;
    Exten: string;
    Application: string;
    Data: string;
    Reason: string;
    Uniqueid: string;
    CallerIDNum: string;
    CallerIDName: string;
    actionId?: string;
}
/**
 * IdentifyDetail Event - Provide details about an identify section.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_IdentifyDetail }
 *
 * @property {string} ObjectType - The object's type. This will always be "identify".
 * @property {string} ObjectName - The name of this object.
 * @property {string} Endpoint - Name of Endpoint
 * @property {string} Match - IP addresses or networks to match against
 * @property {string} EndpointName - The name of the endpoint associated with this information.
 */
export interface IAstEventIdentifyDetail extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    Endpoint: string;
    Match: string;
    EndpointName: string;
}
/**
 * SpanAlarm Event - Raised when an alarm is set on a DAHDI span.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SpanAlarm }
 *
 * @property {string} Span - The span on which the alarm occurred.
 * @property {string} Alarm - A textual description of the alarm that occurred.
 */
export interface IAstEventSpanAlarm extends IAstEvent {
    Span: string;
    Alarm: string;
}
/**
 * InvalidPassword Event - Raised when a request provides an invalid password during an authentication attempt.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_InvalidPassword }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [challenge] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [receivedChallenge] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [recievedHash] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventInvalidPassword extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    sessionTV?: string;
    challenge?: string;
    receivedChallenge?: string;
    recievedHash?: string;
}
/**
 * PresenceStatus Event - Raised when a hint changes due to a presence state change.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_PresenceStatus }
 *
 * @property {string} Exten
 * @property {string} Context
 * @property {string} Hint
 * @property {string} Status
 * @property {string} Subtype
 * @property {string} Message
 */
export interface IAstEventPresenceStatus extends IAstEvent {
    Exten: string;
    Context: string;
    Hint: string;
    Status: string;
    Subtype: string;
    Message: string;
}
/**
 * ChannelTalkingStop Event - Raised when talking is no longer detected on a channel.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ChannelTalkingStop }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Duration - The length in time, in milliseconds, that talking was detected on the channel.
 */
export interface IAstEventChannelTalkingStop extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Duration: string;
}
/**
 * ExtensionStateListComplete Event - Indicates the end of the list the current known extension states.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ExtensionStateListComplete }
 *
 * @property {string} ListItems - Conveys the number of statuses reported.
 */
export interface IAstEventExtensionStateListComplete extends IAstEvent {
    ListItems: string;
}
/**
 * MCID Event - Published when a malicious call ID request arrives.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_MCID }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} MCallerIDNumValid
 * @property {string} MCallerIDNum
 * @property {string} MCallerIDton
 * @property {string} MCallerIDNumPlan
 * @property {string} MCallerIDNumPres
 * @property {string} MCallerIDNameValid
 * @property {string} MCallerIDName
 * @property {string} MCallerIDNameCharSet
 * @property {string} MCallerIDNamePres
 * @property {string} MCallerIDSubaddr
 * @property {string} MCallerIDSubaddrType
 * @property {string} MCallerIDSubaddrOdd
 * @property {string} MCallerIDPres
 * @property {string} MConnectedIDNumValid
 * @property {string} MConnectedIDNum
 * @property {string} MConnectedIDton
 * @property {string} MConnectedIDNumPlan
 * @property {string} MConnectedIDNumPres
 * @property {string} MConnectedIDNameValid
 * @property {string} MConnectedIDName
 * @property {string} MConnectedIDNameCharSet
 * @property {string} MConnectedIDNamePres
 * @property {string} MConnectedIDSubaddr
 * @property {string} MConnectedIDSubaddrType
 * @property {string} MConnectedIDSubaddrOdd
 * @property {string} MConnectedIDPres
 */
export interface IAstEventMCID extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    MCallerIDNumValid: string;
    MCallerIDNum: string;
    MCallerIDton: string;
    MCallerIDNumPlan: string;
    MCallerIDNumPres: string;
    MCallerIDNameValid: string;
    MCallerIDName: string;
    MCallerIDNameCharSet: string;
    MCallerIDNamePres: string;
    MCallerIDSubaddr: string;
    MCallerIDSubaddrType: string;
    MCallerIDSubaddrOdd: string;
    MCallerIDPres: string;
    MConnectedIDNumValid: string;
    MConnectedIDNum: string;
    MConnectedIDton: string;
    MConnectedIDNumPlan: string;
    MConnectedIDNumPres: string;
    MConnectedIDNameValid: string;
    MConnectedIDName: string;
    MConnectedIDNameCharSet: string;
    MConnectedIDNamePres: string;
    MConnectedIDSubaddr: string;
    MConnectedIDSubaddrType: string;
    MConnectedIDSubaddrOdd: string;
    MConnectedIDPres: string;
}
/**
 * AuthDetail Event - Provide details about an authentication section.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_AuthDetail }
 *
 * @property {string} ObjectType - The object's type. This will always be "auth".
 * @property {string} ObjectName - The name of this object.
 * @property {string} Username - Username to use for account
 * @property {string} Password - Username to use for account
 * @property {string} Md5Cred - MD5 Hash used for authentication.
 * @property {string} Realm - SIP realm for endpoint
 * @property {string} NonceLifetime - Lifetime of a nonce associated with this authentication config.
 * @property {string} AuthType - Authentication type
 * @property {string} EndpointName - The name of the endpoint associated with this information.
 */
export interface IAstEventAuthDetail extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    Username: string;
    Password: string;
    Md5Cred: string;
    Realm: string;
    NonceLifetime: string;
    AuthType: string;
    EndpointName: string;
}
/**
 * BlindTransfer Event - Raised when a blind transfer is complete.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BlindTransfer }
 *
 * @property {string} Result -   -  Indicates  if  the  transfer  was  successful  or  if  it  failed.  
 * Fail  -  An  internal  error  occurred.  
 * Invalid  -  Invalid  configuration  for  transfer  (e.g.  Not  bridged)  
 * Not  Permitted  -  Bridge  does  not  permit  transfers  
 * Success  -  Transfer  completed  successfully  
 * Note    A  result  of  Success  does  not  necessarily  mean  that  a  target  was  succesfully  contacted.  
 * It  means  that  a  party  was  succesfully  placed  into  the  dialplan  at  the  expected  location.
 * @property {string} TransfererChannel
 * @property {string} TransfererChannelState - A numeric code for the channel's current state, related to TransfererChannelStateDesc
 * @property {string} TransfererChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} TransfererCallerIDNum
 * @property {string} TransfererCallerIDName
 * @property {string} TransfererConnectedLineNum
 * @property {string} TransfererConnectedLineName
 * @property {string} TransfererAccountCode
 * @property {string} TransfererContext
 * @property {string} TransfererExten
 * @property {string} TransfererPriority
 * @property {string} TransfererUniqueid
 * @property {string} TransfererLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} TransfereeChannel
 * @property {string} TransfereeChannelState - A numeric code for the channel's current state, related to TransfereeChannelStateDesc
 * @property {string} TransfereeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} TransfereeCallerIDNum
 * @property {string} TransfereeCallerIDName
 * @property {string} TransfereeConnectedLineNum
 * @property {string} TransfereeConnectedLineName
 * @property {string} TransfereeAccountCode
 * @property {string} TransfereeContext
 * @property {string} TransfereeExten
 * @property {string} TransfereePriority
 * @property {string} TransfereeUniqueid
 * @property {string} TransfereeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 * @property {string} IsExternal -   -  Indicates  if  the  transfer  was  performed  outside  of  Asterisk.  
 * For  instance,  a  channel  protocol  native  transfer  is  external.  A  DTMF  transfer  is  internal.  Yes  No
 * @property {string} Context - Destination context for the blind transfer.
 * @property {string} Extension - Destination extension for the blind transfer.
 */
export interface IAstEventBlindTransfer extends IAstEvent {
    Result: string;
    TransfererChannel: string;
    TransfererChannelState: string;
    TransfererChannelStateDesc: string;
    TransfererCallerIDNum: string;
    TransfererCallerIDName: string;
    TransfererConnectedLineNum: string;
    TransfererConnectedLineName: string;
    TransfererAccountCode: string;
    TransfererContext: string;
    TransfererExten: string;
    TransfererPriority: string;
    TransfererUniqueid: string;
    TransfererLinkedid: string;
    TransfereeChannel: string;
    TransfereeChannelState: string;
    TransfereeChannelStateDesc: string;
    TransfereeCallerIDNum: string;
    TransfereeCallerIDName: string;
    TransfereeConnectedLineNum: string;
    TransfereeConnectedLineName: string;
    TransfereeAccountCode: string;
    TransfereeContext: string;
    TransfereeExten: string;
    TransfereePriority: string;
    TransfereeUniqueid: string;
    TransfereeLinkedid: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
    IsExternal: string;
    Context: string;
    Extension: string;
}
/**
 * ConfbridgeStart Event - Raised when a conference starts.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ConfbridgeStart }
 *
 * @property {string} Conference - The name of the Confbridge conference.
 * @property {string} BridgeUniqueid
 * @property {string} BridgeType - The type of bridge
 * @property {string} BridgeTechnology - Technology in use by the bridge
 * @property {string} BridgeCreator - Entity that created the bridge if applicable
 * @property {string} BridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} BridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventConfbridgeStart extends IAstEvent {
    Conference: string;
    BridgeUniqueid: string;
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string;
}
/**
 * BridgeMerge Event - Raised when two bridges are merged.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_BridgeMerge }
 *
 * @property {string} ToBridgeUniqueid
 * @property {string} ToBridgeType - The type of bridge
 * @property {string} ToBridgeTechnology - Technology in use by the bridge
 * @property {string} ToBridgeCreator - Entity that created the bridge if applicable
 * @property {string} ToBridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} ToBridgeNumChannels - Number of channels in the bridge
 * @property {string} FromBridgeUniqueid
 * @property {string} FromBridgeType - The type of bridge
 * @property {string} FromBridgeTechnology - Technology in use by the bridge
 * @property {string} FromBridgeCreator - Entity that created the bridge if applicable
 * @property {string} FromBridgeName - Name used to refer to the bridge by its BridgeCreator if applicable
 * @property {string} FromBridgeNumChannels - Number of channels in the bridge
 */
export interface IAstEventBridgeMerge extends IAstEvent {
    ToBridgeUniqueid: string;
    ToBridgeType: string;
    ToBridgeTechnology: string;
    ToBridgeCreator: string;
    ToBridgeName: string;
    ToBridgeNumChannels: string;
    FromBridgeUniqueid: string;
    FromBridgeType: string;
    FromBridgeTechnology: string;
    FromBridgeCreator: string;
    FromBridgeName: string;
    FromBridgeNumChannels: string;
}
/**
 * FAXSessionsComplete Event - Raised when all FAXSession events are completed for a FAXSessions command
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_FAXSessionsComplete }
 *
 * @property {string} Total - Count of FAXSession events sent in response to FAXSessions action
 * @property {string} [actionId] - Count of FAXSession events sent in response to FAXSessions action
 */
export interface IAstEventFAXSessionsComplete extends IAstEvent {
    Total: string;
    actionId?: string;
}
/**
 * ParkedCallGiveUp Event - Raised when a channel leaves a parking lot because it hung up without being answered.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ParkedCallGiveUp }
 *
 * @property {string} ParkeeChannel
 * @property {string} ParkeeChannelState - A numeric code for the channel's current state, related to ParkeeChannelStateDesc
 * @property {string} ParkeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkeeCallerIDNum
 * @property {string} ParkeeCallerIDName
 * @property {string} ParkeeConnectedLineNum
 * @property {string} ParkeeConnectedLineName
 * @property {string} ParkeeAccountCode
 * @property {string} ParkeeContext
 * @property {string} ParkeeExten
 * @property {string} ParkeePriority
 * @property {string} ParkeeUniqueid
 * @property {string} ParkeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerChannel
 * @property {string} ParkerChannelState - A numeric code for the channel's current state, related to ParkerChannelStateDesc
 * @property {string} ParkerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkerCallerIDNum
 * @property {string} ParkerCallerIDName
 * @property {string} ParkerConnectedLineNum
 * @property {string} ParkerConnectedLineName
 * @property {string} ParkerAccountCode
 * @property {string} ParkerContext
 * @property {string} ParkerExten
 * @property {string} ParkerPriority
 * @property {string} ParkerUniqueid
 * @property {string} ParkerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerDialString - Dial String that can be used to call back the parker on ParkingTimeout.
 * @property {string} Parkinglot - Name of the parking lot that the parkee is parked in
 * @property {string} ParkingSpace - Parking Space that the parkee is parked in
 * @property {string} ParkingTimeout - Time remaining until the parkee is forcefully removed from parking in seconds
 * @property {string} ParkingDuration - Time the parkee has been in the parking bridge (in seconds)
 */
export interface IAstEventParkedCallGiveUp extends IAstEvent {
    ParkeeChannel: string;
    ParkeeChannelState: string;
    ParkeeChannelStateDesc: string;
    ParkeeCallerIDNum: string;
    ParkeeCallerIDName: string;
    ParkeeConnectedLineNum: string;
    ParkeeConnectedLineName: string;
    ParkeeAccountCode: string;
    ParkeeContext: string;
    ParkeeExten: string;
    ParkeePriority: string;
    ParkeeUniqueid: string;
    ParkeeLinkedid: string;
    ParkerChannel: string;
    ParkerChannelState: string;
    ParkerChannelStateDesc: string;
    ParkerCallerIDNum: string;
    ParkerCallerIDName: string;
    ParkerConnectedLineNum: string;
    ParkerConnectedLineName: string;
    ParkerAccountCode: string;
    ParkerContext: string;
    ParkerExten: string;
    ParkerPriority: string;
    ParkerUniqueid: string;
    ParkerLinkedid: string;
    ParkerDialString: string;
    Parkinglot: string;
    ParkingSpace: string;
    ParkingTimeout: string;
    ParkingDuration: string;
}
/**
 * ParkedCall Event - Raised when a channel is parked.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ParkedCall }
 *
 * @property {string} ParkeeChannel
 * @property {string} ParkeeChannelState - A numeric code for the channel's current state, related to ParkeeChannelStateDesc
 * @property {string} ParkeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkeeCallerIDNum
 * @property {string} ParkeeCallerIDName
 * @property {string} ParkeeConnectedLineNum
 * @property {string} ParkeeConnectedLineName
 * @property {string} ParkeeAccountCode
 * @property {string} ParkeeContext
 * @property {string} ParkeeExten
 * @property {string} ParkeePriority
 * @property {string} ParkeeUniqueid
 * @property {string} ParkeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerDialString - Dial String that can be used to call back the parker on ParkingTimeout.
 * @property {string} Parkinglot - Name of the parking lot that the parkee is parked in
 * @property {string} ParkingSpace - Parking Space that the parkee is parked in
 * @property {string} ParkingTimeout - Time remaining until the parkee is forcefully removed from parking in seconds
 * @property {string} ParkingDuration - Time the parkee has been in the parking bridge (in seconds)
 */
export interface IAstEventParkedCall extends IAstEvent {
    ParkeeChannel: string;
    ParkeeChannelState: string;
    ParkeeChannelStateDesc: string;
    ParkeeCallerIDNum: string;
    ParkeeCallerIDName: string;
    ParkeeConnectedLineNum: string;
    ParkeeConnectedLineName: string;
    ParkeeAccountCode: string;
    ParkeeContext: string;
    ParkeeExten: string;
    ParkeePriority: string;
    ParkeeUniqueid: string;
    ParkeeLinkedid: string;
    ParkerDialString: string;
    Parkinglot: string;
    ParkingSpace: string;
    ParkingTimeout: string;
    ParkingDuration: string;
}
/**
 * ParkedCallSwap Event - Raised when a channel takes the place of a previously parked channel
 *
 * @description This event is raised when a channel initially parked in the parking lot is swapped out with a different channel.
 * The most common case for this is when an attended transfer to a parking lot occurs. The Parkee information in the event will indicate the party that was swapped into the parking lot.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ParkedCallSwap }
 *
 * @property {string} ParkeeChannel
 * @property {string} ParkeeChannelState - A numeric code for the channel's current state, related to ParkeeChannelStateDesc
 * @property {string} ParkeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkeeCallerIDNum
 * @property {string} ParkeeCallerIDName
 * @property {string} ParkeeConnectedLineNum
 * @property {string} ParkeeConnectedLineName
 * @property {string} ParkeeAccountCode
 * @property {string} ParkeeContext
 * @property {string} ParkeeExten
 * @property {string} ParkeePriority
 * @property {string} ParkeeUniqueid
 * @property {string} ParkeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerChannel
 * @property {string} ParkerChannelState - A numeric code for the channel's current state, related to ParkerChannelStateDesc
 * @property {string} ParkerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkerCallerIDNum
 * @property {string} ParkerCallerIDName
 * @property {string} ParkerConnectedLineNum
 * @property {string} ParkerConnectedLineName
 * @property {string} ParkerAccountCode
 * @property {string} ParkerContext
 * @property {string} ParkerExten
 * @property {string} ParkerPriority
 * @property {string} ParkerUniqueid
 * @property {string} ParkerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerDialString - Dial String that can be used to call back the parker on ParkingTimeout.
 * @property {string} Parkinglot - Name of the parking lot that the parkee is parked in
 * @property {string} ParkingSpace - Parking Space that the parkee is parked in
 * @property {string} ParkingTimeout - Time remaining until the parkee is forcefully removed from parking in seconds
 * @property {string} ParkingDuration - Time the parkee has been in the parking bridge (in seconds)
 */
export interface IAstEventParkedCallSwap extends IAstEvent {
    ParkeeChannel: string;
    ParkeeChannelState: string;
    ParkeeChannelStateDesc: string;
    ParkeeCallerIDNum: string;
    ParkeeCallerIDName: string;
    ParkeeConnectedLineNum: string;
    ParkeeConnectedLineName: string;
    ParkeeAccountCode: string;
    ParkeeContext: string;
    ParkeeExten: string;
    ParkeePriority: string;
    ParkeeUniqueid: string;
    ParkeeLinkedid: string;
    ParkerChannel: string;
    ParkerChannelState: string;
    ParkerChannelStateDesc: string;
    ParkerCallerIDNum: string;
    ParkerCallerIDName: string;
    ParkerConnectedLineNum: string;
    ParkerConnectedLineName: string;
    ParkerAccountCode: string;
    ParkerContext: string;
    ParkerExten: string;
    ParkerPriority: string;
    ParkerUniqueid: string;
    ParkerLinkedid: string;
    ParkerDialString: string;
    Parkinglot: string;
    ParkingSpace: string;
    ParkingTimeout: string;
    ParkingDuration: string;
}
/**
 * ParkedCallTimeOut Event - Raised when a channel leaves a parking lot due to reaching the time limit of being parked.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ParkedCallTimeOut }
 *
 * @property {string} ParkeeChannel
 * @property {string} ParkeeChannelState - A numeric code for the channel's current state, related to ParkeeChannelStateDesc
 * @property {string} ParkeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkeeCallerIDNum
 * @property {string} ParkeeCallerIDName
 * @property {string} ParkeeConnectedLineNum
 * @property {string} ParkeeConnectedLineName
 * @property {string} ParkeeAccountCode
 * @property {string} ParkeeContext
 * @property {string} ParkeeExten
 * @property {string} ParkeePriority
 * @property {string} ParkeeUniqueid
 * @property {string} ParkeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerChannel
 * @property {string} ParkerChannelState - A numeric code for the channel's current state, related to ParkerChannelStateDesc
 * @property {string} ParkerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkerCallerIDNum
 * @property {string} ParkerCallerIDName
 * @property {string} ParkerConnectedLineNum
 * @property {string} ParkerConnectedLineName
 * @property {string} ParkerAccountCode
 * @property {string} ParkerContext
 * @property {string} ParkerExten
 * @property {string} ParkerPriority
 * @property {string} ParkerUniqueid
 * @property {string} ParkerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerDialString - Dial String that can be used to call back the parker on ParkingTimeout.
 * @property {string} Parkinglot - Name of the parking lot that the parkee is parked in
 * @property {string} ParkingSpace - Parking Space that the parkee is parked in
 * @property {string} ParkingTimeout - Time remaining until the parkee is forcefully removed from parking in seconds
 * @property {string} ParkingDuration - Time the parkee has been in the parking bridge (in seconds)
 */
export interface IAstEventParkedCallTimeOut extends IAstEvent {
    ParkeeChannel: string;
    ParkeeChannelState: string;
    ParkeeChannelStateDesc: string;
    ParkeeCallerIDNum: string;
    ParkeeCallerIDName: string;
    ParkeeConnectedLineNum: string;
    ParkeeConnectedLineName: string;
    ParkeeAccountCode: string;
    ParkeeContext: string;
    ParkeeExten: string;
    ParkeePriority: string;
    ParkeeUniqueid: string;
    ParkeeLinkedid: string;
    ParkerChannel: string;
    ParkerChannelState: string;
    ParkerChannelStateDesc: string;
    ParkerCallerIDNum: string;
    ParkerCallerIDName: string;
    ParkerConnectedLineNum: string;
    ParkerConnectedLineName: string;
    ParkerAccountCode: string;
    ParkerContext: string;
    ParkerExten: string;
    ParkerPriority: string;
    ParkerUniqueid: string;
    ParkerLinkedid: string;
    ParkerDialString: string;
    Parkinglot: string;
    ParkingSpace: string;
    ParkingTimeout: string;
    ParkingDuration: string;
}
/**
 * PeerStatus Event - Raised when the state of a peer changes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_PeerStatus }
 *
 * @property {string} ChannelType - The channel technology of the peer.
 * @property {string} Peer - The name of the peer (including channel technology).
 * @property {string} PeerStatus -  * - * New * status * of * the * peer. * Unknown * Registered * Unregistered * Rejected * Lagged
 * @property {string} Cause - The reason the status has changed.
 * @property {string} Address - New address of the peer.
 * @property {string} Port - New port for the peer.
 * @property {string} Time - Time it takes to reach the peer and receive a response.
 */
export interface IAstEventPeerStatus extends IAstEvent {
    ChannelType: string;
    Peer: string;
    PeerStatus: string;
    Cause: string;
    Address: string;
    Port: string;
    Time: string;
}
/**
 * Pickup Event - Raised when a call pickup occurs.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Pickup }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} TargetChannel
 * @property {string} TargetChannelState - A numeric code for the channel's current state, related to TargetChannelStateDesc
 * @property {string} TargetChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} TargetCallerIDNum
 * @property {string} TargetCallerIDName
 * @property {string} TargetConnectedLineNum
 * @property {string} TargetConnectedLineName
 * @property {string} TargetAccountCode
 * @property {string} TargetContext
 * @property {string} TargetExten
 * @property {string} TargetPriority
 * @property {string} TargetUniqueid
 * @property {string} TargetLinkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventPickup extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    TargetChannel: string;
    TargetChannelState: string;
    TargetChannelStateDesc: string;
    TargetCallerIDNum: string;
    TargetCallerIDName: string;
    TargetConnectedLineNum: string;
    TargetConnectedLineName: string;
    TargetAccountCode: string;
    TargetContext: string;
    TargetExten: string;
    TargetPriority: string;
    TargetUniqueid: string;
    TargetLinkedid: string;
}
/**
 * PresenceStateChange Event - Raised when a presence state changes
 *
 * @description This differs from the PresenceStatus event because this event is raised for all presence state changes, not only for changes that affect dialplan hints.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_PresenceStateChange }
 *
 * @property {string} Presentity - The entity whose presence state has changed
 * @property {string} Status - The new status of the presentity
 * @property {string} Subtype - The new subtype of the presentity
 * @property {string} Message - The new message of the presentity
 */
export interface IAstEventPresenceStateChange extends IAstEvent {
    Presentity: string;
    Status: string;
    Subtype: string;
    Message: string;
}
/**
 * PresenceStateListComplete Event - Indicates the end of the list the current known extension states.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_PresenceStateListComplete }
 *
 * @property {string} ListItems - Conveys the number of statuses reported.
 */
export interface IAstEventPresenceStateListComplete extends IAstEvent {
    ListItems: string;
}
/**
 * PresenceStatus Event - Raised when a hint changes due to a presence state change.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_PresenceStatus }
 *
 * @property {string} Exten
 * @property {string} Context
 * @property {string} Hint
 * @property {string} Status
 * @property {string} Subtype
 * @property {string} Message
 */
export interface IAstEventPresenceStatus extends IAstEvent {
    Exten: string;
    Context: string;
    Hint: string;
    Status: string;
    Subtype: string;
    Message: string;
}
/**
 * QueueCallerAbandon Event - Raised when a caller abandons the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueCallerAbandon }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} Position - This channel's current position in the queue.
 * @property {string} OriginalPosition - The channel's original position in the queue.
 * @property {string} HoldTime - The time the channel was in the queue, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 */
export interface IAstEventQueueCallerAbandon extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Queue: string;
    Position: string;
    OriginalPosition: string;
    HoldTime: string;
}
/**
 * QueueCallerJoin Event - Raised when a caller joins a Queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueCallerJoin }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} Position - This channel's current position in the queue.
 * @property {string} Count - The total number of channels in the queue.
 */
export interface IAstEventQueueCallerJoin extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Queue: string;
    Position: string;
    Count: string;
}
/**
 * QueueCallerLeave Event - Raised when a caller leaves a Queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueCallerLeave }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Queue - The name of the queue.
 * @property {string} Count - The total number of channels in the queue.
 * @property {string} Position - This channel's current position in the queue.
 */
export interface IAstEventQueueCallerLeave extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Queue: string;
    Count: string;
    Position: string;
}
/**
 * QueueMemberAdded Event - Raised when a member is added to the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberAdded }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  0  -  AST_DEVICE_UNKNOWN  1  -  AST_DEVICE_NOT_INUSE  2  -  AST_DEVICE_INUSE  
 * 3  -  AST_DEVICE_BUSY  4  -  AST_DEVICE_INVALID  5  -  AST_DEVICE_UNAVAILABLE  6  -  AST_DEVICE_RINGING  7  -  AST_DEVICE_RINGINUSE  8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 */
export interface IAstEventQueueMemberAdded extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
}
/**
 * QueueMemberPause Event - Raised when a member is paused/unpaused in the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberPause }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  0  -  AST_DEVICE_UNKNOWN  1  -  AST_DEVICE_NOT_INUSE  2  -  AST_DEVICE_INUSE  
 * 3  -  AST_DEVICE_BUSY  4  -  AST_DEVICE_INVALID  5  -  AST_DEVICE_UNAVAILABLE  6  -  AST_DEVICE_RINGING  7  -  AST_DEVICE_RINGINUSE  8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 * @property {string} Reason - The reason a member was paused.
 */
export interface IAstEventQueueMemberPause extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
    Reason: string;
}
/**
 * QueueMemberPenalty Event - Raised when a member's penalty is changed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberPenalty }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  0  -  AST_DEVICE_UNKNOWN  1  -  AST_DEVICE_NOT_INUSE  2  -  AST_DEVICE_INUSE  
 * 3  -  AST_DEVICE_BUSY  4  -  AST_DEVICE_INVALID  5  -  AST_DEVICE_UNAVAILABLE  6  -  AST_DEVICE_RINGING  7  -  AST_DEVICE_RINGINUSE  8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 */
export interface IAstEventQueueMemberPenalty extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
}
/**
 * QueueMemberRemoved Event - Raised when a member is removed from the queue.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberRemoved }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  0  -  AST_DEVICE_UNKNOWN  1  -  AST_DEVICE_NOT_INUSE  2  -  AST_DEVICE_INUSE  
 * 3  -  AST_DEVICE_BUSY  4  -  AST_DEVICE_INVALID  5  -  AST_DEVICE_UNAVAILABLE  6  -  AST_DEVICE_RINGING  7  -  AST_DEVICE_RINGINUSE  8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 */
export interface IAstEventQueueMemberRemoved extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
}
/**
 * QueueMemberRinginuse Event - Raised when a member's ringinuse setting is changed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberRinginuse }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  0  -  AST_DEVICE_UNKNOWN  1  -  AST_DEVICE_NOT_INUSE  2  -  AST_DEVICE_INUSE  
 * 3  -  AST_DEVICE_BUSY  4  -  AST_DEVICE_INVALID  5  -  AST_DEVICE_UNAVAILABLE  6  -  AST_DEVICE_RINGING  7  -  AST_DEVICE_RINGINUSE  8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 */
export interface IAstEventQueueMemberRinginuse extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
}
/**
 * QueueMemberStatus Event - Raised when a Queue member's status has changed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_QueueMemberStatus }
 *
 * @property {string} Queue - The name of the queue.
 * @property {string} MemberName - The name of the queue member.
 * @property {string} Interface - The queue member's channel technology or location.
 * @property {string} StateInterface - Channel technology or location from which to read device state changes.
 * @property {string} Membership -  * dynamic * realtime * static
 * @property {string} Penalty - The penalty associated with the queue member.
 * @property {string} CallsTaken - The number of calls this queue member has serviced.
 * @property {string} LastCall - The time this member last took a call, expressed in seconds since 00:00, Jan 1, 1970 UTC.
 * @property {string} InCall -  * - * Set * to * 1 * if * member * is * in * call. * Set * to * 0 * after * LastCall * time * is * updated. * 0 * 1
 * @property {string} Status -   -  The  numeric  device  state  status  of  the  queue  member.  0  -  AST_DEVICE_UNKNOWN  1  -  AST_DEVICE_NOT_INUSE  2  -  AST_DEVICE_INUSE  
 * 3  -  AST_DEVICE_BUSY  4  -  AST_DEVICE_INVALID  5  -  AST_DEVICE_UNAVAILABLE  6  -  AST_DEVICE_RINGING  7  -  AST_DEVICE_RINGINUSE  8  -  AST_DEVICE_ONHOLD
 * @property {string} Paused -  * 0 * 1
 * @property {string} PausedReason - If set when paused, the reason the queue member was paused.
 * @property {string} Ringinuse -  * 0 * 1
 */
export interface IAstEventQueueMemberStatus extends IAstEvent {
    Queue: string;
    MemberName: string;
    Interface: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string;
    InCall: string;
    Status: string;
    Paused: string;
    PausedReason: string;
    Ringinuse: string;
}

export interface IAstEventQueueParams extends IAstEvent {
    Queue: string;
    Max: string;
    Strategy: string;
    Calls: string;
    Holdtime: string;
    TalkTime: string;
    Completed: string;
    Abandoned: string;
    ServiceLevel: string;
    ServicelevelPerf: string;
    Weight: string;
}

export interface IAstEventQueueMember extends IAstEvent {
    Queue: string;
    Name: string;
    Location: string;
    StateInterface: string;
    Membership: string;
    Penalty: string;
    CallsTaken: string;
    LastCall: string   ;
    InCall: string      ;
    Status: string       ;
    Paused: string;
    PausedReason: string  ;
}

export interface IAstEventQueueEntry extends IAstEvent {
    Queue: string;
    Position: string;
    Channel: string;
    Uniqueid: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    Wait: string;

}

/**
 * ReceiveFAX Event - Raised when a receive fax operation has completed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_ReceiveFAX }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalStationID - The value of the LOCALSTATIONID channel variable
 * @property {string} RemoteStationID - The value of the REMOTESTATIONID channel variable
 * @property {string} PagesTransferred - The number of pages that have been transferred
 * @property {string} Resolution - The negotiated resolution
 * @property {string} TransferRate - The negotiated transfer rate
 * @property {string} FileName - The files being affected by the fax operation
 */
export interface IAstEventReceiveFAX extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    LocalStationID: string;
    RemoteStationID: string;
    PagesTransferred: string;
    Resolution: string;
    TransferRate: string;
    FileName: string;
}
/**
 * Registry Event - Raised when an outbound registration completes.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Registry }
 *
 * @property {string} ChannelType - The type of channel that was registered (or not).
 * @property {string} Username - The username portion of the registration.
 * @property {string} Domain - The address portion of the registration.
 * @property {string} Status -  * - * The * status * of * the * registration * request. * Registered * Unregistered * Rejected * Failed
 * @property {string} Cause - What caused the rejection of the request, if available.
 */
export interface IAstEventRegistry extends IAstEvent {
    ChannelType: string;
    Username: string;
    Domain: string;
    Status: string;
    Cause: string;
}
/**
 * Reload Event - Raised when a module has been reloaded in Asterisk.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Reload }
 *
 * @property {string} Module - The name of the module that was reloaded, or All if all modules were reloaded
 * @property {string} Status -   -  The  numeric  status  code  denoting  the  success  or  failure  of  the  reload  request. 
 * 0  -  Success  1  -  Request  queued  2  -  Module  not  found  
 * 3  -  Error  4  -  Reload  already  in  progress  5  -  Module  uninitialized  6  -  Reload  not  supported
 */
export interface IAstEventReload extends IAstEvent {
    Module: string;
    Status: string;
}
/**
 * Rename Event - Raised when the name of a channel is changed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Rename }
 *
 * @property {string} Channel
 * @property {string} Newname
 * @property {string} Uniqueid
 */
export interface IAstEventRename extends IAstEvent {
    Channel: string;
    Newname: string;
    Uniqueid: string;
}
/**
 * RequestBadFormat Event - Raised when a request is received with bad formatting.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_RequestBadFormat }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The account ID associated with the rejected request.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} RequestType - The type of request attempted.
 * @property {string} [module] - The type of request attempted.
 * @property {string} [sessionTV] - The type of request attempted.
 * @property {string} [accountId] - The type of request attempted.
 * @property {string} [requestParams] - The type of request attempted.
 */
export interface IAstEventRequestBadFormat extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    RequestType: string;
    module?: string;
    sessionTV?: string;
    accountId?: string;
    requestParams?: string;
}
/**
 * RequestNotAllowed Event - Raised when a request is not allowed by the service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_RequestNotAllowed }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} RequestType - The type of request attempted.
 * @property {string} [module] - The type of request attempted.
 * @property {string} [sessionTV] - The type of request attempted.
 * @property {string} [requestParams] - The type of request attempted.
 */
export interface IAstEventRequestNotAllowed extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    RequestType: string;
    module?: string;
    sessionTV?: string;
    requestParams?: string;
}
/**
 * RequestNotSupported Event - Raised when a request fails due to some aspect of the requested item not being supported by the service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_RequestNotSupported }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} RequestType - The type of request attempted.
 * @property {string} [module] - The type of request attempted.
 * @property {string} [sessionTV] - The type of request attempted.
 */
export interface IAstEventRequestNotSupported extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    RequestType: string;
    module?: string;
    sessionTV?: string;
}
/**
 * RTCPReceived Event - Raised when an RTCP packet is received.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_RTCPReceived }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SSRC - The SSRC identifier for the remote system
 * @property {string} PT -  * - * The * type * of * packet * for * this * RTCP * report. * 200(SR) * 201(RR)
 * @property {string} From - The address the report was received from.
 * @property {string} RTT - Calculated Round-Trip Time in seconds
 * @property {string} ReportCount -   -  The  number  of  reports  that  were  received.  The  report  count  determines  the  number  of  ReportX  headers  in  the  message.  
 * The  X  for  each  set  of  report  headers  will  range  from  0  to  ReportCount  -  1.
 * @property {string} ReportXSourceSSRC - The SSRC for the source of this report block.
 * @property {string} ReportXFractionLost - The fraction of RTP data packets from ReportXSourceSSRC lost since the previous SR or RR report was sent.
 * @property {string} ReportXCumulativeLost - The total number of RTP data packets from ReportXSourceSSRC lost since the beginning of reception.
 * @property {string} ReportXHighestSequence - The highest sequence number received in an RTP data packet from ReportXSourceSSRC.
 * @property {string} ReportXSequenceNumberCycles - The number of sequence number cycles seen for the RTP data received from ReportXSourceSSRC.
 * @property {string} ReportXIAJitter - An estimate of the statistical variance of the RTP data packet interarrival time, measured in timestamp units.
 * @property {string} ReportXLSR - The last SR timestamp received from ReportXSourceSSRC. If no SR has been received from ReportXSourceSSRC, then 0.
 * @property {string} ReportXDLSR - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentNTP] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentRTP] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentPackets] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentOctets] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 */
export interface IAstEventRTCPReceived extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    SSRC: string;
    PT: string;
    From: string;
    RTT: string;
    ReportCount: string;
    ReportXSourceSSRC: string;
    ReportXFractionLost: string;
    ReportXCumulativeLost: string;
    ReportXHighestSequence: string;
    ReportXSequenceNumberCycles: string;
    ReportXIAJitter: string;
    ReportXLSR: string;
    ReportXDLSR: string;
    sentNTP?: string;
    sentRTP?: string;
    sentPackets?: string;
    sentOctets?: string;
}
/**
 * RTCPSent Event - Raised when an RTCP packet is sent.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_RTCPSent }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} SSRC - The SSRC identifier for our stream
 * @property {string} PT -  * - * The * type * of * packet * for * this * RTCP * report. * 200(SR) * 201(RR)
 * @property {string} To - The address the report is sent to.
 * @property {string} ReportCount -   -  The  number  of  reports  that  were  sent.  The  report  count  determines  the  number  of  ReportX  headers  in  the  message.  
 * The  X  for  each  set  of  report  headers  will  range  from  0  to  ReportCount  -  1.
 * @property {string} ReportXSourceSSRC - The SSRC for the source of this report block.
 * @property {string} ReportXFractionLost - The fraction of RTP data packets from ReportXSourceSSRC lost since the previous SR or RR report was sent.
 * @property {string} ReportXCumulativeLost - The total number of RTP data packets from ReportXSourceSSRC lost since the beginning of reception.
 * @property {string} ReportXHighestSequence - The highest sequence number received in an RTP data packet from ReportXSourceSSRC.
 * @property {string} ReportXSequenceNumberCycles - The number of sequence number cycles seen for the RTP data received from ReportXSourceSSRC.
 * @property {string} ReportXIAJitter - An estimate of the statistical variance of the RTP data packet interarrival time, measured in timestamp units.
 * @property {string} ReportXLSR - The last SR timestamp received from ReportXSourceSSRC. If no SR has been received from ReportXSourceSSRC, then 0.
 * @property {string} ReportXDLSR - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentNTP] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentRTP] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentPackets] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 * @property {string} [sentOctets] - The delay, expressed in units of 1/65536 seconds, between receiving the last SR packet from ReportXSourceSSRC and sending this report.
 */
export interface IAstEventRTCPSent extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    SSRC: string;
    PT: string;
    To: string;
    ReportCount: string;
    ReportXSourceSSRC: string;
    ReportXFractionLost: string;
    ReportXCumulativeLost: string;
    ReportXHighestSequence: string;
    ReportXSequenceNumberCycles: string;
    ReportXIAJitter: string;
    ReportXLSR: string;
    ReportXDLSR: string;
    sentNTP?: string;
    sentRTP?: string;
    sentPackets?: string;
    sentOctets?: string;
}
/**
 * SendFAX Event - Raised when a send fax operation has completed.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SendFAX }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} LocalStationID - The value of the LOCALSTATIONID channel variable
 * @property {string} RemoteStationID - The value of the REMOTESTATIONID channel variable
 * @property {string} PagesTransferred - The number of pages that have been transferred
 * @property {string} Resolution - The negotiated resolution
 * @property {string} TransferRate - The negotiated transfer rate
 * @property {string} FileName - The files being affected by the fax operation
 */
export interface IAstEventSendFAX extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    LocalStationID: string;
    RemoteStationID: string;
    PagesTransferred: string;
    Resolution: string;
    TransferRate: string;
    FileName: string;
}
/**
 * SessionLimit Event - Raised when a request fails due to exceeding the number of allowed concurrent sessions for that service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SessionLimit }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} [module] - The remote address of the entity that caused the security event to be raised.
 * @property {string} [sessionTV] - The remote address of the entity that caused the security event to be raised.
 */
export interface IAstEventSessionLimit extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    module?: string;
    sessionTV?: string;
}
/**
 * SessionTimeout Event - Raised when a SIP session times out.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SessionTimeout }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Source -  * - * The * source * of * the * session * timeout. * RTPTimeout * SIPSessionTimer
 */
export interface IAstEventSessionTimeout extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Source: string;
}
/**
 * Shutdown Event - Raised when Asterisk is shutdown or restarted.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Shutdown }
 *
 * @property {string} Shutdown -   -  Whether  the  shutdown  is  proceeding  cleanly  (all  channels  were  hungup  successfully)  or  uncleanly  (channels  will  be  terminated)
 * Uncleanly  Cleanly
 * @property {string} Restart -  * - * Whether * or * not * a * restart * will * occur. * True * False
 */
export interface IAstEventShutdown extends IAstEvent {
    Shutdown: string;
    Restart: string;
}
/**
 * SIPQualifyPeerDone Event - Raised when SIPQualifyPeer has finished qualifying the specified peer.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SIPQualifyPeerDone }
 *
 * @property {string} Peer - The name of the peer.
 */
export interface IAstEventSIPQualifyPeerDone extends IAstEvent {
    Peer: string;
    ActionID: string;
}
/**
 * SoftHangupRequest Event - Raised when a soft hangup is requested with a specific cause code.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SoftHangupRequest }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Cause - A numeric cause code for why the channel was hung up.
 */
export interface IAstEventSoftHangupRequest extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Cause: string;
}
/**
 * SpanAlarmClear Event - Raised when an alarm is cleared on a DAHDI span.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SpanAlarmClear }
 *
 * @property {string} Span - The span on which the alarm was cleared.
 */
export interface IAstEventSpanAlarmClear extends IAstEvent {
    Span: string;
}
/**
 * SpanAlarm Event - Raised when an alarm is set on a DAHDI span.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SpanAlarm }
 *
 * @property {string} Span - The span on which the alarm occurred.
 * @property {string} Alarm - A textual description of the alarm that occurred.
 */
export interface IAstEventSpanAlarm extends IAstEvent {
    Span: string;
    Alarm: string;
}
/**
 * StatusComplete Event - Raised in response to a Status command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_StatusComplete }
 *
 * @property {string} Items - Number of Status events returned
 */
export interface IAstEventStatusComplete extends IAstEvent {
    Items: string;
}
/**
 * Status Event - Raised in response to a Status command.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Status }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid
 * @property {string} Type - Type of channel
 * @property {string} DNID - Dialed number identifier
 * @property {string} TimeToHangup - Absolute lifetime of the channel
 * @property {string} BridgeID - Identifier of the bridge the channel is in, may be empty if not in one
 * @property {string} Application - Application currently executing on the channel
 * @property {string} Data - Data given to the currently executing channel
 * @property {string} Nativeformats - Media formats the connected party is willing to send or receive
 * @property {string} Readformat - Media formats that frames from the channel are received in
 * @property {string} Readtrans - Translation path for media received in native formats
 * @property {string} Writeformat - Media formats that frames to the channel are accepted in
 * @property {string} Writetrans - Translation path for media sent to the connected party
 * @property {string} Callgroup - Configured call group on the channel
 * @property {string} Pickupgroup - Configured pickup group on the channel
 * @property {string} Seconds - Number of seconds the channel has been active
 * @property {string} [actionId] - Number of seconds the channel has been active
 */
export interface IAstEventStatus extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Type: string;
    DNID: string;
    TimeToHangup: string;
    BridgeID: string;
    Application: string;
    Data: string;
    Nativeformats: string;
    Readformat: string;
    Readtrans: string;
    Writeformat: string;
    Writetrans: string;
    Callgroup: string;
    Pickupgroup: string;
    Seconds: string;
    actionId?: string;
}
/**
 * SuccessfulAuth Event - Raised when a request successfully authenticates with a service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_SuccessfulAuth }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} UsingPassword - Whether or not the authentication attempt included a password.
 * @property {string} [module] - Whether or not the authentication attempt included a password.
 * @property {string} [sessionTV] - Whether or not the authentication attempt included a password.
 */
export interface IAstEventSuccessfulAuth extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    UsingPassword: string;
    module?: string;
    sessionTV?: string;
}
/**
 * TransportDetail Event - Provide details about an authentication section.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_TransportDetail }
 *
 * @property {string} ObjectType - The object's type. This will always be "transport".
 * @property {string} ObjectName - The name of this object.
 * @property {string} Protocol - Protocol to use for SIP traffic
 * @property {string} Bind - IP Address and optional port to bind to for this transport
 * @property {string} AsycOperations - Number of simultaneous Asynchronous Operations
 * @property {string} CaListFile - File containing a list of certificates to read (TLS ONLY)
 * @property {string} CaListPath - Path to directory containing a list of certificates to read (TLS ONLY)
 * @property {string} CertFile - Certificate file for endpoint (TLS ONLY)
 * @property {string} PrivKeyFile - Private key file (TLS ONLY)
 * @property {string} Password - Password required for transport
 * @property {string} ExternalSignalingAddress - External address for SIP signalling
 * @property {string} ExternalSignalingPort - External port for SIP signalling
 * @property {string} ExternalMediaAddress - External IP address to use in RTP handling
 * @property {string} Domain - Domain the transport comes from
 * @property {string} VerifyServer - Require verification of server certificate (TLS ONLY)
 * @property {string} VerifyClient - Require verification of client certificate (TLS ONLY)
 * @property {string} RequireClientCert - Require client certificate (TLS ONLY)
 * @property {string} Method - Method of SSL transport (TLS ONLY)
 * @property {string} Cipher - Preferred cryptography cipher names (TLS ONLY)
 * @property {string} LocalNet - Network to consider local (used for NAT purposes).
 * @property {string} Tos - Enable TOS for the signalling sent over this transport
 * @property {string} Cos - Enable COS for the signalling sent over this transport
 * @property {string} WebsocketWriteTimeout - The timeout (in milliseconds) to set on WebSocket connections.
 * @property {string} EndpointName - The name of the endpoint associated with this information.
 */
export interface IAstEventTransportDetail extends IAstEvent {
    ObjectType: string;
    ObjectName: string;
    Protocol: string;
    Bind: string;
    AsycOperations: string;
    CaListFile: string;
    CaListPath: string;
    CertFile: string;
    PrivKeyFile: string;
    Password: string;
    ExternalSignalingAddress: string;
    ExternalSignalingPort: string;
    ExternalMediaAddress: string;
    Domain: string;
    VerifyServer: string;
    VerifyClient: string;
    RequireClientCert: string;
    Method: string;
    Cipher: string;
    LocalNet: string;
    Tos: string;
    Cos: string;
    WebsocketWriteTimeout: string;
    EndpointName: string;
}
/**
 * UnexpectedAddress Event - Raised when a request has a different source address then what is expected for a session already in progress with a service.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_UnexpectedAddress }
 *
 * @property {string} Severity -  * - * A * relative * severity * of * the * security * event. * Informational * Error
 * @property {string} Service - The Asterisk service that raised the security event.
 * @property {string} AccountID - The Service account associated with the security event notification.
 * @property {string} SessionID - A unique identifier for the session in the service that raised the event.
 * @property {string} LocalAddress - The address of the Asterisk service that raised the security event.
 * @property {string} RemoteAddress - The remote address of the entity that caused the security event to be raised.
 * @property {string} ExpectedAddress - The address that the request was expected to use.
 * @property {string} [module] - The address that the request was expected to use.
 * @property {string} [sessionTV] - The address that the request was expected to use.
 */
export interface IAstEventUnexpectedAddress extends IAstEvent {
    Severity: string;
    Service: string;
    AccountID: string;
    SessionID: string;
    LocalAddress: string;
    RemoteAddress: string;
    ExpectedAddress: string;
    module?: string;
    sessionTV?: string;
}
/**
 * Unhold Event - Raised when a channel goes off hold.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_Unhold }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventUnhold extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
}
/**
 * UnParkedCall Event - Raised when a channel leaves a parking lot because it was retrieved from the parking lot and reconnected.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_UnParkedCall }
 *
 * @property {string} ParkeeChannel
 * @property {string} ParkeeChannelState - A numeric code for the channel's current state, related to ParkeeChannelStateDesc
 * @property {string} ParkeeChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkeeCallerIDNum
 * @property {string} ParkeeCallerIDName
 * @property {string} ParkeeConnectedLineNum
 * @property {string} ParkeeConnectedLineName
 * @property {string} ParkeeAccountCode
 * @property {string} ParkeeContext
 * @property {string} ParkeeExten
 * @property {string} ParkeePriority
 * @property {string} ParkeeUniqueid
 * @property {string} ParkeeLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerChannel
 * @property {string} ParkerChannelState - A numeric code for the channel's current state, related to ParkerChannelStateDesc
 * @property {string} ParkerChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} ParkerCallerIDNum
 * @property {string} ParkerCallerIDName
 * @property {string} ParkerConnectedLineNum
 * @property {string} ParkerConnectedLineName
 * @property {string} ParkerAccountCode
 * @property {string} ParkerContext
 * @property {string} ParkerExten
 * @property {string} ParkerPriority
 * @property {string} ParkerUniqueid
 * @property {string} ParkerLinkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} ParkerDialString - Dial String that can be used to call back the parker on ParkingTimeout.
 * @property {string} Parkinglot - Name of the parking lot that the parkee is parked in
 * @property {string} ParkingSpace - Parking Space that the parkee is parked in
 * @property {string} ParkingTimeout - Time remaining until the parkee is forcefully removed from parking in seconds
 * @property {string} ParkingDuration - Time the parkee has been in the parking bridge (in seconds)
 * @property {string} RetrieverChannel
 * @property {string} RetrieverChannelState - A numeric code for the channel's current state, related to RetrieverChannelStateDesc
 * @property {string} RetrieverChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} RetrieverCallerIDNum
 * @property {string} RetrieverCallerIDName
 * @property {string} RetrieverConnectedLineNum
 * @property {string} RetrieverConnectedLineName
 * @property {string} RetrieverAccountCode
 * @property {string} RetrieverContext
 * @property {string} RetrieverExten
 * @property {string} RetrieverPriority
 * @property {string} RetrieverUniqueid
 * @property {string} RetrieverLinkedid - Uniqueid of the oldest channel associated with this channel.
 */
export interface IAstEventUnParkedCall extends IAstEvent {
    ParkeeChannel: string;
    ParkeeChannelState: string;
    ParkeeChannelStateDesc: string;
    ParkeeCallerIDNum: string;
    ParkeeCallerIDName: string;
    ParkeeConnectedLineNum: string;
    ParkeeConnectedLineName: string;
    ParkeeAccountCode: string;
    ParkeeContext: string;
    ParkeeExten: string;
    ParkeePriority: string;
    ParkeeUniqueid: string;
    ParkeeLinkedid: string;
    ParkerChannel: string;
    ParkerChannelState: string;
    ParkerChannelStateDesc: string;
    ParkerCallerIDNum: string;
    ParkerCallerIDName: string;
    ParkerConnectedLineNum: string;
    ParkerConnectedLineName: string;
    ParkerAccountCode: string;
    ParkerContext: string;
    ParkerExten: string;
    ParkerPriority: string;
    ParkerUniqueid: string;
    ParkerLinkedid: string;
    ParkerDialString: string;
    Parkinglot: string;
    ParkingSpace: string;
    ParkingTimeout: string;
    ParkingDuration: string;
    RetrieverChannel: string;
    RetrieverChannelState: string;
    RetrieverChannelStateDesc: string;
    RetrieverCallerIDNum: string;
    RetrieverCallerIDName: string;
    RetrieverConnectedLineNum: string;
    RetrieverConnectedLineName: string;
    RetrieverAccountCode: string;
    RetrieverContext: string;
    RetrieverExten: string;
    RetrieverPriority: string;
    RetrieverUniqueid: string;
    RetrieverLinkedid: string;
}
/**
 * UserEvent Event - A user defined event raised from the dialplan.
 *
 * @description Event may contain additional arbitrary parameters in addition to optional bridge and endpoint snapshots. Multiple snapshots of the same type are prefixed with a numeric value.
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_UserEvent }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} UserEvent - The event name, as specified in the dialplan.
 */
export interface IAstEventUserEvent extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    UserEvent: string;
}
/**
 * VarSet Event - Raised when a variable local to the gosub stack frame is set due to a subroutine call.
 *
 * @description Syntax
 * @see See {@link https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+ManagerEvent_VarSet }
 *
 * @property {string} Channel
 * @property {string} ChannelState - A numeric code for the channel's current state, related to ChannelStateDesc
 * @property {string} ChannelStateDesc -  * Down * Rsrvd * OffHook * Dialing * Ring * Ringing * Up * Busy * Dialing * Offhook * Pre-ring * Unknown
 * @property {string} CallerIDNum
 * @property {string} CallerIDName
 * @property {string} ConnectedLineNum
 * @property {string} ConnectedLineName
 * @property {string} AccountCode
 * @property {string} Context
 * @property {string} Exten
 * @property {string} Priority
 * @property {string} Uniqueid
 * @property {string} Linkedid - Uniqueid of the oldest channel associated with this channel.
 * @property {string} Variable -  * - * The * LOCAL * variable * being * set. * Note * Icon * The * variable * name * will * always * be * enclosed * with * LOCAL()
 * @property {string} Value - The new value of the variable.
 */
export interface IAstEventVarSet extends IAstEvent {
    Channel: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
    Uniqueid: string;
    Linkedid: string;
    Variable: string;
    Value: string;
}

////
export interface IAstEventNewConnectedLine extends IAstEvent {
    Channel: string;
    Uniqueid: string;
    Linkedid: string;
    ChannelState: string;
    ChannelStateDesc: string;
    CallerIDNum: string;
    CallerIDName: string;
    ConnectedLineNum: string;
    ConnectedLineName: string;
    Language: string;
    AccountCode: string;
    Context: string;
    Exten: string;
    Priority: string;
}
