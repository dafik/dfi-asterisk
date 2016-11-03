"use strict";
const AST_ACTION = {
    ABSOLUTE_TIMEOUT: "AbsoluteTimeout",
    AGENTS: "Agents",
    AGENT_LOGOFF: "AgentLogoff",
    AGI: "AGI",
    AOCM_ESSAGE: "AOCMessage",
    ATXFER: "Atxfer",
    BLIND_TRANSFER: "BlindTransfer",
    BRIDGE: "Bridge",
    BRIDGE_DESTROY: "BridgeDestroy",
    BRIDGE_INFO: "BridgeInfo",
    BRIDGE_KICK: "BridgeKick",
    BRIDGE_LIST: "BridgeList",
    BRIDGE_TECHNOLOGY_LIST: "BridgeTechnologyList",
    BRIDGE_TECHNOLOGY_SUSPEND: "BridgeTechnologySuspend",
    BRIDGE_TECHNOLOGY_UNSUSPEND: "BridgeTechnologyUnsuspend",
    CHALLENGE: "Challenge",
    CHANGE_MONITOR: "ChangeMonitor",
    COMMAND: "Command",
    CONFBRIDGE_KICK: "ConfbridgeKick",
    CONFBRIDGE_LIST: "ConfbridgeList",
    CONFBRIDGE_LIST_ROOMS: "ConfbridgeListRooms",
    CONFBRIDGE_LOCK: "ConfbridgeLock",
    CONFBRIDGE_MUTE: "ConfbridgeMute",
    CONFBRIDGE_SET_SINGLE_VIDEO_SRC: "ConfbridgeSetSingleVideoSrc",
    CONFBRIDGE_START_RECORD: "ConfbridgeStartRecord",
    CONFBRIDGE_STOP_RECORD: "ConfbridgeStopRecord",
    CONFBRIDGE_UNLOCK: "ConfbridgeUnlock",
    CONFBRIDGE_UNMUTE: "ConfbridgeUnmute",
    CONTROL_PLAYBACK: "ControlPlayback",
    CORE_SETTINGS: "CoreSettings",
    CORE_SHOW_CHANNELS: "CoreShowChannels",
    CORE_STATUS: "CoreStatus",
    CREATE_CONFIG: "CreateConfig",
    DAHDI_DIAL_OFFHOOK: "DAHDIDialOffhook",
    DAHDI_DND_OFF: "DAHDIDNDoff",
    DAHDI_DND_ON: "DAHDIDNDon",
    DAHDI_HANGUP: "DAHDIHangup",
    DAHDI_RESTART: "DAHDIRestart",
    DAHDI_SHOW_CHANNELS: "DAHDIShowChannels",
    DAHDI_TRANSFER: "DAHDITransfer",
    DATA_GET: "DataGet",
    DB_DEL: "DBDel",
    DB_DEL_TREE: "DBDelTree",
    DB_GET: "DBGet",
    DB_PUT: "DBPut",
    DEVICE_STATE_LIST: "DeviceStateList",
    DIALPLAN_EXTENSION_ADD: "DialplanExtensionAdd",
    DIALPLAN_EXTENSION_REMOVE: "DialplanExtensionRemove",
    EVENTS: "Events",
    EXTENSION_STATE: "ExtensionState",
    EXTENSION_STATE_LIST: "ExtensionStateList",
    FAXS_ESSION: "FAXSession",
    FAXS_ESSIONS: "FAXSessions",
    FAXS_TATS: "FAXStats",
    FILTER: "Filter",
    FILTER_LIST: "FilterList",
    GET_CONFIG: "GetConfig",
    GET_CONFIG_JSON: "GetConfigJSON",
    GET_VAR: "Getvar",
    HANGUP: "Hangup",
    IAX_NETSTATS: "IAXnetstats",
    IAX_PEERLIST: "IAXpeerlist",
    IAX_PEERS: "IAXpeers",
    IAX_REGISTRY: "IAXregistry",
    LIST_CATEGORIES: "ListCategories",
    LIST_COMMANDS: "ListCommands",
    LOCAL_OPTIMIZE_AWAY: "LocalOptimizeAway",
    LOGGER_ROTATE: "LoggerRotate",
    LOGIN: "Login",
    LOGOFF: "Logoff",
    MAILBOX_COUNT: "MailboxCount",
    MAILBOX_STATUS: "MailboxStatus",
    MEETME_LIST: "MeetmeList",
    MEETME_LIST_ROOMS: "MeetmeListRooms",
    MEETME_MUTE: "MeetmeMute",
    MEETME_UNMUTE: "MeetmeUnmute",
    MESSAGE_SEND: "MessageSend",
    MIX_MONITOR: "MixMonitor",
    MIX_MONITOR_MUTE: "MixMonitorMute",
    MODULE_CHECK: "ModuleCheck",
    MODULE_LOAD: "ModuleLoad",
    MONITOR: "Monitor",
    MUTE_AUDIO: "MuteAudio",
    MWI_DELETE: "MWIDelete",
    MWI_GET: "MWIGet",
    MWI_UPDATE: "MWIUpdate",
    ORIGINATE: "Originate",
    PARK: "Park",
    PARKED_CALLS: "ParkedCalls",
    PARKINGLOTS: "Parkinglots",
    PAUSE_MONITOR: "PauseMonitor",
    PING: "Ping",
    PJSIP_NOTIFY: "PJSIPNotify",
    PJSIP_QUALIFY: "PJSIPQualify",
    PJSIP_REGISTER: "PJSIPRegister",
    PJSIP_SHOW_ENDPOINT: "PJSIPShowEndpoint",
    PJSIP_SHOW_ENDPOINTS: "PJSIPShowEndpoints",
    PJSIP_SHOW_REGISTRATIONS_INBOUND: "PJSIPShowRegistrationsInbound",
    PJSIP_SHOW_REGISTRATIONS_OUTBOUND: "PJSIPShowRegistrationsOutbound",
    PJSIP_SHOW_RESOURCE_LISTS: "PJSIPShowResourceLists",
    PJSIP_SHOW_SUBSCRIPTIONS_INBOUND: "PJSIPShowSubscriptionsInbound",
    PJSIP_SHOW_SUBSCRIPTIONS_OUTBOUND: "PJSIPShowSubscriptionsOutbound",
    PJSIP_UNREGISTER: "PJSIPUnregister",
    PLAY_DTMF: "PlayDTMF",
    PRESENCE_STATE: "PresenceState",
    PRESENCE_STATE_LIST: "PresenceStateList",
    PRI_DEBUG_FILE_SET: "PRIDebugFileSet",
    PRI_DEBUG_FILE_UNSET: "PRIDebugFileUnset",
    PRI_DEBUG_SET: "PRIDebugSet",
    PRI_SHOW_SPANS: "PRIShowSpans",
    QUEUES: "Queues",
    QUEUE_ADD: "QueueAdd",
    QUEUE_LOG: "QueueLog",
    QUEUE_MEMBER_RING_IN_USE: "QueueMemberRingInUse",
    QUEUE_PAUSE: "QueuePause",
    QUEUE_PENALTY: "QueuePenalty",
    QUEUE_RELOAD: "QueueReload",
    QUEUE_REMOVE: "QueueRemove",
    QUEUE_RESET: "QueueReset",
    QUEUE_RULE: "QueueRule",
    QUEUE_STATUS: "QueueStatus",
    QUEUE_SUMMARY: "QueueSummary",
    REDIRECT: "Redirect",
    RELOAD: "Reload",
    SEND_TEXT: "SendText",
    SET_VAR: "Setvar",
    SHOW_DIALPLAN: "ShowDialPlan",
    SIP_NOTIFY: "SIPnotify",
    SIP_PEERS: "SIPpeers",
    SIP_PEERSTATUS: "SIPpeerstatus",
    SIP_QUALIFYPEER: "SIPqualifypeer",
    SIP_SHOWPEER: "SIPshowpeer",
    SIP_SHOWREGISTRY: "SIPshowregistry",
    SKINNY_DEVICES: "SKINNYdevices",
    SKINNY_LINES: "SKINNYlines",
    SKINNY_SHOWDEVICE: "SKINNYshowdevice",
    SKINNY_SHOWLINE: "SKINNYshowline",
    SORCERY_MEMORY_CACHE_EXPIRE: "SorceryMemoryCacheExpire",
    SORCERY_MEMORY_CACHE_EXPIRE_OBJECT: "SorceryMemoryCacheExpireObject",
    SORCERY_MEMORY_CACHE_POPULATE: "SorceryMemoryCachePopulate",
    SORCERY_MEMORY_CACHE_STALE: "SorceryMemoryCacheStale",
    SORCERY_MEMORY_CACHE_STALE_OBJECT: "SorceryMemoryCacheStaleObject",
    STATUS: "Status",
    STOP_MIX_MONITOR: "StopMixMonitor",
    STOP_MONITOR: "StopMonitor",
    UNPAUSE_MONITOR: "UnpauseMonitor",
    UPDATE_CONFIG: "UpdateConfig",
    USER_EVENT: "UserEvent",
    VOICEMAIL_REFRESH: "VoicemailRefresh",
    VOICEMAIL_USERS_LIST: "VoicemailUsersList",
    WAIT_EVENT: "WaitEvent",
    XMPP: "xmpp"
};
module.exports = AST_ACTION;
//# sourceMappingURL=actionNames.js.map