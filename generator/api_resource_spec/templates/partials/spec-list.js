describe('GET /api/<%= schema.identifier_plural %>', () => {
  it('authenticated request should respond with JSON object', (done) => {
    request(app)
    .get(API_ROOT)
    .set('authorization', JWT_HEADER)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.instanceof(Object);
      done();
    });
  });

  it('unauthenticated request should respond with 403 forbidden', (done) => {
    request(app)
    .get(API_ROOT)
    .expect(401)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.instanceof(Object);
      done();
    });
  });
});