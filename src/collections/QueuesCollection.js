"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteriskCollection_1 = require("../internal/asteriskCollection");
const QueueModel_1 = require("../models/queues/QueueModel");
class Queues extends asteriskCollection_1.default {
    constructor() {
        super({
            model: QueueModel_1.default
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
exports.default = Queues;
//# sourceMappingURL=QueuesCollection.js.map