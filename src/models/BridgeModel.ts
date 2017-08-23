import AsteriskModel from "../internal/asteriskModel";
import {IDfiAstModelAttribsBridge, IDfiAstModelOptions} from "../definitions/models";
import Channel from "./ChannelModel";
import BridgeChannels from "../collections/channels/BridgeChannelsCollection";
import AST_EVENT from "../internal/asterisk/eventNames";

const PROP_UNIQUE_ID = "uniqueid";
const PROP_TYPE = "type";
const PROP_TECHNOLOGY = "technology";
const PROP_CREATOR = "creator";
const PROP_ = "name";
const PROP_NUM_CHANNELS = "numChannels";

const PROP_LOCAL_ONE_UNIQUE_ID = "localOneUniqueId";
const PROP_LOCAL_TWO_UNIQUE_ID = "localTwoUniqueId";
const PROP_IS_HANGUP_FIRST = "isHangupFirst";
const PROP_IS_HANGUP_SECOND = "isHangupSecond";

const P_PROP_CHANNELS = "channels";

class Bridge extends AsteriskModel {

    protected static map = new Map([
        ["BridgeType", PROP_TYPE],
        ["BridgeTechnology", PROP_TECHNOLOGY],
        ["BridgeCreator", PROP_CREATOR],
        ["BridgeName", PROP_],
        ["BridgeNumChannels", PROP_NUM_CHANNELS],
        ["BridgeUniqueid", PROP_UNIQUE_ID],

        ["id", "id"],
        ["isHangupFirst", PROP_IS_HANGUP_FIRST],
        ["isHangupSecond", PROP_IS_HANGUP_SECOND]

    ]);

    constructor(attributes: IDfiAstModelAttribsBridge, options?: IDfiAstModelOptions) {
        if (attributes.Event === AST_EVENT.BRIDGE_CREATE) {
            attributes.id = attributes.BridgeUniqueid;
        } else if (attributes.Event === AST_EVENT.BRIDGE_LIST_ITEM) {
            attributes.id = attributes.BridgeUniqueid;
        }

        super(attributes, options);

        this.setProp(P_PROP_CHANNELS, new BridgeChannels());
    }

    get uniqueid(): string {
        return this.get(PROP_UNIQUE_ID);
    }

    get type(): string {
        return this.get(PROP_TYPE);
    }

    get technology(): string {
        return this.get(PROP_TECHNOLOGY);
    }

    get creator(): string {
        return this.get(PROP_CREATOR);
    }

    get name(): string {
        return this.get(PROP_);
    }

    get numChannels(): string {
        return this.get(PROP_NUM_CHANNELS);
    }

    get localOneUniqueId(): string {
        return this.get(PROP_LOCAL_ONE_UNIQUE_ID);
    }

    get localTwoUniqueId(): string {
        return this.get(PROP_LOCAL_TWO_UNIQUE_ID);
    }

    get isHangupFirst(): boolean {
        return this.get(PROP_IS_HANGUP_FIRST);
    }

    get isHangupSecond(): boolean {
        return this.get(PROP_IS_HANGUP_SECOND);
    }

    set isHangupFirst(val: boolean) {
        this.set(PROP_IS_HANGUP_FIRST, val);
    }

    set isHangupSecond(val: boolean) {
        this.set(PROP_IS_HANGUP_SECOND, val);
    }

    private get _channels(): BridgeChannels {
        return this.getProp(P_PROP_CHANNELS);
    }

    public addChannel(channel: Channel): void {
        this._channels.add(channel);
    }

    public hasChannel(channel: Channel|any): boolean {
        return this._channels.has(channel);
    }

    public removeChannel(channel: Channel|any): void {
        this._channels.remove(channel);
    }

    public get channelsSize(): number {
        return this._channels.size;
    }

    public destroy() {
        this._channels
            .clear()
            .destroy();
        super.destroy();
    }
}

export default Bridge;
