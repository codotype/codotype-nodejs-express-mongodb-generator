const { Generator, Helpers } = require('codotype-generator')
const ExpressJS = require('./generator')

// TODO - this class should be abstracted into the codotype/codotype repository
module.exports = class GeneratorRunner extends Generator {
  // constructor
  // Sets required input parameters
  constructor(options) {

    // Invokes super
    super(options)

    // // // //
    // TODO - abstract this into helpers.js

    // Global build configuration
    let build = {
      dest: {
        id: '',
        root: null,
        out: '',
        expressjs: {}
      }
    }

    // Assigngs build.app from options
    build.app = options['appconfig']

    // Isolates the buildId
    const buildId = options['buildId']
    build.id = buildId

    // // // //
    // Destination helpers & constants
    // TODO - use this.env.cwd & path library, instead of hardcoded relative path
    build.dest.out = './build/' + buildId + '/'
    build.dest.root = build.dest.out + build.app.identifier + '/'
    build.dest.expressjs.root = build.dest.root + 'web_api/'

    //
    // // // //

    // Sets this.options.build
    this.options = { build: Helpers.formatBuild(build) }

    // Returns the generator instance
    return this

  }

  // TODO - update the write method to accept commonly used args
  // i.e. `async write ({ app, models, options }) { ... })`
  async write () {
    await this.composeWith(ExpressJS)
  }
}
