const { Generator } = require('codotype-generator')

// // // //

module.exports = class ExpressJsResourceSpec extends Generator {
  async write ({ app }) {

    // Store all spec filenames for inclusion in web_api/test/index.js
    let specPaths = []

    // Iterates over each schema in the app.schemas array
    app.schemas.forEach(async (schema) => {

      // Defines the schema-specific destination
      let resourceDest = 'server/api/' + schema.identifier

      // Ensures the presence of the directory
      await this.ensureDir(resourceDest)

      // Defines filepath for spec test
      let specFilePath = resourceDest + '/' + schema.identifier + '.spec.js'

      // Stores the spec path
      specPaths.push(specFilePath)

      // server/api/resource/resource.spec.js
      if (schema.identifier === 'user') {
        await this.copyTemplate(
          this.templatePath('user.spec.js'),
          this.destinationPath(specFilePath),
          { schema }
        );
      } else {
        await this.copyTemplate(
          this.templatePath('resource.spec.js'),
          this.destinationPath(specFilePath),
          { schema }
        );
      }

    })

    // Writes the entrypoint in web_api/test/index.js
    specPaths = specPaths.map((p) => {
      return `require('../${p}');`
    })

    // Ensures the presence of the web_api/test directory
    await this.ensureDir('/test')

    // Writes the template
    await this.copyTemplate(
      this.templatePath('test.js'),
      this.destinationPath('/test/index.js'),
      { specPaths }
    );

  }

};