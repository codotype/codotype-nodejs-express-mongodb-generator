<%_ if (generate_api_doc) { _%>
/**
* @api {get} /api/<%= schema.identifier_plural %>/search Search
* @apiName search
* @apiGroup <%= schema.class_name %> Controller
* @apiDescription Gets a list of <%= schema.label_plural %> that match a search query
* @apiPermission authenticated
* @apiSuccess {Collection} root Collection of <%= schema.label %> records
* @apiError (500) UnknownException Could not retrieve <%= schema.label %> collection
*/
<%_ } else { _%>
// GET /api/<%= schema.identifier_plural %>/search Search
<%_ } _%>
module.exports.search = async (req, res) => {

  // Assigns query for search
  // let query = req.query.search || ''

  // Ensures correct type casting for query
  // if (query.year) {
  //   query.year['$in'] = _.map(query.year['$in'], (yr) => { return Number(yr) })
  // }

  // TODO - this feels sloppy....
  <%_ if (schema.attributes.filter(attr => [DATATYPE_STRING, DATATYPE_TEXT].includes(attr.datatype)).length) { _%>

  let textSearch = req.query.search || ''

  const matchQuery = [
    <%_ schema.attributes.forEach((attr) => { _%>
    <%_ if (attr.datatype !== 'TEXT') { return } _%>
    { <%= attr.identifier _%>: new RegExp(textSearch, 'i') },
    <%_ }) _%>
  ]

  // Assigns matchQuery to queryObject
  // query = {}
  // query['$and'] = [
  //     { '$or': matchQuery }
  // ]

  const query = { '$or': matchQuery }
  <%_ } else { _%>
  const query = {}
  <%_ } _%>

  // Gets pagination variables for query
  const { page, per_page, offset } = getPaginationParams(req);

  // NOTE - the `countDocuments` operation is another call to MongoDB
  // This can be potentially expensive, you may want to remove it
  // It's currently included so pagination functions correctly on the front-end
  const count = await <%= schema.class_name %>.countDocuments(query)

  const <%= schema.identifier_plural %> = <%= schema.class_name %>.find(query)
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