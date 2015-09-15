var google = require('googleapis');

function createEvent({auth, start, end, title, description, attendees, summary}) {
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
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log(response)
  });
}


module.exports.createEvent = createEvent;
