require('dotenv').load(); // load .env
var getAuthFromCode = require('./oauthToken').getAuthFromCode
var getAuthFromToken = require('./oauthToken').getAuthFromToken

describe('oauthToken fetch', function(){
  it('should error when I provide a improper code', function(done){
    // I'm not sure how to get a valid code everytime without manually click yes
    var INVALID_CODE = 'aaaaa';
    getAuthFromCode(INVALID_CODE)
      .forEach(function(){}, function(err){
        expect(err.code).toEqual(400)
        done();
      })
  })

  it('should provide an auth object with a token', function(done){
    // I'm not sure how to get a valid code everytime without manually click yes
    var INVALID_TOKEN = 'bbbbb';
    getAuthFromToken(INVALID_TOKEN)
      .forEach(function(auth){
        expect(auth.credentials.access_token).toEqual('bbbbb');
        done();
      })
  })

})
