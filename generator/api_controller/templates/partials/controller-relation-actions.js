<%_ schema.relations.forEach((rel) => { _%>
<%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
<%_ if (generate_api_doc) { _%>
/**
* @api {GET} /api/<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier %> show<%= rel.alias.class_name %>
* @APIname show<%= rel.alias.class_name %>
* @APIgroup <%= schema.class_name %> Controller
* @apidescription Gets related <%= rel.alias.label %>
* @apiSuccess {json} The related <%= rel.schema.label %> model
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// GET /api/<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier %> show<%= rel.alias.class_name %>
<%_ } _%>
module.exports.show<%= rel.alias.class_name %> = async (req, res, next) => {
  const <%= schema.identifier %> = await <%= schema.class_name %>.findById(req.params.id)
  .catch( err => next(boom.badImplementation(err)));

  const <%= rel.schema.identifier %> = await <%= rel.schema.class_name %>.findById(<%= schema.identifier %>.<%= rel.alias.identifier + '_id' %>)
  <%_ let relatedSchema = blueprint.schemas.find(s => s.id === rel.related_schema_id) _%>
  <%_ relatedSchema.relations.forEach((rel) => { _%>
  <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
  .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
  <%_ } _%>
  <%_ }) _%>
  .catch( err => next(boom.badImplementation(err)));

  return res
  .status(200)
  .send(<%= rel.schema.identifier %>)
  .end();

};

<% } else if (rel.type === RELATION_TYPE_HAS_MANY) { %>
<%_ if (generate_api_doc) { _%>
/**
* @api {GET} /api/<%= schema.identifier_plural %>/:id/<%= rel.schema.identifier_plural %> show<%= rel.schema.class_name_plural %>
* @APIname show<%= rel.schema.class_name_plural %>
* @APIgroup <%= schema.class_name %> Controller
* @apidescription Gets related <%= rel.schema.class_name_plural %>
* @apiSuccess {json} The related <%= rel.schema.class_name_plural %>
* @apiError (Error) 500 Internal server error
*/
// TODO - this must be refactored to do: RelatedModel.find({ _id: [1,2,3] })
<%_ } else { _%>
// GET /api/<%= schema.identifier_plural %>/:id/<%= rel.schema.identifier_plural %> show<%= rel.schema.class_name_plural %>
<%_ } _%>
module.exports.show<%= rel.alias.class_name_plural %> = async (req, res, next) => {

  const model = await <%= schema.class_name %>.findById(req.params.id)
  .catch( err => next(boom.badImplementation(err)));

  const <%= rel.schema.identifier_plural %> = await <%= rel.schema.class_name %>
  .find({ _id: model.<%= rel.alias.identifier %>_ids })
  <%_ let relatedSchema = blueprint.schemas.find(s => rel.related_schema_id) _%>
  <%_ relatedSchema.relations.forEach((rel) => { _%>
  <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
  .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
  <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
  // .populate({ path: '<%= rel.alias.identifier_plural %>', select: '<%= rel.related_lead_attribute %>' }) // CODOTYPE-NOTE - OPTIONAL
  <%_ } _%>
  <%_ }) _%>
  .catch( err => next(boom.badImplementation(err)));

  return res
  .status(200)
  .send(<%= rel.schema.identifier_plural %>)
  .end();

};

<%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
<%_ if (generate_api_doc) { _%>
/**
* @api {GET} /api/<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier_plural %> show<%= rel.alias.class_name_plural %>
* @APIname show<%= rel.alias.class_name_plural %>
* @APIgroup <%= schema.class_name %> Controller
* @apidescription Gets related <%= rel.alias.class_name_plural %>
* @apiSuccess {json} The related <%= rel.schema.class_name_plural %> models
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// GET /api/<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier_plural %> show<%= rel.alias.class_name_plural %>
<%_ } _%>
module.exports.show<%= rel.alias.class_name_plural %> = (req, res, next) => {
    return <%= rel.schema.class_name %>
    .find({ <%= rel.reverse_alias.identifier %>_id: req.params.id })
    <%_ let relatedSchema = blueprint.schemas.find(s => s.id === rel.related_schema_id) _%>
    <%_ relatedSchema.relations.forEach((rel) => { _%>
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } _%>
    <%_ }) _%>
    .then((<%= rel.schema.identifier_plural %>) => {
        return res
        .status(200)
        .send(<%= rel.schema.identifier_plural %>)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)));
};

<%_ } _%>
<%_ }) _%>