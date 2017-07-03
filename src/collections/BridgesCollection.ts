import AsteriskCollection = require("../internal/asteriskCollection");
import Bridge = require("../models/BridgeModel");

class Bridges extends AsteriskCollection<Bridge> {
    constructor() {
        super({
            model: Bridge
        });
    }

    public has(element: any | Bridge): boolean {
        return super.has(element);
    }

    public get(id: any): Bridge {
        return super.get(id);
    }

    public add(element: Bridge): this {
        return super.add(element);
    }

    public remove(element: any | Bridge): boolean {
        return super.remove(element);
    }

    public clear(): this {
        return super.clear();
    }

    public forEach(fn: (value: Bridge, index: string, map: Map<string, Bridge>) => void, thisArg?: any): void {
        super.forEach(fn, thisArg);
    }

    public toArray(): Bridge[] {
        return super.toArray();
    }
}
export = Bridges;
