// docs
// https://www.firebase.com/docs/rest/api/

// python -m SimpleHTTPServer 8000  

// https://www.npmjs.com/package/request

var request = require('request');
var DOMAIN = "https://fastevents.firebaseio.com/";

function user(uid){
  return Rx.Observable.create((observer)=>{
    request.get(DOMAIN+ 'users/' + uid + '.json', function(err, response, body){
      observer.onNext(JSON.parse(body));
      observer.onCompleted();
    });
  });
}

module.exports = {
  user: user
}