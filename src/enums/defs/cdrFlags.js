"use strict";
/**
 * @memberOf enums
 * @class
 */
var Cdr = {
    DISPOSITION_NO_ANSWER: "NO ANSWER",
    DISPOSITION_FAILED: "FAILED",
    DISPOSITION_BUSY: "BUSY",
    DISPOSITION_ANSWERED: "ANSWERED",
    DISPOSITION_UNKNOWN: "UNKNOWN",

    AMA_FLAG_OMIT: "OMIT",
    AMA_FLAG_BILLING: "BILLING",
    AMA_FLAG_DOCUMENTATION: "DOCUMENTATION",
    AMA_FLAG_UNKNOWN: "Unknown"
};
Object.freeze(Cdr);
module.exports = Cdr;