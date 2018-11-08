module.exports = {
  name: 'NodeExpressEnvironment',
  async write () {
    await this.copyTemplate(
      this.templatePath('env-dev.txt'),
      this.destinationPath('.env')
    )

    await this.copyTemplate(
      this.templatePath('env-docker.txt'),
      this.destinationPath('.env.docker')
    )
  }
}
