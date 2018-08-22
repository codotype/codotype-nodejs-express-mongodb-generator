const app = require('../../app');
const request = require('supertest');

const API_ROOT = '/api/<%= schema.identifier_plural %>'

describe('<%= schema.label %> API', () => {

    describe('GET /api/<%= schema.identifier_plural %>', () => {
        it('should respond with JSON object', (done) => {
            request(app)
            .get(API_ROOT)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
        });
    });

    describe('POST /api/<%= schema.identifier_plural %>', () => {
        it('should respond with JSON object', (done) => {
            request(app)
            .post(API_ROOT)
            .send({
                <%_ schema.attributes.forEach((attr, index) => { _%>
                <%= attr.identifier %>: '<%= attr.default_value %>'<%= helpers.trailingComma(schema.attributes, index) %>
                <%_ }) _%>
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
        });
    });

    describe('GET /api/<%= schema.identifier_plural %>/:id', () => {
        it('should respond with JSON object', (done) => {
            request(app)
            .get(API_ROOT + '/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
        });
    });

    describe('PUT /api/<%= schema.identifier_plural %>/:id', () => {
        it('should respond with JSON object', (done) => {
            request(app)
            .put(API_ROOT + '/1')
            .send({
                <%_ schema.attributes.forEach((attr, index) => { _%>
                <%= attr.identifier %>: '<%= attr.default_value %>'<%= helpers.trailingComma(schema.attributes, index) %>
                <%_ }) _%>
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
        });
    });

});
