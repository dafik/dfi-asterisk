import {IDfiAstModelAttribs, IDfiAstModelOptions} from "../definitions/models";
import DfiModel = require("local-dfi-base/src/dfiModel");
import AsteriskServer = require("../asteriskServer");
import AsteriskState = require("./asteriskState");
let getServerInstance;

abstract class AsteriskModel extends DfiModel {

    constructor(attributes: IDfiAstModelAttribs, options?: IDfiAstModelOptions) {
        options = options || {};
        options.loggerName = options.loggerName || "dfi:as:";
        options.sourceEvent = options.sourceEvent || attributes.Event;

        super(attributes, options, true);

        if (attributes.$time) {
            this.setProp("lastUpdate", attributes.$time);
        } else {
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

    get sourceEvent(): string {
        return this.getProp("sourceEvent");
    }

    protected get _server(): AsteriskServer {
        if (typeof getServerInstance !== "function") {
            getServerInstance = require("../asteriskServerInstance");
        }
        return getServerInstance() as AsteriskServer;
    }

    public destroy() {
        super.destroy();
        delete this.id;
    }

    public toPlain() {
        let tmp = {attr: {}, id: this.id, prop: {}};
        this.getProp("attributes").forEach((value, key) => {
            tmp.attr[key] = value;
        });
        this.__getProp().forEach((value, key) => {
            if (key !== "attributes") {
                tmp.prop[key] = value;
            }
        });

        return tmp;
    }

    public toString() {
        let sb = this.constructor.name;
        let s = this.getProp("attributes").size;
        let i = 1;

        try {
            sb += "[";
            this.getProp("attributes").forEach((val, key) => {

                if (typeof val === "object") {
                    try {
                        val = "[" + val.constructor.name + "]";
                    } catch (e) {
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
        } catch (e1) {
            throw e1;
        }
    }
}

export = AsteriskModel;
