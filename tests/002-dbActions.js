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
                assert.ok(false, err.message);
            }
        });
    }
    before(onBefore);
    it("db put", (done) => {
        asterisk.actions.db.dbPut("g1", "test", "value", (err, response) => {
            assert.ifError(err);
            assert.equal(response.Message, "Updated database successfully");
            asterisk.actions.db.dbGet("g1", "test", (err1, dbGetResponse) => {
                assert.equal(dbGetResponse.Family, "g1");
                assert.equal(dbGetResponse.Key, "test");
                assert.equal(dbGetResponse.Val, "value");
                done();
            });
        });
    });
    it("db del", (done) => {
        asterisk.actions.db.dbDel("g1", "test", (err, response) => {
            assert.ifError(err);
            assert.ok(true);
            assert.equal(response.Message, "Key deleted successfully");
            asterisk.actions.db.dbGet("g1", "test", (err1) => {
                assert.equal(err1.Message, "Database entry not found");
                done();
            });
        });
    });
});
//# sourceMappingURL=002-dbActions.js.map