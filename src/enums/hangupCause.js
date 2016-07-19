"use strict";
const HangupCauses = require('./defs/hangupCauses'),
    State = require('./state');


class HangupCause extends State {

    constructor(status, name) {
        super();

        this.status = status;
        this.name = name;
    }

}
HangupCause.prototype.States = HangupCauses;
module.exports = HangupCause;