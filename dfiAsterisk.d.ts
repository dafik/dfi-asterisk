declare module "local-dfi-asterisk" {

    export * from "src/internal/asterisk/actions";
    export * from "src/internal/asterisk/enums";

    export * from "./src/definitions/configs";
    export * from "./src/definitions/events";
    export * from "./src/definitions/interfaces";
    export * from "./src/definitions/models";
    export * from "./src/definitions/types";

    export {
        AST_ACTION,
        AST_EVENT,

        AsteriskServer,
        getServerInstance as asteriskServerInstance,
        getServerInstance,

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
}
