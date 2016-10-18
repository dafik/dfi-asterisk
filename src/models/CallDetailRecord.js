"use strict";
const AsteriskModel = require("../internal/asteriskModel");
const AmaFlags = require("../enums/flags/amaFlags");
const CdrFlags = require("../enums/flags/cdrFlags");
const DispositionFlags = require("../enums/flags/dispositionFlags");
class CallDetailRecord extends AsteriskModel {
    constructor(channel, destinationChannel, cdrEvent) {
        cdrEvent.channel = channel;
        cdrEvent.destinationChannel = destinationChannel;
        cdrEvent.amaFlags = cdrEvent.AMAFlags != null ? AMA_FLAGS_MAP.get(cdrEvent.AMAFlags) : null;
        cdrEvent.disposition = cdrEvent.Disposition != null ? DISPOSITION_MAP.get(cdrEvent.Disposition) : null;
        super(cdrEvent);
    }
}
CallDetailRecord.map = new Map([
    ["AccountCode", "accountCode"],
    ["Destination", "destinationExtension"],
    ["DestinationContext", "destinationContext"],
    ["LastApplication", "lastApplication"],
    ["LastData", "lastAppData"],
    ["StartTime", "startDate"],
    ["AnswerTime", "answerDate"],
    ["EndTime", "endDate"],
    ["Duration", "duration"],
    ["BillableSeconds", "billableSeconds"],
    ["UserField", "userField"]
]);
const DISPOSITION_MAP = new Map([
    [CdrFlags.DISPOSITION_ANSWERED.toString(), DispositionFlags.ANSWERED],
    [CdrFlags.DISPOSITION_BUSY.toString(), DispositionFlags.BUSY],
    [CdrFlags.DISPOSITION_FAILED.toString(), DispositionFlags.FAILED],
    [CdrFlags.DISPOSITION_NO_ANSWER.toString(), DispositionFlags.NO_ANSWER],
    [CdrFlags.DISPOSITION_UNKNOWN.toString(), DispositionFlags.UNKNOWN]
]);
const AMA_FLAGS_MAP = new Map([
    [CdrFlags.AMA_FLAG_BILLING.toString(), AmaFlags.BILLING],
    [CdrFlags.AMA_FLAG_DOCUMENTATION.toString(), AmaFlags.DOCUMENTATION],
    [CdrFlags.AMA_FLAG_OMIT.toString(), AmaFlags.OMIT],
    [CdrFlags.AMA_FLAG_UNKNOWN.toString(), AmaFlags.UNKNOWN]
]);
module.exports = CallDetailRecord;
//# sourceMappingURL=CallDetailRecord.js.map