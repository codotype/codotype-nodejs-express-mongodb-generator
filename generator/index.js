module.exports = {
  name: 'ExpressJS + MongoDB API',
  async write () {
    await this.composeWith('./api_base')
    await this.composeWith('./api_environment')
    await this.composeWith('./api_controller')
    await this.composeWith('./api_model')
    await this.composeWith('./api_routes')
    await this.composeWith('./api_resource_spec')
  }
}
