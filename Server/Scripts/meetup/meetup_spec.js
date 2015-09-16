require('dotenv').load(); // load .env
var meetup = require('./meetup');

fdescribe('meetup wrapper', ()=>{
  fit('should fetch events', (done)=>{
    // meetup.query();
    meetup.get().forEach((events)=>{
      expect(events.length).toBeGreaterThan(0);
      done();
    }, (err)=>{
      console.log(error)
      done();
    });
  })
})
