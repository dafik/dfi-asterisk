"use strict";
const AsteriskModel = require('../internal/asteriskModel'),
    _ = require('lodash');


/**
 * @class
 * @extends AsteriskModel
 */
class AsteriskDahdiChannel extends AsteriskModel {

    initialize() {
        this.id = this.get('dahdichannel');
    }
}


module.exports = AsteriskDahdiChannel;