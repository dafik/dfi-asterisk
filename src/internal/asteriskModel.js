"use strict";
const local_dfi_base_1 = require("local-dfi-base");
const AsteriskState = require("./asteriskState");
let getServerInstance;
class AsteriskModel extends local_dfi_base_1.DfiModel {
    get sourceEvent() {
        return this.getProp("sourceEvent");
    }
    get _server() {
        if (typeof getServerInstance !== "function") {
            getServerInstance = require("../asteriskServerInstance");
        }
        return getServerInstance();
    }
    constructor(attributes, options) {
        options = options || {};
        options.loggerName = options.loggerName || "dfi:as:";
        options.sourceEvent = options.sourceEvent || attributes.Event;
        super(attributes, options);
        if (attributes.$time) {
            this.setProp("lastUpdate", attributes.$time);
        }
        else {
            this.stampLastUpdate();
        }
        this.on(AsteriskModel.events.UPDATE, (model, attribute, newValue, oldValue) => {
            if (attribute === "state") {
                if (!(newValue instanceof AsteriskState)) {
                    this.logger.error("trying to set state with not State obj %s, %j ", newValue, model);
                }
            }
        });
    }
    destroy() {
        super.destroy();
    }
    toString() {
        let sb = this.constructor.name;
        const s = this.getProp("attributes").size;
        let i = 1;
        try {
            sb += "[";
            this.getProp("attributes").forEach((val, key) => {
                if (typeof val === "object") {
                    try {
                        val = "[" + val.constructor.name + "]";
                    }
                    catch (e) {
                        throw e;
                    }
                }
                sb += key + "=" + val;
                if (i !== s) {
                    sb += ";";
                }
                i++;
            });
            sb += "]";
            return sb;
        }
        catch (e1) {
            throw e1;
        }
    }
}
module.exports = AsteriskModel;
//# sourceMappingURL=asteriskModel.js.map