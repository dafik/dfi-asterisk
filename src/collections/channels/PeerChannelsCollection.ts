import AsteriskCollection from "../../internal/asteriskCollection";
import Channel from "../../models/ChannelModel";

class PeerChannels extends AsteriskCollection<Channel> {

    constructor() {
        super({
            model: Channel
        });
    }

    public add(element: Channel): this {
        return super.add(element);
    }

    public remove(element: any | Channel): boolean {
        return super.remove(element);
    }

}

export default PeerChannels;
