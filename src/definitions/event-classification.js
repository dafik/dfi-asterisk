const xx = {
    "AGENT": [
        "agentcalled",
        "agentcomplete",
        "agentconnect",
        "agentdump",
        "agentlogin",
        "agentlogoff",
        "agentringnoanswer",
        "agents",
        "agentscomplete",
        "queuecallerabandon",
        "queuecallerjoin",
        "queuecallerleave",
        "queuememberadded",
        "queuememberpause",
        "queuememberpenalty",
        "queuememberremoved",
        "queuememberringinuse",
        "queuememberstatus"
    ],
    "AGI": [
        "agiexecend",
        "agiexecstart",
        "asyncagiend",
        "asyncagiexec",
        "asyncagistart"
    ],
    "SYSTEM": [
        "alarm",
        "alarmclear",
        "contactstatus",
        "dndstate",
        "fullybooted",
        "logchannel",
        "peerstatus",
        "registry",
        "reload",
        "shutdown",
        "spanalarm",
        "spanalarmclear"
    ],
    "AOC": [
        "aoc_d",
        "aoc_d",
        "aoc_d"
    ],
    "COMMAND": [
        "aordetail",
        "authdetail",
        "bridgeinfochannel",
        "bridgeinfocomplete",
        "contactstatusdetail",
        "devicestatelistcomplete",
        "endpointdetail",
        "endpointdetailcomplete",
        "endpointlist",
        "endpointlistcomplete",
        "extensionstatelistcomplete",
        "identifydetail",
        "presencestatelistcomplete",
        "transportdetail"
    ],
    "CALL": [
        "attendedtransfer",
        "blindtransfer",
        "bridgecreate",
        "bridgedestroy",
        "bridgeenter",
        "bridgeleave",
        "bridgemerge",
        "chanspystart",
        "chanspystop",
        "confbridgeend",
        "confbridgejoin",
        "confbridgeleave",
        "confbridgemute",
        "confbridgerecord",
        "confbridgestart",
        "confbridgestoprecord",
        "confbridgetalking",
        "confbridgeunmute",
        "coreshowchannel",
        "coreshowchannelscomplete",
        "dahdichannel",
        "devicestatechange",
        "dialbegin",
        "dialend",
        "extensionstatus",
        "faxsessionscomplete",
        "faxstatus",
        "hangup",
        "hanguprequest",
        "hold",
        "localbridge",
        "localoptimizationbegin",
        "localoptimizationend",
        "mcid",
        "meetmeend",
        "meetmejoin",
        "meetmeleave",
        "meetmemute",
        "meetmetalking",
        "meetmetalkrequest",
        "messagewaiting",
        "minivoicemail",
        "monitorstart",
        "monitorstop",
        "musiconholdstart",
        "musiconholdstop",
        "newaccountcode",
        "newcallerid",
        "newchannel",
        "newstate",
        "originateresponse",
        "parkedcall",
        "parkedcallgiveup",
        "parkedcallswap",
        "parkedcalltimeout",
        "pickup",
        "presencestatechange",
        "presencestatus",
        "receivefax",
        "rename",
        "sendfax",
        "sessiontimeout",
        "sipqualifypeerdone",
        "softhanguprequest",
        "status",
        "statuscomplete",
        "unhold",
        "unparkedcall"
    ],
    "SECURITY": [
        "authmethodnotallowed",
        "challengeresponsefailed",
        "challengesent",
        "failedacl",
        "invalidaccountid",
        "invalidpassword",
        "invalidtransport",
        "loadaveragelimit",
        "memorylimit",
        "requestbadformat",
        "requestnotallowed",
        "requestnotsupported",
        "sessionlimit",
        "successfulauth",
        "unexpectedaddress"
    ],
    "CDR": [
        "cdr"
    ],
    "CEL": [
        "cel"
    ],
    "CLASS": [
        "channeltalkingstart",
        "channeltalkingstop"
    ],
    "DTMF": [
        "dtmfbegin",
        "dtmfend"
    ],
    "REPORTING": [
        "faxsession",
        "faxsessionsentry",
        "faxstats",
        "mwiget",
        "mwigetcomplete",
        "rtcpreceived",
        "rtcpsent"
    ],
    "DIALPLAN": [
        "hanguphandlerpop",
        "hanguphandlerpush",
        "hanguphandlerrun",
        "newexten",
        "varset"
    ],
    "USER": [
        "userevent"
    ]
};

const xx0 = [
 "AGENT","AGI","SYSTEM","AOC","COMMAND","CALL","SECURITY","CDR","CEL","CLASS","DTMF","REPORTING","DIALPLAN","USER"
];
const xx1 = [
    "AGENT", "SYSTEM", "COMMAND", "CALL", "CLASS", "DTMF", "DIALPLAN", "USER"
];
const xx2 = [
     "AGI",  "AOC",  "SECURITY", "CDR", "CEL",   "REPORTING",  "USER"
];


/*
; system    - General information about the system and ability to run system
; call      - Information about channels and ability to set information in a
; agent     - Information about queues and agents and ability to add queue
; config    - Ability to read and write configuration files.
; dtmf      - Receive DTMF events.  Read-only.
; cdr       - Output of cdr_manager, if loaded.  Read-only.
; dialplan  - Receive NewExten and VarSet events.  Read-only.
; cc        - Call Completion events.  Read-only.

*/
