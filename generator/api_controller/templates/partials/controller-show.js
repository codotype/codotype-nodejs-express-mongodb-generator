<%_ if (generate_api_doc) { _%>
/**
* @api {GET} /api/<%= schema.identifier_plural %>/:id Show
* @APIname Show
* @APIgroup <%= schema.class_name %> Controller
* @apidescription Fetch a single <%= schema.label %>
* @apiSuccess {json} The requested <%= schema.label %>
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// GET /api/<%= schema.identifier_plural %>/:id Show
<%_ } _%>
module.exports.show = async (req, res, next) => {
  const model = await <%= schema.class_name %>.findById(req.params.id)
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
  .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
  <%_ } _%>
  <%_ }) _%>
  .catch( err => next(boom.badImplementation(err)));

  return res
  .status(200)
  .send(model)
  .end();
};