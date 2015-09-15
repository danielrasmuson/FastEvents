require('dotenv').load(); // load .env
var getAuthClient = require('./oauthClient').getAuthClient

describe('OauthClient', function(){
  it('should return a new authClient', function(done){
    getAuthClient().forEach(function(client){
      expect(client.clientId_).toBeDefined();
      expect(client.clientSecret_).toBeDefined();
      expect(client.redirectUri_).toBeDefined();
      done();
    })
  })
})
