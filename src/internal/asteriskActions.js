"use strict";
const
    AsteriskActionVoiceMail = require('./actions/actionVoicemail'),
    AsteriskActionVariable = require('./actions/actionVariable'),
    AsteriskActionPeers = require('./actions/actionPeer'),
    AsteriskActionOriginate = require('./actions/actionOriginate'),
    AsteriskActionModule = require('./actions/actionModule'),
    AsteriskActionDTMF = require('./actions/actionDTMF'),
    AsteriskActionDb = require('./actions/actionDb'),
    AsteriskActionCore = require('./actions/actionCore'),
    AsteriskActionConfig = require('./actions/actionConfig');


class AsteriskActions {
    constructor(server) {
        this.voiceMail = new AsteriskActionVoiceMail(server);
        this.variable = new AsteriskActionVariable(server);
        this.peers = new AsteriskActionPeers(server);
        this.originate = new AsteriskActionOriginate(server);
        this.module = new AsteriskActionModule(server);
        this.dtmf = new AsteriskActionDTMF(server);
        this.db = new AsteriskActionDb(server);
        this.core = new AsteriskActionCore(server);
        this.config = new AsteriskActionConfig(server);
    }
}

module.exports = AsteriskActions;