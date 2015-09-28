require('dotenv').load(); // load .env
var meetup = require('./meetup/meetup');
var calendar = require('./google/calendar/calendar');
var _ = require('lodash');

var htmlToText = require('html-to-text');

var TOKEN = "ya29._AHuZ9ZmC6byAwA0Dl4059M-1yxlRJ-m6FJ0SjvEVszHKK_pZBikBWwhfyPCrUxAAPK6";

function formatLocalDate(date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function(num) {
        var norm = Math.abs(Math.floor(num));
        return (norm < 10 ? '0' : '') + norm;
    };
  return date.getFullYear()
    + '-' + pad(date.getMonth()+1)
    + '-' + pad(date.getDate())
    + 'T' + pad(date.getHours())
    + ':' + pad(date.getMinutes())
    + ':' + pad(date.getSeconds())
    + dif + pad(tzo / 60)
    + ':' + pad(tzo % 60);
}

meetup.query({
    category: "34",
    lat: "37.775334",
    lon: "-122.394552",
    radius: "2"
    // time: "2w"
  }).forEach((events)=>{
  calendar.auth({token: TOKEN}).forEach((auth)=>{
    // TODO if the datetime and invalid we should drop the request
      // TODO and log the result
    events.forEach((event)=>{
      calendar.queueEvent({
        auth: auth,
        start: {
          'dateTime': formatLocalDate(new Date(_.get(event, 'time'))),
        },
        end: {
          'dateTime': formatLocalDate(new Date(_.get(event, 'time')+_.get(event, 'duration'))),
        },
        title: _.get(event, 'group.name'),
        description: "LINK: "+_.get(event, 'event_url')+"\n\n"+htmlToText.fromString(_.get(event, 'description'), {
            wordwrap: 130
          }),
        location: _.get(event, 'venue.address_1')+" "+_.get(event, 'venue.city'),
        attendees: [
          {'email': 'dan123911@gmail.com'}
        ]
      })
    })
  })

  // after all the events have been you can send the requests
  calendar.emptyEventQueue().forEach((createdEvent)=>{
    console.log('created an event!');
  }, function(err) {
    console.log('creating a google calendar threw an error: ', err);
  }, function() {
    console.log('done creating events');
  })

})
