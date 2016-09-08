process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

describe('Comments', function() {
  
  var server = require('../server');
  beforeEach(function(done) {
    done();
  });
  afterEach(function(done) {
    done();
  });

  it('should return 200 /health GET', function(done) {
    chai.request(server)
      .get('/health')
      .end(function(err, res){
        console.log(err);
        res.should.have.status(200);
        done();
      });
  });

  it('should list ALL comments on /api/comments GET', function testGetComments(done) {
    chai.request(server)
      .get('/api/comments')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

  it('should add a SINGLE comment on /api/comments POST', function testPostComment(done) {
    chai.request(server)
      .post('/api/comments')
      .send({'author': 'authorX', 'text': 'textX'})
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

});