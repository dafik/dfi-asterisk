"use strict";
/**
 * ConfigFile implementation based on the config actions of the Manager API.
 */
class ConfigFile {
    constructor(filename, categories) {
        this._filename = filename;
        this._categories = categories;
    }
    getFilename() {
        return this._filename;
    }
    ;
    getCategories() {
        return this._categories.keys();
    }
    ;
    getValue(category, key) {
        if (this._categories.has(category)) {
            return this._categories.get(category).get(key);
        }
    }
    ;
    getValues(category) {
        if (this._categories.has(category)) {
            return this._categories.get(category);
        }
    }
    ;
}
module.exports = ConfigFile;
//# sourceMappingURL=ConfigFile.js.map