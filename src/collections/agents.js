"use strict";
const AsteriskCollection = require('../internal/asteriskCollection'),
    AsteriskAgent = require('../models/asteriskAgent');

class AgentsCollection extends AsteriskCollection {
}
AgentsCollection.prototype._model = AsteriskAgent;
AgentsCollection.prototype._idField = 'id';


module.exports = AgentsCollection;