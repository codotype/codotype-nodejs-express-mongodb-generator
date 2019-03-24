<%_ if (generate_api_doc) { _%>
/**
* @api {get} /api/<%= schema.identifier_plural %> Index
* @APIname Index
* @APIgroup <%= schema.class_name %> Controller
* @apidescription Gets list of current <%= schema.label_plural %>
* @apiSuccess {json} Collection of <%= schema.label_plural %>
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// GET /api/<%= schema.identifier_plural %>/:id Index
<%_ } _%>
module.exports.list = async (req, res, next) => {
  // Gets pagination variables for query
  const { page, per_page, offset } = getPaginationParams(req);

  // NOTE - the `countDocuments` operation is another call to MongoDB
  // This can be potentially expensive, you may want to remove it
  // It's currently included so pagination functions correctly on the front-end
  const count = await <%= schema.class_name %>.countDocuments({})

  <%= schema.class_name %>.find({})
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
  .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
  <%_ } _%>
  <%_ }) _%>
  .limit(per_page)
  .skip(offset)
  .lean()
  .exec()
  .then((<%= schema.identifier_plural %>) => {
    return res
    .status(200)
    .json({
      page: page,
      per_page: per_page,
      items: <%= schema.identifier_plural %>,
      count: count
    });
  })
  // .catch((err) => { return next(boom.badImplementation(err)); })

};