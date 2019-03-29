const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');


describe('GET /', function () {
  before('Before the first test we ll start', function() {
    console.log('Before the first test start the web server.')
    var server = require('../index.js');
  });
  it('should return OK status', function () {
    return request(server)
      .get('/')
      .then(function (response) {
        assert.equal(response.status, 200)
      });
  });
  it('should return message on rendering', function () {
    return request(server)
      .get('/')
      .then(function (response) {
        expect(response.text).to.contain('Hello World');
      });
  });
});

describe('GET /status', function () {
  after('After the end we ll close', function () {
    console.log('After last test so closing web server.');
    server.close();
  });
  it('should return OK status', function () {
    return request(server)
      .get('/status')
      .then(function (response) {
        assert.equal(response.status, 200)
      });
  });
  it('should return metadata messages on rendering', function () {
    return request(server)
      .get('/status')
      .then(function (response) {
        expect(response.text).to.contain('version');
        expect(response.text).to.contain('description');
      });
  });
  it('should return lastcommitsha message on rendering', function () {
    return request(server)
      .get('/status')
      .then(function (response) {
        expect(response.text).to.contain('lastcommitsha');
      });
  });
});