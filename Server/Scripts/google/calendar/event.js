var google = require('googleapis');
var Rx = require('rx');

function createEvent({auth, start, end, title, description, attendees, summary, location}) {
  return Rx.Observable.create((observer)=>{
    var calendar = google.calendar('v3');
    calendar.events.insert({
      auth: auth,
      calendarId: '5hj6m57a6rt2muull7t62dka90',
      resource: {
        start: start,
        end: end,
        summary: title,
        description: description,
        attendees: attendees,
        location: location
      }
    }, function(err, response) {
      if (err) {
        observer.onError(err);
      } else{
        observer.onNext(response);
      }
    });
  })
}


module.exports.createEvent = createEvent;
