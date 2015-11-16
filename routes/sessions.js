var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();
var pwd = require('pwd');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


function loggedIn(req, res, next) {
  if (req.session.user) {
    res.redirect('/posts/main');
  } else {
    next();
  }
}

// requires a user to be logged in
function requireSession(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
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
    console.log("user found");
    console.log(req.body.username);
    console.log(result.body.results);
    var storedhash = result.body.results[0].value.password;
    var salt = result.body.results[0].value.salt;
    pwd.hash(req.body.password, salt, function(err, hash){
      if (err){
        console.log(err);
      }
      if (storedhash === hash) {
        console.log("this is successful");
        req.session.user = result.body.results[0].value;
        req.session.key = result.body.results[0].path.key;
        res.redirect('/posts/main');
        //res.render('main', { user: req.session.user, stylesheet: '/stylesheets/bootstrap.min.css' });
      } else {
        console.log('Username or password incorrect');
        res.render('login', { stylesheet: '/stylesheets/login.css' });
      }
    })
  }).fail(function(err) {
    console.log(err);
    res.redirect('/');
  })
  });

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    console.log('req.session: ', req.session)
    if (err) res.send(err);
  })
});

//------------------------------------------------
router.post('/newlist', function(req, res, next) {

  //City name from data sent from client
  var thisCity = req.body.city
  var viewResponse = [];

  db.list('bfh-curated').then(function(result) {
    for (var i = 0; i < result.body.results.length; i++) {
      if(thisCity == result.body.results[i].value.city){
          viewResponse.push(result.body.results[i].value);
          // console.log("Playlist id's for " + thisCity + ": " + viewResponse);
      }
    }
        console.log(viewResponse);
        res.send({viewResponse: viewResponse});

  })
  // console.log('viewResponse', viewResponse);
});


//---------------------------------------------------

router.post('/savelist', requireSession, function(req, res, next) {
   console.log("heard /savelist on the router");
  db.post('bfh-playlists', {
    "title": req.body.title,
    "author": req.body.author,
    "url": req.body.url
  }).then(function(result) {
    console.log('Posted');
  });
});



// router.get('/:username', requireSession, function(req, res, next) {
//   db.list('bfh-playlists').then(function(result) {
//     var playlists = [];
//     for (var i = 0; i < result.body.results.length; i++) {
//       if (result.body.results[i].value.author === req.params.username) {
//         playlists.push(result.body.results[i].value)
//       }
//     }
//     res.send(playlists)
//   });
// });


module.exports = router;
