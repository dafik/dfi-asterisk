"use strict";
const AsteriskCollection = require("../internal/asteriskCollection");
const Queue = require("../models/queues/QueueModel");
class Queues extends AsteriskCollection {
    constructor() {
        super({
            model: Queue
        });
    }
    add(element) {
        return super.add(element);
    }
    remove(element) {
        return super.remove(element);
    }
    get(id) {
        return super.get(id);
    }
    clear() {
        return super.clear();
    }
    forEach(fn, context) {
        super.forEach(fn, context);
    }
    toArray() {
        return super.toArray();
    }
}
module.exports = Queues;
//# sourceMappingURL=QueuesCollection.js.map