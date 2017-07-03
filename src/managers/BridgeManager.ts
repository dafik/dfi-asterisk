import AsteriskManager = require("../internal/server/Manager");
import Bridges = require("../collections/BridgesCollection");
import Bridge = require("../models/BridgeModel");
import ChannelManager = require("./ChannelManager");
import {IDfiAMIResponseMessageMulti, IDfiCallbackResult} from "../definitions/interfaces";
import {IDfiAstModelAttribsBridge} from "../definitions/models";
import {
    IAstEventBridgeCreate,
    IAstEventBridgeDestroy,
    IAstEventBridgeEnter,
    IAstEventBridgeLeave,
    IAstEventBridgeListItem,
    IAstEventBridgeMerge,
    IAstEventHangup,
    IAstEventLocalBridge
} from "../internal/asterisk/events";

import AstUtil = require("../internal/astUtil");
import AST_EVENT = require("../internal/asterisk/eventNames");
import AST_ACTION = require("../internal/asterisk/actionNames");

const PROP_LOCAL_MAP = "localMap";
const PROP_CHANNEL_MANAGER = "channelManager";

class BridgeManager extends AsteriskManager<Bridge, Bridges> {
    constructor(options, state) {
        super(options, state, new Bridges());

        this.setProp(PROP_LOCAL_MAP, new Map());
        this.server.once(this.serverEvents.BEFORE_INIT, () => {
            this.setProp(PROP_CHANNEL_MANAGER, this.server.managers.channel);
        }, this);

        if (!this.enabled) {
            return;
        }

        const map = {};
        map[AST_EVENT.BRIDGE_CREATE] = this._handleBridgeCreateEvent;
        map[AST_EVENT.BRIDGE_DESTROY] = this._handleBridgeDestroyEvent;
        map[AST_EVENT.BRIDGE_ENTER] = this._handleBridgeEnterEvent;
        map[AST_EVENT.BRIDGE_LEAVE] = this._handleBridgeLeaveEvent;
        map[AST_EVENT.BRIDGE_MERGE] = this._handleBridgeMergeEvent;
        map[AST_EVENT.HANGUP] = this._handleHangupEvent; // maybe listen to event ?
        map[AST_EVENT.LOCAL_BRIDGE] = this._handleLocalBridgeEvent;

        this._mapEvents(map);
    }

    get bridges(): Bridges {
        return this._collection;
    }

    get localMap(): Map<string, Bridge> {
        return this.getProp(PROP_LOCAL_MAP);
    }

    private get _channelManager(): ChannelManager {
        return this.getProp(PROP_CHANNEL_MANAGER);
    }

    public getBridgeByBridgeId(bridgeId): Bridge {
        return this.bridges.get(bridgeId);
    }

    public hasBridge(bridge: string|Bridge): boolean {
        return this.bridges.has(bridge);
    }

    public getBridgesArray(): Bridge[] {
        return this.bridges.toArray();
    }

