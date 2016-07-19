module.exports = (function () {
    var nextId = 0;
    return function () {
        return nextId++;
    }
})();

