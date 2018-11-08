// const Generator = require('@codotype/generator')

// // // //

// module.exports = class ExpressJsBase extends Generator {
//   async write () {

//     // Copies server base code
//     await this.copyDir(
//       this.templatePath(),
//       this.destinationPath()
//     )

//   }

// }

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
