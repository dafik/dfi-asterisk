"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../../internal/asteriskCollection");
const ChannelModel_1 = require("../../models/ChannelModel");
class PeerChannels extends asteriskCollection_1.default {
    constructor() {
        super({
            model: ChannelModel_1.default
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