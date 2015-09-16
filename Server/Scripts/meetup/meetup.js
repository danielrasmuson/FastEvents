var Rx = require('rx');
var request = require('request');

function get(){
  return Rx.Observable.create((observer)=>{
    request({
      url: "https://api.meetup.com/2/open_events",
      qs: {
        key: "6720864a1f1e3e49586f3e4c212a47",
        category: "34"
      }
    }, function(err, res, body){
        if (err){
          observer.onError(err);
        } else{
          observer.onNext(JSON.parse(body).results);
        }
      }
    )
  })
}

module.exports = {
  get: get
}
