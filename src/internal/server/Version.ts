class AsteriskVersion {
    private _fullVersion: string;

    constructor(version: string) {
        this._fullVersion = version;
    }

    get branch() {
        return parseInt(this._fullVersion.split(".")[0], 10);
    }

    get isAmi2() {
        return parseInt(this._fullVersion.split(".")[0], 10) > 11;
    }

    get number() {
        return parseInt(this._fullVersion.split(".")[2], 10);
    }

    get series() {
        return parseInt(this._fullVersion.split(".")[1], 10);
    }

    get toString() {
        return this._fullVersion;
    }
}

export default AsteriskVersion;
