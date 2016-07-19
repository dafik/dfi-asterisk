/**
 * Created by z.wieczorek on 07.02.14.
 */

/**
 *
 * @class Collection object
 * @constructor
 * @property {number} _length
 * @property {object} _collection
 */

function Collection() {

    this._length = 0;
    this._collection = {};
    /*
     if (values) {
     if (typeof values != 'object') {
     throw new Error('can\'t create collection from non object')
     }
     }
     */
}
/**
 * adds item to collection at key
 * @param key
 * @param item
 */
Collection.prototype.add = function (key, item) {
    if (this._collection[key] != undefined) {
        throw Error('key exist');
    }
    this._collection[key] = item;
    this._length++;
};
/**
 * adds item to collection at key
 * @param key
 * @param item
 */
Collection.prototype.replace = function (key, item) {
    if (this.has(key)) {
        this._collection[key] = item;
    } else {
        throw Error('key not exist');
    }
};

Collection.prototype.put = Collection.prototype.add;
/**
 * removes item from collection by key
 * @param key
 */
Collection.prototype.remove = function (key) {
    if (this._collection[key] != undefined) {
        delete this._collection[key];
        this._length--;
    }
};
/**
 * returns item from collection by key or false
 * @param key
 * @returns {*|false}
 */
Collection.prototype.get = function (key) {
    if (this.has(key)) {
        return this._collection[key];
    }
    return null;
};
/**
 * return true if collection has key
 * @param key
 * @returns {boolean}
 */
Collection.prototype.has = function (key) {
    return undefined != this._collection[key];
};

/**
 * perform callback on each collection element
 * @param callback
 * @param {this:*} [_this]
 */
Collection.prototype.forEach = function (callback, thisp) {
    var key;
    for (key in this._collection) {
        if (this._collection.hasOwnProperty(key)) {
            callback.call(thisp, this._collection[key]);
        }
    }
};
Collection.prototype.getLength = function () {
    return this._length;
};
/**
 * perform clear on collection
 *
 */
Collection.prototype.clear = function () {
    this._collection = {};
};
/**
 * @returns {boolean}
 */
Collection.prototype.isEmpty = function () {
    return this._length > 0;
};
/**
 * @returns {Array}
 */
Collection.prototype.toArray = function () {
    var tmp = [];
    this.forEach(function (member) {
        tmp.push(member);
    });
    return tmp;
};
Collection.prototype.containsKey = Collection.prototype.has;
/**
 * @returns {Array}
 */
Collection.prototype.keys = function () {
    return Object.keys(this._collection);
};

/**
 *
 * @type {Collection}
 */
module.exports = Collection;