import AsteriskServer from "./src/asteriskServer";
import getServerInstance from "./src/asteriskServerInstance";
import Agents from "./src/collections/AgentsCollection";
import Bridges from "./src/collections/BridgesCollection";
import BridgeChannels from "./src/collections/channels/BridgeChannelsCollection";
import Channels from "./src/collections/channels/ChannelsCollection";
import DAHDIChannels from "./src/collections/channels/DAHDIChannelsCollection";
import PeerChannels from "./src/collections/channels/PeerChannelsCollection";
import Devices from "./src/collections/DevicesCollection";
import Peers from "./src/collections/PeersCollection";
import Queues from "./src/collections/QueuesCollection";
import Variables from "./src/collections/VariablesCollection";
import AgentStates from "./src/enums/agentStates";
import ChannelStates from "./src/enums/channelStates";
import DeviceStates from "./src/enums/deviceStates";
import HangupCauses from "./src/enums/hangupCauses";
import PeerStates from "./src/enums/peerStates";
import QueueEntryStates from "./src/enums/queueEntryStates";
import QueueMemberStates from "./src/enums/queueMemberStates";
import IllegalArgument from "./src/errors/IllegalArgument";
import InvalidPenatly from "./src/errors/InvalidPenatly";
import ManagerCommunication from "./src/errors/ManagerCommunication";
import ManagerError from "./src/errors/ManagerError";
import NoSuchChannel from "./src/errors/NoSuchChannel";
import NoSuchInterface from "./src/errors/NoSuchInterface";
import AgentManager from "./src/managers/AgentManager";
import BridgeManager from "./src/managers/BridgeManager";
import ChannelManager from "./src/managers/ChannelManager";
import DahdiManager from "./src/managers/DahdiManager";
import DeviceManager from "./src/managers/DeviceManager";
import PeerManager from "./src/managers/PeerManager";
import QueueManager from "./src/managers/QueueManager";
import Agent from "./src/models/AgentModel";
import Bridge from "./src/models/BridgeModel";
import CallDetailRecord from "./src/models/CallDetailRecordModel";
import CallerId from "./src/models/CallerIdModel";
import Channel from "./src/models/ChannelModel";
import Dahdi from "./src/models/DahdiModel";
import Device from "./src/models/DeviceModel";
import DialplanContext from "./src/models/dialplans/DialplanContextModel";
import DialplanExtension from "./src/models/dialplans/DialplanExtensionModel";
import DialplanPriority from "./src/models/dialplans/DialplanPriorityModel";
import Extension from "./src/models/ExtensionModel";
import ChannelStateHistoryEntry from "./src/models/histories/ChannelStateHistoryEntry";
import DialedChannelHistoryEntry from "./src/models/histories/DialedChannelHistoryEntry";
import ExtensionHistoryEntry from "./src/models/histories/ExtensionHistoryEntry";
import LinkedChannelHistoryEntry from "./src/models/histories/LinkedChannelHistoryEntry";
import PeerAddressHistoryEntry from "./src/models/histories/PeerAddressHistoryEntry";
import PeerStateHistoryEntry from "./src/models/histories/PeerStateHistoryEntry";
import IpAddress from "./src/models/IpAddressModel";
import IAXPeer from "./src/models/peers/IAXPeerModel";
import Peer from "./src/models/peers/PeerModel";
import PJSIPPeer from "./src/models/peers/PJSIPPeerModel";
import SIPPeer from "./src/models/peers/SIPPeerModel";
import QueueEntry from "./src/models/queues/QueueEntryModel";
import QueueMember from "./src/models/queues/QueueMemberModel";
import Queue from "./src/models/queues/QueueModel";
import Variable from "./src/models/VariableModel";
import VoiceMailbox from "./src/models/VoiceMailboxModel";
import AgentState from "./src/states/agentState";
import ChannelState from "./src/states/channelState";
import DeviceState from "./src/states/deviceState";
import HangupCause from "./src/states/hangupCause";
import PeerState from "./src/states/peerState";
import QueueEntryState from "./src/states/queueEntryState";
import QueueMemberState from "./src/states/queueMemberState";

import {AST_ACTION} from "./src/internal/asterisk/actionNames";
import {AST_EVENT} from "./src/internal/asterisk/eventNames";

export * from "./src/internal/asterisk/actions";
export * from "./src/internal/asterisk/enums";

export * from "./src/definitions/configs";
export * from "./src/definitions/events";
export * from "./src/definitions/interfaces";
export * from "./src/definitions/models";
export * from "./src/definitions/types";

export let asteriskServerInstance = getServerInstance;

export {
    AST_ACTION,
    AST_EVENT,
    AsteriskServer,

    // collections
    BridgeChannels,
    Channels,
    DAHDIChannels,
    PeerChannels,

    Agents,
    Bridges,
    Devices,
    Peers,
    Queues,
    Variables,

    // enums states:
    AgentStates,
    ChannelStates,
    DeviceStates,
    HangupCauses,
    PeerStates,
    QueueEntryStates,
    QueueMemberStates,

    // errors
    IllegalArgument,
    InvalidPenatly,
    ManagerCommunication,
    ManagerError,
    NoSuchChannel,
    NoSuchInterface,

    // managers

    AgentManager,
    BridgeManager,
    ChannelManager,
    DahdiManager,
    DeviceManager,
    PeerManager,
    QueueManager,

    // models

    // models.dialplans
    DialplanContext,
    DialplanExtension,
    DialplanPriority,

    // models.histories
    ChannelStateHistoryEntry,
    DialedChannelHistoryEntry,
    ExtensionHistoryEntry,
    LinkedChannelHistoryEntry,
    PeerAddressHistoryEntry,
    PeerStateHistoryEntry,

    // models.peers
    IAXPeer,
    Peer,
    PJSIPPeer,
    SIPPeer,

    // models.queues
    QueueEntry,
    QueueMember,
    Queue,

    // other models
    Agent,
    Bridge,
    CallDetailRecord,
    CallerId,
    Channel,
    Dahdi,
    Device,
    Extension,
    IpAddress,
    Variable,
    VoiceMailbox,

    // state
    AgentState,
    ChannelState,
    DeviceState,
    HangupCause,
    PeerState,
    QueueEntryState,
    QueueMemberState
};
