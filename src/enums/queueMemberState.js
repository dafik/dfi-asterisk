"use strict";
const QueueMemberStates = require('./defs/queueMemberStates'),
    State = require('./state');


class QueueMemberState extends State {

    constructor(status, name) {
        super();

        this.status = status;
        this.name = name;
    }

}
QueueMemberState.prototype.States = QueueMemberStates;
module.exports = QueueMemberState;