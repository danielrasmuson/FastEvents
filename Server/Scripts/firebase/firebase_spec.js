var firebase = require('./firebase');
require('dotenv').load(); // load .env

var USER_ID = '8b7a898d-6085-4fbe-80f9-958ebca0928e'

describe('firebase api', function () {
  it('should fetch user data', function (done) {
    firebase.user(USER_ID).forEach(function(userData){
      expect(userData).toBeDefined();
      expect(userData.email).toEqual('dan123911@gmail.com');
      done();
    });
  });
});