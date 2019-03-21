const jwt = require('../src/lib/jwt');

// // // //

// TODO - this should be the USER MOCK?
const JWT_PAYLOAD = {
  _id: 12345,
  email: 'john@doe.com',
  admin: true,
  role: 'USER'
};

// TODO - this should be another USER MOCK?
const JWT_PAYLOAD_ALT = {
  _id: 12345,
  email: 'jane@doe.com',
  admin: false,
  role: 'USER'
};

// JWT_HEADER - valid, signed JSON Web Token that's
// used while testing API endpoints that require authorization
const JWT_HEADER = 'JWT ' + jwt.sign(JWT_PAYLOAD);
const JWT_HEADER_ALT = 'JWT ' + jwt.sign(JWT_PAYLOAD_ALT);

// // // //

module.exports = {
  JWT_PAYLOAD,
  JWT_HEADER,
  JWT_HEADER_ALT
}
