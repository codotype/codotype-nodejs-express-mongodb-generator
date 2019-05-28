module.exports = {
  name: 'ResourceSpec',
  async forEachSchema ({ schema }) {

    // Defines the schema-specific destination
    let resourceDest = 'src/api/' + schema.identifier

    // Ensures the presence of the directory
    await this.ensureDir(resourceDest)

    // Defines filepath for spec test
    let specFilePath = resourceDest + '/' + schema.identifier + '.spec.js'

    // Stores the spec path
    // specPaths.push(`../src/api/${schema.identifier}/${schema.identifier}.spec.js`)

    // api/resource/resource.spec.js
    await this.renderComponent({
      src: 'resource.spec.js',
      dest: specFilePath,
      data: { schema }
    });

  },
  async write ({ blueprint }) {

    // Store all spec filenames for inclusion in web_api/test/index.js
    let specPaths = []

    // Store all mock objects
    let mocks = {}

    // Iterates over each schema in the blueprint.schemas array
    for (var i = blueprint.schemas.length - 1; i >= 0; i--) {
      let schema = blueprint.schemas[i]

      // Stores the spec path
      specPaths.push(`../src/api/${schema.identifier}/${schema.identifier}.spec.js`)
    }

    // Ensures the presence of the web_api/test directory
    await this.ensureDir('test')

    // Writes the entrypoint in web_api/test/index.js
    specPaths = specPaths.map((p) => {
      return `require('${p}');`
    })

    // Copy mocks
    await this.renderComponent({
      src: 'mocks.js',
      dest: 'test/mocks.js',
      data: { mocks }
    });

    // Writes the template
    await this.renderComponent({
      src: 'test.js',
      dest: 'test/index.js',
      data: { specPaths }
    });

  }

};
