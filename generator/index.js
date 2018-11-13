module.exports = {
  name: 'NodeJsExpressMongoDB',
  async write () {
    await this.composeWith('./base')
    await this.composeWith('./environment')
    await this.composeWith('./routes')
    await this.composeWith('./resource_module')
    await this.composeWith('./docker_compose')
    await this.composeWith('./resource_spec')
    // await this.composeWith({ absolute_path: '/home/aeksco/code/codotype/codotype/packages/codotype-nodejs-express-mongodb-generator/generator/docker_compose' })
    // await this.composeWith({ module_path: 'codotype-vuejs-vuex-bootstrap-generator' }, { dest: 'web-client' })
  }
}
