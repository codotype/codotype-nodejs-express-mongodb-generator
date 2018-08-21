const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

// // // //

// Password encryption helper function
function encryptPassword (password) {
    return crypto.createHmac('sha1', process.env.PASSWORD_ENCRYPTION_SECRET)
        .update(password)
        .digest('base64')
}

// // // //

// User Schema definition
// TODO - generator must add additional attributes
// TODO - User should store unique `salt` attribute for encrypting passwords
const User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        // TODO - email validation
    },
    password: {
        type: String,
        required: true
    },
    password_reset_token: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [String],
        default: []
    }
})

// Create new User document
// TODO - add email
User.statics.create = function ({ email, username, password }) {

    // Instantiates new User model
    const user = new this({
        email,
        username,
        password: encryptPassword(password)
    })

    // Return User.save() Promise
    return user.save()
}

// findOneByUsername
// Find one User by username
User.statics.findOneByUsername = function (username) {
    // Executes MongoDb query
    return this.findOne({ username }).exec()
}

// verify
// Verifies the password parameter of POST /auth/login requests
User.methods.verify = function (password) {
    // Verifies saved password against a request's password
    return this.password === encryptPassword(password)
}

// assignAdmin
// Assigns admin priviledges to a user
User.methods.assignAdmin = function () {
    // Assigns true to `admin` attribute
    this.admin = true

    // Returns `save` Promise
    return this.save()
}

// // // //

module.exports = mongoose.model('User', User)
