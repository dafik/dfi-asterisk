"use strict";
var CdrFlags;
(function (CdrFlags) {
    CdrFlags[CdrFlags["DISPOSITION_NO_ANSWER"] = "NO ANSWER"] = "DISPOSITION_NO_ANSWER";
    CdrFlags[CdrFlags["DISPOSITION_FAILED"] = "FAILED"] = "DISPOSITION_FAILED";
    CdrFlags[CdrFlags["DISPOSITION_BUSY"] = "BUSY"] = "DISPOSITION_BUSY";
    CdrFlags[CdrFlags["DISPOSITION_ANSWERED"] = "ANSWERED"] = "DISPOSITION_ANSWERED";
    CdrFlags[CdrFlags["DISPOSITION_UNKNOWN"] = "UNKNOWN"] = "DISPOSITION_UNKNOWN";
    CdrFlags[CdrFlags["AMA_FLAG_OMIT"] = "OMIT"] = "AMA_FLAG_OMIT";
    CdrFlags[CdrFlags["AMA_FLAG_BILLING"] = "BILLING"] = "AMA_FLAG_BILLING";
    CdrFlags[CdrFlags["AMA_FLAG_DOCUMENTATION"] = "DOCUMENTATION"] = "AMA_FLAG_DOCUMENTATION";
    CdrFlags[CdrFlags["AMA_FLAG_UNKNOWN"] = "Unknown"] = "AMA_FLAG_UNKNOWN";
})(CdrFlags || (CdrFlags = {}));
module.exports = CdrFlags;
//# sourceMappingURL=cdrFlags.js.map