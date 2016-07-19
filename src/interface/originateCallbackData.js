"use strict";
/**
 * Wrapper class for OriginateCallbacks.
 *
 * AsteriskServerListener
 *
 * @memberOf interface
 * @property {Originate} originateAction the action that has been sent to the Asterisk  server
 * @property {Moment} dateSent date when the the action has been sent
 * @property {OriginateCallback} callback callback to notify about result
 * @property {*} [thisp] callback this
 * @property {AsteriskChannel} channel
 *
 * @param {Originate} originateAction the action that has been sent to the Asterisk  server
 * @param {Moment} dateSent date when the the action has been sent
 * @param {OriginateCallback} callback callback to notify about result
 */
var OriginateCallbackData = function (originateAction, dateSent, callback, thisp) {
    this.originateAction = originateAction;
    this.dateSent = dateSent;
    this.callback = callback;
    this.thisp = thisp;
};

OriginateCallbackData.prototype.getOriginateAction = function () {
    return this.originateAction;
};

OriginateCallbackData.prototype.getDateSent = function () {
    return this.dateSent;
};

OriginateCallbackData.prototype.getCallback = function () {
    return this.callback;
};

OriginateCallbackData.prototype.getCallbackThis = function () {
    return this.thisp;
};

OriginateCallbackData.prototype.getChannel = function () {
    return this.channel;
};

OriginateCallbackData.prototype.setChannel = function (channel) {
    this.channel = channel;
};
module.exports = OriginateCallbackData;