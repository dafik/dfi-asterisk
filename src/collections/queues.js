"use strict";
const AsteriskCollection = require('../internal/asteriskCollection'),
    AsteriskQueue = require('../models/asteriskQueue');

class QueuesCollection extends AsteriskCollection {
    constructor() {

        //TODO hack
        if (AsteriskQueue.constructor.name != 'AsteriskChannel') {
            QueuesCollection.prototype._model = require('../models/asteriskQueue');
        }

        super();
        //TODO hack


    }
}
QueuesCollection.prototype._model = AsteriskQueue;
QueuesCollection.prototype._idField = 'id';


module.exports = QueuesCollection;

