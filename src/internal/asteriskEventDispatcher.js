"use strict";
const AsteriskLogger = require('./asteriskLogger');

/**
 * @typedef   AsteriskEventDispatcher
 */
class AsteriskEventDispatcher {
    constructor(server) {
        this.server = server;
        this.logger = new AsteriskLogger('dfi:as:'+this.constructor.name);
        this.subscription = new Map();
    }

    subscribeEvent(event, manager) {
        var sub;
        if (!this.subscription.has(event)) {
            this.subscription.set(event, new Set);
        }
        sub = this.subscription.get(event);
        sub.add(manager);

    }

    subscribeEvents(events, manager) {
        if (!Array.isArray(events)) {
            throw new Error('events arn not array');
        }
        events.forEach(function (event) {
            this.subscribeEvent(event, manager)
        }, this)
    }

    dispatch(event) {
        this.logger.debug('event %j', event.event);
        this.logger.trace('event %j', event);

        if (event.event == 'originateresponse') {
            this.server.actions.originate._handleOriginateEvent(event);
        }

        if (this.subscription.has(event.event)) {
            var sub = this.subscription.get(event.event);
            sub.forEach(function (manager) {
                manager.handleEvent(event);
            })
        } else {
            //this.logger.debug('discard not subscribed event %j', event.event);
            //this.logger.trace('discard not subscribed event %j', event);
        }
    }


}
module.exports = AsteriskEventDispatcher;

var statusEvents = {
    agiexecend: 'channelState', //'destChannel',
    agiexecstart: 'channelState', //'destChannel',
    'aoc-d': 'channelState', //'destChannel',
    'aoc_d': 'channelState', //'destChannel',
    'aoc-e': 'channelState', //'destChannel',
    'aoc-s': 'channelState', //'destChannel',
    asyncagiend: 'channelState', //'destChannel',
    asyncagiexec: 'channelState', //'destChannel',
    asyncagistart: 'channelState', //'destChannel',
    attendedtransfer: 'localOneChannelState', //localTwoChannelState,origTransfererChannelState,secondTransfererChannelState,transfereeChannelState
    blindtransfer: 'transfereeChannelState',
    bridge: 'bridgeState',
    bridgeinfochannel: 'channelState',
    channeltalkingstart: 'channelState',
    channeltalkingstop: 'channelState',
    chanspystart: 'spyeeChannelState', //'spyerChannelState'
    chanspystop: 'spyeeChannelState', //'spyerChannelState'
    confbridgejoin: 'channelState',
    confbridgeleave: 'channelState',
    confbridgemute: 'channelState',
    confbridgetalking: 'channelState', //'talkingStatus',
    confbridgeunmute: 'channelState',
    contactstatus: 'contactStatus',
    contactstatusdetail: 'status',
    coreshowchannel: 'channelState',
    dndstate: 'status',
    endpointdetail: 'deviceState',
    endpointlist: 'deviceState',
    faxstatus: 'status', //channelState
    faxsession: 'state',
    faxsessionsentry: 'state',
    hanguphandlerpop: 'channelState',
    hanguphandlerpush: 'channelState',
    hanguphandlerrun: 'channelState',
    hold: 'status', //channelState
    localoptimizationbegin: 'localOneChannelState',// localTwoChannelState
    localoptimizationend: 'localOneChannelState',// localTwoChannelState
    masquerade: 'cloneState', //'originalState',
    mcid: 'channelState',
    messagewaiting: 'ChannelState',
    minivoicemail: 'channelState',
    moduleloadreport: 'moduleLoadStatus',
    monitorstart: 'channelState',
    monitorstop: 'channelState',
    musiconholdstart: 'channelState',
    musiconholdstop: 'channelState',
    newaccountcode: 'channelState',
    parkedcallswap: 'parkeeChannelState',//parkerChannelState
    pickup: 'channelState', //targetChannelState
    presencestatechange: 'status',
    presencestatus: 'status',
    queuememberringinuse: 'status',
    registry: 'status',
    receivefax: 'channelState',
    reload: 'status',
    sendfax: 'channelState',
    sessiontimeout: 'channelState',
    status: 'channelState', //->channelmanager ?
    userevent: 'channelState',
    unhold: 'channelState'
};
var channelEvents = [
    'connect',
    'disconnect',
    'newchannel',
    'newexten',
    'newstate',
    'newcallerid',
    'dial',
    'bridge',
    'rename',
    'hangup',
    'cdr',
    'varset',
    'dtmf',
    'monitorstart',
    'monitorstop'
];
var parkedEvents = [
    'parkedcall',
    'parkedcallgiveup',
    'parkedcalltimeout',
    'unparkedcall'
];
var queueEvents = [
    'join',
    'leave',
    'queuememberstatus',
    'queuememberpenalty',
    'queuememberadded',
    'queuememberremoved',
    'queuememberpaused'
];
var meetMeEvents = [
    'meetmejoin',
    'meetmeleave',
    'meetmemute',
    'meetmetalking',
    'meetmetalkingrequest'
];
var agentsEvents = [
    'agents',
    'agentcalled',
    'agentconnect',
    'agentcomplete',
    'agentcallbacklogin',
    'agentcallbacklogoff',
    'agentlogin',
    'agentlogoff'
];

