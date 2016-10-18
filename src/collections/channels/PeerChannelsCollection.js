"use strict";
const AsteriskCollection = require("../../internal/asteriskCollection");
let channelClass;
class PeerChannels extends AsteriskCollection {
    constructor() {
        if (typeof channelClass !== "function") {
            channelClass = require("../../models/ChannelModel");
        }
        super({
            model: channelClass
        });
    }
    add(element) {
        return super.add(element);
    }
    remove(element) {
        return super.remove(element);
    }
}
module.exports = PeerChannels;
//# sourceMappingURL=PeerChannelsCollection.js.map