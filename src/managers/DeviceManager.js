"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DevicesCollection_1 = require("../collections/DevicesCollection");
const NotAllowedAction_1 = require("../errors/NotAllowedAction");
const actionNames_1 = require("../internal/asterisk/actionNames");
const eventNames_1 = require("../internal/asterisk/eventNames");
const astUtil_1 = require("../internal/astUtil");
const Manager_1 = require("../internal/server/Manager");
const DeviceModel_1 = require("../models/DeviceModel");
const deviceState_1 = require("../states/deviceState");
class DeviceManager extends Manager_1.default {
    constructor(options, state) {
        super(options, state, new DevicesCollection_1.default());
        if (!this.enabled) {
            return;
        }
        const map = {};
        map[eventNames_1.default.DEVICE_STATE_CHANGE] = this._handleDeviceStateChangeEvent;
        this._mapEvents(map);
    }
    get devices() {
        return this._collection;
    }
    start(callbackFn, context) {
        function finish() {
            this.server.logger.info('manager "DeviceManager" started');
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, "DeviceManager");
        }
        this.server.logger.info('starting manager "DeviceManager"');
        if (!this.enabled) {
            finish.call(this);
        }
        else {
            this.server.sendEventGeneratingAction({ Action: actionNames_1.default.DEVICE_STATE_LIST }, (err, re) => {
                if (err) {
                    if (!(err instanceof NotAllowedAction_1.default)) {
                        astUtil_1.default.maybeCallbackOnce(callbackFn, context, err);
                        return;
                    }
                }
                if (typeof re !== "undefined") {
                    re.events.forEach((event) => {
                        if (event.Event === eventNames_1.default.DEVICE_STATE_CHANGE) {
                            if (event.Device.match(/Queue|Local|DAHDI/)) {
                                // skip queue devices
                                return;
                            }
                            const device = new DeviceModel_1.default(event);
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
            device.state = deviceState_1.default.byName(event.State);
            device.setLastUpdate(event.$time);
        }
        else {
            device = new DeviceModel_1.default(event);
            this.logger.info("Adding device %s (%s)", device.device, device.state.name);
            this._addDevice(device);
        }
        this.emit(Manager_1.default.events.UPDATE, device, event.State, oldState);
    }
    _addDevice(device) {
        this.logger.debug("Adding device %s %j", device.device, device.state.name);
        this.devices.add(device);
        this.emit(Manager_1.default.events.ADD, device);
    }
}
exports.default = DeviceManager;
//# sourceMappingURL=DeviceManager.js.map