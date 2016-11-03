import AsteriskCollection = require("../../internal/asteriskCollection");
import Channel = require("../../models/ChannelModel");

let channelClass;

class BridgeChannels extends AsteriskCollection<Channel> {
    constructor() {
        if (typeof channelClass !== "function") {
            channelClass = require("../../models/ChannelModel");
        }
        super({
            model: channelClass
        });
    }

    public destroy(): any {
        return super.destroy();
    }

    public has(element: any|Channel): boolean {
        return super.has(element);
    }

    public add(element: Channel): this {
        return super.add(element);
    }

    public remove(element: any|Channel): boolean {
        return super.remove(element);
    }

    public clear(): this {
        return super.clear();
    }
}
export = BridgeChannels;
