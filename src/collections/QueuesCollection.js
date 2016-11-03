"use strict";
const AsteriskCollection = require("../internal/asteriskCollection");
const Queue = require("../models/queues/QueueModel");
class Queues extends AsteriskCollection {
    constructor() {
        super({
            model: Queue
        });
    }
    get(id) {
        return super.get(id);
    }
    add(element) {
        return super.add(element);
    }
    remove(element) {
        return super.remove(element);
    }
    clear() {
        return super.clear();
    }
    forEach(fn, thisArg) {
        super.forEach(fn, thisArg);
    }
    toArray() {
        return super.toArray();
    }
}
module.exports = Queues;
//# sourceMappingURL=QueuesCollection.js.map