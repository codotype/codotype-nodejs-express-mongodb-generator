const { Runtime } = require('codotype-generator')

// Invoke runtime directly with parameters
// TODO - this should be removed and replaced by a CLI command in packge.json
new Runtime({
  project_path: 'web_api', // TODO - pull default from codotype-meta.json
  generator_path: './generator', // TODO - pull this from codotype-meta.json, potentially refactor this approach?
  generator_options: {}, // TODO - this will be populated by the UI
  app: require('./library-app.json')
  // app: require('codotype-generator/examples/todo-list.json'),
  // app: require('codotype-generator/examples/grocery-list.json'),
}).execute()


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