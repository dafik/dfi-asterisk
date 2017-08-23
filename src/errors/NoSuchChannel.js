"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoSuchChannel extends Error {
    constructor(message, channel) {
        super(message);
        this.message = message;
        this.name = "NoSuchChannel";
        this.channel = channel;
    }
}
exports.default = NoSuchChannel;
//# sourceMappingURL=NoSuchChannel.js.map