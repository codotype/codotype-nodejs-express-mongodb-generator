<%_ if (generate_api_doc) { _%>
/**
* @api {DELETE} /api/<%= schema.identifier_plural %>/:id Destroy
* @APIname Destroy
* @APIgroup <%= schema.class_name %> Controller
* @apidescription Destroy a single <%= schema.label %>
* @apiSuccess {json} The destroyed <%= schema.label %>
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// DELETE /api/<%= schema.identifier_plural %>/:id Destroy
<%_ } _%>
module.exports.delete = (req, res, next) => {
  return <%= schema.class_name %>.remove({ _id: req.params.id })
  .then((response) => {
    return res
    .status(200)
    .send(response)
    .end();
  })
  .catch( err => next(boom.badImplementation(err)));
};
