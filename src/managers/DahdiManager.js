"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DAHDIChannelsCollection_1 = require("../collections/channels/DAHDIChannelsCollection");
const actionNames_1 = require("../internal/asterisk/actionNames");
const eventNames_1 = require("../internal/asterisk/eventNames");
const astUtil_1 = require("../internal/astUtil");
const Manager_1 = require("../internal/server/Manager");
const DahdiModel_1 = require("../models/DahdiModel");
const P_PROP_CHANNELS_BY_DAHDI_ID = "channelsByDahdiId";
const P_PROP_ACTIVE_COUNT = "activeCount";
/**
 * Manages all events related to bridges on Asterisk server
 */
class DahdiManager extends Manager_1.default {
    constructor(options, state) {
        super(options, state, new DAHDIChannelsCollection_1.default());
        this.setProp(P_PROP_CHANNELS_BY_DAHDI_ID, new Map());
        this.setProp(P_PROP_ACTIVE_COUNT, 0);
        if (!this.enabled) {
            return;
        }
        const map = {};
        map[eventNames_1.default.DAHDI_CHANNEL] = this._handleDahdiChannelEvent;
        map[eventNames_1.default.HANGUP] = this._handleHangupEvent;
        this._mapEvents(map);
    }
    get channels() {
        return this._collection;
    }
    get activeCount() {
        return this.getProp(P_PROP_ACTIVE_COUNT);
    }
    get _channelsByDahdiId() {
        return this.getProp(P_PROP_CHANNELS_BY_DAHDI_ID);
    }
    start(callbackFn, context) {
        function finish() {
            this.server.logger.info('manager "DahdiManager" started');
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, "DahdiManager");
        }
        this.server.logger.info('starting manager "DahdiManager"');
        if (!this.enabled) {
            finish.call(this);
            return;
        }
        const action = {
            Action: actionNames_1.default.DAHDI_SHOW_CHANNELS,
            DAHDIChannel: 0
        };
        if (!this.server.allowedActions.has(action.Action)) {
            this.server.logger.info('manager "DahdiManager" not started DAHDI command not allowed');
            astUtil_1.default.maybeCallbackOnce(callbackFn, context, null, "DahdiManager");
            return;
        }
        this.server.sendEventGeneratingAction(action, (err, re) => {
            if (err) {
                astUtil_1.default.maybeCallbackOnce(callbackFn, context, err, "DahdiManager");
                return;
            }
            if (typeof re !== "undefined") {
                re.events.forEach((event) => {
                    if (event.Event === eventNames_1.default.DAHDI_SHOW_CHANNELS) {
                        if (event.Channel) {
                            let channel;
                            if (this.server.managers.channel.enabled) {
                                channel = this.server.managers.channel.channels.get(event.Uniqueid);
                                if (!channel) {
                                    channel = {
                                        id: event.Uniqueid,
                                        name: event.Channel
                                    };
                                }
                            }
                            else {
                                channel = {
                                    id: event.Uniqueid,
                                    name: event.Channel
                                };
                            }
                            event.channel = channel;
                        }
                        const dahdiChannel = new DahdiModel_1.default(event);
                        this.logger.info("Adding dahdiChannel " + dahdiChannel.name);
                        this._addChannel(dahdiChannel);
                    }
                });
            }
            finish.call(this);
        }, this);
    }
    disconnected() {
        this.channels.clear();
    }
    toJSON() {
        const obj = super.toJSON();
        obj.collection = this.channels.toJSON();
        return obj;
    }
    _handleDahdiChannelEvent(event) {
        this.logger.debug("handle  DahdiChannel id: %s, span: %s, state %s, chan: %s", event.DAHDIChannel, event.DAHDISpan, event.ChannelStateDesc, event.Channel);
        // state Ring = incoming
        // state Rsrvd = outgoing
        let dahdiChannel = this.channels.get(event.DAHDIChannel);
        if (dahdiChannel) {
            if (event.Channel) {
                let channel;
                if (this.server.managers.channel.enabled) {
                    channel = this.server.managers.channel.channels.get(event.Uniqueid);
                }
                else {
                    channel = {
                        id: event.Uniqueid,
                        name: event.Channel
                    };
                }
                if (dahdiChannel.channel && dahdiChannel.channel.name !== channel.name) {
                    this.logger.error("error");
                }
                else {
                    dahdiChannel.channel = channel;
                    this._channelsByDahdiId.set(dahdiChannel.channel.name, { direction: (dahdiChannel.context === "incoming" ? 1 : 0), id: dahdiChannel.id });
                }
            }
            this._activeChanged(1);
        }
        else {
            // TODO Should not happen
            dahdiChannel = new DahdiModel_1.default(event);
            this.logger.info("Adding dahdiChannel " + dahdiChannel.name);
            this._addChannel(dahdiChannel);
        }
    }
    _activeChanged(direction) {
        const current = this.activeCount;
        if (direction > 0) {
            this.setProp(P_PROP_ACTIVE_COUNT, current + 1);
        }
        else {
            this.setProp(P_PROP_ACTIVE_COUNT, current - 1);
        }
        this.logger.info("Active changed: %s", this.activeCount);
    }
    _handleHangupEvent(event) {
        if (event.Channel.match(/DAHDI/)) {
            if (this._channelsByDahdiId.has(event.Channel)) {
                const stat = this._channelsByDahdiId.get(event.Channel);
                this.channels.get(stat.id).channel = null;
                this._channelsByDahdiId.delete(event.Channel);
                this._activeChanged(-1);
            }
            else {
                this.logger.warn("Unable to remove dahdi by channel name not found: %s", event.Channel);
            }
        }
    }
    _addChannel(dahdiChannel) {
        if (dahdiChannel.channel) {
            this._channelsByDahdiId.set(dahdiChannel.channel.name, { direction: (dahdiChannel.context === "incoming" ? 1 : 0), id: dahdiChannel.id });
            this.setProp(P_PROP_ACTIVE_COUNT, this.activeCount + 1);
        }
        this.channels.add(dahdiChannel);
    }
}
exports.default = DahdiManager;
//# sourceMappingURL=DahdiManager.js.map