"use strict";
const AsteriskManager = require("../internal/server/Manager");
const Devices = require("../collections/DevicesCollection");
const actionNames_1 = require("../internal/asterisk/actionNames");
const eventNames_1 = require("../internal/asterisk/eventNames");
const Device = require("../models/DeviceModel");
const AstUtil = require("../internal/astUtil");
const DeviceState = require("../states/deviceState");
class DeviceManager extends AsteriskManager {
    constructor(options, state) {
        super(options, state, new Devices());
        if (!this.enabled) {
            return;
        }
        let map = {};
        map[eventNames_1.AST_EVENT.DEVICE_STATE_CHANGE] = this._handleDeviceStateChangeEvent;
        this._mapEvents(map);
    }
    get devices() {
        return this._collection;
    }
    start(callbackFn, context) {
        function finish() {
            this.server.logger.info('manager "DeviceManager" started');
            AstUtil.maybeCallbackOnce(callbackFn, context, null, "DeviceManager");
        }
        this.server.logger.info('starting manager "DeviceManager"');
        if (!this.enabled) {
            finish.call(this);
        }
        else {
            this.server.sendEventGeneratingAction({ Action: actionNames_1.AST_ACTION.DEVICE_STATE_LIST }, (err, re) => {
                if (err) {
                    if (!err.message.match("Not Allowed Action")) {
                        AstUtil.maybeCallbackOnce(callbackFn, context, err);
                        return;
                    }
                }
                if (typeof re !== "undefined") {
                    re.events.forEach((event) => {
                        if (event.Event === eventNames_1.AST_EVENT.DEVICE_STATE_CHANGE) {
                            if (event.Device.match(/Queue|Local|DAHDI/)) {
                                // skip queue devices
                                return;
                            }
                            let device = new Device(event);
                            this._addDevice(device);
                        }
                    }, this);
                }
                finish.call(this);
            }, this);
        }
    }
    disconnected() {
        this.devices.clear();
    }
    _handleDeviceStateChangeEvent(event) {
        if (event.Device.match(/Queue|Local|DAHDI/)) {
            // skip queue devices
            return;
        }
        this.logger.debug("handle  DeviceStateChangeEvent device: %j (%s)", event.Device, event.State);
        let device = this.devices.get(event.Device);
        let oldState;
        if (device) {
            oldState = device.state.name;
            device.state = DeviceState.byName(event.State);
            device.stampLastUpdate(event.$time);
        }
        else {
            device = new Device(event);
            this.logger.info("Adding device %s (%s)", device.device, device.state.name);
            this._addDevice(device);
        }
        this.emit(AsteriskManager.events.UPDATE, device, event.State, oldState);
    }
    _addDevice(device) {
        this.logger.debug("Adding device %s %j", device.device, device.state.name);
        this.devices.add(device);
        this.emit(AsteriskManager.events.ADD, device);
    }
}
module.exports = DeviceManager;
//# sourceMappingURL=DeviceManager.js.map