import Agent from "../models/AgentModel";
import AsteriskCollection from "../internal/asteriskCollection";
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

    public keys(): any[] {
        return super.keys();
    }

    public clear(): this {
        return super.clear();
    }

    public toArray(): Agent[] {
        return super.toArray();
    }
}
export default Agents;
