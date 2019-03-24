const boom = require('boom')
const { getPaginationParams } = require('../../lib/pagination')
const <%= schema.class_name %> = require('./<%= schema.identifier %>.model')
<%- include('./partials/controller-dependencies.js') -%>

// // // //

<%_ if (schema.identifier === 'user') { _%>
<%- include('./partials/controller-user-profile.js') %>

<%_ } _%>
<%- include('./partials/controller-list.js') %>

<%- include('./partials/controller-create.js') %>

<%- include('./partials/controller-show.js') %>

<%- include('./partials/controller-api-actions.js') -%>
<%- include('./partials/controller-relation-actions.js') -%>

// // // //
// // // //
// // // //
<%- include('./partials/controller-reverse-relation-actions.js') -%>
// // // //
// // // //
// // // //

<%- include('./partials/controller-update.js') %>

<%- include('./partials/controller-destroy.js') %>