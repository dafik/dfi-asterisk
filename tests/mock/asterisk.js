var events = require('events');
var util = require('util');
var log4js = require('log4js');
var asteriskServer = require('./../../lib/asterisk/live/asteriskServer');
var NamiMock = require('./namiMock');
var namiMock = new NamiMock.Nami({ username: 'test', secret: 'test'});

/**
 * @type {AsteriskServer}
 */
module.exports = asteriskServer.getInstance(namiMock);