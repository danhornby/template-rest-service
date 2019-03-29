const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
var server = require('../index.js')

describe('GET /', function () {
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

describe('GET /status/', function () {
  after('After the end we ll close', function () {
    console.log("Last Test so now closing server.");
    server.close();
  });
  it('should return OK status', function () {
    return request(server)
      .get('/status/')
      .then(function (response) {
        assert.equal(response.status, 200)
      });
  });
  it('should return metadata messages on rendering', function () {
    return request(server)
      .get('/status/')
      .then(function (response) {
        expect(response.text).to.contain('version');
        expect(response.text).to.contain('description');
      });
  });
  it('should return lastcommitsha message on rendering', function () {
    return request(server)
      .get('/status/')
      .then(function (response) {
        expect(response.text).to.contain('lastcommitsha');
      });
  });
});