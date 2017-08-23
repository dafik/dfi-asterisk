"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const local_dfi_linphone_endpoint_manager_1 = require("local-dfi-linphone-endpoint-manager");
const Version_1 = require("../src/internal/server/Version");
const asterisk_real_1 = require("./mock/asterisk-real");
local_dfi_linphone_endpoint_manager_1.default.toString();
describe("Core actions", () => {
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
    it("getAvailableActions", (done) => {
        asterisk_real_1.default.actions.core.getAvailableActions((err) => {
            assert.ifError(err);
            done();
        });
    });
    it("filterRTCP", (done) => {
        asterisk_real_1.default.actions.core.filterRTCP((err, response) => {
            assert.ifError(err);
            assert.equal(response.Response, "Success", "response:" + response.Response + response.Message ? " message: " + response.Message : "");
            done();
        });
    });
    it("getAsteriskVersion", (done) => {
        asterisk_real_1.default.actions.core.getAsteriskVersion((err, response) => {
            assert.ifError(err);
            assert.equal((response instanceof Version_1.default), true, "response not Asterisk version");
            done();
        });
    });
    it("getFileVersion", (done) => {
        asterisk_real_1.default.actions.core.getFileVersion("asterisk.c", (err, response) => {
            assert.ifError(err);
            assert.equal(Array.isArray(response), true, "response not an array");
            assert.equal(response.length === 3, true, "version parts length mismatch");
            done();
        });
    });
    it("executeCliCommand", (done) => {
        asterisk_real_1.default.actions.core.executeCliCommand("core show calls", (err, response) => {
            assert.ifError(err);
            assert.equal(response.$content.length > 0, true, " no response");
            done();
        });
    });
});
//# sourceMappingURL=001-coreActions.js.map