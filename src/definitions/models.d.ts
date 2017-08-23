import {IDfiBaseModelAttribs, IDfiBaseModelConfig} from "local-dfi-base/src/dfiInterfaces";
import Ip from "../models/IpAddressModel";
import CallerId from "../models/CallerIdModel";
import DeviceState from "../states/deviceState";
import PeerState from "../states/peerState";
import ChannelState from "../states/channelState";
import Channel from "../models/ChannelModel";
import DispositionFlag from "../enums/flags/dispositionFlags";
import AmaFlags from "../enums/flags/amaFlags";
import QueueMemberState from "../states/queueMemberState";
import Peer from "../models/peers/PeerModel";
import AgentState from "../states/agentState";
import Device from "../models/DeviceModel";
import Queue from "../models/queues/QueueModel";
import QueueEntryState from "../states/queueEntryState";
import DialplanContext from "../models/dialplans/DialplanContextModel";
import DialplanExtension from "../models/dialplans/DialplanExtensionModel";

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
    technology?: string;
    ip?: Ip;

    Channeltype?: string;
    ChanObjectType?: string;
    ObjectName: string;

    Dynamic?: string | boolean;
    Status?: string;

    state?: PeerState;
}

export interface IDfiAstModelAttribsIAXPeer extends IDfiAstModelAttribsPeer {
    ObjectUsername: string;
    Trunk: boolean | string;
    Encryption: boolean | string;

    IPaddress: string;
    Mask: string;
    Port: string;
}

export interface IDfiAstModelAttribsSipPeer extends IDfiAstModelAttribsPeer {
    AutoForcerport: boolean | string;
    Forcerport: boolean | string;
    AutoComedia: boolean | string;
    Comedia: boolean | string;
    VideoSupport: boolean | string;
    TextSupport: boolean | string;
    ACL: boolean | string;
    RealtimeDevice: boolean | string;
    Description: string;

    IPaddress: string;
    IPport: string;
}

export interface IDfiAstModelAttribsPJSIPPeer extends IDfiAstModelAttribsPeer {
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

    channel?: Channel | IDfiAstDAHDIOnChannel;

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
    Abandoned: string | number;
    ServiceLevel: string | number;
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

    Penalty: string | number;
    CallsTaken: string | number;
    LastCall: string | number;
    InCall: string | boolean;
    Status: string;
    Paused: string | boolean;
    PausedReason: string;

    state?: QueueMemberState;
    ringInUse?: boolean;

}

export interface IDfiAstModelAttribsQueueEntry extends IDfiAstModelAttribs {
    ReportedPosition: string | number;
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
