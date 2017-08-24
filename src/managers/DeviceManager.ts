import Devices from "../collections/DevicesCollection";
import {IDfiAMIResponseMessageMulti, IDfiCallbackResult} from "../definitions/interfaces";
import NotAllowedAction from "../errors/NotAllowedAction";
import AST_ACTION from "../internal/asterisk/actionNames";
import AST_EVENT from "../internal/asterisk/eventNames";
import {IAstEventDeviceStateChange} from "../internal/asterisk/events";
import AstUtil from "../internal/astUtil";
import AsteriskManager from "../internal/server/Manager";
import Device from "../models/DeviceModel";
import DeviceState from "../states/deviceState";

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

    public start(callbackFn: IDfiCallbackResult<Error, "DeviceManager">, context?) {

        function finish() {
            this.server.logger.info('manager "DeviceManager" started');
            AstUtil.maybeCallbackOnce(callbackFn, context, null, "DeviceManager");
        }

        this.server.logger.info('starting manager "DeviceManager"');

        if (!this.enabled) {
            finish.call(this);
        } else {
            this.server.sendEventGeneratingAction({Action: AST_ACTION.DEVICE_STATE_LIST}, (err: Error | null, re: IDfiAMIResponseMessageMulti<IAstEventDeviceStateChange, Error, {}>) => {
                if (err) {
                    if (!(err instanceof NotAllowedAction)) {
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

export default DeviceManager;
