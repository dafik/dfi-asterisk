"use strict";
const AsteriskManager = require("../internal/server/Manager");
const Bridges = require("../collections/BridgesCollection");
const Bridge = require("../models/BridgeModel");
const actionNames_1 = require("../internal/asterisk/actionNames");
const eventNames_1 = require("../internal/asterisk/eventNames");
const AstUtil = require("../internal/astUtil");
const PROP_LOCAL_MAP = "localMap";
const PROP_CHANNEL_MANAGER = "channelManager";
class BridgeManager extends AsteriskManager {
    constructor(options, state) {
        super(options, state, new Bridges());
        this.setProp(PROP_LOCAL_MAP, new Map());
        this.server.once(this.serverEvents.BEFORE_INIT, () => {
            this.setProp(PROP_CHANNEL_MANAGER, this.server.managers.channel);
        }, this);
        if (!this.enabled) {
            return;
        }
        let map = {};
        map[eventNames_1.AST_EVENT.BRIDGE_CREATE] = this._handleBridgeCreateEvent;
        map[eventNames_1.AST_EVENT.BRIDGE_DESTROY] = this._handleBridgeDestroyEvent;
        map[eventNames_1.AST_EVENT.BRIDGE_ENTER] = this._handleBridgeEnterEvent;
        map[eventNames_1.AST_EVENT.BRIDGE_LEAVE] = this._handleBridgeLeaveEvent;
        map[eventNames_1.AST_EVENT.BRIDGE_MERGE] = this._handleBridgeMergeEvent;
        map[eventNames_1.AST_EVENT.HANGUP] = this._handleHangupEvent; // maybe listen to event ?
        map[eventNames_1.AST_EVENT.LOCAL_BRIDGE] = this._handleLocalBridgeEvent;
        this._mapEvents(map);
    }
    get bridges() {
        return this._collection;
    }
    get localMap() {
        return this.getProp(PROP_LOCAL_MAP);
    }
    get _channelManager() {
        return this.getProp(PROP_CHANNEL_MANAGER);
    }
    getBridgeByBridgeId(bridgeId) {
        return this.bridges.get(bridgeId);
    }
    hasBridge(bridge) {
        return this.bridges.has(bridge);
    }
    getBridgesArray() {
        return this.bridges.toArray();
    }
    /**
     * Retrieves all bridges registered at Asterisk server by sending an BridgesAction.
     */
    start(callbackFn, context) {
        function finish() {
            this.server.logger.info('manager "BridgeManager" started');
            AstUtil.maybeCallbackOnce(callbackFn, context, null, "BridgeManager");
        }
        this.server.logger.info('starting manager "BridgeManager"');
        if (!this.enabled) {
            finish.call(this);
            return;
        }
        this.server.sendEventGeneratingAction({ Action: actionNames_1.AST_ACTION.BRIDGE_LIST }, (err, re) => {
            if (err) {
                AstUtil.maybeCallbackOnce(callbackFn, context, err);
                return;
            }
            if (typeof re !== "undefined") {
                re.events.forEach((event) => {
                    if (event.Event === eventNames_1.AST_EVENT.BRIDGE_LIST_ITEM) {
                        let bridge = new Bridge(event);
                        this._addBridge(bridge);
                    }
                });
            }
            finish.call(this);
        }, this);
    }
    disconnected() {
        this.bridges.clear();
    }
    _handleBridgeCreateEvent(event) {
        this.logger.info("Handle BridgeCreateEvent %s", event.BridgeUniqueid);
        let bridge = new Bridge(event);
        this._addBridge(bridge);
    }
    _handleBridgeDestroyEvent(event) {
        this.logger.info("Handle BridgeDestroyEvent %s", event.BridgeUniqueid);
        let bridge = this.bridges.get(event.BridgeUniqueid);
        if (bridge == null) {
            this.logger.error('Ignored BridgeEnterEvent for unknown bridge "' + event.BridgeUniqueid);
            return;
        }
        this.bridges.remove(event.BridgeUniqueid);
        bridge.destroy();
    }
    _handleBridgeEnterEvent(event) {
        this.logger.info("Handle BridgeEnterEvent %s", event.BridgeUniqueid);
        let bridge = this.getBridgeByBridgeId(event.BridgeUniqueid);
        if (bridge == null) {
            this.logger.error('Ignored BridgeEnterEvent for unknown bridge "' + event.BridgeUniqueid);
            return;
        }
        if (this.server.managers.channel.enabled) {
            let channel = this._channelManager.getChannelById(event.Uniqueid);
            if (channel == null) {
                this.logger.error('Ignored BridgeEnterEvent for unknown channel "' + event.Channel);
                return;
            }
            channel.addBridge(bridge);
            bridge.addChannel(channel);
        }
    }
    _handleBridgeLeaveEvent(event) {
        this.logger.info("Handle BridgeLeaveEvent %s", event.BridgeUniqueid);
        let bridge = this.getBridgeByBridgeId(event.BridgeUniqueid);
        if (bridge == null) {
            this.logger.error('Ignored BridgeLeaveEvent for unknown bridge "' + event.BridgeUniqueid);
            return;
        }
        if (this.server.managers.channel.enabled) {
            let channel = this._channelManager.getChannelById(event.Uniqueid);
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
    _handleBridgeMergeEvent(event) {
        this.logger.info("Handle BridgeMergeEvent %s", event.FromBridgeUniqueid);
    }
    _handleLocalBridgeEvent(event) {
        let id = event.LocalOneUniqueid + "-" + event.LocalTwoUniqueid;
        this.logger.info("Handle LocalBridgeEvent %s, %s->%s", id, event.LocalOneChannel, event.LocalTwoChannel);
        if (this.bridges.has(id)) {
            return;
        }
        // event.WasInBridgeManager = true;
        let attrs = {
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
        attrs = Object.assign(attrs, event);
        let bridge = new Bridge(attrs);
        this._addLocalBridge(bridge);
        if (this.server.managers.channel.enabled) {
            let channel1 = this._channelManager.getChannelById(event.LocalOneUniqueid);
            let channel2 = this._channelManager.getChannelById(event.LocalTwoUniqueid);
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
    _handleHangupEvent(event) {
        this.logger.info("Handle HangupEvent %s", event.Channel);
        let localMap = this.localMap;
        if (localMap.has(event.Uniqueid)) {
            let bridge = localMap.get(event.Uniqueid);
            if (bridge.localOneUniqueId === event.Uniqueid) {
                bridge.isHangupFirst = true;
            }
            else if (bridge.localTwoUniqueId === event.Uniqueid) {
                bridge.isHangupSecond = true;
            }
            else {
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
            }
            else {
                this.logger.error("error");
            }
        }
        // handle remove bridge for local bridge
        channel.getBridgesArray().forEach((bridge) => {
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
    _addBridge(bridge) {
        this.logger.info('adding bridge: "' + bridge.id + '"');
        this.bridges.add(bridge);
    }
    _addLocalBridge(bridge) {
        this.logger.info('adding local bridge: "' + bridge.id + '"');
        let localMap = this.localMap;
        localMap.set(bridge.localOneUniqueId, bridge);
        localMap.set(bridge.localTwoUniqueId, bridge);
        this.bridges.add(bridge);
    }
}
module.exports = BridgeManager;
//# sourceMappingURL=BridgeManager.js.map