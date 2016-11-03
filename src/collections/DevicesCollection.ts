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

    public add(element: Device): this {
        return super.add(element);
    }

    public clear(): this {
        return super.clear();
    }
}
export = Devices;
