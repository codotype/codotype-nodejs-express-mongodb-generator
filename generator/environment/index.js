const Generator = require('@codotype/generator')

// // // //

module.exports = class EnvironmentGenerator extends Generator {
  async write () {
    await this.copyTemplate(
      this.templatePath('environment'),
      this.destinationPath('.env')
    )
  }
}
