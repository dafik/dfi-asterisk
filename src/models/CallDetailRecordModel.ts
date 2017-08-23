import {IDfiAstModelAttribsCDR} from "../definitions/models";
import AsteriskModel from "../internal/asteriskModel";
import AmaFlags from "../enums/flags/amaFlags";
import CdrFlags from "../enums/flags/cdrFlags";
import DispositionFlags from "../enums/flags/dispositionFlags";

class CallDetailRecord extends AsteriskModel {

    protected static map = new Map([
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

    constructor(channel, destinationChannel, cdrEvent: IDfiAstModelAttribsCDR) {
        cdrEvent.channel = channel;
        cdrEvent.destinationChannel = destinationChannel;

        cdrEvent.amaFlags = cdrEvent.AMAFlags != null ? AMA_FLAGS_MAP.get(cdrEvent.AMAFlags) : null;
        cdrEvent.disposition = cdrEvent.Disposition != null ? DISPOSITION_MAP.get(cdrEvent.Disposition) : null;

        super(cdrEvent);
    }

}

const DISPOSITION_MAP: Map<string, DispositionFlags> = new Map([
    [CdrFlags.DISPOSITION_ANSWERED.toString(), DispositionFlags.ANSWERED],
    [CdrFlags.DISPOSITION_BUSY.toString(), DispositionFlags.BUSY],
    [CdrFlags.DISPOSITION_FAILED.toString(), DispositionFlags.FAILED],
    [CdrFlags.DISPOSITION_NO_ANSWER.toString(), DispositionFlags.NO_ANSWER],
    [CdrFlags.DISPOSITION_UNKNOWN.toString(), DispositionFlags.UNKNOWN]
]);
const AMA_FLAGS_MAP: Map<string, AmaFlags> = new Map([
    [CdrFlags.AMA_FLAG_BILLING.toString(), AmaFlags.BILLING],
    [CdrFlags.AMA_FLAG_DOCUMENTATION.toString(), AmaFlags.DOCUMENTATION],
    [CdrFlags.AMA_FLAG_OMIT.toString(), AmaFlags.OMIT],
    [CdrFlags.AMA_FLAG_UNKNOWN.toString(), AmaFlags.UNKNOWN]
]);

export default CallDetailRecord;
