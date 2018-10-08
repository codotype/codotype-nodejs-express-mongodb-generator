const Generator = require('@codotype/generator')

module.exports = class ExpressJS extends Generator {
  async write () {
    await this.composeWith('./base')
    await this.composeWith('./routes')
    await this.composeWith('./resource_module')
    await this.composeWith('./resource_spec')
  }
}
