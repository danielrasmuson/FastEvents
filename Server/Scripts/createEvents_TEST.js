require('dotenv').load(); // load .env
var meetup = require('./meetup/meetup');
var calendar = require('./google/calendar/event');
var _ = require('lodash');
var getAuthFromToken = require('./google/calendar/oauthToken').getAuthFromToken;

var htmlToText = require('html-to-text');

// todo
// make calendar.auth({token: token}) work
// but also calendar.auth({code: code}) work

var TOKEN = "ya29.8AHJxws9KS3POtZA9FjZ7Uw7cu3BltcZhTAsAQzOHKa11D0YkOPx5abUiVV93p0Swjs_oA";

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
  getAuthFromToken(TOKEN).forEach((auth)=>{
    _.slice(events, 0, 2).forEach((event)=>{
      console.log(_.get(event, 'event_url'));
      console.log(_.get(event, 'group.group_lat'));
      console.log(_.get(event, 'group.group_lon'));
      console.log();
      calendar.createEvent({
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
      }).forEach(function(success){
        console.log('event created');
      },(err)=>{
        console.log(err);
      })
    })
  })
})
