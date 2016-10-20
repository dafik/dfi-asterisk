import AsteriskManager = require("../internal/server/Manager");
import {IDfiCallback} from "../definitions/interfaces";
import {IDfiAstDAHDIOnChannel} from "../definitions/models";
import {AST_ACTION} from "../internal/asterisk/actionNames";
import {IAstActionDAHDIShowChannels} from "../internal/asterisk/actions";
import {AST_EVENT} from "../internal/asterisk/eventNames";
import {IAstEventDAHDIChannel, IAstEventDAHDIShowChannels, IAstEventHangup} from "../internal/asterisk/events";
import Dahdi = require("../models/DahdiModel");
import AstUtil = require("../internal/astUtil");
import DAHDIChannels = require("../collections/channels/DAHDIChannelsCollection");

const P_PROP_CHANNELS_BY_DAHDI_ID = "channelsByDahdiId";
const P_PROP_ACTIVE_COUNT = "activeCount";

/**
 * Manages all events related to bridges on Asterisk server
 */
class DahdiManager extends AsteriskManager<Dahdi, DAHDIChannels> {

    constructor(options, state) {
        super(options, state, new DAHDIChannels());

        this.setProp(P_PROP_CHANNELS_BY_DAHDI_ID, new Map());
        this.setProp(P_PROP_ACTIVE_COUNT, 0);
    }

    get channels(): DAHDIChannels {
        return this._collection;
    }

    get activeCount() {
        return this.getProp(P_PROP_ACTIVE_COUNT);
    }

    private get _channelsByDahdiId(): Map<string, {id: string, direction: number}> {
        return this.getProp(P_PROP_CHANNELS_BY_DAHDI_ID);
    }

    public start(callbackFn: IDfiCallback, context?) {

        function finish() {
            this.server.logger.info('manager "DahdiManager" started');
            AstUtil.maybeCallbackOnce(callbackFn, context, null, "DahdiManager");
        }

        this.server.logger.info('starting manager "DahdiManager"');

        if (!this.enabled) {
            finish.call(this);
            return;
        }

        let map = {};
        map[AST_EVENT.DAHDI_CHANNEL] = this._handleDahdiChannelEvent;
        map[AST_EVENT.HANGUP] = this._handleHangupEvent;

        this._mapEvents(map);

        let action: IAstActionDAHDIShowChannels = {
            Action: AST_ACTION.DAHDI_SHOW_CHANNELS,
            DAHDIChannel: 0
        };
        if (!this.server.allowedActions.has(action.Action)) {
            this.server.logger.info('manager "DahdiManager" not started DAHDI command not allowed');
            AstUtil.maybeCallbackOnce(callbackFn, context, null, "DahdiManager");
            return;
        }

        this.server.sendEventGeneratingAction(action, (err, re) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err, "DahdiManager");
                return;
            }
            if (typeof re !== "undefined") {
                re.events.forEach((event: IAstEventDAHDIShowChannels) => {
                    if (event.Event === AST_EVENT.DAHDI_SHOW_CHANNELS) {

                        if (event.Channel) {
                            let channel: IDfiAstDAHDIOnChannel;
                            if (this.server.managers.channel.enabled) {
                                channel = this.server.managers.channel.channels.get(event.Channel);
                            } else {
                                channel = {
                                    id: event.Uniqueid,
                                    name: event.Channel
                                };
                            }
                            event.channel = channel;
                        }

                        let dahdiChannel = new Dahdi(event);
                        this.logger.info("Adding dahdiChannel " + dahdiChannel.name);

                        this._addChannel(dahdiChannel);
                    }
                });
            }
            finish.call(this);
        }, this);
    }

    public disconnected() {
        this.channels.clear();
    }

    public toJSON() {
        let obj = super.toJSON();
        obj.collection = this.channels.toJSON();

        return obj;
    }

    private _handleDahdiChannelEvent(event: IAstEventDAHDIChannel) {
        this.logger.debug("handle  DahdiChannel id: %s, span: %s, state %s, chan: %s", event.DAHDIChannel, event.DAHDISpan, event.ChannelStateDesc, event.Channel);

        // state Ring = incoming
        // state Rsrvd = outgoing

        let dahdiChannel = this.channels.get(event.DAHDIChannel);
        if (dahdiChannel) {

            if (event.Channel) {
                let channel: IDfiAstDAHDIOnChannel;
                if (this.server.managers.channel.enabled) {
                    channel = this.server.managers.channel.channels.get(event.Uniqueid);
                } else {
                    channel = {
                        id: event.Uniqueid,
                        name: event.Channel
                    };
                }
                if (dahdiChannel.channel && dahdiChannel.channel.name !== channel.name) {
                    this.logger.error("error");
                } else {
                    dahdiChannel.channel = channel;
                    this._channelsByDahdiId.set(dahdiChannel.channel.name, {direction: (dahdiChannel.context === "incoming" ? 1 : 0 ), id: dahdiChannel.id});
                }
            }

            this._activeChanged(1);

        } else {
            // TODO Should not happen

            dahdiChannel = new Dahdi(event);
            this.logger.info("Adding dahdiChannel " + dahdiChannel.name);

            this._addChannel(dahdiChannel);
        }
    }

    private _activeChanged(direction) {

        let current = this.activeCount;
        if (direction > 0) {
            this.setProp(P_PROP_ACTIVE_COUNT, current + 1);
        } else {
            this.setProp(P_PROP_ACTIVE_COUNT, current - 1);
        }
        this.logger.info("Active changed: %s", this.activeCount);
    }

    private _handleHangupEvent(event: IAstEventHangup) {
        if (event.Channel.match(/DAHDI/)) {
            if (this._channelsByDahdiId.has(event.Channel)) {

                let stat = this._channelsByDahdiId.get(event.Channel);

                this.channels.get(stat.id).channel = null;
                this._channelsByDahdiId.delete(event.Channel);

                this._activeChanged(-1);
            } else {

                this.logger.warn("Unable to remove dahdi by channel name not found");
            }
        }
    }

    private _addChannel(dahdiChannel: Dahdi) {
        if (dahdiChannel.channel) {
            this._channelsByDahdiId.set(dahdiChannel.channel.name, {direction: (dahdiChannel.context === "incoming" ? 1 : 0 ), id: dahdiChannel.id});
            this.setProp(P_PROP_ACTIVE_COUNT, this.activeCount + 1);
        }
        this.channels.add(dahdiChannel);
    }
}
export = DahdiManager;
