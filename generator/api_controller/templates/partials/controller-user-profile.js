<%_ if (generate_api_doc) { _%>
/**
* @api {get} /api/<%= schema.identifier_plural %>/profile Profile
* @APIname Profile
* @APIgroup <%= schema.class_name %> Controller
* @apidescription Gets profile of the current <%= schema.label %>
* @apiSuccess {json} User's profile
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// GET /api/<%= schema.identifier_plural %>/profile Profile
<%_ } _%>
exports.profile = async (req, res) => {
  const user = await <%= schema.class_name %>.findOne({ email: req.user.email }, '-__v').exec()
  if (user) { return res.json(user) }
  return res.status(401).json({ message: 'No user found' })
}