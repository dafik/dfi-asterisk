import AsteriskCollection = require("../internal/asteriskCollection");
import Queue = require("../models/queues/QueueModel");

class Queues extends AsteriskCollection<Queue> {
    constructor() {
        super({
            model: Queue
        });
    }

    public add(element: Queue): Map<any, Queue> {
        return super.add(element);
    }

    public remove(element: any|Queue): boolean {
        return super.remove(element);
    }

    public get(id: any): Queue {
        return super.get(id);
    }

    public clear(): this {
        return super.clear();
    }

    public forEach(fn: (value: Queue, index: any, map: Map<any, Queue>) => void, context?: any): void {
        super.forEach(fn, context);
    }

    public toArray(): Array<Queue> {
        return super.toArray();
    }
}
export = Queues;
