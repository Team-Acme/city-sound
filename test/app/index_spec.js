//test/app/index_spec.js
var request = require('supertest-session');
var app = require('../../app');

describe('GET /', function() {
  it('shows up', function (done) {
    request(app).get('/users/register')
    .expect(200)
    .end(done)
  });
});

describe('GET /', function () {
  it('shows up', function (done) {
    request(app).get('/')
      .expect(200)
      .end(done);
  });
});

var config = require('../configtest');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var pwd = require('pwd');

var TEST_USERNAME = 'someuser';
var TEST_PASSWORD = 'somepassword';

function createTestUser (username, password, callback) {
  pwd.hash(password, function (err, salt, hash) {
    if (err) {
      return callback(err);
    }
    var testRecord = {
      username: username,
      password: hash,
      salt: salt
    };;
    db.post('bfh-users', testRecord)
    .then(function() {console.log('inside then'); callback(); })
    .fail(function (err) {console.log('inside fail'); callback(err); });
  });
}

describe ('POST /', function () {
  this.timeout(15000);
  beforeEach(function(done) {
    createTestUser(TEST_USERNAME, TEST_PASSWORD, done);
  });

  afterEach(function (done) {
    removeTestUser(TEST_USERNAME, done);
    // db.remove('bfh-users', {'value.username': TEST_USERNAME}, true)
    // .then(function() { done(); })
    // .fail(function (err) { done(err); });
  });

  it('shows up', function (done) {
    request(app).post('/')
    .type('form')
    .send({ username: TEST_USERNAME, password: TEST_PASSWORD })
    .expect('Location', '/posts/main')
    .end(done);
  });
});

function removeTestUser (username, callback) {
  db.search('bfh-users', 'value.username: ' + username)
  .then(function (result) {
    var key = result.body.results[0].path.key;
    console.log(result.body.results);
    db.remove('bfh-users', key)
    .then(function () { callback(); })
    .fail(callback);
  })
  .fail(callback);
};
