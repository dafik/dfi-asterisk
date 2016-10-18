import AsteriskCollection = require("../internal/asteriskCollection");
import Device = require("../models/DeviceModel");

class Devices extends AsteriskCollection<Device> {
    constructor() {
        super({
            model: Device
        });
    }

    public get(id: any): Device {
        return super.get(id);
    }

    public clear(): this {
        return super.clear();
    }

    public add(element: Device): Map<any, Device> {
        return super.add(element);
    }
}
export = Devices;
