"use strict";
const QueueEntryStates = require('./defs/queueEntryStates'),
    State = require('./state');


class QueueEntryState extends State {

    constructor(status, name) {
        super();

        this.status = status;
        this.name = name;
    }

}
QueueEntryState.prototype.States = QueueEntryStates;
module.exports = QueueEntryState;