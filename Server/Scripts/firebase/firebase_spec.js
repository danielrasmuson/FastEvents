var firebase = require('./firebase');
require('dotenv').load(); // load .env

var USER_ID = '8b7a898d-6085-4fbe-80f9-958ebca0928e'

describe('firebase api', function () {
  it('should fetch user data', function (done) {
    firebase.user(USER_ID).forEach(function(userData){
      expect(userData).toBeDefined();
      expect(userData.calendarId()).toEqual('5hj6m57a6rt2muull7t62dka90');
      expect(userData.calendarToken()).toEqual('ya29.8AHTs7dtkKuLEWosmf21Bt_Tbvmppc9X97goBbKx63k87bj8wfNQ7tX6eZUDGPIwEXSd');
      expect(userData.location().address).toEqual('351 King St');
      expect(userData.email()).toEqual('dan123911@gmail.com');
      expect(userData.apiFilters().max_miles).toEqual(2);
      done();
    });
  });
});