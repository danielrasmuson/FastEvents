var Rx = require('rx');
var googleAuth = require('google-auth-library');
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
module.exports.getAuthClient = function get(callback) {
  return Rx.Observable.create(function(observer){
    var clientSecret = process.env.CLIENT_SECRET;
    var clientId = process.env.CLIENT_ID;
    var redirectUrl = process.env.REDIRECT_URL;
    var auth = new googleAuth();
    observer.next(new auth.OAuth2(clientId, clientSecret, redirectUrl));
  });
}
