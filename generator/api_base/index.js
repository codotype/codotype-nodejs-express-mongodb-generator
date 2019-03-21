module.exports = {
  name: 'NodeExpressBase',
  async write ({ blueprint }) {

    // Copies server base code
    await this.copyDir(
      this.templatePath(),
      this.destinationPath()
    )

    const userSchema = blueprint.schemas.find(s => s.identifier === 'user')
    const inlineDeconstruction = userSchema.attributes.map(r => r.identifier).join(', ')

    await this.renderComponent({
      src: 'src/api/auth/auth.controller.js',
      dest: 'src/api/auth/auth.controller.js',
      options: { inlineDeconstruction }
    })

    await this.renderComponent({ src: 'LICENSE', dest: 'LICENSE' })
    await this.renderComponent({ src: 'package.json', dest: 'package.json' })
  }
}
