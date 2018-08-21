const { Generator } = require('codotype-generator')

// // // //

module.exports = class ExpressJsRoutes extends Generator {
  async write () {
    await this.copyTemplate(
      this.templatePath(__dirname, 'routes.js'),
      this.destinationPath(this.options.build.dest.expressjs.root + 'server/routes.js'),
      { appSchema: this.options.build.app }
    )
  }
}