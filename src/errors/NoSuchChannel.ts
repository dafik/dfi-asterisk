import Channel = require("../models/ChannelModel");

class NoSuchChannel extends Error {
    public channel;

    constructor(message: string, channel?: Channel) {
        super(message);
        this.message = message;
        this.name = "NoSuchChannel";

        this.channel = channel;
    }
}
export = NoSuchChannel;
