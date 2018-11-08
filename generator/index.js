module.exports = {
  async write () {
    await this.composeWith({ relative_path: './base' })
    await this.composeWith({ relative_path: './environment' })
    await this.composeWith({ relative_path: './routes' })
    await this.composeWith({ relative_path: './resource_module' })
    await this.composeWith({ relative_path: './docker_compose' })
    await this.composeWith({ relative_path: './resource_spec' })
    // await this.composeWith({ absolute_path: '/home/aeksco/code/codotype/codotype/packages/codotype-nodejs-express-mongodb-generator/generator/docker_compose' })
    // await this.composeWith({ module_path: 'codotype-vuejs-vuex-bootstrap-generator' }, { dest: 'web-client' })
  }
}
