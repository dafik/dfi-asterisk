"use strict";
const Cdr = require('./../enums/defs/cdrFlags'),
    Disposition = require('./../enums/defs/dispositionFlags'),
    AmaFlags = require('./../enums/defs/amaFlags');


/**
 * Default implementation of the CallDetailRecord interface.
 * @memberOf object
 * @param {AsteriskChannel} channel
 * @param {AsteriskChannel} destinationChannel
 * @param {CdrEvent} cdrEvent
 * @constructor

 * @property {AsteriskChannel} channel
 * @property {AsteriskChannel} destinationChannel
 * @property {String} accountCode
 * @property {String} destinationContext
 * @property {String} destinationExtension
 * @property {String} lastApplication
 * @property {String} lastAppData
 * @property {Moment} startDate
 * @property {Moment} answerDate
 * @property {Moment} endDate
 * @property {number} duration
 * @property {number} billableSeconds
 * @property {Disposition} disposition
 * @property {AmaFlags} amaFlags
 * @property {String} userField
 */

class CallDetailRecord {
    constructor(channel, destinationChannel, cdrEvent) {
        //TODO add timezone to AsteriskServer
        //TimeZone;
        //var tz = TimeZone.getDefault();
        this.channel = channel;
        this.destinationChannel = destinationChannel;

        this.accountCode = cdrEvent.getAccountCode();
        this.destinationContext = cdrEvent.getDestinationContext();
        this.destinationExtension = cdrEvent.getDestination();
        this.lastApplication = cdrEvent.getLastApplication();
        this.lastAppData = cdrEvent.getLastData();
        this.startDate = cdrEvent.getStartTime();
        this.answerDate = cdrEvent.getAnswerTime();
        this.endDate = cdrEvent.getEndTime();
        this.duration = cdrEvent.getDuration();
        this.billableSeconds = cdrEvent.getBillableSeconds();
        if (cdrEvent.getAmaFlags() != null) {
            this.amaFlags = AMA_FLAGS_MAP.get(cdrEvent.getAmaFlags());
        }
        else {
            this.amaFlags = null;
        }
        if (cdrEvent.getDisposition() != null) {
            this.disposition = DISPOSITION_MAP.get(cdrEvent.getDisposition());
        }
        else {
            this.disposition = null;
        }
        this.userField = cdrEvent.getUserField();
    }

    /**
     *
     * @returns {AsteriskChannel}
     */
    getChannel() {
        return this.channel;
    };

    /**
     *
     * @returns {AsteriskChannel}
     */
    getDestinationChannel() {
        return this.destinationChannel;
    };

    /**
     *
     * @returns {String}
     */
    getAccountCode() {
        return this.accountCode;
    };

    /**
     *
     * @returns {AmaFlags}
     */
    getAmaFlags() {
        return this.amaFlags;
    };

    /**
     *
     * @returns {Moment}
     */
    getAnswerDate() {
        return this.answerDate;
    };

    /**
     *
     * @returns {number}
     */
    getBillableSeconds() {
        return this.billableSeconds;
    };

    /**
     *
     * @returns {String}
     */
    getDestinationContext() {
        return this.destinationContext;
    };

    /**
     *
     * @returns {String}
     */
    getDestinationExtension() {
        return this.destinationExtension;
    };

    /**
     *
     * @returns {Disposition}
     */
    getDisposition() {
        return this.disposition;
    };

    /**
     *
     * @returns {number}
     */
    getDuration() {
        return this.duration;
    };

    /**
     *
     * @returns {Moment}
     */
    getEndDate() {
        return this.endDate;
    };

    /**
     *
     * @returns {String}
     */
    getLastApplication() {
        return this.lastApplication;
    };

    /**
     *
     * @returns {String}
     */
    getLastAppData() {
        return this.lastAppData;
    };

    /**
     *
     * @returns {Moment}
     */
    getStartDate() {
        return this.startDate;
    };

    /**
     *
     * @returns {String}
     */
    getUserField() {
        return this.userField;
    };

}
/**
 * @namespace object.CallDetailRecord
 */

/**
 * @memberOf object.CallDetailRecord
 * @type { Map<String, Disposition>}
 */
var DISPOSITION_MAP = new Map();
DISPOSITION_MAP.set(Cdr.DISPOSITION_ANSWERED, Disposition.ANSWERED);
DISPOSITION_MAP.set(Cdr.DISPOSITION_BUSY, Disposition.BUSY);
DISPOSITION_MAP.set(Cdr.DISPOSITION_FAILED, Disposition.FAILED);
DISPOSITION_MAP.set(Cdr.DISPOSITION_NO_ANSWER, Disposition.NO_ANSWER);
DISPOSITION_MAP.set(Cdr.DISPOSITION_UNKNOWN, Disposition.UNKNOWN);
/**
 * @memberOf object.CallDetailRecord
 * @type {Map<String, AmaFlags>}
 */
var AMA_FLAGS_MAP = new Map();
AMA_FLAGS_MAP.set(Cdr.AMA_FLAG_BILLING, AmaFlags.BILLING);
AMA_FLAGS_MAP.set(Cdr.AMA_FLAG_DOCUMENTATION, AmaFlags.DOCUMENTATION);
AMA_FLAGS_MAP.set(Cdr.AMA_FLAG_OMIT, AmaFlags.OMIT);
AMA_FLAGS_MAP.set(Cdr.AMA_FLAG_UNKNOWN, AmaFlags.UNKNOWN);


module.exports = CallDetailRecord;