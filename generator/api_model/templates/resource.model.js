const mongoose = require('mongoose')

// // // //

const <%= schema.identifier %>_attributes = {
  <%- helpers.indent(include('./partials/resource-attributes.js'), 2) %>
}

<%- include('./partials/resource-collection-options.js') %>

const <%= schema.class_name %>Model = new mongoose.Schema(<%= schema.identifier %>_attributes, collection_options);

// // // //

<%- include('./partials/resource-relation-methods.js') %>

// // // //

module.exports = mongoose.model('<%= schema.class_name %>', <%= schema.class_name %>Model)
