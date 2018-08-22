const { Generator } = require('codotype-generator')

// // // //

module.exports = class ExpressJsRoutes extends Generator {
  async write () {
    await this.copyTemplate(
      this.templatePath('routes.js'),
      this.destinationPath('server/routes.js')
    )
  }
}