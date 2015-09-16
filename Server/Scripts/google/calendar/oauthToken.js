var Rx = require('rx');
var getAuthClient = require('./oauthClient').getAuthClient;

function getAuthFromToken(token){
  return Rx.Observable.create(function(observer){
    getAuthClient().forEach(function(authClient){
      // TODO refresh_token: 'REFRESH TOKEN HERE'
      authClient.setCredentials({
        access_token: token
      });
      observer.onNext(authClient);
    })
  })
}

function getAuthFromCode(code){
  return Rx.Observable.create(function(observer){
    getAuthClient().forEach(function(authClient){
      authClient.getToken(code, function(err, token) {
        if (err) {
          observer.onError(err);
        } else{
          authClient.credentials = token;
          observer.onNext(authClient);
        }
      });
    })
  })
}

module.exports = {
  getAuthFromCode: getAuthFromCode,
  getAuthFromToken: getAuthFromToken
};
