"use strict";
/*const PJSIPStates = {
 UNAVAILABLE: "Unreachable",
 AVAILABLE: "Reachable",
 UNKNOWN: "Unknown",
 CREATED: "Created",
 REMOVED: "Removed"
 };
 const SIPStates = {
 UNREACHABLE: 'Unreachable',
 LAGGED: 'Lagged',
 REACHABLE: 'Reachable',
 UNKNOWN: 'Unknown',
 UNMONITORED: 'Unmonitored'
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

/**
 * @memberOf enums
 * @class
 */
const PeerStates = {

    UNREGISTERED: -7, //sip

    INVALID: -4, //pjsip
    UNMONITORED: -3,
    UNAVAILABLE: -2,
    UNREACHABLE: -1,

    UNKNOWN: 0,   //sip

    AVAILABLE: 1,
    REACHABLE: 2,

    CREATED: 5,
    REMOVED: 6,
    LAGGED: 7,

    REGISTERED: 10    //sip


};


Object.freeze(PeerStates);
module.exports = PeerStates;
