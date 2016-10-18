import DfiObject = require("local-dfi-base/src/dfiObject");
import ModuleAction = require("./actions/ModuleAction");
import VoiceMailServerAction = require("./actions/VoicemailAction");
import VariableServerAction = require("./actions/VariableAction");
import PeersServerAction = require("./actions/PeerAction");
import OriginateServerAction = require("./actions/OriginateAction");
import DBServerAction = require("./actions/DBAction");
import CoreServerAction = require("./actions/CoreAction");
import ConfigServerAction = require("./actions/ConfigAction");
import AsteriskServer = require("../../asteriskServer");
import DTMFServerAction = require("./actions/DTMFAction");
import ModuleServerAction = require("./actions/ModuleAction");

class ServerActions extends DfiObject {

    constructor(server: AsteriskServer) {
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

    get voiceMail(): VoiceMailServerAction {
        return this.getProp("voiceMail");
    }

    get variable(): VariableServerAction {
        return this.getProp("variable");
    }

    get peers(): PeersServerAction {
        return this.getProp("peers");
    }

    get originate(): OriginateServerAction {
        return this.getProp("originate");
    }

    get module(): ModuleServerAction {
        return this.getProp("module");
    }

    get dtmf(): DTMFServerAction {
        return this.getProp("dtmf");
    }

    get db(): DBServerAction {
        return this.getProp("db");
    }

    get core(): CoreServerAction {
        return this.getProp("core");
    }

    get config(): ConfigServerAction {
        return this.getProp("config");
    }
}

export = ServerActions;
