var auth = require('./oauthToken');
var queueEvent = require('./event').queueEvent;
var emptyEventQueue = require('./event').emptyEventQueue;
var Rx = require('rx');

const calendar = {
  auth: function({code, token, refreshToken}){
    return Rx.Observable.create((observer)=>{
      if (code){
        auth.getAuthFromCode(code).forEach((authClient)=>{
          observer.onNext(authClient);
        }, (err)=>observer.onErr(err));
      } else if(token, refreshToken){
        auth.getAuthFromToken(token, refreshToken).forEach((authClient)=>{
          observer.onNext(authClient);
        }, (err)=>observer.onError(err));
      } else{
        observer.onError('Must Authenticate Google Calendar with code or token.');
      }
    });
  },
  queueEvent: queueEvent,
  emptyEventQueue: emptyEventQueue
};

module.exports = calendar;
