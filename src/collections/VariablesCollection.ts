import AsteriskCollection = require("../internal/asteriskCollection");
import Variable = require("../models/VariableModel");

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

    public add(element: Variable): Map<any, Variable> {
        return super.add(element);
    }
}

export = Variables;
