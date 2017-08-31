import AsteriskCollection from "../../internal/asteriskCollection";
import Channel from "../../models/ChannelModel";

class BridgeChannels extends AsteriskCollection<Channel> {
    constructor() {
        super({
            model: Channel
        });
    }

    public destroy(): any {
        return super.destroy();
    }

    public has(element: any | Channel): boolean {
        return super.has(element);
    }

    public add(element: Channel): this {
        return super.add(element);
    }

    public remove(element: any | Channel): boolean {
        return super.remove(element);
    }

    public clear(): this {
        return super.clear();
    }
}

export default BridgeChannels;
