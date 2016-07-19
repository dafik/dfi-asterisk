var log4js = require('log4js');

log4js.setGlobalLogLevel('OFF');
log4js.restoreConsole();
try {
    log4js.configure(__dirname + '/../../../log4js.config.json');
} catch (e) {

}

function getLogger(name) {
    name = name || 'default';
    return log4js.getLogger(name);
}

/**
 * @type {function(function,Caller,EndpointManger,string,[function],[*])}
 */
function endTest(done, caller, endpointManager, name, callback, thisp) {
    getLogger().info('calling endTest');
    caller.stop();
    caller.removeAllListeners();

    clearTimeouts();
    if (typeof callback == "function") {
        callback.call(thisp);
    }

    endpointManager.endpoints.forEach(function (endpoint) {
        endpoint.clearBindings();
    });

    getLogger().info('=============================endTest: ' + name + '=============================');
    done();
}

global.getLogger = getLogger;
global.endTest = endTest;