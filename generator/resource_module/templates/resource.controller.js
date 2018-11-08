const boom = require('boom')
const <%= schema.class_name %> = require('./<%= schema.identifier %>.model')
<%_ let relationImports = [] _%>
<%_ schema.relations.forEach((relation) => { _%>
<%_ if (relation.schema.class_name !== schema.class_name && !relationImports.includes(relation.schema.class_name)) { _%>
<%_ relationImports.push(relation.schema.class_name) _%>
const <%= relation.schema.class_name %> = require('../<%= relation.schema.identifier %>/<%= relation.schema.identifier %>.model')
<%_ } _%>
<%_ }) _%>

// // // //

// Default pagination options
function getPaginationParams (req) {
    let page = Number(req.query.page) || 0;
    let per_page = Number(req.query.per_page) || 10;
    let offset = per_page * page;
    return { page, per_page, offset }
}

<%_ if (schema.identifier === 'user') { _%>
<%_ if (generate_api_doc) { _%>
/**
* @api {get} /api/<%= schema.identifier_plural %> Profile
* @APIname Profile
* @APIgroup <%= schema.class_name %> Controller
* @apidescription Gets profile of the current <%= schema.label %>
* @apiSuccess {json} User's profile
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// GET /api/<%= schema.identifier_plural %> Profile
<%_ } _%>
exports.profile = (req, res) => {
    return <%= schema.class_name %>.findOne({ username: req.user.username }, '-password -__v').exec()
    .then( (user) => { res.json(user) })
}
<%_ } _%>

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
module.exports.list = (req, res, next) => {
    // Gets pagination variables for query
    const { page, per_page, offset } = getPaginationParams(req);

    return <%= schema.class_name %>
    .find({})
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
    .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } _%>
    <%_ }) _%>
    .limit(per_page)
    .skip(offset)
    .lean()
    .exec()
    .then((response) => {
        return res
        .status(200)
        .json({
          page: page,
          per_page: per_page,
          items: response
        });
    })
    .catch( err => next(boom.badImplementation(err)) );
};



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
module.exports.search = (req, res) => {
    // Gets pagination variables for query
    const { page, per_page, offset } = getPaginationParams(req);

    // Assigns query for search
    // let query = req.query.search || ''

    // Ensures correct type casting for query
    // if (query.year) {
    //   query.year['$in'] = _.map(query.year['$in'], (yr) => { return Number(yr) })
    // }

    <%_ if (schema.attributes.filter(attr => attr.datatype === 'TEXT').length) { _%>

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

    return <%= schema.class_name %>.find(query)
    .limit(per_page)
    .skip(offset)
    .lean()
    .exec()
    .then((items) => {
        return res
        .status(200)
        .json({ page, per_page, count: 100, items })
    })
    .catch( err => next(boom.badImplementation(err)) );
};




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
module.exports.create = (req, res, next) => {
    <%_ if (schema.identifier === 'user') { _%>
    return User.create(req.body)
    <%_ } else { _%>
    return new <%= schema.class_name %>(req.body).save()
    <%_ } _%>
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

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
module.exports.show = (req, res, next) => {
    return <%= schema.class_name %>.findById(req.params.id)
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
    .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
    // .populate({ path: '<%= rel.alias.identifier_plural %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } _%>
    <%_ }) _%>
    .then((response) => {
        return res
        .status(200)
        .send(response)
        // .send(response.toJSON({ getters: true, virtuals: true }))
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

<%_ schema.relations.forEach((rel) => { _%>
<%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
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
module.exports.show<%= rel.alias.class_name %> = (req, res, next) => {
    return <%= schema.class_name %>.findById(req.params.id)
    .then((<%= schema.identifier %>) => {

        return <%= rel.schema.class_name %>.findById(<%= schema.identifier %>.<%= rel.alias.identifier + '_id' %>)
        <%_ let relatedSchema = blueprint.schemas.find(s => s._id === rel.related_schema_id) _%>
        <%_ relatedSchema.relations.forEach((rel) => { _%>
        <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
        .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
        <%_ } _%>
        <%_ }) _%>
        .then((<%= rel.schema.identifier %>) => {
            return res
            .status(200)
            .send(<%= rel.schema.identifier %>)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );

    })
    .catch( err => next(boom.badImplementation(err)) );
};

<% } else if (rel.type === 'HAS_MANY') { %>
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
module.exports.show<%= rel.alias.class_name_plural %> = (req, res, next) => {

    return <%= schema.class_name %>.findById(req.params.id)
    .then((response) => {
        return <%= rel.schema.class_name %>
        .find({ _id: response.<%= rel.alias.identifier %>_ids })
        <%_ let relatedSchema = blueprint.schemas.find(s => rel.related_schema_id) _%>
        <%_ relatedSchema.relations.forEach((rel) => { _%>
        <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
        .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
        <%_ } _%>
        <%_ }) _%>
        .then((<%= rel.schema.identifier_plural %>) => {
            return res
            .status(200)
            .send(<%= rel.schema.identifier_plural %>)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );
    })
    .catch( err => next(boom.badImplementation(err)) );

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
    <%_ let relatedSchema = blueprint.schemas.find(s => s._id === rel.related_schema_id) _%>
    <%_ relatedSchema.relations.forEach((rel) => { _%>
    <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
    .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } _%>
    <%_ }) _%>
    .then((<%= rel.schema.identifier_plural %>) => {
        return res
        .status(200)
        .send(<%= rel.schema.identifier_plural %>)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
<%_ } _%>
<%_ }) _%>

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
    return <%= schema.class_name %>.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

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
    .catch( err => next(boom.badImplementation(err)) );
};
