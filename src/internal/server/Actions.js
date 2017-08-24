"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfiObject_1 = require("local-dfi-base/src/dfiObject");
const ConfigAction_1 = require("./actions/ConfigAction");
const CoreAction_1 = require("./actions/CoreAction");
const DBAction_1 = require("./actions/DBAction");
const DialPlanActions_1 = require("./actions/DialPlanActions");
const DTMFAction_1 = require("./actions/DTMFAction");
const ModuleAction_1 = require("./actions/ModuleAction");
const OriginateAction_1 = require("./actions/OriginateAction");
const PeerAction_1 = require("./actions/PeerAction");
const VariableAction_1 = require("./actions/VariableAction");
const VoicemailAction_1 = require("./actions/VoicemailAction");
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
        this.setProp(PROP_VOICEMAIL, new VoicemailAction_1.default(server));
        this.setProp(PROP_VARIABLE, new VariableAction_1.default(server));
        this.setProp(PROP_PEERS, new PeerAction_1.default(server));
        this.setProp(PROP_ORIGINATE, new OriginateAction_1.default(server));
        this.setProp(PROP_MODULE, new ModuleAction_1.default(server));
        this.setProp(PROP_DTMF, new DTMFAction_1.default(server));
        this.setProp(PROP_DB, new DBAction_1.default(server));
        this.setProp(PROP_CORE, new CoreAction_1.default(server));
        this.setProp(PROP_CONFIG, new ConfigAction_1.default(server));
        this.setProp(PROP_DIALPLAN, new DialPlanActions_1.default(server));
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
exports.default = ServerActions;
//# sourceMappingURL=Actions.js.map