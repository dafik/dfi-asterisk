import AsteriskCollection = require("../internal/asteriskCollection");
import Bridge = require("../models/BridgeModel");

class Bridges extends AsteriskCollection<Bridge> {
    constructor() {
        super({
            model: Bridge
        });
    }

    public add(element: Bridge): Map<any, Bridge> {
        return super.add(element);
    }

    public has(element: any|Bridge): boolean {
        return super.has(element);
    }

    public  get(id: any): Bridge {
        return super.get(id);
    }

    public   toArray(): Array<Bridge> {
        return super.toArray();
    }

    public remove(element: any|Bridge): boolean {
        return super.remove(element);
    }

    public clear(): this {
        return super.clear();
    }

    public forEach(fn: (value: Bridge, index: any, map: Map<any, Bridge>) => void, context?: any): void {
        super.forEach(fn, context);
    }
}
export = Bridges;
