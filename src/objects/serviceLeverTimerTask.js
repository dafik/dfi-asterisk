/**
 * TimerTask that monitors exceeding service levels.
 * @typedef ServiceLevelTimerTask
 * @property {AsteriskQueueEntry} entry
 * @property {AsteriskQueue} queue
 * @property {Timeout} timer
 *
 */
class ServiceLevelTimerTask {


    constructor(queue, entry) {
        this.entry = entry;
        this.queue = queue
    }

    run() {
        this.queue.fireServiceLevelExceeded(this.entry);
    };

    schedule(delay) {
        this.timer = setInterval(this.run.bind(this), delay);
    }

    cancel() {
        clearInterval(this.timer)
    }
}


module.exports = ServiceLevelTimerTask;