require('dotenv').load(); // load .env
var getAuthUrl = require('./oauthLink').getAuthUrl

fdescribe('google calendar integration', function(){
  fit('should provide a link for me', function(done){
    getAuthUrl().forEach(function(url){
      var OAUTH_URL = "https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=1011069552027-p8olaid6s9fvcc5dht3mqa0mu8o412kk.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fgooglecalendar%2Fauth";
      expect(url).toEqual(OAUTH_URL);
      done();
    })
  })
})
