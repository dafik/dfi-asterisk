import Agent = require("../models/AgentModel");
import AsteriskCollection = require("../internal/asteriskCollection");
class Agents extends AsteriskCollection<Agent> {
    constructor() {
        super({
            model: Agent
        });
    }

    public keys(): Array<any> {
        return super.keys();
    }

    public toArray(): Array<Agent> {
        return super.toArray();
    }

    public clear(): this {
        return super.clear();
    }

    public get(id: any): Agent {
        return super.get(id);
    }

    public add(element: Agent): Map<any, Agent> {
        return super.add(element);
    }
}
export = Agents;
