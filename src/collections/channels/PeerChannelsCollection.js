"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../../internal/asteriskCollection");
let channelClass;
class PeerChannels extends asteriskCollection_1.default {
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
exports.default = PeerChannels;
//# sourceMappingURL=PeerChannelsCollection.js.map