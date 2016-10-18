"use strict";
class NoSuchChannel extends Error {
    constructor(message, channel) {
        super(message);
        this.message = message;
        this.name = "NoSuchChannel";
        this.channel = channel;
    }
}
module.exports = NoSuchChannel;
//# sourceMappingURL=NoSuchChannel.js.map