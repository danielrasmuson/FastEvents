// var Rx = require('rx');
var request = require('request');

function get(){
  return Rx.Observable.create((observer)=>{
    request.get(
      "https://api.meetup.com/2/open_events?key=6720864a1f1e3e49586f3e4c212a47&category=34",
      function(err, res){
        if (err){
          observer.onError(err);
        } else{
          observer.onNext(res);
        }
      }
    )
  })
}

module.exports = {
  get: get
}
