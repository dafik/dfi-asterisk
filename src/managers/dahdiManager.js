"use strict";
const 
    AsteriskManager = require('../internal/asteriskManager'),

    dAmiLib = require("../../examples/dfi-asterisk-ami/src/dAmi"),
    actions = dAmiLib.Actions,


    AsteriskDahdiChannel = require('../models/asteriskDahdiChannel'),
    ChannelsCollection = require('../collections/channels');

//TODO subscribe channels!!.


/**
 * Manages all events related to bridges on Asterisk server
 */
class DahdiManager extends AsteriskManager {
    constructor(options, state) {
        super(options, state);

        this.channels = new ChannelsCollection();
        this.channelsByDahdiId = new Map();

        this.activeCount = 0;
    }


    /**
     * Retrieves all dahdi channels
     * @param {function} [callback]
     * @param {*} [thisp] callback this
     */
    start(callback, thisp) {

        function finish() {
            if (typeof callback == "function") {
                this.server.loggers.logger.info('manager "DahdiManager" started');
                callback.call(thisp, null, 'DahdiManager');
            }
        }

        function onResponse(err, re) {
            if (err) {
                callback.call(thisp, err);
                return;
            }
            if (typeof re != "undefined") {
                re.getEvents().forEach(onEachEvent, this)
            }
            finish.call(this);
        }

        function onEachEvent(event) {
            if (event.event == 'dahdishowchannels') {
                handleDahdiShowChannels.call(this, event);
            }
        }

        function handleDahdiShowChannels(event) {

            var dahdiChannel = new AsteriskDahdiChannel(event, {server: this.server});
            this.logger.info("Adding dahdiChannel " + dahdiChannel.get('dahdichannel'));

            this._addChannel(dahdiChannel);
        }

        this.server.loggers.logger.info('starting manager "DahdiManager"');

        if (!this.enabled) {
            finish.call(this);
            return
        }

        var map = {
            //channelState
            'dahdichannel': this._handleDahdiChannelEvent,
            'hangup': this._handleHangupEvent,
        };
        this._mapEvents(map);

        var action = new actions.DAHDIShowChannels();
        if (this.server.checkIsActionAllowed(action)) {
            this.server.sendEventGeneratingAction(action, onResponse, this);
        } else {
            this.server.loggers.logger.info('manager "DahdiManager" not started DAHDI command not allowed');
            callback.call(thisp, null, 'DahdiManager');
        }
    }

    disconnected() {
        this.channels.clear();
    }

    _handleDahdiChannelEvent(event) {
        this.logger.debug("handle  DahdiChannel id: %s, span: %s, state %s, chan: %s", event.dahdichannel, event.dahdispan, event.channelstatedesc, event.channel);

        //state Ring = incoming
        //state Rsrvd = outgoing

        /**
         * @type AsteriskDahdiChannel
         */
        var dahdiChannel = this.channels.get(event.dahdichannel);
        if (dahdiChannel) {

            dahdiChannel.set('accountcode', event.accountcode);
            dahdiChannel.set('channel', event.channel);
            dahdiChannel.set('uniqueid', event.uniqueid);

            if (dahdiChannel.has('channel')) {
                this.channelsByDahdiId.set(dahdiChannel.get('channel'), {id: dahdiChannel.get('dahdichannel'), direction: (dahdiChannel.get('context') == 'incoming' ? 1 : 0 )})
            }

            this._activeChanged(1);

        } else {
            /**
             * @type {AsteriskBridge}
             */
            dahdiChannel = new AsteriskDahdiChannel(event, {server: this.server});
            this.logger.info("Adding dahdiChannel " + dahdiChannel.get('dahdichannel'));

            this._addChannel(dahdiChannel);
        }
    }

    _activeChanged(direction, dahdiChannel) {

        let current = this.activeCount;
        if (direction > 0) {
            this.activeCount++
        } else {
            this.activeCount--
        }
        this.logger.info("Active changed: %s", this.activeCount);
        this.emit('activeChange', dahdiChannel, this.activeCount, current)
    }

    _handleHangupEvent(event) {
        if (event.channel.match(/DAHDI/)) {
            var x = 1;
            if (this.channelsByDahdiId.has(event.channel)) {
                let stat = this.channelsByDahdiId.get(event.channel);
                this.channelsByDahdiId.delete(event.channel);
                /**
                 * @type AsteriskDahdiChannel
                 */
                let channel = this.channels.get(stat.id);

                channel.unset('accountcode');
                channel.unset('channel');
                channel.unset('uniqueid');

                this._activeChanged(-1);


            } else {
                var x = 1;
            }

        }
    }

    /**
     * @param {AsteriskDahdiChannel} dahdiChannel
     * @private
     */
    _addChannel(dahdiChannel) {

        if (dahdiChannel.has('channel')) {
            this.channelsByDahdiId.set(dahdiChannel.get('channel'), {id: dahdiChannel.get('dahdichannel'), direction: (dahdiChannel.get('context') == 'incoming' ? 1 : 0 )})
        }

        this.channels.add(dahdiChannel);
        if (dahdiChannel.get('channel')) {
            this.activeCount++;
        }
    }

    toJSON() {
        var obj = super.toJSON();
        obj.collection = this.channels.toJSON();

        return obj;
    }


}
module.exports = DahdiManager;