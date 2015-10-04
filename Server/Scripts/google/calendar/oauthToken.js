var Rx = require('rx');
var getAuthClient = require('./oauthClient').getAuthClient;

function getAuthFromToken(token, refreshToken){
  return Rx.Observable.create(function(observer){
    getAuthClient().forEach(function(authClient){
      authClient.setCredentials({
        access_token: token,
        refresh_token: refreshToken
      });
      authClient.refreshAccessToken(function(err, tokens) {
        if (err){
          observer.onError(err);
        } else{
          authClient.setCredentials(tokens);
          observer.onNext(authClient);
          observer.onCompleted();
        }
      });
    });
  });
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
          observer.onCompleted();
        }
      });
    });
  });
}

module.exports = {
  getAuthFromCode: getAuthFromCode,
  getAuthFromToken: getAuthFromToken
};
