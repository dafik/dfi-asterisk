class AsteriskVersion {

    constructor(version) {
        const fullVersion = version;
        const parts = version.split(".");
        const branch = parseInt(parts[0], 10);
        const nbr = parseInt(parts[2], 10);
        const series = parseInt(parts[1], 10);

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

export default AsteriskVersion;
