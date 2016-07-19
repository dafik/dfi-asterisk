"use strict";
"use strict";
const ChannelStates = require('./defs/channelStates'),
    State = require('./state');


class ChannelState extends State {

    constructor(status, name) {
        super();

        this.status = status;
        this.name = name;
    }

}
ChannelState.prototype.States = ChannelStates;
module.exports = ChannelState;