var asteriskServer = require('../../src/asteriskServer');
var NamiMock = require('./namiMock');
var namiMock = new NamiMock.Nami({username: 'test', secret: 'test'});

/**
 * @type {AsteriskServer}
 */
module.exports = asteriskServer.getInstance(namiMock);