module.exports = {
  name: 'NodeExpressResources',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Pulls `generate_api_doc` from configuration.options
    // Used to conditionally generate APIDoc headers
    const { generate_api_doc } = configuration.options

    // Defines the schema-specific destination
    let resourceDest = 'server/api/' + schema.identifier

    // Ensures the presence of the directory
    await this.ensureDir(resourceDest)

    // server/api/resource/resource.model.js
    if (schema.identifier === 'user') {
      await this.copyTemplate(
        this.templatePath('user.resource.model.js'),
        this.destinationPath(resourceDest + '/' + schema.identifier + '.model.js'),
        { schema }
      );
    } else {
      await this.copyTemplate(
        this.templatePath('resource.model.js'),
        this.destinationPath(resourceDest + '/' + schema.identifier + '.model.js'),
        { schema }
      );
    }

    // server/api/resource/resource.controller.js
    await this.copyTemplate(
      this.templatePath('resource.controller.js'),
      this.destinationPath(resourceDest + '/' + schema.identifier + '.controller.js'),
      { schema, generate_api_doc }
    );

    // server/api/resource/index.js
    await this.copyTemplate(
      this.templatePath('index.js'),
      this.destinationPath(resourceDest + '/index.js'),
      { schema }
    );

  }

};
