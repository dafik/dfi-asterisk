"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amaFlags_1 = require("../enums/flags/amaFlags");
const cdrFlags_1 = require("../enums/flags/cdrFlags");
const dispositionFlags_1 = require("../enums/flags/dispositionFlags");
const asteriskModel_1 = require("../internal/asteriskModel");
class CallDetailRecord extends asteriskModel_1.default {
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
    /*
     ["CallerID","CallerID"],
     ["Channel","Channel"],
     ["DestinationChannel","DestinationChannel"],
     ["Disposition","Disposition"],
     ["AMAFlags","AMAFlags"],
     ["UniqueID","UniqueID"],
     ["Source","Source"],*/
]);
const DISPOSITION_MAP = new Map([
    [cdrFlags_1.default.DISPOSITION_ANSWERED.toString(), dispositionFlags_1.default.ANSWERED],
    [cdrFlags_1.default.DISPOSITION_BUSY.toString(), dispositionFlags_1.default.BUSY],
    [cdrFlags_1.default.DISPOSITION_FAILED.toString(), dispositionFlags_1.default.FAILED],
    [cdrFlags_1.default.DISPOSITION_NO_ANSWER.toString(), dispositionFlags_1.default.NO_ANSWER],
    [cdrFlags_1.default.DISPOSITION_UNKNOWN.toString(), dispositionFlags_1.default.UNKNOWN]
]);
const AMA_FLAGS_MAP = new Map([
    [cdrFlags_1.default.AMA_FLAG_BILLING.toString(), amaFlags_1.default.BILLING],
    [cdrFlags_1.default.AMA_FLAG_DOCUMENTATION.toString(), amaFlags_1.default.DOCUMENTATION],
    [cdrFlags_1.default.AMA_FLAG_OMIT.toString(), amaFlags_1.default.OMIT],
    [cdrFlags_1.default.AMA_FLAG_UNKNOWN.toString(), amaFlags_1.default.UNKNOWN]
]);
exports.default = CallDetailRecord;
//# sourceMappingURL=CallDetailRecordModel.js.map