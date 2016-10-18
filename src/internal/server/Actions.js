"use strict";
const DfiObject = require("local-dfi-base/src/dfiObject");
const ModuleAction = require("./actions/ModuleAction");
const VoiceMailServerAction = require("./actions/VoicemailAction");
const VariableServerAction = require("./actions/VariableAction");
const PeersServerAction = require("./actions/PeerAction");
const OriginateServerAction = require("./actions/OriginateAction");
const DBServerAction = require("./actions/DBAction");
const CoreServerAction = require("./actions/CoreAction");
const ConfigServerAction = require("./actions/ConfigAction");
const DTMFServerAction = require("./actions/DTMFAction");
class ServerActions extends DfiObject {
    constructor(server) {
        super();
        this.setProp("voiceMail", new VoiceMailServerAction(server));
        this.setProp("variable", new VariableServerAction(server));
        this.setProp("peers", new PeersServerAction(server));
        this.setProp("originate", new OriginateServerAction(server));
        this.setProp("module", new ModuleAction(server));
        this.setProp("dtmf", new DTMFServerAction(server));
        this.setProp("db", new DBServerAction(server));
        this.setProp("core", new CoreServerAction(server));
        this.setProp("config", new ConfigServerAction(server));
    }
    get voiceMail() {
        return this.getProp("voiceMail");
    }
    get variable() {
        return this.getProp("variable");
    }
    get peers() {
        return this.getProp("peers");
    }
    get originate() {
        return this.getProp("originate");
    }
    get module() {
        return this.getProp("module");
    }
    get dtmf() {
        return this.getProp("dtmf");
    }
    get db() {
        return this.getProp("db");
    }
    get core() {
        return this.getProp("core");
    }
    get config() {
        return this.getProp("config");
    }
}
module.exports = ServerActions;
//# sourceMappingURL=Actions.js.map