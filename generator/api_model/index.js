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
      await this.renderComponent({
        src: 'user.resource.model.js',
        dest: resourceDest + '/' + schema.identifier + '.model.js',
        data: { schema, inlineDeconstruction }
      });
    } else {
      await this.renderComponent({
        src: 'resource.model.js',
        dest: resourceDest + '/' + schema.identifier + '.model.js',
        data: { schema }
      });
    }

  }

};