var all = [
    "agentcalled",
    "agentcomplete",
    "agentconnect",
    "agentdump",
    "agentlogin",
    "agentlogoff",
    "agentringnoanswer",
    "agents",
    "agentscomplete",
    "agiexecend",
    "agiexecstart",
    "alarm",
    "alarmclear",
    "aoc_d",
    "aoc_d",
    "aoc_d",
    "aordetail",
    "asyncagiend",
    "asyncagiexec",
    "asyncagistart",
    "attendedtransfer",
    "authdetail",
    "authmethodnotallowed",
    "blindtransfer",
    "bridgecreate",
    "bridgedestroy",
    "bridgeenter",
    "bridgeinfochannel",
    "bridgeinfocomplete",
    "bridgeleave",
    "bridgemerge",
    "cdr",
    "cel",
    "challengeresponsefailed",
    "challengesent",
    "channeltalkingstart",
    "channeltalkingstop",
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
    "contactstatus",
    "contactstatusdetail",
    "coreshowchannel",
    "coreshowchannelscomplete",
    "dahdichannel",
    "devicestatechange",
    "devicestatelistcomplete",
    "dialbegin",
    "dialend",
    "dndstate",
    "dtmfbegin",
    "dtmfend",
    "endpointdetail",
    "endpointdetailcomplete",
    "endpointlist",
    "endpointlistcomplete",
    "extensionstatelistcomplete",
    "extensionstatus",
    "failedacl",
    "faxsession",
    "faxsessionscomplete",
    "faxsessionsentry",
    "faxstats",
    "faxstatus",
    "fullybooted",
    "hangup",
    "hanguphandlerpop",
    "hanguphandlerpush",
    "hanguphandlerrun",
    "hanguprequest",
    "hold",
    "identifydetail",
    "invalidaccountid",
    "invalidpassword",
    "invalidtransport",
    "loadaveragelimit",
    "localbridge",
    "localoptimizationbegin",
    "localoptimizationend",
    "logchannel",
    "mcid",
    "meetmeend",
    "meetmejoin",
    "meetmeleave",
    "meetmemute",
    "meetmetalking",
    "meetmetalkrequest",
    "memorylimit",
    "messagewaiting",
    "minivoicemail",
    "monitorstart",
    "monitorstop",
    "musiconholdstart",
    "musiconholdstop",
    "mwiget",
    "mwigetcomplete",
    "newaccountcode",
    "newcallerid",
    "newchannel",
    "newexten",
    "newstate",
    "originateresponse",
    "parkedcall",
    "parkedcallgiveup",
    "parkedcallswap",
    "parkedcalltimeout",
    "peerstatus",
    "pickup",
    "presencestatechange",
    "presencestatelistcomplete",
    "presencestatus",
    "queuecallerabandon",
    "queuecallerjoin",
    "queuecallerleave",
    "queuememberadded",
    "queuememberpause",
    "queuememberpenalty",
    "queuememberremoved",
    "queuememberringinuse",
    "queuememberstatus",
    "receivefax",
    "registry",
    "reload",
    "rename",
    "requestbadformat",
    "requestnotallowed",
    "requestnotsupported",
    "rtcpreceived",
    "rtcpsent",
    "sendfax",
    "sessionlimit",
    "sessiontimeout",
    "shutdown",
    "sipqualifypeerdone",
    "softhanguprequest",
    "spanalarm",
    "spanalarmclear",
    "status",
    "statuscomplete",
    "successfulauth",
    "transportdetail",
    "unexpectedaddress",
    "unhold",
    "unparkedcall",
    "userevent",
    "varset"];

