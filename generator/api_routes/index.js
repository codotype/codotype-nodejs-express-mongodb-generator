module.exports = {
  name: 'NodeExpressRouter',
  async write () {
    await this.renderComponent({ src: 'routes.js', dest: 'src/routes.js' })
  }
}
