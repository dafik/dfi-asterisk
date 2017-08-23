import * as assert from "assert";
import asterisk from "./mock/asterisk-real";

describe("variable actions", () => {
    function onBefore(done) {
        this.timeout(20000);
        asterisk.start()
            .then(() => {
                done();
            })
            .catch((err) => {
                if (err) {
                    assert.ok(false, err.message);
                }
            });
    }

    before(onBefore);
    it("variable put", (done) => {

        const variable = "test";
        const value = "value";

        asterisk.actions.variable.setGlobalVariable(variable, value, (errSet) => {
            assert.ifError(errSet);

            asterisk.actions.variable.getGlobalVariable(variable, (errGet?, responseGet?) => {
                assert.ifError(errGet);
                assert.equal(responseGet, value);
                done();
            });
        });
    });
});
