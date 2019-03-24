<%_ let relationImports = [] _%>
<%_ schema.relations.forEach((relation) => { _%>
<%_ if (relation.schema.class_name !== schema.class_name && !relationImports.includes(relation.schema.class_name)) { _%>
<%_ relationImports.push(relation.schema.class_name) _%>
const <%= relation.schema.class_name %> = require('../<%= relation.schema.identifier %>/<%= relation.schema.identifier %>.model')
<%_ } _%>
<%_ }) _%>
<%_ schema.reverse_relations.forEach((relation) => { _%>
<%_ if (relation.schema.class_name !== schema.class_name && !relationImports.includes(relation.schema.class_name)) { _%>
<%_ relationImports.push(relation.schema.class_name) _%>
const <%= relation.schema.class_name %> = require('../<%= relation.schema.identifier %>/<%= relation.schema.identifier %>.model')
<%_ } _%>
<%_ }) _%>