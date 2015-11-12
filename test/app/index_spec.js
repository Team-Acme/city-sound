//test/app/index_spec.js
var request = require('supertest-session');
var app = require('../../app');

describe('GET /', function () {
  it('shows up', function (done) {
    request(app).get('/')
      .expect(200)
      .end(done);
  });
});
