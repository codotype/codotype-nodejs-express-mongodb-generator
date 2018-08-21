const { Generator } = require('codotype-generator')

// // // //

module.exports = class ExpressJsBase extends Generator {
  async write () {

    // Ensures app/web_api
    await this.ensureDir(this.options.build.dest.expressjs.root)

    // Copies server base code
    await this.copyDir(
      __dirname + '/templates',
      this.options.build.dest.expressjs.root
    )

  }

}