"use strict";
const AsteriskCollection = require('../internal/asteriskCollection'),
    AsteriskBridge = require('../models/asteriskBridge');

/**
 * @typedef BridgesCollection
 *
 * @extends AsteriskCollection
 * @extends EventEmitter
 *
 * @property {string} xxxxx
 * @method cccc
 */
class BridgesCollection extends AsteriskCollection {

}
BridgesCollection.prototype._model = AsteriskBridge;
BridgesCollection.prototype._idField = 'id';


module.exports = BridgesCollection;
