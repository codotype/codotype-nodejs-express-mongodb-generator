module.exports = {
  name: 'NodeExpressBase',
  async write () {

    // Copies server base code
    await this.copyDir(
      this.templatePath(),
      this.destinationPath()
    )

  }
}
