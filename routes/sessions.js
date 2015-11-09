var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

function loggedIn(req, res, next) {
  if (req.session.user) {
    res.redirect('/posts/main');
  } else {
    next();
  }
}

//NOTES FOR session routes
////////////////////////////////////////////////////////////////////////////////
//The "login.hbs" renders at "/"
//When users enter username and password and push login the db serches usernames
//If username and password match in db, the '/posts/main'

///////////////////////////////////////////////////////////////////////////////

router.get('/', loggedIn, function(req, res, next) {
  res.render('login', { stylesheet: '/stylesheets/login.css' });
});

router.post('/', function(req, res, next) {
  db.search('bfh-users', 'value.username: ' + req.body.username).then(function (result) {
    if (result.body.results[0].value.password === req.body.password) {
      console.log("this is password:" + result.body.results[0].value.password);
      console.log("this is password:" + req.body.password);
      req.session.user = result.body.results[0].value;
      req.session.key = result.body.results[0].path.key;
      res.redirect('/posts/main');
      res.render('main', { user: req.session.user, stylesheet: '/stylesheets/bootstrap.min.css' });
    } else if (value.username === '' && value.password === '') {
          console.log(value.username);
          res.render('login', { stylesheet: '/stylesheets/login.css' });
          alert('Please enter a username and password, or create an account');
        } else if (value.username === '') {
          alert('Please enter a username, or create an account');
        } else if (value.password === '') {
          alert('Please enter a password, or create an account');
        }else{
      console.log('Username or password incorrect');
      res.render('login', { stylesheet: '/stylesheets/login.css' });
    }
  }).fail(function(err) {
    res.send(err);
  })
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) res.send(err);
  })
});

module.exports = router;
