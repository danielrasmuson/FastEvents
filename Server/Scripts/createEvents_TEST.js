require('dotenv').load(); // load .env
var meetup = require('./meetup/meetup');
var calendar = require('./google/calendar/calendar');
var _ = require('lodash');
var date = require('./util/date');
var firebase = require('./firebase/firebase');
var htmlToText = require('html-to-text');
var Rx = require('rx');

function refreshUserEvents(USER_ID, maxEvents){
  return Rx.Observable.create((observer)=>{
    firebase.user(USER_ID).forEach(function(userData){
      const userLocation = userData.location();

      meetup.query({
          category: userData.meetupCategory(),
          lat: userLocation.lat,
          lon: userLocation.lon,
          radius: userData.eventRadius(),
          // time: daysToAdd+'d'
        }).forEach((events)=>{
          calendar.auth(userData.calendarToken()).forEach((auth)=>{
            // TODO if the datetime and invalid we should drop the request
              // TODO and log the result
            if (maxEvents){
              events = _.slice(events, 0, maxEvents);
            }

            events.forEach((event)=>{
              calendar.queueEvent({
                auth: auth,
                start: {
                  'dateTime': date.formatLocal(new Date(_.get(event, 'time'))),
                },
                end: {
                  'dateTime': date.formatLocal(new Date(_.get(event, 'time') + _.get(event, 'duration'))),
                },
                calendarId: userData.calendarId(),
                title: _.get(event, 'group.name'),
                description: 'LINK: ' + _.get(event, 'event_url') + '\n\n' + htmlToText.fromString(_.get(event, 'description'), {
                    wordwrap: 130
                  }),
                location: _.get(event, 'venue.address_1')+' '+_.get(event, 'venue.city'),
                attendees: [
                  {'email': userData.email()}
                ]
              });
            });

            // after all the events have been you can send the requests
            calendar.emptyEventQueue().forEach(()=>{
              observer.onNext('created an event!');
            }, function(err) {
              observer.onError('Google Calendar Error - Creating Events: '+JSON.stringify(err));
            }, function() {
              observer.onCompleted('done creating events');
            });


          });
        }, (err)=>observer.onError(err));

    });
  });
}

var USER_ID = '8b7a898d-6085-4fbe-80f9-958ebca0928e';
refreshUserEvents(USER_ID, 2).forEach(
  (next)=>console.log(next),
  (err)=>console.log(err),
  (completed)=>console.log(completed)
);