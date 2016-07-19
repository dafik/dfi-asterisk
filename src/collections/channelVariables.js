"use strict";
const     AsteriskCollection = require('../internal/asteriskCollection'),
    AsteriskChannelVariable = require('../models/asteriskChannelVariable');

class ChannelVariablesCollection extends AsteriskCollection {
}

ChannelVariablesCollection.prototype._model = AsteriskChannelVariable;
ChannelVariablesCollection.prototype._idField = 'id';


module.exports = ChannelVariablesCollection;

