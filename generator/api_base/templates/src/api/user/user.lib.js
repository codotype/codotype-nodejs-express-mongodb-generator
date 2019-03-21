const crypto = require('crypto')

// Crypto library variables
const defaultIterations = 10000;
const defaultKeyLength = 64;
const defaultDigest = 'sha512';
const byteSize = 16

// // // //

// TODO - document
const encryptPassword = (password, salt) => {

  // TOOD - throw error here?
  if (!password || !salt) { return null; }

  const saltBuf = new Buffer(salt, 'base64');

  return crypto.pbkdf2Sync(password, saltBuf, defaultIterations, defaultKeyLength, defaultDigest).toString('base64');
}

// TODO - document
const validatePresenceOf = (value) => {
  return !!value && !!value.length;
}

// Helper function for validating emails
module.exports.validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
}

// TODO - document
module.exports.verifyPassword = function (password) {
  const encryptedPassword = encryptPassword(password, this.salt)
  return this.password === encryptedPassword
}

// Return true if the reset token is valid for this user
module.exports.validateResetToken = function (token) {
  return this.password_reset_token === token && new Date() < this.password_reset_expiration
}

// Generates password_reset_expiration & password_reset_token
module.exports.generatePasswordResetToken = function () {

  // Creates a random password reset token for the user
  const passwordResetToken = crypto.randomBytes(12).toString('hex')

  // Calculates tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Assigns user password reset variables
  this.password_reset_expiration = tomorrow;
  this.password_reset_token = passwordResetToken;

  // Saves the user model, returns a Promise
  return this.save()
}

// // // //

// TODO - document, test
module.exports.setHashedPassword = function (next) {

  // Handle new/update passwords
  if (!this.isModified('password')) {
    return next();
  }

  // TODO - DOCUMENT
  if (!validatePresenceOf(this.password)) {
    next(new Error('Invalid password'));
  }

  // Generates user.salt
  // TODO - DOCUMENT MORE
  this.salt = crypto.randomBytes(byteSize).toString('base64')

  // TODO - DOCUMENT
  const hashedPassword = encryptPassword(this.password, this.salt)

  // TODO - DOCUMENT
  this.password = hashedPassword;

  // Continues to remaining middleware
  next();
}

// // // //

module.exports.encryptPassword = encryptPassword
module.exports.validatePresenceOf = validatePresenceOf
