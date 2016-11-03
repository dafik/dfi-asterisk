import AsteriskCollection = require("../../internal/asteriskCollection");
import Channel = require("../../models/ChannelModel");

let channelClass;

class PeerChannels extends AsteriskCollection<Channel> {

    constructor() {
        if (typeof channelClass !== "function") {
            channelClass = require("../../models/ChannelModel");
        }
        super({
            model: channelClass
        });
    }

    public add(element: Channel): this {
        return super.add(element);
    }

    public remove(element: any|Channel): boolean {
        return super.remove(element);
    }

}

export = PeerChannels;
