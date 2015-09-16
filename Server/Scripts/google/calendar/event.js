var google = require('googleapis');

function createEvent({auth, start, end, title, description, attendees, summary}) {
  return Rx.Observable.create((observer)=>{
    var calendar = google.calendar('v3');
    calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: {
        start: start,
        end: end,
        summary: title,
        description: description,
        attendees: attendees
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
