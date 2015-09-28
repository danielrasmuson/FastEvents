var auth = require('./oauthToken');
var queueEvent = require('./event').queueEvent;
var emptyEventQueue = require('./event').emptyEventQueue;
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
  queueEvent: queueEvent,
  emptyEventQueue: emptyEventQueue
}

module.exports = calendar
