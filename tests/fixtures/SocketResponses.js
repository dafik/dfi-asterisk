/**
 * Created by z.wieczorek on 27.10.14.
 */
var responses = {
    //connect
    'c31578a0e242550a5fe88e60b75c9f409e4a08bd': {
        lines: [
            "Response: Success\r\nActionID: 0\r\nMessage: Authentication accepted\r\n\r\n",
            "Event: FullyBooted\r\nPrivilege: system,all\r\nStatus: Fully Booted\r\n\r\n"
        ],
        actionId: 0
    },
    //"Action":"Command","Command":"manager show commands"
    '5f69455afe14a37d7edc7819abc7f530281415ac': {
        lines: [
            "Response: Follows\r\nPrivilege: Command\r\nActionID: 1\r\n  Action                          Synopsis\n  ------                          --------\n  WaitEvent                       Wait for an event to occur. \n  QueueReset                      Reset queue statistics. \n  QueueReload                     Reload a queue, queues, or any sub-section of \n  QueueRule                       Queue Rules. \n  QueueMemberRingInUse            Set the ringinuse value for a queue member. \n  QueuePenalty                    Set the penalty for a queue member. \n  QueueLog                        Adds custom entry in queue_log. \n  QueuePause                      Makes a queue member temporarily unavailable. \n  QueueRemove                     Remove interface from queue. \n  QueueAdd                        Add interface to queue. \n  QueueSummary                    Show queue summary. \n  QueueStatus                     Show queue status. \n  Queues                          Queues. \n  PlayDTMF                        Play DTMF signal on a specific channel. \n  ControlPlayback                 Control the playback of a file being played to\n  StopMixMonitor                  Stop recording a call through MixMonitor, and \n  MixMonitor                      Record a call and mix the audio during the rec\n  MixMonitorMute                  Mute / unMute a Mixmonitor recording. \n  VoicemailRefresh                Tell Asterisk to poll mailboxes for a change \n  VoicemailUsersList              List All Voicemail User Information. \n  MuteAudio                       Mute an audio stream. \n  ConfbridgeSetSingleVideoSrc     Set a conference user as the single video sour\n  ConfbridgeStopRecord            Stop recording a Confbridge conference. \n  ConfbridgeStartRecord           Start recording a Confbridge conference. \n  ConfbridgeLock                  Lock a Confbridge conference. \n  ConfbridgeUnlock                Unlock a Confbridge conference. \n  ConfbridgeKick                  Kick a Confbridge user. \n  ConfbridgeUnmute                Unmute a Confbridge user. \n  ConfbridgeMute                  Mute a Confbridge user. \n  ConfbridgeListRooms             List active conferences. \n  ConfbridgeList                  List participants in a conference. \n  AgentLogoff                     Sets an agent as no longer logged in. \n  Agents                          Lists agents and their status. \n  PJSIPShowRegistrationsOutbound  Lists PJSIP outbound registrations. \n  PJSIPUnregister                 Unregister an outbound registration. \n  PJSIPNotify                     Send a NOTIFY to an endpoint. \n  PJSIPShowRegistrationsInbound   Lists PJSIP inbound registrations. \n  IAXregistry                     Show IAX registrations. \n  IAXnetstats                     Show IAX Netstats. \n  IAXpeerlist                     List IAX Peers. \n  IAXpeers                        List IAX peers. \n  SIPpeerstatus                   Show the status of one or all of the sip peers\n  SIPnotify                       Send a SIP notify. \n  SIPshowregistry                 Show SIP registrations (text format). \n  SIPqualifypeer                  Qualify SIP peers. \n  SIPshowpeer                     show SIP peer (text format). \n  SIPpeers                        List SIP peers (text format). \n  Park                            Park a channel. \n  ParkedCalls                     List parked calls. \n  Parkinglots                     Get a list of parking lots \n  AGI                             Add an AGI command to execute by Async AGI. \n  UnpauseMonitor                  Unpause monitoring of a channel. \n  PauseMonitor                    Pause monitoring of a channel. \n  ChangeMonitor                   Change monitoring filename of a channel. \n  StopMonitor                     Stop monitoring a channel. \n  Monitor                         Monitor a channel. \n  JabberSend                      Sends a message to a Jabber Client. \n  PJSIPShowSubscriptionsOutbound  Lists subscriptions. \n  PJSIPShowSubscriptionsInbound   Lists subscriptions. \n  PJSIPQualify                    Qualify a chan_pjsip endpoint. \n  PJSIPShowEndpoint               Detail listing of an endpoint and its objects.\n  PJSIPShowEndpoints              Lists PJSIP endpoints. \n  BridgeKick                      Kick a channel from a bridge. \n  BridgeDestroy                   Destroy a bridge. \n  BridgeInfo                      Get information about a bridge. \n  BridgeList                      Get a list of bridges in the system. \n  BlindTransfer                   Blind transfer channel(s) to the given destina\n  Filter                          Dynamically add filters for the current manage\n  AOCMessage                      Generate an Advice of Charge message on a chan\n  ModuleCheck                     Check if module is loaded. \n  ModuleLoad                      Module management. \n  CoreShowChannels                List currently active channels. \n  Reload                          Send a reload event. \n  CoreStatus                      Show PBX core status variables. \n  CoreSettings                    Show PBX core settings (version etc). \n  UserEvent                       Send an arbitrary event. \n  UpdateConfig                    Update basic configuration. \n  SendText                        Send text message to channel. \n  ListCommands                    List available manager commands. \n  MailboxCount                    Check Mailbox Message Count. \n  MailboxStatus                   Check mailbox. \n  AbsoluteTimeout                 Set absolute timeout. \n  PresenceState                   Check Presence State \n  ExtensionState                  Check Extension Status. \n  Command                         Execute Asterisk CLI Command. \n  Originate                       Originate a call. \n  Atxfer                          Attended transfer. \n  Redirect                        Redirect (transfer) a call. \n  ListCategories                  List categories in configuration file. \n  CreateConfig                    Creates an empty file in the configuration dir\n  Status                          List channel status. \n  GetConfigJSON                   Retrieve configuration (JSON format). \n  GetConfig                       Retrieve configuration. \n  Getvar                          Gets a channel variable or function value. \n  Setvar                          Sets a channel variable or function value. \n  ShowDialPlan                    Show dialplan contexts and extensions \n  Hangup                          Hangup channel. \n  Challenge                       Generate Challenge for MD5 Auth. \n  Login                           Login Manager. \n  Logoff                          Logoff Manager. \n  Events                          Control Event Flow. \n  Ping                            Keepalive command. \n  LocalOptimizeAway               Optimize away a local channel when possible. \n  MessageSend                     Send an out of call message to an endpoint. \n  Bridge                          Bridge two channels already in the PBX. \n  BridgeTechnologyUnsuspend       Unsuspend a bridging technology. \n  BridgeTechnologySuspend         Suspend a bridging technology. \n  BridgeTechnologyList            List available bridging technologies and their\n  DataGet                         Retrieve the data api tree. \n  DBPut                           Put DB entry. \n  DBDelTree                       Delete DB Tree. \n  DBDel                           Delete DB entry. \n  DBGet                           Get DB Entry. \n--END COMMAND--\r\n\r\n"],
        actionId: 1
    },

    //"ActionID":2,"Action":"Command","Command":"manager show commands"
    //'553dff143bb4216055b9b12551bb94633243d218'

    //"ActionID":3,"Action":"Status"
    '193f48bf111c7ed0b657db4196ab7bd67f1585a4': {
        lines: [
            "Response: Success\r\nActionID: 2\r\nMessage: Channel status will follow\r\n\r\n",
            "Event: StatusComplete\r\nActionID: 2\r\nItems: 0\r\n\r\n"
        ],
        actionId: 2
    },
    //"ActionID":4,"Action":"Agents"
    '7dc6e04d2eb62a7f48f555df69b03c2d9fe3091d': {
        lines: [
            "Response: Success\r\nActionID: 3\r\nMessage: Agents will follow\r\n\r\n",
            "Event: AgentsComplete\r\nActionID: 3\r\n\r\n"
        ],
        actionId: 3
    },
    //"ActionID":5,"Action":"QueueStatus"
    'f57f8224cc129530602738580239680975757e47': {
        lines: [
            "Response: Success\r\nActionID: 4\r\nMessage: Queue status will follow\r\n\r\n",
            "Event: QueueParams\r\nQueue: kolejka3\r\nMax: 0\r\nStrategy: rrmemory\r\nCalls: 0\r\nHoldtime: 0\r\nTalkTime: 0\r\nCompleted: 0\r\nAbandoned: 0\r\nServiceLevel: 0\r\nServicelevelPerf: 0.0\r\nWeight: 0\r\nActionID: 4\r\n\r\n" ,
            "Event: QueueParams\r\nQueue: kolejka4\r\nMax: 0\r\nStrategy: rrmemory\r\nCalls: 0\r\nHoldtime: 0\r\nTalkTime: 0\r\nCompleted: 0\r\nAbandoned: 0\r\nServiceLevel: 0\r\nServicelevelPerf: 0.0\r\nWeight: 0\r\nActionID: 4\r\n\r\n" ,
            "Event: QueueParams\r\nQueue: kolejka5\r\nMax: 0\r\nStrategy: rrmemory\r\nCalls: 0\r\nHoldtime: 0\r\nTalkTime: 0\r\nCompleted: 0\r\nAbandoned: 0\r\nServiceLevel: 0\r\nServicelevelPerf: 0.0\r\nWeight: 0\r\nActionID: 4\r\n\r\n" ,
            "Event: QueueParams\r\nQueue: test\r\nMax: 0\r\nStrategy: rrmemory\r\nCalls: 0\r\nHoldtime: 0\r\nTalkTime: 0\r\nCompleted: 0\r\nAbandoned: 0\r\nServiceLevel: 0\r\nServicelevelPerf: 0.0\r\nWeight: 0\r\nActionID: 4\r\n\r\n" ,
            "Event: QueueMember\r\nQueue: test\r\nName: ni dafi\r\nLocation: SIP/151\r\nStateInterface: SIP/151\r\nMembership: dynamic\r\nPenalty: 0\r\nCallsTaken: 0\r\nLastCall: 0\r\nStatus: 5\r\nPaused: 0\r\nActionID: 4\r\n\r\n" ,
            "Event: QueueParams\r\nQueue: kolejka2\r\nMax: 0\r\nStrategy: rrmemory\r\nCalls: 0\r\nHoldtime: 0\r\nTalkTime: 0\r\nCompleted: 0\r\nAbandoned: 0\r\nServiceLevel: 0\r\nServicelevelPerf: 0.0\r\nWeight: 0\r\nActionID: 4\r\n\r\n",
            "Event: QueueStatusComplete\r\nActionID: 4\r\n\r\n"
        ],
        actionId: 4
    }
};
var response;

module.exports = responses;