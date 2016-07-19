"use strict";
const 
    AsteriskCollection = require('../internal/asteriskCollection'),
    AsteriskDevice = require('../models/asteriskDevice');

class DevicesCollection extends AsteriskCollection {

}
DevicesCollection.prototype._model = AsteriskDevice;
DevicesCollection.prototype._idField = 'id';


module.exports = DevicesCollection;

