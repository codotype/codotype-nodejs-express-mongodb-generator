<%_ schema.reverse_relations.forEach((rel) => { _%>
<%_ if (rel.type === RELATION_TYPE_BELONGS_TO) { _%>
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