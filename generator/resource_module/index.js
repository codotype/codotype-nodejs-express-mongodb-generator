const { Generator } = require('codotype-generator')

// // // //

module.exports = class ExpressJsResources extends Generator {
  async write ({ app }) {

    // Iterates over each schema in the app.schemas array
    app.schemas.forEach(async (schema) => {

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
        { schema }
      );

      // server/api/resource/index.js
      await this.copyTemplate(
        this.templatePath('index.js'),
        this.destinationPath(resourceDest + '/index.js'),
        { schema }
      );

    }) // End loop
  }

};