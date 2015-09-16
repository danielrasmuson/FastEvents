require('dotenv').load(); // load .env
var meetup = require('./meetup/meetup');
var calendar = require('./google/calendar/event');
var _ = require('lodash');
var getAuthFromToken = require('./google/calendar/oauthToken').getAuthFromToken;

// todo
// make calendar.auth({token: token}) work
// but also calendar.auth({code: code}) work

// getAuthFromToken(INVALID_TOKEN)
//   .forEach(function(auth){
//     expect(auth.credentials.access_token).toEqual('bbbbb');
//     done();
//   })
var TOKEN = "ya29.8AEz5nkn1qYRxdc9zMY7dDvv7xKrr1A-WM00Lo0wBc1OLeLGoEGhLtJq5P_uB-_GtiWfcQ";

meetup.query({category: "34"}).forEach((events)=>{
  // only doing the first 10 events for now
  getAuthFromToken(TOKEN).forEach((auth)=>{
    _.slice(events, 0, 3).forEach((event)=>{
      console.log(event)
      calendar.createEvent({
        auth: auth,
        start: {
          'dateTime': '2015-09-15T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles',
        },
        end: {
          'dateTime': '2015-09-15T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles',
        },
        title: event.group.name,
        description: event.description,
        attendees: [
          {'email': 'dan123911@gmail.com'}
        ]
      }).forEach(function(success){
        console.log(success);
      },(err)=>{
        console.log(err);
      })
    })
  })
})
