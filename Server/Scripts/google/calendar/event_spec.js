require('dotenv').load(); // load .env
var createEvent = require('./event').createEvent;
var getAuthFromToken = require('./oauthToken').getAuthFromToken;

describe('google calendar event', function(){
 it('should create an event', function(done){
   // you have to manually update this token
   getAuthFromToken('ya29.7wG2rfcLHPJJ5GX2zGcNCVaE_gjSmMo-lpe9GrCE2btrp13AlEM_4CETgm9kb-7-tQiryQ')
     .forEach(function(auth){
       createEvent({
         auth,
         start: {
          'dateTime': '2015-09-15T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles',
         },
         end: {
          'dateTime': '2015-09-15T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles',
         },
         title: 'hello',
         description: 'A chance to hear more about Google\'s developer products.',
         attendees: [
          {'email': 'dan123911@gmail.com'}
         ]
       });
       done();
     })
 })
})
