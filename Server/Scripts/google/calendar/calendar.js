var auth = require('./oauthToken');
var createEvent = require('./event').createEvent;
var Rx = require('rx');

const calendar = {
  auth: function({code, token}){
    return Rx.Observable.create((observer)=>{
      if (code){
        auth.getAuthFromCode(code).forEach((authClient)=>{
          observer.onNext(authClient);
        })
      } else if(token){
        auth.getAuthFromToken(token).forEach((authClient)=>{
          observer.onNext(authClient);
        })
      } else{
        observer.onError('Must Authenticate Google Calendar with code or token.');
      }
    })
  },
  createEvent: createEvent
}

module.exports = calendar
