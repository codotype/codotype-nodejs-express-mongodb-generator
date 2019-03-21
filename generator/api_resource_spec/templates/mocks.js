
<%_ blueprint.schemas.forEach((schema) => { _%>
const build<%= schema.class_name %> = () => {
  return Object.assign({}, {
    <%_ if (schema.identifier === 'user') { _%>
    password: 'RANDOM-PASSWORD-' + Math.random().toString(),
    role: 'RANDOM-ROLE',
    admin: false,
    email: 'johndoe-' + Math.random().toString() + '@doe.com',
    <%_ } _%>
    <%_ schema.attributes.forEach((attr, index) => { _%>
    <%_ if (schema.identifier === 'user' && attr.identifier === 'email') { _%>
    <%_ return _%>
    <%_ } else if (attr.datatype === DATATYPE_STRING) { _%>
    <%= attr.identifier %>: 'STRING-' + Math.random().toString(),
    <%_ } else if (attr.datatype === DATATYPE_TEXT) { _%>
    <%= attr.identifier %>: 'TEXT-' + Math.random().toString(),
    <%_ } else if (attr.datatype === DATATYPE_STRING_ARRAY) { _%>
    <%= attr.identifier %>: [],
    <%_ } else if (attr.datatype === DATATYPE_STRING_SELECT) { _%>
    <%= attr.identifier %>: [],
    <%_ } else if (attr.datatype === DATATYPE_INTEGER) { _%>
    <%= attr.identifier %>: 0,
    <%_ } else if (attr.datatype === DATATYPE_FLOAT) { _%>
    <%= attr.identifier %>: 0.0,
    <%_ } else if (attr.datatype === DATATYPE_DOUBLE) { _%>
    <%= attr.identifier %>: 0.00,
    <%_ } else if (attr.datatype === DATATYPE_BOOLEAN) { _%>
    <%= attr.identifier %>: false,
    <%_ } else if (attr.datatype === DATATYPE_JSON) { _%>
    <%= attr.identifier %>: {},
    <%_ } else if (attr.datatype === DATATYPE_DATE) { _%>
    <%= attr.identifier %>: '2019-03-11',
    <%_ } else if (attr.datatype === DATATYPE_TIME) { _%>
    <%= attr.identifier %>: '17:04:14 GMT-0400',
    <%_ } else if (attr.datatype === DATATYPE_DATETIME) { _%>
    <%= attr.identifier %>: '3/18/2019, 5:04:51 PM',
    <%_ } _%>
    <%_ }) _%>
    <%_ schema.relations.forEach((rel, index) => { _%>
    <%_ if (rel.type === RELATION_TYPE_BELONGS_TO) { _%>
    <%= rel.alias.identifier %>_id: null,
    <%_ } else if (rel.type === RELATION_TYPE_HAS_ONE) { _%>
    <%= rel.alias.identifier %>_id: null,
    <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
    <%= rel.alias.identifier %>_ids: [],
    <%_ } _%>
    <%_ }) _%>
  })
}

<%_ }) _%>

// // // //

module.exports = {
  <%_ blueprint.schemas.forEach((schema) => { _%>
  build<%= schema.class_name %>,
  <%_ }) _%>
}
