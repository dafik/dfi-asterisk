"use strict";
import QueueEntry from "../models/queues/QueueEntryModel";
import Queue from "../models/queues/QueueModel";
import DfiObject from "local-dfi-base/src/dfiObject";

const PROP_ENTRY = Symbol("entry");
const PROP_QUEUE = Symbol("queue");
const PROP_TIMER = Symbol("timer");

/**
 * TimerTask that monitors exceeding service levels.
 */
class ServiceLevelTimerTask extends DfiObject {
    constructor(queue: Queue, entry: QueueEntry) {
        super();

        this.setProp(PROP_ENTRY, entry);
        this.setProp(PROP_QUEUE, queue);
    }

    public schedule(delay) {
        this.setProp(PROP_TIMER, setInterval(() => this.run, delay));
    }

    public cancel() {
        clearInterval(this.getProp(PROP_TIMER));
    }

    private run() {
        (this.getProp(PROP_QUEUE) as Queue).fireServiceLevelExceeded(this.getProp(PROP_ENTRY));
    }
}

export default ServiceLevelTimerTask;
