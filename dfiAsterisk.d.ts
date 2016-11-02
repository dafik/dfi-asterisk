import getServerInstance = require("./src/asteriskServerInstance");
import AsteriskServer = require("./src/asteriskServer");
import AgentState = require("./src/states/agentState");
import AgentStates = require("./src/enums/agentStates");
import ChannelState = require("./src/states/channelState");
import ChannelStates = require("./src/enums/channelStates");
import DeviceState = require("./src/states/deviceState");
import DeviceStates = require("./src/enums/deviceStates");
import HangupCause = require("./src/states/hangupCause");
import HangupCauses = require("./src/enums/hangupCauses");
import PeerState = require("./src/states/peerState");
import PeerStates = require("./src/enums/peerStates");
import QueueEntryState = require("./src/states/queueEntryState");
import QueueEntryStates = require("./src/enums/queueEntryStates");
import QueueMemberState = require("./src/states/queueMemberState");
import QueueMemberStates = require("./src/enums/queueMemberStates");
import DialplanContext = require("./src/models/dialplans/DialplanContextModel");
import DialplanExtension = require("./src/models/dialplans/DialplanExtensionModel");
import DialplanPriority = require("./src/models/dialplans/DialplanPriorityModel");
import ChannelStateHistoryEntry = require("./src/models/histories/ChannelStateHistoryEntry");
import BridgeChannels = require("./src/collections/channels/BridgeChannelsCollection");
import Channels = require("./src/collections/channels/ChannelsCollection");
import DAHDIChannels = require("./src/collections/channels/DAHDIChannelsCollection");
import PeerChannels = require("./src/collections/channels/PeerChannelsCollection");
import Agents = require("./src/collections/AgentsCollection");
import Variable = require("./src/models/VariableModel");
import Variables = require("./src/collections/VariablesCollection");
import Queues = require("./src/collections/QueuesCollection");
import Peers = require("./src/collections/PeersCollection");
import Devices = require("./src/collections/DevicesCollection");
import Bridges = require("./src/collections/BridgesCollection");
import IllegalArgument = require("./src/errors/IllegalArgument");
import InvalidPenatly = require("./src/errors/InvalidPenatly");
import ManagerCommunication = require("./src/errors/ManagerCommunication");
import ManagerError = require("./src/errors/ManagerError");
import NoSuchChannel = require("./src/errors/NoSuchChannel");
import NoSuchInterface = require("./src/errors/NoSuchInterface");
import AgentManager = require("./src/managers/AgentManager");
import BridgeManager = require("./src/managers/BridgeManager");
import ChannelManager = require("./src/managers/ChannelManager");
import DahdiManager = require("./src/managers/DahdiManager");
import DeviceManager = require("./src/managers/DeviceManager");
import PeerManager = require("./src/managers/PeerManager");
import QueueManager = require("./src/managers/QueueManager");
import DialedChannelHistoryEntry = require("./src/models/histories/DialedChannelHistoryEntry");
import ExtensionHistoryEntry = require("./src/models/histories/ExtensionHistoryEntry");
import LinkedChannelHistoryEntry = require("./src/models/histories/LinkedChannelHistoryEntry");
import PeerAddressHistoryEntry = require("./src/models/histories/PeerAddressHistoryEntry");
import PeerStateHistoryEntry = require("./src/models/histories/PeerStateHistoryEntry");
import IAXPeer = require("./src/models/peers/IAXPeerModel");
import Peer = require("./src/models/peers/PeerModel");
import PJSIPPeer = require("./src/models/peers/PJSIPPeerModel");
import SIPPeer = require("./src/models/peers/SIPPeerModel");
import QueueEntry = require("./src/models/queues/QueueEntryModel");
import QueueMember = require("./src/models/queues/QueueMemberModel");
import Queue = require("./src/models/queues/QueueModel");
import Agent = require("./src/models/AgentModel");
import Bridge = require("./src/models/BridgeModel");
import CallDetailRecord = require("./src/models/CallDetailRecordModel");
import VoiceMailbox = require("./src/models/VoiceMailboxModel");
import Extension = require("./src/models/ExtensionModel");
import Device = require("./src/models/DeviceModel");
import Dahdi = require("./src/models/DahdiModel");
import Channel = require("./src/models/ChannelModel");
import CallerId = require("./src/models/CallerIdModel");
import IpAddress = require("./src/models/IpAddressModel");

let asteriskServerInstance = getServerInstance;

declare module "local-dfi-asterisk" {

    export {AST_ACTION} from "./src/internal/asterisk/actionNames";
    export * from "./src/internal/asterisk/actions";
    export * from "./src/internal/asterisk/enums";
    export {AST_EVENT} from "./src/internal/asterisk/eventNames";
    export * from "./src/internal/asterisk/eventNames";

    export * from "./src/definitions/configs";
    export * from "./src/definitions/events";
    export * from "./src/definitions/interfaces";
    export * from "./src/definitions/models";
    export * from "./src/definitions/types";

    export  asteriskServerInstance;

    export {
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
    }
}
