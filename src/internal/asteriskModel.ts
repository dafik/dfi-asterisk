import {DfiModel} from "dfi-base/src/dfiModel";
import {IDfiAstModelAttribs, IDfiAstModelOptions} from "../definitions/models";
import AsteriskState from "./asteriskState";


abstract class AsteriskModel extends DfiModel {

    get sourceEvent(): string {
        return this.getProp("sourceEvent");
    }

    constructor(attributes: IDfiAstModelAttribs, options?: IDfiAstModelOptions) {
        options = options || {};
        options.loggerName = options.loggerName || "dfi:as:";
        options.sourceEvent = options.sourceEvent || attributes.Event;

        super(attributes, options);

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

    public destroy() {
        super.destroy();
    }

    public toString() {
        let sb = this.constructor.name;
        const s = this.getProp("attributes").size;
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

export default AsteriskModel;
