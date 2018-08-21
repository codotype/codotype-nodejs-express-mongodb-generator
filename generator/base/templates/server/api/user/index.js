const router = require('express').Router()
const controller = require('./user.controller')
const authorization = require('../middleware/authorization')

// // // //

router.use(authorization)
router.get('/', controller.list)
router.get('/profile', controller.profile)
// router.post('/:username/assign_admin', controller.assignAdmin)

// // // //

module.exports = router