    /**
     * Retrieves all bridges registered at Asterisk server by sending an BridgesAction.
     */
    public start(callbackFn: IDfiCallbackResult, context?) {

        function finish() {
            this.server.logger.info('manager "BridgeManager" started');
            AstUtil.maybeCallbackOnce(callbackFn, context, null, "BridgeManager");
        }

        this.server.logger.info('starting manager "BridgeManager"');

        if (!this.enabled) {
            finish.call(this);
            return;
        }

        this.server.sendEventGeneratingAction({Action: AST_ACTION.BRIDGE_LIST}, (err, re: IDfiAMIResponseMessageMulti<IAstEventBridgeListItem>) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
                return;
            }
            if (typeof re !== "undefined") {
                re.events.forEach((event) => {
                    if (event.Event === AST_EVENT.BRIDGE_LIST_ITEM) {
                        const bridge = new Bridge(event);
                        this._addBridge(bridge);
                    }
                });
            }
            finish.call(this);
        }, this);
    }

    public disconnected() {
        this.bridges.clear();
    }

    private _handleBridgeCreateEvent(event: IAstEventBridgeCreate) {
        this.logger.info("Handle BridgeCreateEvent %s", event.BridgeUniqueid);
        const bridge = new Bridge(event);
        this._addBridge(bridge);
    }

    private _handleBridgeDestroyEvent(event: IAstEventBridgeDestroy) {
        this.logger.info("Handle BridgeDestroyEvent %s", event.BridgeUniqueid);
        const bridge = this.bridges.get(event.BridgeUniqueid);
        if (bridge == null) {
            this.logger.error('Ignored BridgeEnterEvent for unknown bridge "' + event.BridgeUniqueid);
            return;
        }
        this.bridges.remove(event.BridgeUniqueid);
        bridge.destroy();
    }

    private _handleBridgeEnterEvent(event: IAstEventBridgeEnter) {
        this.logger.info("Handle BridgeEnterEvent %s", event.BridgeUniqueid);
        const bridge = this.getBridgeByBridgeId(event.BridgeUniqueid);
        if (bridge == null) {
            this.logger.error('Ignored BridgeEnterEvent for unknown bridge "' + event.BridgeUniqueid);
            return;
        }
        if (this.server.managers.channel.enabled) {
            const channel = this._channelManager.getChannelById(event.Uniqueid);
            if (channel == null) {
                this.logger.error('Ignored BridgeEnterEvent for unknown channel "' + event.Channel);
                return;
            }
            channel.addBridge(bridge);
            bridge.addChannel(channel);
        }
    }

    private _handleBridgeLeaveEvent(event: IAstEventBridgeLeave) {
        this.logger.info("Handle BridgeLeaveEvent %s", event.BridgeUniqueid);
        const bridge = this.getBridgeByBridgeId(event.BridgeUniqueid);
        if (bridge == null) {
            this.logger.error('Ignored BridgeLeaveEvent for unknown bridge "' + event.BridgeUniqueid);
            return;
        }
        if (this.server.managers.channel.enabled) {
            const channel = this._channelManager.getChannelById(event.Uniqueid);
            if (channel == null) {
                this.logger.error('Ignored BridgeLeaveEvent for unknown channel "' + event.Channel);
                return;
            }
            channel.removeBridge(bridge);
            if (!bridge.hasChannel(channel.id)) {
                this.logger.error('Ignored BridgeLeaveEvent not having  channel "' + event.Channel);
                return;
            }
            bridge.removeChannel(channel.id);
        }
    }

    private _handleBridgeMergeEvent(event: IAstEventBridgeMerge) {
        this.logger.info("Handle BridgeMergeEvent %s", event.FromBridgeUniqueid);

    }

    private _handleLocalBridgeEvent(event: IAstEventLocalBridge) {
        const id = event.LocalOneUniqueid + "-" + event.LocalTwoUniqueid;
        this.logger.info("Handle LocalBridgeEvent %s, %s->%s", id, event.LocalOneChannel, event.LocalTwoChannel);

        if (this.bridges.has(id)) {
            return;
        }
        // event.WasInBridgeManager = true;

        let attrs: IDfiAstModelAttribsBridge = {
            BridgeCreator: "asterisk",
            BridgeName: id,
            BridgeNumChannels: 2,
            BridgeTechnology: "local",
            BridgeType: "local",
            Event: event.Event,
            id,
            isHangupFirst: false,
            isHangupSecond: false

        };

        attrs = {...attrs, ...event};
        const bridge = new Bridge(attrs);
        this._addLocalBridge(bridge);

        if (this.server.managers.channel.enabled) {
            const channel1 = this._channelManager.getChannelById(event.LocalOneUniqueid);
            const channel2 = this._channelManager.getChannelById(event.LocalTwoUniqueid);

            this.logger.info('enter: "' + bridge.id + '" channel: "' + channel1.name + '"');
            bridge.addChannel(channel1);
            this.logger.info('enter: "' + bridge.id + '" channel: "' + channel2.name + '"');
            bridge.addChannel(channel2);

            channel1.channelLinked(event.$time, channel2);
            channel2.channelLinked(event.$time, channel1);

            channel1.addBridge(bridge);
            channel2.addBridge(bridge);
        }

    }

    private _handleHangupEvent(event: IAstEventHangup) {
        this.logger.info("Handle HangupEvent %s", event.Channel);

        const localMap = this.localMap;

        if (localMap.has(event.Uniqueid)) {
            const bridge = localMap.get(event.Uniqueid);
            if (bridge.localOneUniqueId === event.Uniqueid) {
                bridge.isHangupFirst = true;
            } else if (bridge.localTwoUniqueId === event.Uniqueid) {
                bridge.isHangupSecond = true;
            } else {
                this.logger.error("error");
            }
            if (bridge.isHangupFirst && bridge.isHangupSecond) {
                this.logger.info('remove local bridge: "' + bridge.id + '"');

                this.localMap.delete(bridge.localOneUniqueId);
                this.localMap.delete(bridge.localTwoUniqueId);

                this.bridges.remove(bridge);
            }
        }

        if (!this.server.managers.channel.enabled) {
            return;
        }
        let channel = this.server.managers.channel.channels.get(event.Uniqueid);

        if (channel == null) {
            channel = this.server.managers.channel.getChannelByName(event.Channel);
            if (channel == null) {
                this.logger.error("Ignored HangupEvent for unknown channel %s(%s)", event.Channel, event.Uniqueid);
                return;
            } else {
                this.logger.error("error");
            }
        }
        // handle remove bridge for local bridge
        channel.getBridgesArray().forEach((bridge: Bridge) => {
            if (bridge.type === "local") {
                if (bridge.hasChannel(channel.id)) {
                    this.logger.info('leaving: "' + bridge.id + '" channel: "' + channel.name + '"');
                    channel.removeBridge(bridge);
                    bridge.removeChannel(channel.id);
                    if (bridge.channelsSize === 0) {
                        this.logger.info('destroying: "' + bridge.id + '"');
                        this.bridges.remove(bridge.id);
                    }
                }
            }
        });
    }

    private _addBridge(bridge: Bridge) {
        this.logger.info('adding bridge: "' + bridge.id + '"');

        this.bridges.add(bridge);
    }

    private _addLocalBridge(bridge: Bridge) {
        this.logger.info('adding local bridge: "' + bridge.id + '"');

        const localMap = this.localMap;

        localMap.set(bridge.localOneUniqueId, bridge);
        localMap.set(bridge.localTwoUniqueId, bridge);

        this.bridges.add(bridge);
    }
}
export = BridgeManager;
