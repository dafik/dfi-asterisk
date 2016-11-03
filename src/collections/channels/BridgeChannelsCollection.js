"use strict";
const AsteriskCollection = require("../../internal/asteriskCollection");
let channelClass;
class BridgeChannels extends AsteriskCollection {
    constructor() {
        if (typeof channelClass !== "function") {
            channelClass = require("../../models/ChannelModel");
        }
        super({
            model: channelClass
        });
    }
    destroy() {
        return super.destroy();
    }
    has(element) {
        return super.has(element);
    }
    add(element) {
        return super.add(element);
    }
    remove(element) {
        return super.remove(element);
    }
    clear() {
        return super.clear();
    }
}
module.exports = BridgeChannels;
//# sourceMappingURL=BridgeChannelsCollection.js.map