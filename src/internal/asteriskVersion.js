"use strict";
/**
 *
 * @param {String} version
 * @constructor
 * @class
 *
 * @property {number} branch
 * @property {number} series
 * @property {number} number
 * @property {boolean} isAmi2
 */
function Version(version) {
    var fullVersion = version;
    var parts = version.split('.');
    var branch = parseInt(parts[0]);
    var series = parseInt(parts[1]);
    var number = parseInt(parts[2]);

    Object.defineProperties(this, {
        branch: {
            get: function () {
                return branch
            }
        },
        series: {
            get: function () {
                return series;
            }
        },
        number: {
            get: function () {
                return number;
            }
        },
        isAmi2: {
            get: function () {
                return branch > 11
            }
        }
    });
    this.toString = function () {
        return fullVersion;
    }
}
module.exports = Version;
