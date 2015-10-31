var express = require('express');
var router = express.Router();var bodyParser = require('body-parser');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));


//create register router.get route for hbs "create account" view and stylesheet


router.post('/', function(req, res, next) {
  //var usernameAvailable = true;
  db.search('users', 'value.username: ' + req.body.username).then(function (result) {
    if (result.body.count > 0) {
      console.log('Username taken');
      //res.redirect('/register');
    } else {
      db.post('users', {
        "username": req.body.username,
        "password": req.body.password,
      }).then(function(result) {
        console.log('Created User Successfully');
        res.redirect('/');
      })
    }
  }).fail(function(err) {
    res.send(err);
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
