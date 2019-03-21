const jwt = require('../../lib/jwt')

// // // //

// Authorization middleware - rejects requests
// with missing, invalid, or expired tokens.
module.exports.requireAuthenticated = function (req, res, next) {

  // Isolates token
  let token = req.headers.authorization;

  // Reject requests without token
  if (!token) {

    // Returns 'missing token' message
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Authorization token missing.' }));
    return;

  }

  // Reject tokens with incorrect format
  else if (token.indexOf('JWT ') != 0) {

    // Returns 'invalid token' message
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid authorization token.' }));
    return;

  }

  // Assigns req.user
  else {

    try {
      // Isolates Token from 'JWT ' prefix
      token = token.split('JWT ')[1];
      req.user = jwt.verify(token)
    } catch (err) {
      // 401 Unauthorized
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid token format.' }));
      return;
    }

    // Continue through this middleware to the original request
    next();
  }

};

// Rejects requests for non-admin users without the specified role
module.exports.requireRole = function (requiredRole) {

  // Returns middleware function to check required role
  const checkRole = (req, res, next) => {

    // Reject requests from non-admin users
    if (!req.user.admin && req.user.role !== requiredRole) {

      // Returns 'missing token' message
      return res.status(401).json({ error: 'You are not authorized for this API endpoint' });

    }

    // Continue through this middleware to the original request
    next();
    return;
  }

  // Returns checkRole function
  return checkRole
};

// Rejects requests for non-admin users
module.exports.requireAdmin = function (req, res, next) {

  // Reject requests from non-admin users
  // Returns 'missing token' message
  if (!req.user.admin) {
    return res.status(401).json({ error: 'You are not authorized for this API endpoint' });
  }

  // Continue through this middleware to the original request
  next();
  return;

};
