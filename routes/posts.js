var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();
var pwd = require('pwd');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// requires a user to be logged in
function requireSession(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
}

// playlists Routes
// ---------------
router.get('/main', requireSession, function(req, res) {
  res.render('main', { title: 'Discover Bands From Here!', user: req.session.user, stylesheet: '/stylesheets/main.css' });
});

//NOTES FOR getting curated lists
////////////////////////////////////////////////////////////////////////////////
//The db is being searched to see if 

///////////////////////////////////////////////////////////////////////////////

// router.get('/newlist', function(req, res, next) {
//   console.log("newlist");
//   // db.list('bfh-curated').then(function(result) {
//   //   var playlists = [];
//   //   for (var i = 0; i < result.body.results.length; i++) {
//   //     if (("#citiesList").val() === result.body.city){
//   //     playlists.push(result.body.results[i].value)
//   //    }
//   //   }
//   //   res.send(playlists);
//   // })
// res.send('something');
// });

// router.post('/', requireSession, function(req, res, next) {
//   db.post('bfh-playlists', {
//     "title": req.body.title,
//     "author": req.body.author,
//     "timestamp": req.body.timestamp
//   }).then(function(result) {
//     console.log('Posted');
//   });
// });


router.get('/:username', requireSession, function(req, res, next) {
  console.log(req.params.username)
  console.log('%j',req.params.username)
  db.list('bfh-playlists').then(function(result) {
    var playlists = [];
    for (var i = 0; i < result.body.results.length; i++) {
      if (result.body.results[i].value.author === req.params.username) {
        playlists.push(result.body.results[i].value)
      }
    }
    res.send(JSON.stringify(playlists));
  });
});

module.exports = router;
