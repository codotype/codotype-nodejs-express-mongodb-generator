const Generator = require('@codotype/generator')

// // // //

module.exports = class DockerCompose extends Generator {
  async write () {
    await this.copyTemplate(
      this.templatePath('docker-compose.yml'),
      this.destinationPath('docker-compose.yml')
    )

    await this.copyTemplate(
      this.templatePath('docker-compose-dev.yml'),
      this.destinationPath('docker-compose-dev.yml')
    )
  }
}

// Returns boolean wether or not there is seed data
// TODO - this is repeated in more than one place
// it should be abstracted into some shared location
// function hasSeedData () {
//   let hasSeeds = false
//   app.seed_data.forEach((s) => {
//     if (s.records.length) {
//       hasSeeds = true
//     }
//   })
//   return hasSeeds
// }