var all1 = {
    command: [
        //Action: CoreShowChannels
        "coreshowchannel",
        "coreshowchannelscomplete",

        //Action: DeviceStateList
        "devicestatechange",
        "devicestatelistcomplete",

        //Action: PJSIPShowEndpoint
        "aordetail",
        "authdetail",
        "endpointdetail",
        "identifydetail",
        "transportdetail",
        "endpointdetailcomplete",

        //Action: PJSIPShowEndpoints
        "endpointlist",
        "endpointlistcomplete",

        //Action: ExtensionStateList
        "extensionstatus",
        "extensionstatelistcomplete",

        //Action: FAXSessions
        "faxsession",
        "faxsessionscomplete",

        //Action: MWIGet
        "mwiget",
        "mwigetcomplete",

        //Action: PresenceStateList
        "presencestatechange",
        "presencestatelistcomplete",

        //Action: Status
        "status",
        "statuscomplete",

        //other
        "originateresponse",
        "sipqualifypeerdone"


    ],
    security: [
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
    agent: [
        "agentcalled",
        "agentcomplete",
        "agentconnect",
        "agentdump",
        "agentlogin",
        "agentlogoff",
        "agentringnoanswer",
        "agents",
        "agentscomplete"
    ],
    queue: [
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
    peer: [
        "peerstatus"
    ],
    dahdi: [
        "alarm",
        "alarmclear",
        "dahdichannel", // ?channel 
        "dndstate",
        "spanalarm",
        "spanalarmclear"
    ],
    device: [
        "devicestatechange"
    ],
    channel: [
        "attendedtransfer",
        "blindtransfer",
        "channeltalkingstart",
        "channeltalkingstop",
        "chanspystart",
        "chanspystop",
        "dialbegin",
        "dialend",
        "dtmfbegin",
        "dtmfend",
        "hangup",
        "hanguprequest",
        "hold",
        "musiconholdstart",
        "musiconholdstop",
        "newaccountcode",
        "newcallerid",
        "newchannel",
        "newstate",
        "localbridge",
        "localoptimizationbegin",
        "localoptimizationend",
        "pickup",
        "rename",
        "softhanguprequest",
        "unhold"

    ],
    bridge: [
        "bridgecreate",
        "bridgedestroy",
        "bridgeenter",
        "bridgeinfochannel",
        "bridgeinfocomplete",
        "bridgeleave",
        "bridgemerge"
    ],
    conference: [
        "confbridgeend",
        "confbridgejoin",
        "confbridgeleave",
        "confbridgemute",
        "confbridgerecord",
        "confbridgestart",
        "confbridgestoprecord",
        "confbridgetalking",
        "confbridgeunmute"
    ],
    meetme: [
        "meetmeend",
        "meetmejoin",
        "meetmeleave",
        "meetmemute",
        "meetmetalking",
        "meetmetalkrequest"
    ],
    fax: [
        "faxsessionsentry",
        "faxstats",
        "faxstatus",
        "receivefax",
        "sendfax"
    ],
    system: [
        "fullybooted"
    ],
    other: {
        dialplan: [
            "hanguphandlerpop",
            "hanguphandlerpush",
            "hanguphandlerrun",
            "newexten", //->chanell ?
            "varset"    //->chanell ?
        ],
        agi: [
            "agiexecend",
            "agiexecstart",
            "asyncagiend",
            "asyncagiexec",
            "asyncagistart"
        ],
        fax: [],
        other: [
            "aoc_s", //->Advice of Charge
            "aoc_d",
            "aoc_e",
            "cdr",
            "cel",

            "contactstatus",  // peer pjsip?
            "contactstatusdetail",

            "logchannel",
            "mcid",
            "monitorstart",
            "monitorstop",

            "registry",
            "reload",

            "rtcpreceived",
            "rtcpsent",
            "presencestatus",
            "sessiontimeout",
            "shutdown",
            "userevent"
        ],
        parked: [
            "parkedcall",
            "parkedcallgiveup",
            "parkedcallswap",
            "parkedcalltimeout",
            "unparkedcall"
        ],
        mailbox: [
            "messagewaiting",
            "minivoicemail"
        ]
    }


};

