import AsteriskManager = require("../internal/server/Manager");
import Devices = require("../collections/DevicesCollection");
import {IDfiAMIResponseMessageMulti, IDfiCallbackResult} from "../definitions/interfaces";
import {IAstEventDeviceStateChange} from "../internal/asterisk/events";
import Device = require("../models/DeviceModel");
import AstUtil = require("../internal/astUtil");
import DeviceState = require("../states/deviceState");
import AST_EVENT = require("../internal/asterisk/eventNames");
import AST_ACTION = require("../internal/asterisk/actionNames");

class DeviceManager extends AsteriskManager<Device, Devices> {

    constructor(options, state) {
        super(options, state, new Devices());

        if (!this.enabled) {
            return;
        }

        const map = {};
        map[AST_EVENT.DEVICE_STATE_CHANGE] = this._handleDeviceStateChangeEvent;
        this._mapEvents(map);
    }

    get devices(): Devices {
        return this._collection;
    }

    public start(callbackFn: IDfiCallbackResult, context?) {

        function finish() {
            this.server.logger.info('manager "DeviceManager" started');
            AstUtil.maybeCallbackOnce(callbackFn, context, null, "DeviceManager");
        }

        this.server.logger.info('starting manager "DeviceManager"');

        if (!this.enabled) {
            finish.call(this);
        } else {
            this.server.sendEventGeneratingAction({Action: AST_ACTION.DEVICE_STATE_LIST}, (err: Error|null, re: IDfiAMIResponseMessageMulti<IAstEventDeviceStateChange>) => {
                if (err) {
                    if (!err.message.match("Not Allowed Action")) {
                        AstUtil.maybeCallbackOnce(callbackFn, context, err);
                        return;
                    }
                }
                if (typeof re !== "undefined") {
                    re.events.forEach((event) => {
                        if (event.Event === AST_EVENT.DEVICE_STATE_CHANGE) {
                            if (event.Device.match(/Queue|Local|DAHDI/)) {
                                // skip queue devices
                                return;
                            }
                            const device = new Device(event);
                            this._addDevice(device);
                        }
                    }, this);
                }
                finish.call(this);
            }, this);
        }
    }

    public disconnected() {
        this.devices.clear();
    }

    private _handleDeviceStateChangeEvent(event: IAstEventDeviceStateChange) {

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
            device.setLastUpdate(event.$time);
        } else {
            device = new Device(event);
            this.logger.info("Adding device %s (%s)", device.device, device.state.name);
            this._addDevice(device);
        }

        this.emit(AsteriskManager.events.UPDATE, device, event.State, oldState);
    }

    private _addDevice(device) {
        this.logger.debug("Adding device %s %j", device.device, device.state.name);

        this.devices.add(device);
        this.emit(AsteriskManager.events.ADD, device);
    }
}

export = DeviceManager;
