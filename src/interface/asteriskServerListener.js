"use strict";
/**
 * You can register an AsteriskServerListener with an
 * {@link AsteriskServer} to be notified about new
 * channels and MeetMe users.
 * <p>
 * Usually it is better to extend AbstractAsteriskServerListener than to
 * implement this interface directly as additional methods will probably be added
 * in future versions of Asterisk-Java.
 *
 * @interface
 * @memberOf interface
 *
 */

function AsteriskServerListener() {
}
/**
 * Called whenever a new channel appears on the Asterisk server.
 *
 * @param {AsteriskChannel} channel the new channel.
 */
AsteriskServerListener.prototype.onNewAsteriskChannel = function (channel) {
};

/**
 * Called whenever a user joins a {@link MeetMeRoom}.
 *
 * @param {MeetMeUser} user the user that joined.
 */
AsteriskServerListener.prototype.onNewMeetMeUser = function (user) {
};

/**
 * Called whenever a new agent will be registered at Asterisk server.
 *
 * @param {AsteriskAgent} agent
 */
AsteriskServerListener.prototype.onNewAgent = function (agent) {
};

/**
 * Called whenever a queue entry ( ~ wrapper over channel) joins a {@link AsteriskQueue}.
 *
 * @param {AsteriskQueueEntry} entry the queue entry that joined.
 */
AsteriskServerListener.prototype.onNewQueueEntry = function (entry) {
};

