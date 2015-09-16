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
var TOKEN = "ya29.8AGJOxda09p0FfGDZHpmutS_v1cbPTa4BmX7PAs9Fz8OPWjlKxGaVVYhD5nMKKdJ1zMRWQ";

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
  // only doing the first 10 events for now
  getAuthFromToken(TOKEN).forEach((auth)=>{
    _.slice(events, 0, 3).forEach((event)=>{
      console.log(event.group.event_url);
      console.log(event.group.group_lat);
      console.log(event.group.group_lon);
      console.log();
      calendar.createEvent({
        auth: auth,
        start: {
          'dateTime': formatLocalDate(new Date(event.time)),
        },
        end: {
          'dateTime': formatLocalDate(new Date(event.time+event.duration)),
        },
        title: event.group.name,
        description: event.description,
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
