var google = require('googleapis'),
    Rx = require('rx'),
    _ = require('lodash'),
    queueEventRequests = [];

function queueEvent({auth, start, end, title, description, attendees, summary, location}) {
  queueEventRequests.push(Rx.Observable.create((observer)=>{
    var calendar = google.calendar('v3');
    calendar.events.insert({
      auth: auth,
      // calendarId: '5hj6m57a6rt2muull7t62dka90',
      calendarId: 'dan123911@gmail.com',
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
  }))
}

function emptyEventQueue(){
  return Rx.Observable.create(function(observer){
    var eventGroups = _.chunk(queueEventRequests, 5);
    eventGroups.forEach(function(eventGroup, groupIndex){
      setTimeout(function(){
        eventGroup.forEach(function(request, requestIndex){
          function isLastRequest(){
            return (requestIndex+1 == eventGroup.length && groupIndex+1 == eventGroups.length);
          }
          request.forEach(function(status){
            observer.onNext(status);
            isLastRequest() ? observer.onCompleted() : null;
          }, function(err){
            observer.onError(err);
            isLastRequest() ? observer.onCompleted() : null;
          })
        })
      }, groupIndex*1000)
    })
  });
}

module.exports = {
  queueEvent: queueEvent,
  emptyEventQueue: emptyEventQueue
};
