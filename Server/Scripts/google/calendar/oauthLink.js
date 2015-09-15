var Rx = require('rx');
var getAuthClient = require('./oauthClient').getAuthClient
var SCOPES = ['https://www.googleapis.com/auth/calendar'];

function getAuthUrl(){
  return Rx.Observable.create(function(observer){
    getAuthClient().forEach(function(client){
      var authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });
      observer.next(authUrl);
    });
  })
}

module.exports = {
  getAuthUrl: getAuthUrl
}
