"use strict";
const AsteriskModel = require('../internal/asteriskModel'),
    DeviceState = require('../enums/deviceState');


class AsteriskDevice extends AsteriskModel {
    initialize() {
        this.id = this.get('device');
        if (this.get('state')) {
            var stat = DeviceState.byName(this.get('state'));
        }
        this.set('state', stat);
    }
}

module.exports = AsteriskDevice;