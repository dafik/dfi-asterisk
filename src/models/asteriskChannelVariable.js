"use strict";
const
    AsteriskModel = require('../internal/asteriskModel');


class AsteriskChannelVariable extends AsteriskModel {
    initialize() {
        this.id= this.get('name');
    }
}
module.exports = AsteriskChannelVariable;
