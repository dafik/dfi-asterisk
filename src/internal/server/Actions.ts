import DfiObject from "local-dfi-base/src/dfiObject";
import ModuleAction from "./actions/ModuleAction";
import VoiceMailServerAction from "./actions/VoicemailAction";
import VariableServerAction from "./actions/VariableAction";
import PeersServerAction from "./actions/PeerAction";
import OriginateServerAction from "./actions/OriginateAction";
import DBServerAction from "./actions/DBAction";
import CoreServerAction from "./actions/CoreAction";
import ConfigServerAction from "./actions/ConfigAction";
import AsteriskServer from "../../asteriskServer";
import DTMFServerAction from "./actions/DTMFAction";
import ModuleServerAction from "./actions/ModuleAction";
import DialPlanServerAction from "./actions/DialPlanActions";

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

export default ServerActions;
