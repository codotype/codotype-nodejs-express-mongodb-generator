const router = require('express').Router()
const controller = require('./auth.controller')
const { requireAuthenticated } = require('../middleware/authorization')


// // // //

// POST /register
router.post('/register', controller.register)

// POST /login
router.post('/login', controller.login)

// POST /forgot_password
router.post('/forgot_password', controller.forgot_password)

// POST /reset_password
router.post('/reset_password', controller.reset_password)

// // // //

module.exports = router
