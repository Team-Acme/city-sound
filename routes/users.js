var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var router = express.Router();
var pwd = require('pwd');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// requires a user to be logged in
function requireSession(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
}
//NOTES FOR user routes
////////////////////////////////////////////////////////////////////////////////
// When someone pushes "Sign Up " on the client ('/'), they are taken to '/register'
// Users enter their username and password and then push "Submit"
// The db searches for the username entered, if it is, user is redirected to '/register'
// If the username is not found, the username and password are posted to 'bfh-users'
// users are the redirected to ('/') to sign-in with their new username & password

///////////////////////////////////////////////////////////////////////////////

router.get('/register', function(req, res, next) {
  res.render('register', { stylesheet: '/stylesheets/register_edit.css' });
});

router.post('/', function(req, res, next) {
  var usernameAvailable = true;
  db.search('bfh-users', 'value.username: ' + req.body.username).then(function (result) {
    if (result.body.count > 0) {
      console.log('Username taken');
      res.redirect('/register');
    } else {
      pwd.hash(req.body.password, function(err, salt, hash) {
        console.log(hash);
      var id = db.post('bfh-users',{
        "username": req.body.username,
        "password": hash,
        "salt": salt
      })
        .then(function(result) {
        console.log('Created User Successfully');
        res.redirect('/');
      })
     });   
    }
  }).fail(function(err) {
    res.redirect('/');
    // res.send(err);
  });
});

// stores username and password hash/salt in db, then calls mailer
//   database('person').where({
//     email: email
//   }).then(function(result) {
//     if (result.length !== 0) {
//       console.error('Email address in use!');
//       response.redirect('/login'); // we'll want error codes for this
//     } else {
//       bcrypt.hash(password, 12, function(err, hash) {
//         var id = database('person').insert({ 
//           email: email, 
//           hash: hash })
//           .returning('id') // required for psql
//           // generate nonce & send confirmation email
//           .then(function(id) {
//             mailer({ email: email, nonce: nonce, id: id });
//             response.redirect('/newuser');
//           });
//       });
//     }
//   });
// });
// ​

  ////////////////////////////////////////////////////////////////////////////////
  // Will use this edit user route once all other routes are working

  ///////////////////////////////////////////////////////////////////////////////

// router.get('/:id/edit', requireSession, function(req, res, next) {
//   res.render('edit-user', { title: 'Edit User', stylesheet: '/stylesheets/register_edit.css' });
// });

// router.put('/:id/edit', requireSession, function(req, res, next) {
//   db.put('bfh-users', req.params.id, {
//     "username": req.body.username,
//     "password": req.body.password
//   }).then(function(result) {
//     req.session.user = {"username": req.body.username,
//     "password": req.body.password};
//     console.log('Edited User');
//     res.redirect('/posts/main');
//   });
// });


module.exports = router;

