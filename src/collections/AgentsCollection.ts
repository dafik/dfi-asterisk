import Agent = require("../models/AgentModel");
import AsteriskCollection = require("../internal/asteriskCollection");
class Agents extends AsteriskCollection<Agent> {
    constructor() {
        super({
            model: Agent
        });
    }

    public get(id: any): Agent {
        return super.get(id);
    }

    public add(element: Agent): this {
        return super.add(element);
    }

    public keys(): Array<any> {
        return super.keys();
    }

    public clear(): this {
        return super.clear();
    }

    public toArray(): Array<Agent> {
        return super.toArray();
    }
}
export = Agents;
