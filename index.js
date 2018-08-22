const Codotype = require('codotype-generator')

const app = require('codotype-generator/examples/todo-list.json')

const build = {
  stages: [{
    project_path: 'web_api', // TODO - pull this from the generator
    generator_path: './generator', // TODO - pull this from codotype-meta.json, potentially refactor this approach?
    configuration: {}, // TODO - this will be populated by the UI
  }]
}

// Invoke runtime directly with parameters
// TODO - this should be removed and replaced by a CLI command in packge.json
// TODO - refactor this so these options are passed into the `execute` method of this instance
const runtime = new Codotype.runtime()

// Executes the build
runtime.execute({ app, build })

// NOTE - in-progress generator metadata structure
// QUESTION - should this be encapsulated in package.json? ...probably not
// TODO - this should be encapsulated in `codotype-meta.json`
// module.exports = {
//   name: 'Node.js + Express + MongoDB Generator',
//   keywords: [],
//   generator: generator,
//   destination_dir: 'expressjs_mongodb',
//   additional_options: []
// }