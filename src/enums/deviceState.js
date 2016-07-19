"use strict";
const DeviceStates = require('./defs/deviceStates'),
    State = require('./state');


class DeviceState extends State {

    constructor(status, name) {
        super();

        this.status = status;
        this.name = name;
    }

}
DeviceState.prototype.States = DeviceStates;
module.exports = DeviceState;