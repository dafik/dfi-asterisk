"use strict";
const dfiObject_1 = require("local-dfi-base/src/dfiObject");
const PROP_ENTRY = Symbol("entry");
const PROP_QUEUE = Symbol("queue");
const PROP_TIMER = Symbol("timer");
/**
 * TimerTask that monitors exceeding service levels.
 */
class ServiceLevelTimerTask extends dfiObject_1.default {
    constructor(queue, entry) {
        super();
        this.setProp(PROP_ENTRY, entry);
        this.setProp(PROP_QUEUE, queue);
    }
    schedule(delay) {
        this.setProp(PROP_TIMER, setInterval(() => this.run, delay));
    }
    cancel() {
        clearInterval(this.getProp(PROP_TIMER));
    }
    run() {
        this.getProp(PROP_QUEUE).fireServiceLevelExceeded(this.getProp(PROP_ENTRY));
    }
}
module.exports = ServiceLevelTimerTask;
//# sourceMappingURL=serviceLeverTimerTask.js.map