enum CdrFlags {
    DISPOSITION_NO_ANSWER =  "NO ANSWER" as any,
    DISPOSITION_FAILED =  "FAILED" as any,
    DISPOSITION_BUSY =  "BUSY" as any,
    DISPOSITION_ANSWERED =  "ANSWERED" as any,
    DISPOSITION_UNKNOWN =  "UNKNOWN" as any,

    AMA_FLAG_OMIT =  "OMIT" as any,
    AMA_FLAG_BILLING =  "BILLING" as any,
    AMA_FLAG_DOCUMENTATION =  "DOCUMENTATION" as any,
    AMA_FLAG_UNKNOWN =  "Unknown" as any
}
export default CdrFlags;
