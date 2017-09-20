const Ratings = require('../../server/controllers/ratings.js');
const dbUtils = require('../../db/lib/utils.js');
const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;

describe('Rating model tests', () => {
  before(done => {
    dbUtils.rollbackMigrate(done);
  });

  after(done => {
    dbUtils.rollback(done);
  });

  xit('should be able to create a rating', (done) => {
    var req = httpMocks.createRequest();
    var res = httpMocks.createResponse();

    res.send = (data) => {
      req.body.id = data.attributes.id;

      expect(data).to.be.an('object');
      expect(data.attributes).to.be.an('object');
      expect(data.attributes).to.deep.equal(req.body);

      done();
    };

    req.body = {
      user_id: 1,
      trainer_id: 1,
      user_rating: 5,
      trainer_rating: 5,
    };

    Ratings.create(req, res);
  });

  xit('should be able to update a rating', (done) => {
    var req = httpMocks.createRequest();
    var res = httpMocks.createResponse();

    res.send = (data) => {
      expect(data).to.be.an('object');
      expect(data.attributes).to.be.an('object');
      expect(data.attributes.id).to.equal(req.body.id);
      expect(data.attributes.user_rating).to.equal(req.body.user_rating);
      expect(data.attributes.trainer_rating).to.equal(req.body.trainer_rating);

      done();
    };

    req.body = {
      id: 1,
      user_rating: 2,
      trainer_rating: 2
    };

    Ratings.update(req, res);
  });

  it('should be able to get ratings', (done) => {
    var req = httpMocks.createRequest();
    var res = httpMocks.createResponse();

    res.send = (data) => {
      expect(data).to.be.an('object');
      expect(data.models).to.be.an('array');
      expect(data.models[0]).to.be.an('object');
      expect(data.models[0].id).to.equal(1);

      done();
    };

    req.query = {
      id: 1
    };

    Ratings.get(req, res);
  });

  it('should be able to delete a rating', (done) => {
    var req = httpMocks.createRequest();
    var res = httpMocks.createResponse();

    res.send = (data) => {
      expect(data).to.be.an('string');
      expect(data).to.equal('OK');

      done();
    };

    req.query = {
      id: 1
    };

    Ratings.delete(req, res);
  });
});