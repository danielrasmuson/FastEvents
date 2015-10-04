require('dotenv').load(); // load .env
var queueEvent = require('./event').queueEvent;
var emptyEventQueue = require('./event').emptyEventQueue;
var getAuthFromToken = require('./oauthToken').getAuthFromToken;

fdescribe('google calendar event', function() {
  fit('should create an event', function(done) {
    // you have to manually update this token
    getAuthFromToken('ya29._AHuZ9ZmC6byAwA0Dl4059M-1yxlRJ-m6FJ0SjvEVszHKK_pZBikBWwhfyPCrUxAAPK6')
      .forEach(function(auth) {
        queueEvent({
          auth,
          start: {
              'dateTime': '2015-09-15T09:00:00-07:00',
              'timeZone': 'America/Los_Angeles',
            },
            end: {
              'dateTime': '2015-09-15T17:00:00-07:00',
              'timeZone': 'America/Los_Angeles',
            },
            title: 'hello',
            description: 'A chance to hear more about Google\'s developer products.',
            attendees: [{
              'email': 'dan123911@gmail.com'
            }]
        })

        emptyEventQueue().forEach(function(createdEvent) {
          expect(createdEvent).toBeDefined();
        }, function(err) {
          expect('creating a google calendar threw an error: ', err).toEqual('');
          expect(err).not.toBeDefined()
        }, function(allCreatedEvents) {
          done();
        })

      })
  })
})