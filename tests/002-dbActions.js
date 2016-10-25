"use strict";
const assert = require("assert");
const asterisk = require("./mock/asterisk-real");
describe("DB actions", () => {
    function onBefore(done) {
        this.timeout(20000);
        asterisk.start()
            .then(() => {
            done();
        })
            .catch(err => {
            if (err) {
                done(err);
            }
        });
    }
    before(onBefore);
    it("db put", (done) => {
        asterisk.actions.db.dbPut("g1", "test", "value", (err) => {
            assert.ifError(err);
            asterisk.actions.db.dbGet("g1", "test", (err1, dbGetResponse) => {
                assert.equal(dbGetResponse.Family, "g1");
                assert.equal(dbGetResponse.Key, "test");
                assert.equal(dbGetResponse.Val, "value");
                done();
            });
        });
    });
    it("db del", (done) => {
        asterisk.actions.db.dbDel("g1", "test", (err) => {
            assert.ifError(err);
            asterisk.actions.db.dbGet("g1", "test", (err1) => {
                assert.equal(err1.message, "Database entry not found");
                done();
            });
        });
    });
    it("db del tree", (done) => {
        asterisk.actions.db.dbPut("g1", "test1", "value", (err) => {
            assert.ifError(err);
            asterisk.actions.db.dbDelTree("g1", "test1", (err1) => {
                assert.ifError(err1);
                asterisk.actions.db.dbDelTree("gssssssasdasd1", "asasd", (err2) => {
                    assert.equal(err2.message, "Database entry not found");
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=002-dbActions.js.map