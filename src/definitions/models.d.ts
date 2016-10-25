import {IDfiBaseModelAttribs, IDfiBaseModelConfig} from "local-dfi-base/src/dfiInterfaces";
import Ip = require("../models/IpAddress");
import CallerId = require("../models/CallerIdModel");
import DeviceState = require("../states/deviceState");
import PeerState = require("../states/peerState");
import ChannelState = require("../states/channelState");
import Channel = require("../models/ChannelModel");
import DispositionFlag = require("../enums/flags/dispositionFlags");
import AmaFlags = require("../enums/flags/amaFlags");
import QueueMemberState = require("../states/queueMemberState");
import Peer = require("../models/peers/PeerModel");
import AgentState = require("../states/agentState");
import Device = require("../models/DeviceModel");
import Queue = require("../models/queues/QueueModel");
import QueueEntryState = require("../states/queueEntryState");
import DialplanContext = require("../models/dialans/DialplanContextModel");
import DialplanExtension = require("../models/dialans/DialplanExtensionModel");

export interface IDfiAstModelOptions extends IDfiBaseModelConfig {
    sourceEvent?: string;
}

export interface IDfiAstModelAttribs extends IDfiBaseModelAttribs {
    $time?: number;
    Event: string;
}

export interface IDfiAstModelAttribsDevice extends IDfiAstModelAttribs {
    Device: string;
    State: string | DeviceState;
}

export interface IDfiAstModelAttribsDialplanPriority extends IDfiAstModelAttribs {
    Priority: string;
    Application: string;
    AppData: string;
}
export interface IDfiAstModelOptionsDialplanPriority extends IDfiAstModelOptions {
    context?: DialplanContext;
    extension?: DialplanExtension;
}

export interface IDfiAstModelAttribsDialplanExtension extends IDfiAstModelAttribs {
    Extension: string;
}
export interface IDfiAstModelOptionsDialplanExtension extends IDfiAstModelOptions {
    context?: DialplanContext;

}
export interface IDfiAstModelAttribsDialplanContext extends IDfiAstModelAttribs {
    Context: string;
    Registrar: string;
}

export interface IDfiAstModelAttribsVariable extends IDfiAstModelAttribs {
    name: string;
    value: string;
}

export interface IDfiAstModelAttribsVoiceMailbox extends IDfiAstModelAttribs {
    context: string;
    mailbox: string;
    newMessages: number;
    user: string;
}

export interface IDfiAstModelAttribsExtension extends IDfiAstModelAttribs {
    Context: string;
    Exten: string;
    Priority: string;
    Application: string;
    AppData: string;
}

export interface IDfiAstModelAttribsPeer extends IDfiAstModelAttribs {
    technology: string;
    ip: Ip;

    Channeltype: string;
    ObjectName: string;
    ChanObjectType: string;
    Dynamic: string|boolean;
    Status: string;

    state?: PeerState;
}

export interface IDfiAstModelAttribsIAXPeer extends IDfiAstModelAttribs {
    Channeltype: string;
    ObjectName: string;
    ChanObjectType: string;
    Dynamic: string|boolean;
    Status: string;

    ObjectUsername: string;
    Trunk: string;
    Encryption: string;

    IPaddress: string;
    Mask: string;
    Port: string;
}

export interface IDfiAstModelAttribsSipPeer extends IDfiAstModelAttribs {
    Channeltype: string;
    ObjectName: string;
    ChanObjectType: string;
    Dynamic: string|boolean;
    Status: string;

    AutoForcerport: string;
    Forcerport: string;
    AutoComedia: string;
    Comedia: string;
    VideoSupport: string;
    TextSupport: string;
    ACL: string;
    RealtimeDevice: string;
    Description: string;

    IPaddress: string;
    IPport: string;
}

export interface IDfiAstModelAttribsPJSIPPeer extends IDfiAstModelAttribs {
    DeviceState: string;
}

export interface IDfiAstModelAttribsBridge extends IDfiAstModelAttribs {
    BridgeType: string;
    BridgeTechnology: string;
    BridgeCreator: string;
    BridgeName: string;
    BridgeNumChannels: string | number;

    BridgeUniqueid?: string;
    id?;
    isHangupFirst?: boolean;
    isHangupSecond?: boolean;

}
export interface IDfiAstModelAttribsChannel extends IDfiAstModelAttribs {

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
    Uniqueid?: string;
    UniqueID?: string;
    Linkedid: string;
    BridgeId?: string;
    BridgeID?: string;
    Application: string;
    ApplicationData?: string;
    Duration?: string;

    callerId?: CallerId;
    state?: ChannelState;
    connectedCallerId?: CallerId;
    dateOfCreation?: number;
}

export interface IDfiAstDAHDIOnChannel {
    name;
    id;
}

export interface IDfiAstModelAttribsDAHDI extends IDfiAstModelAttribs {
    DAHDIChannel: string;
    Context: string;

    Channel?: string;
    Uniqueid?: string;
    AccountCode?: string;

    channel?: Channel| IDfiAstDAHDIOnChannel;

}

export interface IDfiAstModelAttribsVariableAddress extends IDfiAstModelAttribs {
    name: string;
    value: string;
}

export interface IDfiAstModelAttribsIpAddress {
    ipAddress: string;
    mask: string;
    port: number   ;
}

export interface IDfiAstModelAttribsCDR extends IDfiAstModelAttribs {
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
    ///

    channel?: Channel;
    destinationChannel?: Channel;

    amaFlags?: AmaFlags;
    disposition?: DispositionFlag;
}

export interface IDfiAstModelAttribsQueue extends IDfiAstModelAttribs {
    Queue: string;
    Max: string;
    Strategy: string;
    Calls: string;
    Holdtime: string;
    TalkTime: string;
    Completed: string;
    Abandoned: string|number;
    ServiceLevel: string|number;
    ServicelevelPerf: string;
    Weight: string;
}

export interface IDfiAstModelAttribsQueueMember extends IDfiAstModelAttribs {
    Queue: string;

    Name?: string;
    MemberName?: string;

    Location?: string;
    Interface?: string;

    StateInterface: string;
    Membership: string;

    Penalty: string|number;
    CallsTaken: string|number;
    LastCall: string|number;
    InCall: string|boolean;
    Status: string;
    Paused: string|boolean;
    PausedReason: string;

    state?: QueueMemberState;
    ringInUse?: boolean;

}

export interface IDfiAstModelAttribsQueueEntry extends IDfiAstModelAttribs {
    ReportedPosition: string|number;
    Position?: string;

    queue: Queue;
    channel: Channel;
    dateJoined: number;
    dateLeft?: number;
    state?: QueueEntryState;
    abandoned?: boolean;
}

export interface IDfiAstModelAttribsAgent extends IDfiAstModelAttribs {
    Name: string;
    Device: Device;
    Peer: Peer;
    State: AgentState;

}
