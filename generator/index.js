const { Generator } = require('codotype-generator')
const Base = require('./base')
const ResourceModule = require('./resource_module')
const ResourceSpec = require('./resource_spec')
const Routes = require('./routes')

module.exports = class ExpressJS extends Generator {
  async write () {
    await this.composeWith(Base)
    await this.composeWith(ResourceModule)
    await this.composeWith(Routes)
    await this.composeWith(ResourceSpec)
  }
}