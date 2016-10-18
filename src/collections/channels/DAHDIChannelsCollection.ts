import AsteriskCollection = require("../../internal/asteriskCollection");
import Dahdi = require("../../models/DahdiModel");

class DAHDIChannels extends AsteriskCollection<Dahdi> {
    constructor() {

        super({
            model: Dahdi
        });
    }

    public get(id: any): Dahdi {
        return super.get(id);
    }

    public add(element: Dahdi): Map<any, Dahdi> {
        return super.add(element);
    }

    public clear(): this {
        return super.clear();
    }
}

export = DAHDIChannels;
