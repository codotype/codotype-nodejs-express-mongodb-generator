module.exports = {
  name: 'NodeExpressController',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Pulls `generate_api_doc` from configuration.options
    // Used to conditionally generate APIDoc headers
    const { generate_api_doc } = configuration.documentation

    // Pulls schema api_actions
    let schemaApiActions = []
    if (configuration.api_actions && configuration.api_actions[schema.identifier]) {
      schemaApiActions = configuration.api_actions[schema.identifier]
    }

    // Defines the schema-specific destination
    let resourceDest = 'src/api/' + schema.identifier

    // Ensures the presence of the directory
    await this.ensureDir(resourceDest)

    // Deconstructs schema attributes
    let defaultModel = this.buildDefault({ schema, schemas: blueprint.schemas })
    // TODO - might be helpful to abstract into util, or parent generator?
    let inlineDeconstruction = Object.keys(defaultModel).join(', ')
    let objectKeys = Object.keys(defaultModel)

    // src/api/resource/resource.controller.js
    await this.renderComponent({
      src: 'resource.controller.js',
      dest: resourceDest + '/' + schema.identifier + '.controller.js',
      data: { schema, generate_api_doc, schemaApiActions, inlineDeconstruction, objectKeys }
    });

    // src/api/resource/index.js
    await this.renderComponent({
      src: 'resource.router.js',
      dest: resourceDest + '/index.js',
      data: { schema, schemaApiActions }
    });

  }

};
