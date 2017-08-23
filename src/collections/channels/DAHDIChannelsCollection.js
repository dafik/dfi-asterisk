"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../../internal/asteriskCollection");
const DahdiModel_1 = require("../../models/DahdiModel");
class DAHDIChannels extends asteriskCollection_1.default {
    constructor() {
        super({
            model: DahdiModel_1.default
        });
    }
    get(id) {
        return super.get(id);
    }
    add(element) {
        return super.add(element);
    }
    clear() {
        return super.clear();
    }
}
exports.default = DAHDIChannels;
//# sourceMappingURL=DAHDIChannelsCollection.js.map