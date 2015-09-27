// docs
// https://www.firebase.com/docs/rest/api/

// python -m SimpleHTTPServer 8000  

// https://www.npmjs.com/package/request

var request = require('request');
var DOMAIN = "https://fastevents.firebaseio.com/";

function getUserData(uid, cb){
  request.get(DOMAIN+ 'users/' + uid + '.json', function(err, response, body){
    cb(JSON.parse(body));
  });
}

getUserData('8b7a898d-6085-4fbe-80f9-958ebca0928e', function(userData){
  console.log(userData)
});

