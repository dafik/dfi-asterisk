"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const asterisk_real_1 = require("./mock/asterisk-real");
describe("variable actions", () => {
    function onBefore(done) {
        this.timeout(20000);
        asterisk_real_1.default.start()
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
        asterisk_real_1.default.actions.variable.setGlobalVariable(variable, value, (errSet) => {
            assert.ifError(errSet);
            asterisk_real_1.default.actions.variable.getGlobalVariable(variable, (errGet, responseGet) => {
                assert.ifError(errGet);
                assert.equal(responseGet, value);
                done();
            });
        });
    });
});
//# sourceMappingURL=003-variableActions.js.map