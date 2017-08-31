"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../../internal/asteriskCollection");
const ChannelModel_1 = require("../../models/ChannelModel");
class BridgeChannels extends asteriskCollection_1.default {
    constructor() {
        super({
            model: ChannelModel_1.default
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
exports.default = BridgeChannels;
//# sourceMappingURL=BridgeChannelsCollection.js.map