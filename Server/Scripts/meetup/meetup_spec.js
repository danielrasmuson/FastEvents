require('dotenv').load(); // load .env
var meetup = require('./meetup');

describe('meetup wrapper', ()=>{
  it('should fetch events', (done)=>{
    // meetup.query();
    meetup.query({category: "34"}).forEach((events)=>{
      expect(events.length).toBeGreaterThan(0);
      done();
    }, (err)=>{
      expect(err).toBeUndefined();
      done();
    });
  })
})
