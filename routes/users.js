var express = require('express');
var router = express.Router();var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();

/////////////////////////////////////////////////////////////////////
//REQUIRES USER TO BE LOGGED IN
/////////////////////////////////////////////////////////////////////

function requireSession(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
}

/////////////////////////////////////////////////////////////////////
//ROUTE FOR APP AS A WHOLE
/////////////////////////////////////////////////////////////////////

router.get('/', function(req, res) {
  res.render('main', { title: '', stylesheet: '/stylesheets/bootstrap.min.css' });
});

/////////////////////////////////////////////////////////////////////
//ROUTE TO SAVE NEW PLAYLIST
/////////////////////////////////////////////////////////////////////

router.post('/', requireSession, function(req, res, next) {
  db.post('bfh-playlists', {
    "title": req.body.title,
    "timestamp": req.body.timestamp //NOTES: add timestamp function somewhere
  }).then(function(result) {
    console.log('Playlist Saved');
  });
});


//////////////////////////////////////////////////////////////////////
//CREATE USER ACCT ROUTE
//////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////
//PULL UP PLAYLISTS ROUTE
//////////////////////////////////////////////////////////////////////

router.get('/:username', requireSession, function(req, res, next) {
  db.list('bfh-playlists').then(function(result) {
    var userPlaylists = [];
    for (var i = 0; i < result.body.results.length; i++) {
      if (result.body.results[i].value.playListUser === req.params.username) {
        //NOTE: Verify user logged in is owner of playlist (find replacement for author)
        //the if statement above is checking the playListUser in the model to the user
        //logged in (we hope)
        userPlaylists.push(result.body.results[i].value)
      }
    }
    res.send(userPlaylists);
  });
});

//////////////////////////////////////////////////////////////////////
//LOGIN ROUTE
//////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////
//LOGOUT ROUTE
//////////////////////////////////////////////////////////////////////

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
