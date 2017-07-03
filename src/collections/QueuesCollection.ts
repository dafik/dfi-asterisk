import AsteriskCollection = require("../internal/asteriskCollection");
import Queue = require("../models/queues/QueueModel");

class Queues extends AsteriskCollection<Queue> {

    constructor() {
        super({
            model: Queue
        });
    }

    public get(id: any): Queue {
        return super.get(id);
    }

    public add(element: Queue): this {
        return super.add(element);
    }

    public remove(element: any | Queue): boolean {
        return super.remove(element);
    }

    public clear(): this {
        return super.clear();
    }

    public forEach(fn: (value: Queue, index: string, map: Map<string, Queue>) => void, thisArg?: any): void {
        super.forEach(fn, thisArg);
    }

    public toArray(): Queue[] {
        return super.toArray();
    }
}
export = Queues;
