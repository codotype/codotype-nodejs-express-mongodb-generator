const router = require('express').Router()

// // // //

// Bootstrap API module routers
router.use('/auth', require('./api/auth'))
<%_ blueprint.schemas.forEach((schema) => { _%>
router.use('/<%= schema.identifier_plural %>', require('./api/<%= schema.identifier %>'))
<%_ }) _%>

// // // //

module.exports = router
