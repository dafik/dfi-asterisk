var assert = require('assert');
require('./logs');
var eventTimeout = 3000;
var timeouts = new Set();

global.useTimeouts = true;

function getTimeout(name, timeoutTime) {
    if (!useTimeouts) {
        return {name: name};
    }
    getLogger().info('setting timeout: "' + name + '"');
    timeoutTime = timeoutTime || eventTimeout;
    var err = new Error('Event never fired in time: "' + timeoutTime + 'ms" for timeout: "' + name + '"');
    var timeout = setTimeout(function () {
        getLogger().error(err.message);
        assert.doesNotThrow(function () {
            throw err;
        });
        done();
    }, timeoutTime);
    timeouts.add(timeout);
    timeout.name = name;
    return timeout;
}
function removeTimeout(timeout) {
    getLogger().info('removing timeout: "' + timeout.name + '"');
    timeouts.remove(timeout);
    clearTimeout(timeout);
}
function clearTimeouts() {
    //noinspection JSCheckFunctionSignatures
    timeouts.forEach(function (timeout) {
        removeTimeout(timeout);
    })
}
global.getTimeout = getTimeout;
global.removeTimeout = removeTimeout;
global.clearTimeouts = clearTimeouts;