import {IDfiAstDAHDIOnChannel, IDfiAstModelAttribsDAHDI, IDfiAstModelOptions} from "../definitions/models";
import AsteriskModel from "../internal/asteriskModel";

const PROP_NAME = "name";
const PROP_CONTEXT = "context";
const PROP_CHANNEL = "channel";

class Dahdi extends AsteriskModel {

    protected static map = new Map([
        ["DAHDIChannel", PROP_NAME],

        /*  ["Signalling", "signalling"],
         ["SignallingCode", "signallingCode"],*/
        ["Context", PROP_CONTEXT],
        // ["DND", "dnd"],
        // ["Alarm", "alarm"],
        // ["Description", "description"],

        ["channel", PROP_CHANNEL]
    ]);

    constructor(attributes: IDfiAstModelAttribsDAHDI, options?: IDfiAstModelOptions) {

        options = options || {};
        options.idAttribute = PROP_NAME;

        super(attributes, options);
    }

    get name() {
        return this.get(PROP_NAME);
    }

    get context() {
        return this.get(PROP_CONTEXT);
    }

    get channel(): IDfiAstDAHDIOnChannel {
        return this.get(PROP_CHANNEL);
    }

    set channel(channel: IDfiAstDAHDIOnChannel) {
        this.set(PROP_CHANNEL, channel);
    }
}

export default Dahdi;
