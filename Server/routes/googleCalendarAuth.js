var express = require('express');
var router = express.Router();
var getAuthFromCode = require('../Scripts/google/calendar/oauthToken').getAuthFromCode;

/* GET users listing. */
router.get('/', function(req, res, next) {

  if (!req.query.code){
    res.send('Error: Code Not Provided');
    return;
  }

  getAuthFromCode(req.query.code)
    .forEach(function(auth){
      res.send(auth.credentials);
    })

});

module.exports = router;
