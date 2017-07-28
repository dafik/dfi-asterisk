"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const asterisk = require("./mock/asterisk-real");
const AsteriskVersion = require("../src/internal/server/Version");
const local_dfi_linphone_endpoint_manager_1 = require("local-dfi-linphone-endpoint-manager");
local_dfi_linphone_endpoint_manager_1.default.toString();
describe("Core actions", () => {
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
    it("getAvailableActions", (done) => {
        asterisk.actions.core.getAvailableActions((err) => {
            assert.ifError(err);
            done();
        });
    });
    it("filterRTCP", (done) => {
        asterisk.actions.core.filterRTCP((err, response) => {
            assert.ifError(err);
            assert.equal(response.Response, "Success", "response:" + response.Response + response.Message ? " message: " + response.Message : "");
            done();
        });
    });
    it("getAsteriskVersion", (done) => {
        asterisk.actions.core.getAsteriskVersion((err, response) => {
            assert.ifError(err);
            assert.equal(response instanceof AsteriskVersion, true, "response not Asterisk version");
            done();
        });
    });
    it("getFileVersion", (done) => {
        asterisk.actions.core.getFileVersion("asterisk.c", (err, response) => {
            assert.ifError(err);
            assert.equal(Array.isArray(response), true, "response not an array");
            assert.equal(response.length === 3, true, "version parts length mismatch");
            done();
        });
    });
    it("executeCliCommand", (done) => {
        asterisk.actions.core.executeCliCommand("core show calls", (err, response) => {
            assert.ifError(err);
            assert.equal(response.$content.length > 0, true, " no response");
            done();
        });
    });
});
//# sourceMappingURL=001-coreActions.js.map