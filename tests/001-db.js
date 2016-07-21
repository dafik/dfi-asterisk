/**
 * @type {AsteriskServer}
 */
const asterisk = require('./mock/asterisk-real'),
    fs = require('fs'),
    assert = require("assert"),
    debug = require('debug')('test');


/**
 * @type {function}
 */
describe;
/**
 * @type {function}
 */
before;
/**
 * @type {function}
 */
it;

describe('DB actions', function () {
    before(function (done) {
        this.timeout(20000);
        //log4js.restoreConsole();
        asterisk.start(function (err) {
            if (err) {
                assert.ok(false, err.message);
            }
            done();
        });
    });

    it('db put', function (done) {

        asterisk.actions.db.dbPut('g1', 'test', 'value', function (err, response) {
            if (err) {
                assert.ok(false, err.message);
            }
            assert.equal(response.getMessage(), 'Updated database successfully');
            asterisk.actions.db.dbGet('g1', 'test', function (err, DbGetResponse) {
                assert.equal(DbGetResponse.family, 'g1');
                assert.equal(DbGetResponse.key, 'test');
                assert.equal(DbGetResponse.val, 'value');
                done();
            })
        })

    });
    it('db del', function (done) {

        asterisk.actions.db.dbDel('g1', 'test', function (err, response) {
            if (err) {
                assert.ok(false, err.message);
            }
            assert.equal(response.getMessage(), 'Key deleted successfully');
            asterisk.actions.db.dbGet('g1', 'test', function (err) {
                assert.equal(err.getMessage(), 'Database entry not found');
                done();
            })
        })
    });
});


//dbGet = function (family, key, callback) {}
//dbDel = function (family, key) {}
//dbPut = function (family, key, value) {}