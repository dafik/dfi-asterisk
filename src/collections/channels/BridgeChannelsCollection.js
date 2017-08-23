"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../../internal/asteriskCollection");
let channelClass;
class BridgeChannels extends asteriskCollection_1.default {
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
exports.default = BridgeChannels;
//# sourceMappingURL=BridgeChannelsCollection.js.map