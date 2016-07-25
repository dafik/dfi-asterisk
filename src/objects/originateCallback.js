"use strict";
const  AsteriskLogger = require('./../internal/asteriskLogger'),
    EventObject = require('../internal/eventObject');


class OriginateCallback extends EventObject {
    constructor(options) {
        super(options);

        this._callbackTypes = [TYPE_BUSY, TYPE_DIALING, TYPE_FAILURE, TYPE_NO_ANSWER, TYPE_SUCCESS];
        this._callbacks = {};
        this._callbackTypes.forEach(function (callbackType) {
            this._callbacks[callbackType] = [];
        }, this);

        this.logger = new AsteriskLogger('dfi:as:'+this.constructor.name);
    }

    /**
     * Called when the channel has been created and before it starts ringing.
     *
     * @param {AsteriskChannel} channel the channel created.
     */
    onDialing(channel) {
        this.logger.info('onDialing');
        this._on(TYPE_DIALING, channel);
    };

    /**
     * Called if the originate was successful and the called party answered the
     * call.
     *
     * @param {AsteriskChannel} channel the channel created.
     */
    onSuccess(channel) {
        this.logger.info('onSuccess');
        this._on(TYPE_SUCCESS, channel);
    };

    /**
     * Called if the originate was unsuccessful because the called party did not
     * answer the call.
     *
     * @param {AsteriskChannel} channel the channel created.
     */
    onNoAnswer(channel) {
        this.logger.info('onNoAnswer');
        this._on(TYPE_NO_ANSWER, channel);
    };

    /**
     * Called if the originate was unsuccessful because the called party was
     * busy.
     *
     * @param {AsteriskChannel} channel the channel created.
     */
    onBusy(channel) {
        this.logger.info('onBusy');
        this._on(TYPE_FAILURE, channel);
    };

    /**
     * Called if the originate failed for example due to an invalid channel name
     * or an originate to an unregistered SIP or IAX peer.
     *
     * @param {} cause the exception that caused the failure.
     */
    onFailure(cause) {
        this.logger.info('onFailure');
        this._on(TYPE_FAILURE, cause);
    };

    _on(type) {
        if (-1 === this._callbackTypes.indexOf(type)) {
            throw new Error('Undefined type of originate callback');
        }
        if (this._callbacks[type].length > 0) {
            arguments.shift();
            this._callbacks[type].forEach(function (callback) {
                callback.callback.apply(callback.this, arguments);
            });
        }
        this.emit(type);
    };

    setCallback(type, callback, _this) {
        _this = _this || this;
        if (typeof callback != "function") {
            throw new Error('callback of originate callback is not a function');
        }
        this._callbacks[type].push(new Callback(callback, _this));
    };

    setBusyCallback(callback, _this) {
        this.setCallback(TYPE_BUSY, callback, _this);
    };

    setDialingCallback(callback, _this) {
        this.setCallback(TYPE_DIALING, callback, _this);
    };

    setNoAnswerCallback(callback, _this) {
        this.setCallback(TYPE_NO_ANSWER, callback, _this);
    };

    setSuccessCallback(callback, _this) {
        this.setCallback(TYPE_SUCCESS, callback, _this);
    };

    setFailureCallback(callback, _this) {
        this.setCallback(TYPE_FAILURE, callback, _this);
    };

}

const TYPE_DIALING = 'Dialing';
const TYPE_SUCCESS = 'Success';
const TYPE_NO_ANSWER = 'NoAnswer';
const TYPE_BUSY = 'Busy';
const TYPE_FAILURE = 'Failure';

OriginateCallback.Types = {
    TYPE_DIALING: TYPE_DIALING,
    TYPE_SUCCESS: TYPE_SUCCESS,
    TYPE_NO_ANSWER: TYPE_NO_ANSWER,
    TYPE_BUSY: TYPE_BUSY,
    TYPE_FAILURE: TYPE_FAILURE
};
OriginateCallback.Events = {
    DIALING: TYPE_DIALING,
    SUCCESS: TYPE_SUCCESS,
    NO_ANSWER: TYPE_NO_ANSWER,
    BUSY: TYPE_BUSY,
    FAILURE: TYPE_FAILURE
};

module.exports = OriginateCallback;