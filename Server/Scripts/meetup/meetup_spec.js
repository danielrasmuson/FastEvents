require('dotenv').load(); // load .env
var meetup = require('./meetup');

fdescribe('meetup wrapper', ()=>{
  fit('should fetch events', (done)=>{
    // meetup.query();
    meetup.get().forEach((result)=>{
      console.log(result)
      expect('a').toEqual('b');
      done();
    }, (err)=>{
      console.log(error)
      done();
    });
  })
})
