const AsteriskServerEvents = {
    Connected: Symbol('astConnected'),

    BeforeInitialized: Symbol('astBeforeInitialized'),
    Initialized: Symbol('astInitialized'),


    ReInitialized: Symbol('astReInitialized'),
    BeforeReInitialized: Symbol('astBeforeReInitialized'),

    /*    NewAgent: 'astNewAgent',
     NewAsteriskChannel: 'astNewAsteriskChannel',
     NewMeetMeUser: 'astNewMeetMeUser',
     NewQueueEntry: 'astNewQueueEntry',

     NewDevice: 'astNewDevice',
     NewBridge: 'astNewBridge',
     NewPeer: 'astNewPeer',
     NewDahdi: 'astNewDahdi'*/
};
module.exports = AsteriskServerEvents;
