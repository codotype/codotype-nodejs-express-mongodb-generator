<%_ if (generate_api_doc) { _%>
/**
* @api {POST} /api/<%= schema.identifier_plural %> Create
* @APIname Create
* @APIgroup <%= schema.class_name %> Controller
* @apidescription Creates a new <%= schema.label %>
* @apiSuccess {json} The newly created <%= schema.label %>
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// POST /api/<%= schema.identifier_plural %>/:id Create
<%_ } _%>
module.exports.create = async (req, res, next) => {
  <%_ if (schema.identifier !== 'user') { _%>

  // Pulls values from req.body
  const { <%= objectKeys.join(', ') %> } = req.body

  try {

    // Creates new <%= schema.class_name %> instance
    const newModel = new <%= schema.class_name %>({
      <%= objectKeys.join(',\n      ') %>
    })

    // Saves new <%= schema.class_name %> instance
    await newModel.save()

    // Sends new <%= schema.class_name %> to client
    return res
    .status(200)
    .send(newModel)
    .end();
  } catch (err) {
    return next(boom.badImplementation(err));
  }
  <%_ } else { _%>
    // Pulls parameters from req.body
    const { <%= inlineDeconstruction %> } = req.body

    // Create a new User instance if one does not exist
    const create = (user) => {
      // User exists - throw error and return
      if (user) {
        throw new Error('User exists')
        return
      }

      // Defines a default password
      // TODO - this is pretty terrible and should be changed...
      const password = Math.random.toString()

      // Creates a new User
      const newUser = new User({
        <%= objectKeys.join(',\n      ') %>,
        password
      })

      // Saves the new User
      return newUser.save()
    }

    // Respond to the client
    const respond = (user) => {
      res.json({
        message: 'Registered Successfully.'
      })
    }

    // Handle error (email exists)
    const onError = (error) => {
      res.status(409).json({
        message: error.message
      })
    }

    // check email duplication
    User.findOne({ email })
    .then(create)
    .then(respond)
    .catch(onError)
  <%_ } _%>
};