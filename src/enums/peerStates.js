"use strict";
/*const PJSIPStates = {
 UNAVAILABLE: "Unreachable",
 AVAILABLE: "Reachable",
 UNKNOWN: "Unknown",
 CREATED: "Created",
 REMOVED: "Removed"
 };
 const SIPStates = {
 UNREACHABLE: "Unreachable",
 LAGGED: "Lagged",
 REACHABLE: "Reachable",
 UNKNOWN: "Unknown",
 UNMONITORED: "Unmonitored"
 };
 const RegStates = {
 REG_STATE_FAILED: "Failed",
 REG_STATE_UNREGISTERED: "Unregistered",
 REG_STATE_REGSENT: "Request Sent",
 REG_STATE_AUTHSENT: "Auth. Sent",
 REG_STATE_REGISTERED: "Registered",
 REG_STATE_REJECTED: "Rejected",
 REG_STATE_TIMEOUT: "Registered", /!* Hidden state.  We are renewing registration. *!/
 REG_STATE_NOAUTH: "No Authentication"
 };*/
var PeerStates;
(function (PeerStates) {
    PeerStates[PeerStates["UNREGISTERED"] = -7] = "UNREGISTERED";
    PeerStates[PeerStates["INVALID"] = -4] = "INVALID";
    PeerStates[PeerStates["UNMONITORED"] = -3] = "UNMONITORED";
    PeerStates[PeerStates["UNAVAILABLE"] = -2] = "UNAVAILABLE";
    PeerStates[PeerStates["UNREACHABLE"] = -1] = "UNREACHABLE";
    PeerStates[PeerStates["UNKNOWN"] = 0] = "UNKNOWN";
    PeerStates[PeerStates["AVAILABLE"] = 1] = "AVAILABLE";
    PeerStates[PeerStates["REACHABLE"] = 2] = "REACHABLE";
    PeerStates[PeerStates["CREATED"] = 5] = "CREATED";
    PeerStates[PeerStates["REMOVED"] = 6] = "REMOVED";
    PeerStates[PeerStates["LAGGED"] = 7] = "LAGGED";
    // sip
    PeerStates[PeerStates["REGISTERED"] = 10] = "REGISTERED";
})(PeerStates || (PeerStates = {}));
module.exports = PeerStates;
//# sourceMappingURL=peerStates.js.map