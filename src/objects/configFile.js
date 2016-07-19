"use strict";
/**
 * ConfigFile implementation based on the config actions of the Manager API.
 *
 * @param {String} filename
 * @param {Collection<String,String[]>} categories
 *
 * @constructor
 * @class
 * @memberOf object
 * @property {string} filename
 * @property {Collection} categories
 *
 */
function ConfigFile(filename, categories) {
    this.filename = filename;
    this.categories = categories;
}

/**
 * @returns {string}
 */
ConfigFile.prototype.getFilename = function () {
    return this.filename;
};
/**
 * @returns {Array}
 */
ConfigFile.prototype.getCategories = function () {
    return this.categories.keys();
};

/**
 *
 * @param {string} category
 * @param {string} key
 */
ConfigFile.prototype.getValue = function (category, key) {
    var parts = [], keyL;
    if (this.categories.has(category)) {
        this.categories.forEach(function (cat) {
            parts = cat.split('=');
            if (parts > 1) {
                keyL = parts.shift();
                if (keyL.toLocaleLowerCase() == key.toLocaleLowerCase()) {
                    return parts.join('=')
                }
            }
        })
    }
};

/**
 *
 * @param category
 * @param key
 * @returns {string[]}
 */
ConfigFile.prototype.getValues = function (category, key) {
    if (this.categories.has(category)) {
        return this.categories.get(category)
    }
};
module.exports = ConfigFile;