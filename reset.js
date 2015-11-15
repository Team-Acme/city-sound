var config = require('./config');
var orch = require('orchestrate');
var db = orch(config.dbkey);

db.deleteCollection('bfh-users').then(function() {
  db.post('bfh-users', {
    username:'Anastasia',
    password:'harken',
  }).then(function(result) {
    console.log('User created with id: ' + result.path.key);
  });

  db.post('bfh-users', {
    username:'Elizabeth',
    password:'catlady',
  }).then(function(result) {
    console.log('User created with id: ' + result.path.key);
  });

  db.post('bfh-users', {
    username:'Chad',
    password:'1',
  }).then(function(result) {
    console.log('User created with id: ' + result.path.key);
  });


  db.post('bfh-users', {
    username:'Molly',
    password:'2',
  }).then(function(result) {
    console.log('User created with id: ' + result.path.key);
  });
});


db.deleteCollection('bfh-playlists').then(function() {
  db.post('bfh-playlists', {  
    title:'Portland',
    author:'Anastasia',
    url:''
  }).then(function(result) {
    console.log('Post created with id: ' + result.path.key);
  });

  db.post('bfh-playlists', {
    title:'Cleveland',
    author:'Elizabeth',
    url:''
  }).then(function(result) {
    console.log('Post created with id: ' + result.path.key);
  });

    db.post('bfh-playlists', {
    title:'Sacramento',
    author:'Molly',
    url: ''
  }).then(function(result) {
    console.log('Post created with id: ' + result.path.key);
  });

    db.post('bfh-playlists', {
    title:'Minneapolis',
    author:'Chad',
    url: ''
  }).then(function(result) {
    console.log('Post created with id: ' + result.path.key);
  }); 
});