const _ = require('lodash')
const { Generator } = require('codotype-generator')

module.exports = class DockerCompose extends Generator {
  async write ({ app }) {

    // Returns boolean wether or not there is seed data
    // TODO - this is repeated in more than one place
    // it should be abstracted into some shared location
    function hasSeedData () {
      let hasSeeds = false
      app.seed_data.forEach((s) => {
        if (s.records.length) {
          hasSeeds = true
        }
      })
      return hasSeeds
    }

    // dest/docker-compose-dev.yml
    await this.copyTemplate(
      this.templatePath('docker-compose-dev.yml'),
      this.destinationPath('docker-compose.yml'),
      { container_name_prefix: app.identifier, seedData: hasSeedData() }
    )

  }
}