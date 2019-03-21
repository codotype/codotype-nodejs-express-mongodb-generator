module.exports = {
  name: 'NodeExpressMongooseModel',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Defines the schema-specific destination
    let resourceDest = 'src/api/' + schema.identifier

    // Ensures the presence of the directory
    await this.ensureDir(resourceDest)

    // Deconstructs schema attributes
    let defaultModel = this.buildDefault({ schema, schemas: blueprint.schemas })
    // TODO - might be helpful to abstract into util, or parent generator?
    let inlineDeconstruction = Object.keys(defaultModel).join(', ')

    // src/api/resource/resource.model.js
    if (schema.identifier === 'user') {
      await this.copyTemplate(
        this.templatePath('user.resource.model.js'),
        this.destinationPath(resourceDest + '/' + schema.identifier + '.model.js'),
        { schema, inlineDeconstruction }
      );
    } else {
      await this.copyTemplate(
        this.templatePath('resource.model.js'),
        this.destinationPath(resourceDest + '/' + schema.identifier + '.model.js'),
        { schema }
      );
    }

  }

};
