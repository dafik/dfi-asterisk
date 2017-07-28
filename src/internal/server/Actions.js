"use strict";
const dfiObject_1 = require("local-dfi-base/src/dfiObject");
const ModuleAction = require("./actions/ModuleAction");
const VoiceMailServerAction = require("./actions/VoicemailAction");
const VariableServerAction = require("./actions/VariableAction");
const PeersServerAction = require("./actions/PeerAction");
const OriginateServerAction = require("./actions/OriginateAction");
const DBServerAction = require("./actions/DBAction");
const CoreServerAction = require("./actions/CoreAction");
const ConfigServerAction = require("./actions/ConfigAction");
const DTMFServerAction = require("./actions/DTMFAction");
const DialPlanServerAction = require("./actions/DialPlanActions");
const PROP_VOICEMAIL = "voiceMail";
const PROP_VARIABLE = "variable";
const PROP_PEERS = "peers";
const PROP_ORIGINATE = "originate";
const PROP_MODULE = "module";
const PROP_DTMF = "dtmf";
const PROP_DB = "db";
const PROP_CORE = "core";
const PROP_CONFIG = "config";
const PROP_DIALPLAN = "dialplan";
class ServerActions extends dfiObject_1.default {
    constructor(server) {
        super();
        this.setProp(PROP_VOICEMAIL, new VoiceMailServerAction(server));
        this.setProp(PROP_VARIABLE, new VariableServerAction(server));
        this.setProp(PROP_PEERS, new PeersServerAction(server));
        this.setProp(PROP_ORIGINATE, new OriginateServerAction(server));
        this.setProp(PROP_MODULE, new ModuleAction(server));
        this.setProp(PROP_DTMF, new DTMFServerAction(server));
        this.setProp(PROP_DB, new DBServerAction(server));
        this.setProp(PROP_CORE, new CoreServerAction(server));
        this.setProp(PROP_CONFIG, new ConfigServerAction(server));
        this.setProp(PROP_DIALPLAN, new DialPlanServerAction(server));
    }
    get voiceMail() {
        return this.getProp(PROP_VOICEMAIL);
    }
    get variable() {
        return this.getProp(PROP_VARIABLE);
    }
    get peers() {
        return this.getProp(PROP_PEERS);
    }
    get originate() {
        return this.getProp(PROP_ORIGINATE);
    }
    get module() {
        return this.getProp(PROP_MODULE);
    }
    get dtmf() {
        return this.getProp(PROP_DTMF);
    }
    get db() {
        return this.getProp(PROP_DB);
    }
    get core() {
        return this.getProp(PROP_CORE);
    }
    get config() {
        return this.getProp(PROP_CONFIG);
    }
    get dialplan() {
        return this.getProp(PROP_DIALPLAN);
    }
}
module.exports = ServerActions;
//# sourceMappingURL=Actions.js.map