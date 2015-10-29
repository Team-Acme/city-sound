var express = require('express');
var router = express.Router();var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
//do we need this?
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// // requires a user to be logged in
// function requireSession(req, res, next) {
//   if (!req.session.user) {
//     res.redirect('/');
//   } else {
//     next();
//   }
// }

//create register router.get route for hbs "create account" view and stylesheet

router.post('/', function(req, res, next) {
  var usernameAvailable = true;
  db.search('users', 'value.username: ' + req.body.username).then(function (result) {
    if (result.body.count > 0) {
      console.log('Username taken');
      res.redirect('/register');
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
