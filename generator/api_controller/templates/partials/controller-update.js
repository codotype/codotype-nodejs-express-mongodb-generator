<%_ if (generate_api_doc) { _%>
/**
* @api {PUT} /api/<%= schema.identifier_plural %>/:id Update
* @APIname Update
* @APIgroup <%= schema.class_name %> Controller
* @apidescription Update a single <%= schema.label %>
* @apiSuccess {json} The updated <%= schema.label %>
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// PUT /api/<%= schema.identifier_plural %>/:id Update
<%_ } _%>
module.exports.update = (req, res, next) => {

  // Pulls values from req.body
  const { <%= objectKeys.join(', ') %> } = req.body

  return <%= schema.class_name %>.findByIdAndUpdate(req.params.id, { $set: {
    <%= objectKeys.join(',\n      ') %>
  }}, { new: true })
  .then((response) => {
    return res
    .status(200)
    .send(response)
    .end();
  })
  // .catch( err => next(boom.badImplementation(err)));
};