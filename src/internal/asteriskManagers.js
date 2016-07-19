"use strict";
const
    async = require('async'),
    _ = require('lodash'),

    ChannelManager = require('../managers/channelManager'),
    AgentManager = require('../managers/agentManager'),
    BridgeManager = require('../managers/bridgeManager'),
    QueueManager = require('../managers/queueManager'),
    PeerManager = require('../managers/peerManager'),
    DeviceManager = require('../managers/deviceManager'),
    DahdiManager = require('../managers/dahdiManager'),
    MeetMeeManager = require('../managers/meetMeManager')


    ;

class AsteriskManagers {

    constructor(server) {
        var managerOptions = {server: server};
        var state = server.options.managers;

        Object.defineProperty(this, '_managers', {
            value: {}
        });

        this._managers['channel'] = new ChannelManager(managerOptions, state['channel']);
        this._managers['peer'] = new PeerManager(managerOptions, state['peer']);
        this._managers['device'] = new DeviceManager(managerOptions, state['device']);
        this._managers['bridge'] = new BridgeManager(managerOptions, state['bridge']);
        this._managers['dahdi'] = new DahdiManager(managerOptions, state['dahdi']);
        this._managers['queue'] = new QueueManager(managerOptions, state['queue']);
        this._managers['agent'] = new AgentManager(managerOptions, state['agent']);
        this._managers['meetMe'] = new MeetMeeManager(managerOptions, state['meetMe']);

    }

    get(name) {
        if (_.has(this._managers, name)) {
            return this._managers[name];
        }
        return undefined;
    }

    /**
     * @returns {ChannelManager}
     */
    get channel() {
        return this._managers['channel'];
    }

    /**
     * @returns {PeerManager}
     */
    get peer() {
        return this._managers['peer'];
    }

    /**
     * @returns {DeviceManager}
     */
    get device() {
        return this._managers['device'];
    }

    /**
     * @returns {BridgeManager}
     */

    get bridge() {
        return this._managers['bridge'];
    }

    /**
     * @returns {DahdiManager}
     */
    get dahdi() {
        return this._managers['dahdi'];
    }

    /**
     * @returns {QueueManager}
     */
    get queue() {
        return this._managers['queue'];
    }

    /**
     * @returns {AgentManager}
     */
    get agent() {
        return this._managers['agent'];
    }

    /**
     * @returns {MeetMeeManager}
     */
    get meetMe() {
        return this._managers['meetMe'];
    }

    gc() {
        _.forOwn(this._managers, function (manager) {
            manager.gc();
        })
    }

    start(callback, thisp) {

        function onAll(callback) {
            if (_.isFunction(callback)) {
                callback.call(thisp)
            }
        }

        var self = this;

        async.series([
            self.device.start.bind(self.device),
            self.peer.start.bind(self.peer),
            self.bridge.start.bind(self.bridge),
            self.channel.start.bind(self.channel),
            self.dahdi.start.bind(self.dahdi),
            self.queue.start.bind(self.queue),
            self.meetMe.start.bind(self.meetMe),
            self.agent.start.bind(self.agent),

            onAll.bind(self)
        ], function (err) {
            if (_.isFunction(callback)) {
                callback.call(thisp, err)
            }
        });
    }


    reStart(callback, thisp) {

        function onAll(callback) {
            if (_.isFunction(callback)) {
                callback.call(thisp)
            }
        }

        var self = this;

        async.series([
            self.device.reStart.bind(self.device),
            self.peer.reStart.bind(self.peer),
            self.bridge.reStart.bind(self.bridge),
            self.channel.reStart.bind(self.channel),
            self.dahdi.reStart.bind(self.dahdi),
            self.queue.reStart.bind(self.queue),
            self.meetMe.reStart.bind(self.meetMe),
            self.agent.reStart.bind(self.agent),

            onAll.bind(self)
        ], function (err) {
            if (_.isFunction(callback)) {
                callback.call(thisp, err)
            }
        });
    }

    toJSON() {
        return this._managers;
    }
}


module.exports = AsteriskManagers;