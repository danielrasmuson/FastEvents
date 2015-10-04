// docs
// https://www.firebase.com/docs/rest/api/

// python -m SimpleHTTPServer 8000  

// https://www.npmjs.com/package/request

var request = require('request');
var DOMAIN = "https://fastevents.firebaseio.com/";
var Rx = require('rx');

function user(uid){
  return Rx.Observable.create((observer)=>{
    request.get(DOMAIN+ 'users/' + uid + '.json', function(err, response, body){
      observer.onNext(new User(JSON.parse(body)));
      observer.onCompleted();
    });
  });
}

function User(firebaseObj) {
  this.user = firebaseObj;
  
  this.calendarId = function() {
    return this.user.calendar.google.calendar_id;
  };
  this.calendarToken = function() {
    const tokenData = this.user.calendar.google.token;
    return {token: tokenData.access_token, refreshToken: tokenData.refresh_token};
  };
  this.location = function() {
    return this.user.location;
  };
  this.email = function() {
    return this.user.email;
  };
  this.meetupCategory = function() {
    return Object.keys(this.user.event_preferences.meetup.categories)[0];
  }; 
  this.eventRadius = function() {
    return this.user.event_preferences.max_miles;
  }; 
}

module.exports = {
  user: user
}