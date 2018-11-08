module.exports = {
  name: 'NodeExpressRouter',
  async write () {
    await this.renderComponent({ src: 'routes.js', dest: 'server/routes.js' })
    // await this.copyTemplate(
    //   this.templatePath('routes.js'),
    //   this.destinationPath('server/routes.js')
    // )
  }
}
