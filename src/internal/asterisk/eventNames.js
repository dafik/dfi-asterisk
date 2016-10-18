"use strict";
exports.AST_EVENT = {
    AGENTS: "Agents",
    AGENTS_COMPLETE: "AgentsComplete",
    AGENT_CALLED: "AgentCalled",
    AGENT_COMPLETE: "AgentComplete",
    AGENT_CONNECT: "AgentConnect",
    AGENT_DUMP: "AgentDump",
    AGENT_LOGIN: "AgentLogin",
    AGENT_LOGOFF: "AgentLogoff",
    AGENT_RING_NO_ANSWER: "AgentRingNoAnswer",
    AGI_EXEC_END: "AGIExecEnd",
    AGI_EXEC_START: "AGIExecStart",
    ALARM: "Alarm",
    ALARM_CLEAR: "AlarmClear",
    AOC_D: "AOC_D",
    AOC_E: "AOC_E",
    AOC_S: "AOC_S",
    AOR_DETAIL: "AorDetail",
    ASYNC_AGI_END: "AsyncAGIEnd",
    ASYNC_AGI_EXEC: "AsyncAGIExec",
    ASYNC_AGI_START: "AsyncAGIStart",
    ATTENDED_TRANSFER: "AttendedTransfer",
    AUTH_DETAIL: "AuthDetail",
    AUTH_METHOD_NOT_ALLOWED: "AuthMethodNotAllowed",
    BLIND_TRANSFER: "BlindTransfer",
    BRIDGE_CREATE: "BridgeCreate",
    BRIDGE_DESTROY: "BridgeDestroy",
    BRIDGE_ENTER: "BridgeEnter",
    BRIDGE_INFO_CHANNEL: "BridgeInfoChannel",
    BRIDGE_INFO_COMPLETE: "BridgeInfoComplete",
    BRIDGE_LEAVE: "BridgeLeave",
    BRIDGE_LIST_ITEM: "BridgeListItem",
    BRIDGE_MERGE: "BridgeMerge",
    CDR: "Cdr",
    CEL: "CEL",
    CHALLENGE_RESPONSE_FAILED: "ChallengeResponseFailed",
    CHALLENGE_SENT: "ChallengeSent",
    CHANNEL_TALKING_START: "ChannelTalkingStart",
    CHANNEL_TALKING_STOP: "ChannelTalkingStop",
    CHAN_SPY_START: "ChanSpyStart",
    CHAN_SPY_STOP: "ChanSpyStop",
    CONFBRIDGE_END: "ConfbridgeEnd",
    CONFBRIDGE_JOIN: "ConfbridgeJoin",
    CONFBRIDGE_LEAVE: "ConfbridgeLeave",
    CONFBRIDGE_MUTE: "ConfbridgeMute",
    CONFBRIDGE_RECORD: "ConfbridgeRecord",
    CONFBRIDGE_START: "ConfbridgeStart",
    CONFBRIDGE_STOP_RECORD: "ConfbridgeStopRecord",
    CONFBRIDGE_TALKING: "ConfbridgeTalking",
    CONFBRIDGE_UNMUTE: "ConfbridgeUnmute",
    CONTACT_STATUS: "ContactStatus",
    CONTACT_STATUS_DETAIL: "ContactStatusDetail",
    CORE_SHOW_CHANNEL: "CoreShowChannel",
    CORE_SHOW_CHANNELS_COMPLETE: "CoreShowChannelsComplete",
    DAHDI_CHANNEL: "DAHDIChannel",
    DAHDI_SHOW_CHANNELS: "DAHDIShowChannels",
    DEVICE_STATE_CHANGE: "DeviceStateChange",
    DEVICE_STATE_LIST_COMPLETE: "DeviceStateListComplete",
    DIAL_BEGIN: "DialBegin",
    DIAL_END: "DialEnd",
    DND_STATE: "DNDState",
    DTMF_BEGIN: "DTMFBegin",
    DTMF_END: "DTMFEnd",
    ENDPOINT_DETAIL: "EndpointDetail",
    ENDPOINT_DETAIL_COMPLETE: "EndpointDetailComplete",
    ENDPOINT_LIST: "EndpointList",
    ENDPOINT_LIST_COMPLETE: "EndpointListComplete",
    EXTENSION_STATE_LIST_COMPLETE: "ExtensionStateListComplete",
    EXTENSION_STATUS: "ExtensionStatus",
    FAILED_ACL: "FailedACL",
    FAX_SESSION: "FAXSession",
    FAX_SESSIONS_COMPLETE: "FAXSessionsComplete",
    FAX_SESSIONS_ENTRY: "FAXSessionsEntry",
    FAX_STATS: "FAXStats",
    FAX_STATUS: "FAXStatus",
    FULLY_BOOTED: "FullyBooted",
    HANGUP: "Hangup",
    HANGUP_HANDLER_POP: "HangupHandlerPop",
    HANGUP_HANDLER_PUSH: "HangupHandlerPush",
    HANGUP_HANDLER_RUN: "HangupHandlerRun",
    HANGUP_REQUEST: "HangupRequest",
    HOLD: "Hold",
    IDENTIFY_DETAIL: "IdentifyDetail",
    INVALID_ACCOUNT_ID: "InvalidAccountID",
    INVALID_PASSWORD: "InvalidPassword",
    INVALID_TRANSPORT: "InvalidTransport",
    LOAD_AVERAGE_LIMIT: "LoadAverageLimit",
    LOCAL_BRIDGE: "LocalBridge",
    LOCAL_OPTIMIZATION_BEGIN: "LocalOptimizationBegin",
    LOCAL_OPTIMIZATION_END: "LocalOptimizationEnd",
    LOG_CHANNEL: "LogChannel",
    MCID: "MCID",
    MEETME_END: "MeetmeEnd",
    MEETME_JOIN: "MeetmeJoin",
    MEETME_LEAVE: "MeetmeLeave",
    MEETME_MUTE: "MeetmeMute",
    MEETME_TALKING: "MeetmeTalking",
    MEETME_TALK_REQUEST: "MeetmeTalkRequest",
    MEMORY_LIMIT: "MemoryLimit",
    MESSAGE_WAITING: "MessageWaiting",
    MINI_VOICE_MAIL: "MiniVoiceMail",
    MONITOR_START: "MonitorStart",
    MONITOR_STOP: "MonitorStop",
    MUSIC_ON_HOLD_START: "MusicOnHoldStart",
    MUSIC_ON_HOLD_STOP: "MusicOnHoldStop",
    MWI_GET: "MWIGet",
    MWI_GET_COMPLETE: "MWIGetComplete",
    NEW_ACCOUNT_CODE: "NewAccountCode",
    NEW_CALLERID: "NewCallerid",
    NEW_CHANNEL: "Newchannel",
    NEW_CONNECTED_LINE: "NewConnectedLine",
    NEW_EXTEN: "NewExten",
    NEW_STATE: "Newstate",
    ORIGINATE_RESPONSE: "OriginateResponse",
    PARKED_CALL: "ParkedCall",
    PARKED_CALL_GIVE_UP: "ParkedCallGiveUp",
    PARKED_CALL_SWAP: "ParkedCallSwap",
    PARKED_CALL_TIME_OUT: "ParkedCallTimeOut",
    PEER_ENTRY: "PeerEntry",
    PEER_IAX_ENTRY: "PeerIAXEntry",
    PEER_SIP_ENTRY: "PeerSIPEntry",
    PEER_STATUS: "PeerStatus",
    PICKUP: "Pickup",
    PRESENCE_STATE_CHANGE: "PresenceStateChange",
    PRESENCE_STATE_LIST_COMPLETE: "PresenceStateListComplete",
    PRESENCE_STATUS: "PresenceStatus",
    QUEUE_CALLER_ABANDON: "QueueCallerAbandon",
    QUEUE_CALLER_JOIN: "QueueCallerJoin",
    QUEUE_CALLER_LEAVE: "QueueCallerLeave",
    QUEUE_ENTRY: "QueueEntry",
    QUEUE_MEMBER: "QueueMember",
    QUEUE_MEMBER_ADDED: "QueueMemberAdded",
    QUEUE_MEMBER_PAUSE: "QueueMemberPause",
    QUEUE_MEMBER_PENALTY: "QueueMemberPenalty",
    QUEUE_MEMBER_REMOVED: "QueueMemberRemoved",
    QUEUE_MEMBER_RINGINUSE: "QueueMemberRinginuse",
    QUEUE_MEMBER_STATUS: "QueueMemberStatus",
    QUEUE_PARAMS: "QueueParams",
    RECEIVE_FAX: "ReceiveFAX",
    REGISTRY: "Registry",
    RELOAD: "Reload",
    RENAME: "Rename",
    REQUEST_BAD_FORMAT: "RequestBadFormat",
    REQUEST_NOT_ALLOWED: "RequestNotAllowed",
    REQUEST_NOT_SUPPORTED: "RequestNotSupported",
    RTCP_RECEIVED: "RTCPReceived",
    RTCP_SENT: "RTCPSent",
    SEND_FAX: "SendFAX",
    SESSION_LIMIT: "SessionLimit",
    SESSION_TIMEOUT: "SessionTimeout",
    SHUTDOWN: "Shutdown",
    SIP_QUALIFY_PEER_DONE: "SIPQualifyPeerDone",
    SOFT_HANGUP_REQUEST: "SoftHangupRequest",
    SPAN_ALARM: "SpanAlarm",
    SPAN_ALARM_CLEAR: "SpanAlarmClear",
    STATUS: "Status",
    STATUS_COMPLETE: "StatusComplete",
    SUCCESSFUL_AUTH: "SuccessfulAuth",
    TRANSPORT_DETAIL: "TransportDetail",
    UNEXPECTED_ADDRESS: "UnexpectedAddress",
    UNHOLD: "Unhold",
    UN_PARKED_CALL: "UnParkedCall",
    USER_EVENT: "UserEvent",
    VAR_SET: "VarSet"
};
//# sourceMappingURL=eventNames.js.map