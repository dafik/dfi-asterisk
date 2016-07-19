"use strict";
const AsteriskModel = require('../internal/asteriskModel'),
    ChannelsCollection = require('../collections/channels');


/**
 * Default implementation of the AsteriskBridge interface.
 */
class AsteriskBridge extends AsteriskModel {

    initialize() {

        this.set('channels', new ChannelsCollection());

        if (this.get('bridgeuniqueid')) {
            this.id = this.get('bridgeuniqueid');
        } else if (this.get('id')) {
            this.id = this.get('id');
        } else {
            var x = 1;
        }
    }

    addChannel(channel) {
        this.get('channels').add(channel);
        this.set('channels', this.get('channels'));
    }

    removeChannel(channel) {
        this.get('channels').remove(channel.id);
    }

    destroy() {
        this.get('channels')
            .clear()
            .destroy();
        this.unset('channels');

        super.destroy();
    }

}

module.exports = AsteriskBridge;