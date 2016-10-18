"use strict";
class AsteriskVersion {
    constructor(version) {
        let fullVersion = version;
        let parts = version.split(".");
        let branch = parseInt(parts[0], 10);
        let nbr = parseInt(parts[2], 10);
        let series = parseInt(parts[1], 10);
        Object.defineProperties(this, {
            branch: {
                get: () => {
                    return branch;
                }
            },
            isAmi2: {
                get: () => {
                    return branch > 11;
                }
            },
            number: {
                get: () => {
                    return nbr;
                }
            },
            series: {
                get: () => {
                    return series;
                }
            },
            toString() {
                return fullVersion;
            }
        });
    }
}
module.exports = AsteriskVersion;
//# sourceMappingURL=Version.js.map