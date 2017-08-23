import AsteriskCollection from "../internal/asteriskCollection";
import Variable from "../models/VariableModel";

class Variables extends AsteriskCollection<Variable> {
    constructor() {
        super({
            model: Variable
        });
    }

    public has(element: any|Variable): boolean {
        return super.has(element);
    }

    public get(id: any): Variable {
        return super.get(id);
    }

    public add(element: Variable): this {
        return super.add(element);
    }

}

export default Variables;
