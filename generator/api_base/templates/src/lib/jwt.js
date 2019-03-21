const jwt = require('jsonwebtoken');

const {
  JWT_SECRET,
  JWT_EXPIRES,
  JWT_ISSUER,
  JWT_SUBJECT
} = process.env;

// // // //

// sign
// Signs a new JWT
// Used in /api/auth/auth.controller.js
module.exports.sign = (user) => {

  // Assembles JWT payload
  const jwt_payload = {
    id: user._id.toString(),
    email: user.email,
    admin: user.admin,
    role: user.role,
    iat: Date.now() // "Issued At"
  };

  // JWT Options
  // TODO - assign 'alg' to JWT options?
  const jwt_options = {
    expiresIn: JWT_EXPIRES,
    issuer: JWT_ISSUER,
    subject: JWT_SUBJECT
  };

  // Signs the webtoken and returns the result
  return jwt.sign(jwt_payload, JWT_SECRET, jwt_options);
};

// verify
// Verifies a JWT passed in with a request
// Used in /api/middleware/authorize.js
module.exports.verify = (token) => {
  return jwt.verify(token, JWT_SECRET, { ignoreExpiration: false });
};
