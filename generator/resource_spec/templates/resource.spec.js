const app = require('../../app');
const request = require('supertest');

describe('<%= schema.label %> API', function() {

    describe('GET /api/<%= schema.identifier_plural %>', function() {
        it('should respond with JSON object', function(done) {
            request(app)
            .get('/api/<%= schema.identifier_plural %>')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
        });
    });

});
