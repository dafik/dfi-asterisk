"use strict";
/**
 * ConfigFile implementation based on the config actions of the Manager API.
 */
class ConfigFile {
    private _filename: string;
    private _categories: Map<string, Map<string, string>>;

    constructor(filename, categories: Map<string, Map<string, string>>) {
        this._filename = filename;
        this._categories = categories;
    }

    public getFilename() {
        return this._filename;
    }

    public getCategories() {
        return this._categories.keys();
    }

    public getValue(category: string, key: string) {
        if (this._categories.has(category)) {
            return this._categories.get(category).get(key);
        }
    }

    public getValues(category: string) {
        if (this._categories.has(category)) {
            return this._categories.get(category);
        }
    }

}
export default ConfigFile;
