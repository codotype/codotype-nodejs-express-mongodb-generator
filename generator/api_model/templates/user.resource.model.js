const mongoose = require('mongoose')
const {
  validateEmail,
  generatePasswordResetToken,
  validateResetToken,
  verifyPassword,
  setHashedPassword
} = require('./user.lib')

// // // //

const userAttributes = {
  email: {
    type: String,
    index: true,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  salt: {
    type: String,
    required: true,
    select: false
  },
  password_reset_token: {
    type: String,
    select: false
  },
  password_reset_expiration: {
    type: Date,
    select: false
  },
  admin: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    required: true,
    default: 'USER'
  },
  <%- helpers.indent(include('./partials/resource-attributes.js'), 2) %>
}

<%- include('./partials/resource-collection-options.js') %>

const <%= schema.class_name %>Model = new mongoose.Schema(userAttributes, collection_options);

// // // //

// findOneByEmail
// Find one User by email
UserModel.statics.findOneByEmail = function (email) {
  return this.findOne({ email })
  .select('_id email admin role password salt password_reset_token password_reset_expiration')
  .exec()
}

// verifyPassword
// Verifies the password parameter of POST /auth/login requests
UserModel.method('verifyPassword', verifyPassword)

// Return true if the reset token is valid for this user
UserModel.method('validateResetToken', validateResetToken)

// Generates password_reset_expiration & password_reset_token
UserModel.method('generatePasswordResetToken', generatePasswordResetToken)

// TODO - document & test
UserModel.pre('validate', setHashedPassword)

// assignAdmin
// Assigns admin priviledges to a user
UserModel.method('assignAdmin', function () {
  this.admin = true
  return this.save()
})

// // // //

<%- include('./partials/resource-relation-methods.js') %>

// // // //

module.exports = mongoose.model('<%= schema.class_name %>', <%= schema.class_name %>Model)
