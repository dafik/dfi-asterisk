import AsteriskCollection from "../../internal/asteriskCollection";
import Dahdi from "../../models/DahdiModel";

class DAHDIChannels extends AsteriskCollection<Dahdi> {

    constructor() {

        super({
            model: Dahdi
        });
    }

    public get(id: any): Dahdi {
        return super.get(id);
    }

    public add(element: Dahdi): this {
        return super.add(element);
    }

    public clear(): this {
        return super.clear();
    }
}

export default DAHDIChannels;
