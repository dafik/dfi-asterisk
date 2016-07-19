"use strict";
const AgentStates = require('./defs/agentStates'),
    State = require('./state');


class AgentState extends State {

    constructor(status, name) {
        super();

        this.status = status;
        this.name = name;
    }

}
AgentState.prototype.States = AgentStates;
module.exports = AgentState;