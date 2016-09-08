"use strict";
const moment = require('moment'),
    dAmiLib = require("local-dfi-asterisk-ami"),
    actions = dAmiLib.Actions,

    AsteriskManager = require('../internal/asteriskManager'),
    DevicesCollection = require('../collections/devices'),
    AsteriskDevice = require('../models/asteriskDevice'),
    DeviceState = require('../enums/deviceState');


class DeviceManager extends AsteriskManager {

    constructor(options, state) {
        super(options, state);
        this.devices = new DevicesCollection();

    }

    start(callback, thisp) {

        function finish() {
            if (typeof callback == "function") {
                this.server.loggers.logger.info('manager "DeviceManager" started');
                callback.call(thisp, null, 'DeviceManager');
            }
        }

        function onResponse(err, re) {
            if (err) {
                if (!err.message.match('Not Allowed Action')) {


                    callback.call(thisp, err);
                    return;
                }
            }
            if (typeof re != "undefined") {
                re.getEvents().forEach(onEachEvent, this)
            }
            finish.call(this);
        }

        function onEachEvent(event) {
            if (event.event == 'devicestatechange') {
                handleDeviceEvent.call(this, event);
            }
        }

        function handleDeviceEvent(event) {
            if (event.device.match(/Queue|Local|DAHDI/)) {
                //skip queue devices
                return
            }

            var device = new AsteriskDevice(event, {server: this.server});
            this.logger.debug("Adding device " + device.get('device') + " (" + device.get('state').name + ")");

            this._addDevice(device);
        }

        this.server.loggers.logger.info('starting manager "DeviceManager"');

        if (!this.enabled) {
            finish.call(this);
            return
        }

        var map = {
            //state
            //this.logger.info('devicestatechange %j,%j', event.device, event.state);
            'devicestatechange': this._handleDeviceStateChangeEvent
        };
        this._mapEvents(map);

        /**
         * @type {DeviceStateList}
         */
        var action;
        action = new actions.DeviceStateList();
        this.server.sendEventGeneratingAction(action, onResponse, this);
    }


    reStart(callback, thisp) {
        if (typeof callback == "function") {
            this.server.loggers.logger.info('manager %s restarted', this.constructor.name);
            callback.call(thisp, null, this.constructor.name);
        }
    }

    disconnected() {
        this.devices.clear();
    }


    _handleDeviceStateChangeEvent(event) {

        if (event.device.match(/Queue|Local|DAHDI/)) {
            //skip queue devices
            return
        }


        this.logger.debug("handle  DeviceStateChangeEvent device: %j (%s)", event.device, event.state);

        var device = this.devices.get(event.device);
        var oldState;
        if (device) {
            oldState = device.get('state');
            device.set('state', DeviceState.byName(event.state));
            device.set('dateupdate', moment());
        } else {
            device = new AsteriskDevice(event, {server: this.server});
            this.logger.info("Adding device " + device.get('device') + "(" + device.get('state') + ")");
            this._addDevice(device);
        }

        this.emit('changeState', device, device.get('state'), oldState);
        this.emit('changeState:' + device.id, device, device.state, oldState);

    }

    _addDevice(device) {
        this.devices.add(device);
        this.emit('add', device);
    }

    toJSON() {
        var obj = super.toJSON();
        obj.collection = this.devices.toJSON();

        return obj;
    }

}

module.exports = DeviceManager;