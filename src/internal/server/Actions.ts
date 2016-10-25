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
import DialPlanServerAction = require("./actions/DialPlanActions");

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

class ServerActions extends DfiObject {

    constructor(server: AsteriskServer) {
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

    get voiceMail(): VoiceMailServerAction {
        return this.getProp(PROP_VOICEMAIL);
    }

    get variable(): VariableServerAction {
        return this.getProp(PROP_VARIABLE);
    }

    get peers(): PeersServerAction {
        return this.getProp(PROP_PEERS);
    }

    get originate(): OriginateServerAction {
        return this.getProp(PROP_ORIGINATE);
    }

    get module(): ModuleServerAction {
        return this.getProp(PROP_MODULE);
    }

    get dtmf(): DTMFServerAction {
        return this.getProp(PROP_DTMF);
    }

    get db(): DBServerAction {
        return this.getProp(PROP_DB);
    }

    get core(): CoreServerAction {
        return this.getProp(PROP_CORE);
    }

    get config(): ConfigServerAction {
        return this.getProp(PROP_CONFIG);
    }

    get dialplan(): DialPlanServerAction {
        return this.getProp(PROP_DIALPLAN);
    }
}

export = ServerActions;
