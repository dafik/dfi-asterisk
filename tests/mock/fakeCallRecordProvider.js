var mysql = require('mysql');
var util = require('util');
var log4js = require('log4js');
var CallRecordProvider = require('./../../lib/callRecordProvider/interface');


function FakeCallRecordProvider(config, returnCallrecords) {
    if (typeof returnCallrecords == "undefined") {
        returnCallrecords = true;
    }
    this.returnCallrecords = returnCallrecords;
    this.lastReturnKey = -1;
    this.logger = log4js.getLogger('FakeCallRecordProvider')
}
util.inherits(FakeCallRecordProvider, CallRecordProvider);

module.exports = FakeCallRecordProvider;

FakeCallRecordProvider.prototype.getPredictorConfigs = function (callback, thisp) {
    this.logger.info('getPredictorConfigs');
    var predictorConfig = {
        databaseId: 844,
        id: 50,
        name: 'test_test',
        ratio: 1,
        drop_time: 10,
        date_from: new Date('Tue Oct 07 2014 14:00:46 GMT+0200 (CEST)'),
        date_to: new Date('Tue Feb 11 2020 00:00:00 GMT+0100 (CET)'),
        status: 1,
        queue_name: 'test',
        call_time: 30,
        max_drop_percent: 0,
        dynamic_ratio_hours_to_analyse: 0,
        use_auto_unlock: 0,
        use_dynamic_ratio: 0,
        min_dynamic_ratio: 1,
        is_node: 1
    };
    callback.call(thisp, [predictorConfig]);
};

FakeCallRecordProvider.prototype.getCallersConfigs = function (callback, thisp) {
    this.logger.info('getCallersConfigs');
    callback.call(thisp, []);
};


/**
 *
 * @param {Predictor} predictor
 * @param {number} howMany
 * @param {function(err,[])} callback
 * @param {*} [thisp]
 */
FakeCallRecordProvider.prototype.getCallrecords = function (predictor, howMany, callback, thisp) {
    this.logger.info('getCallrecords');
    if (!this.returnCallrecords) {
        callback.call(thisp, null, []);
        return
    }
    var i, number, callRecords = [];
    if (typeof this._callRecordNumber != "undefined") {
        number = this._callRecordNumber;
    } else {
        var endpointManger = require('./endpointManager').getInstance(predictor.dialer.asterisk);
        var endpoints = endpointManger.endpoints;
        number = endpoints.keys()[endpoints.getLength() - 1];
    }
    for (i = 1; i <= howMany; i++) {
        callRecords.push({
            id: ActionUniqueId(),
            phonenumber: number
        })
    }
    callback.call(thisp, null, callRecords);
};

/**
 * @param {Predictor} predictor
 * @param {number} howMany
 * @param {function(err,[])} callback
 * @param {*} [thisp]
 */
FakeCallRecordProvider.prototype.getCallerRecords = function (predictor, howMany, callback, thisp) {
    this.logger.info('getCallerRecords');
    if (!this.returnCallrecords) {
        callback.call(thisp, null, []);
        return
    }
    var i, callRecords = [];

    for (i = 1; i <= howMany; i++) {
        callRecords.push({
            id: ActionUniqueId(),
            phonenumber: this.getCallrecord()
        })
    }
    callback.call(thisp, null, callRecords);
};

FakeCallRecordProvider.prototype.getCallrecord = function () {
    if (typeof this._callRecordNumber != "undefined") {
        if (!Array.isArray(this._callRecordNumber)) {
            return this._callRecordNumber;
        } else {
            var key = this.lastReturnKey;
            if (key == -1) {
                key = 0;
            } else {
                key++;
                if (key >= this._callRecordNumber.length) {
                    key = 0;
                }
            }
            this.lastReturnKey = key;
            return this._callRecordNumber[key];
        }
    } else {
        var endpointManger = require('./endpointManager').getInstance(predictor.dialer.asterisk);
        var endpoints = endpointManger.endpoints;
        return endpoints[endpoints.length - 1];
    }
};

FakeCallRecordProvider.prototype.updateCallerRecord = function () {
    this.logger.info('updateCallerRecord');
};

FakeCallRecordProvider.prototype.setCallRecordNumber = function (number) {
    this.logger.info('setCallRecordNumber');
    this._callRecordNumber = number;
};

var ActionUniqueId = (function () {
    var nextId = 1;
    return function () {
        return nextId++;
    }
})();
