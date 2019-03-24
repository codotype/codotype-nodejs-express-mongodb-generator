const app = require('../../app');
const request = require('supertest');
const <%= schema.class_name %> = require('./<%= schema.identifier %>.model')
const { JWT_HEADER } = require('../../../test/utils');
const { build<%= schema.class_name %> } = require('../../../test/mocks');

const API_ROOT = '/api/<%= schema.identifier_plural %>'

describe('<%= schema.label %> API', () => {

  <%- helpers.indent(include('./partials/spec-list.js'), 2) %>

  <%_ if (schema.identifier !== 'user') { _%>
  <%- helpers.indent(include('./partials/spec-create.js'), 2) %>
  <%- helpers.indent(include('./partials/spec-update.js'), 2) %>
  <%_ } _%>

  <%- helpers.indent(include('./partials/spec-show.js'), 2) %>

  <%- helpers.indent(include('./partials/spec-destroy.js'), 2) %>

  <%- helpers.indent(include('./partials/spec-relation-actions.js'), 2) %>

  // // // //
  <%- helpers.indent(include('./partials/spec-reverse-relation-actions.js'), 2) %>
  // // // //

});
